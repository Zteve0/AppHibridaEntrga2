# Taller 2 — Android Studio + Capacitor + publicación en Google Play

Guía completa para MiNevera. Todo se hace en Windows. La app sigue funcionando **offline**: los datos se guardan con `@capacitor/preferences` (almacenamiento nativo) y no hay ninguna petición a internet.

---

## Parte 0 — Requisitos previos

- **Node.js 18+** (`node -v`)
- **Android Studio** con SDK 34+ y el JDK que trae incluido (Capacitor 7 usa JDK 21)
- El proyecto MiNevera funcionando (`npm run dev`)

En Android Studio verifica: *More Actions → SDK Manager → SDK Platforms* → que esté instalado **Android 14 (API 34)** o superior, y en *SDK Tools* → **Android SDK Build-Tools** y **Android SDK Platform-Tools**.

---

## Parte 1 — Instalar Capacitor en el proyecto

Los archivos ya vienen configurados (`capacitor.config.json`, `package.json`, `src/utils/storage.js`). Solo instala e inicializa:

```powershell
npm install
npx cap add android
npm run cap:sync
```

Qué hace cada uno:
- `npm install` — baja Capacitor, el plugin Preferences y el resto de dependencias
- `npx cap add android` — crea la carpeta `android/` con el proyecto nativo (solo la primera vez)
- `npm run cap:sync` — hace `vite build` y copia `dist/` al proyecto Android

> **Config ya definida** en `capacitor.config.json`: `appId: com.minevera.app`, `appName: MiNevera`, `webDir: dist`. Si `npx cap add android` pregunta algo, esos son los valores.

### Íconos y splash

```powershell
npx @capacitor/assets generate --android
```

Toma `resources/icon.png` y `resources/splash.png` (ya incluidos) y genera todas las densidades de Android automáticamente.

---

## Parte 2 — Probar en el emulador o en tu teléfono

```powershell
npm run android
```

Esto compila, sincroniza y abre Android Studio. Ahí:

1. Espera a que termine el *Gradle Sync* (barra de abajo)
2. Selecciona un dispositivo: emulador (*Device Manager → Create device*) o tu teléfono por USB con **Depuración USB** activada
3. Botón ▶ **Run**

**Prueba offline:** con la app abierta, activa **modo avión** en el teléfono, ciérrala y vuélvela a abrir. Debe funcionar completa y conservar los datos — esa es la evidencia del criterio.

> Cada vez que cambies código web: `npm run cap:sync` y vuelve a darle Run.

---

## Parte 3 — Generar el App Bundle firmado (.aab)

Google Play exige **.aab** (no APK). Necesitas una llave de firma.

### 3.1 Crear la llave (una sola vez)

En Android Studio: **Build → Generate Signed App Bundle / APK → Android App Bundle → Next → Create new…**

Llena:
- **Key store path**: guárdalo FUERA del repo, ej. `D:\claves\minevera.jks`
- **Password** y **Key alias** (ej. `minevera`) — **anótalos, sin ellos no puedes volver a actualizar la app nunca**
- Validity: 25 años · Certificate: nombre y país (CO)

⚠️ El `.gitignore` ya excluye `*.jks` y `*.keystore`. **Nunca subas la llave al repo.**

### 3.2 Generar el bundle

**Build → Generate Signed App Bundle / APK → Android App Bundle**, selecciona tu llave, variante **release** → Finish.

El archivo queda en:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### 3.3 Versionado

En `android/app/build.gradle`, cada subida a Play necesita un `versionCode` mayor:
```gradle
versionCode 1
versionName "1.0"
```

---

## Parte 4 — Publicar en Google Play Console

### 4.1 Cuenta de desarrollador

