# MiNevera 🥬

App híbrida para gestionar los alimentos del hogar: inventario, alertas de vencimiento y lista de compras. **Funciona 100% sin internet.**

- **Repositorio:** https://github.com/Zteve0/AppHibridaEntrga2
- **Prototipo (Figma):** https://www.figma.com/design/zDGVfp74RDr4VcFCuuM7we/Wireframe-App-Alimentos?node-id=0-1&t=9W2ChC2TUd94zbPV-1
- **Equipo:** Federico Martínez López · Steve Ellis · Juan Andrés Zhero

## Ejecución del proyecto

Requisitos: Node.js 18+ y npm.

```bash
npm install      # instala dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # genera el bundle final minificado en dist/
npm run preview  # sirve dist/ en local para probar el build
```

El build de `dist/` usa rutas relativas y `HashRouter`, así que funciona en cualquier carpeta local sin servidor ni conexión — es el bundle que se usará para crear el instalador.

## App Android

La misma base web se empaqueta como app nativa con **Capacitor 7**: `dist/` viaja dentro del APK y corre en un WebView, así que la app sigue funcionando sin internet. Los datos se guardan con `@capacitor/preferences` (almacenamiento nativo).

La guía completa del taller, incluida la publicación en Google Play, está en [TALLER2.md](TALLER2.md). Lo esencial:

```bash
npm run cap:sync     # build web + copia dist/ al proyecto Android
npm run android      # lo anterior y abre Android Studio
npm run android:apk  # APK de release firmado, sin pasar por Android Studio
npm run android:aab  # AAB de release firmado (formato de Google Play)
```

En macOS o Linux cambia `gradlew` por `./gradlew` dentro de los scripts de `package.json`.

| Campo | Valor |
| --- | --- |
| Package (applicationId) | `com.minevera.app` |
| versionCode / versionName | `1` / `1.0` |
| minSdk / targetSdk | 23 (Android 6.0) / 36 |
| Permisos | ninguno sensible |
| APK | `android/app/build/outputs/apk/release/app-release.apk` |
| AAB | `android/app/build/outputs/bundle/release/app-release.aab` |

### Requisitos del entorno

- JDK 21 y Android SDK con la plataforma **android-36** y build-tools 36.x
- `android/local.properties` apuntando al SDK: `sdk.dir=C:/Users/<usuario>/AppData/Local/Android/Sdk`

### Firma del release

El build lee las credenciales de `android/key.properties`, que **no está en el repositorio**:

```properties
storeFile=C:/ruta/fuera/del/repo/minevera-release.jks
storePassword=...
keyAlias=minevera
keyPassword=...
```

Sin ese archivo el build de release sigue funcionando, pero el APK sale sin firmar y Google Play lo rechaza. La llave `.jks` es irremplazable: si se pierde, no se pueden publicar actualizaciones de la app nunca más. Guárdala fuera del repositorio y respáldala.

### Notas técnicas

- Desde Android 15 el modo *edge-to-edge* es obligatorio para `targetSdk` 35+ y no se puede desactivar. `adjustMarginsForEdgeToEdge` en `auto` hace que Capacitor aplique los márgenes al WebView, para que la barra de estado no pise el encabezado ni la barra de gestos pise el tab bar. `env(safe-area-inset-*)` no resuelve esto: el WebView de Android reporta cero.
- `HashRouter` y `base: './'` funcionan igual dentro del WebView que abriendo `dist/index.html` a mano.

## Privacidad

MiNevera no recolecta, no transmite ni comparte datos. La política está en [PRIVACIDAD.md](PRIVACIDAD.md) y publicada para la ficha de Google Play en https://zteve0.github.io/AppHibridaEntrga2/privacidad.html

## Stack

| Capa | Herramienta |
| --- | --- |
| SPA | React 18 + React Router (HashRouter) |
| Bundler | Vite — compila SASS, minifica CSS/JS e incrusta los assets en el bundle |
| Estilos | SASS con parciales (`_variables`, `_base`, `_layout`, `_components`, `_forms`) |
| Datos | `@capacitor/preferences` en Android, `localStorage` en la web — sin backend ni internet |
| Android | Capacitor 7 — empaqueta el mismo `dist/` como APK/AAB nativo |

## Estructura

```
minevera-app/
├── index.html            # único html (SPA)
├── vite.config.js        # base './', assets incrustados, minificación
├── capacitor.config.json # id de app, splash y márgenes del WebView
├── android/              # proyecto nativo generado por Capacitor
├── resources/            # icono, splash y gráfico destacado de Play
├── docs/                 # build publicado en GitHub Pages + privacidad.html
└── src/
    ├── main.jsx          # punto de entrada
    ├── App.jsx           # rutas (react-router)
    ├── context/          # estado global + persistencia localStorage
    ├── pages/            # Inicio, Alimentos, Agregar/Editar, Detalle, Vencer, Compras
    ├── components/       # NavBar, TabBar, ItemAlimento, Iconos
    ├── data/             # datos semilla
    ├── utils/            # fechas y categorías
    └── styles/           # main.scss + parciales SASS
```

## Diseño

- Paleta de tonos neutros (coolors.co) con **verde #2ECC71** como color distintivo de la acción principal.
- Navegación coherente: barra superior con nombre e ícono de la app, tab bar inferior fija con 5 accesos y botón central destacado.
- Tipografía: para usar Google Fonts sin internet, descarga **Archivo** (fonts.google.com), pon los `.woff2` en `src/assets/fonts/` y decláralos con `@font-face` en `_base.scss`; ya está como primera opción de la pila tipográfica.

## Decisiones técnicas

- **HashRouter** en vez de BrowserRouter: la navegación funciona sin servidor, incluso abriendo `dist/index.html` directamente — clave para el requisito offline.
- **localStorage** como única fuente de datos: sin backend, la app arranca con datos semilla la primera vez.
- **Inventario ordenado alfabéticamente** al agregar/editar, y alertas por umbral de 3 días (`DIAS_ALERTA`).
- **Colores suaves**: superficies blancas, bordes #ECEAE6, chips y métricas con tintes claros; el verde queda solo para acciones y estados positivos.

## Notas de la entrega

- Ver `COMMITS.md` para el plan de trabajo por integrante (ramas y commits).
- `.gitignore` excluye `node_modules/` y `dist/`.