- Registro en [play.google.com/console](https://play.google.com/console) — **pago único de 25 USD**
- Requiere verificación de identidad (documento) — puede tardar días
- Si el grupo no va a pagar, avísale al profe: la alternativa es entregar el `.aab` + el `.apk` de debug y las capturas del proceso

### 4.2 Crear la app

**Create app** → Nombre: `MiNevera` · Idioma: Español (Colombia) · Tipo: **App** · Gratis

### 4.3 Llenar la ficha (Store listing)

- **Nombre corto**: MiNevera
- **Descripción breve** (80 car.): `Controla los alimentos de tu casa y no dejes vencer nada. Sin internet.`
- **Descripción completa**: usa el texto de `PLAY-TEXTOS.md`
- **Ícono**: 512×512 → usa `resources/icon.png` (redimensiónalo)
- **Gráfico destacado**: 1024×500 → `resources/play-feature-graphic.png` (ya generado)
- **Capturas**: mínimo 2 del teléfono (toma pantallazos del emulador: Inicio, Mis Alimentos, Próximos a Vencer)

### 4.4 Cuestionarios obligatorios (App content)

- **Política de privacidad**: obligatoria. Usa el texto de `PRIVACIDAD.md` — puedes publicarlo gratis en GitHub Pages, ej. `https://zteve0.github.io/AppHibridaEntrga2/privacidad.html`
- **Data safety**: responde **No** a "recolecta datos" — todo se guarda en el dispositivo
- **Clasificación de contenido**: cuestionario → categoría *Utilidades*, sin contenido sensible
- **Público objetivo**: 13+ · no dirigida a niños
- **Anuncios**: No contiene anuncios

### 4.5 Subir y lanzar

1. **Testing → Internal testing** (recomendado para el taller: se aprueba en horas, no días) o **Production**
2. **Create new release** → sube el `app-release.aab`
3. Notas de la versión: `Primera versión: inventario de alimentos, alertas de vencimiento y lista de compras.`
4. **Save → Review release → Start rollout**
5. En *Internal testing → Testers* agrega los correos del equipo y del profe, y comparte el enlace de prueba

⏱️ Revisión: horas en internal testing, hasta 7 días en producción (primera app). **No lo dejes para el último día.**

---

## Parte 5 — Commits del taller

Reparto sugerido (yo la mayoría, ellos cambios menores):

**Federico (12 commits)**
1. `chore: dependencias de capacitor y plugin preferences` → `package.json`
2. `chore: configuracion de capacitor` → `capacitor.config.json`
3. `feat: adaptador de almacenamiento nativo` → `src/utils/storage.js`
4. `refactor: contexto usa almacenamiento nativo` → `src/context/AppContext.jsx`
5. `chore: gitignore para android y llaves de firma` → `.gitignore`
6. `feat: icono y splash de la app` → `resources/icon.png`, `resources/splash.png`
7. `chore: proyecto android generado con capacitor` → carpeta `android/`
8. `chore: recursos de android generados` → `android/app/src/main/res/`
9. `docs: guia del taller 2` → `TALLER2.md`
10. `docs: politica de privacidad` → `PRIVACIDAD.md`
11. `docs: textos de la ficha de play store` → `PLAY-TEXTOS.md`
12. `chore: version 1.0 para release` → `android/app/build.gradle`

**Steve (4)**: gráfico destacado de Play · capturas de pantalla en el README · ajustar color del splash en `capacitor.config.json` · revisar textos de la ficha

**Juan (4)**: subir `versionCode` a 2 · ajustar `launchShowDuration` del splash · documentar el proceso de firma en el README · merge final a `main`

---

## Checklist final del taller

- [ ] `npx cap add android` ejecutado y carpeta `android/` en el repo
- [ ] App corriendo en emulador o teléfono real
- [ ] **Prueba en modo avión** funcionando (grábala en video para la sustentación)
- [ ] Íconos y splash generados
- [ ] `.aab` firmado generado
- [ ] Llave `.jks` guardada fuera del repo y respaldada
- [ ] Cuenta de Play Console activa
- [ ] Ficha completa: descripción, ícono, gráfico destacado, 2+ capturas
- [ ] Política de privacidad publicada y enlazada
- [ ] Cuestionarios: data safety, clasificación, público, anuncios
- [ ] Release subido y en revisión (internal testing o producción)
- [ ] Enlace de la app o captura del estado "En revisión" para la entrega

---

## Problemas comunes

| Error | Solución |
| --- | --- |
| `SDK location not found` | Android Studio → SDK Manager → copia la ruta del SDK a `android/local.properties`: `sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk` |
| Pantalla en blanco en el APK | Falta `npm run cap:sync` después del build, o `webDir` mal en `capacitor.config.json` |
| Gradle falla por JDK | File → Settings → Build Tools → Gradle → Gradle JDK: el **jbr** que trae Android Studio |
| `cap: command not found` | Usa `npx cap …` (no `cap …`) |
| Rutas rotas al navegar | Ya resuelto: la app usa `HashRouter` y `base: './'` |
