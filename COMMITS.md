# Tareas y commits por integrante

Meta: 42 commits (22 + 10 + 10), ramas `main` / `develop` / `feature/*`. Idealmente repartan los commits en varios días.

---

## Preparación (una sola vez)

Descomprime `minevera-app` y desde esa carpeta:

```bash
git init
git remote add origin https://github.com/Zteve0/AppHibridaEntrga2.git
git checkout -b develop
```

---

## Federico Martínez López — 22 commits (base y funcionalidades)

Los archivos ya están listos: solo hay que agregarlos **en este orden**, un commit por línea. Copia y pega todo el bloque:

```bash
git add package.json vite.config.js index.html && git commit -m "chore: proyecto base con vite + react"
git add src/styles/main.scss src/styles/_variables.scss && git commit -m "chore: configurar sass y estructura de parciales"
git add .gitignore README.md && git commit -m "chore: gitignore y readme inicial"
git add src/styles/_base.scss && git commit -m "feat: estilos base y reset"
git add src/main.jsx && git commit -m "feat: punto de entrada de react"
git add src/components/Iconos.jsx && git commit -m "feat: set de iconos svg propios"
git add src/styles/_layout.scss && git commit -m "feat: layout general de la app"
git add src/components/NavBar.jsx && git commit -m "feat: navbar superior con nombre e icono"
git add src/components/TabBar.jsx && git commit -m "feat: tab bar inferior con boton central destacado"
git add src/utils/fechas.js && git commit -m "feat: utilidades de fechas y categorias"
git add src/data/seed.js && git commit -m "feat: datos semilla de alimentos y compras"
git add src/context/AppContext.jsx && git commit -m "feat: estado global con persistencia en localstorage"
git add src/App.jsx && git commit -m "feat: navegacion con react router"
git add src/components/ItemAlimento.jsx && git commit -m "feat: item de alimento con badge de vencimiento"
git add src/styles/_components.scss && git commit -m "feat: estilos de componentes"
git add src/pages/Inicio.jsx && git commit -m "feat: pantalla inicio con metricas y accesos rapidos"
git add src/pages/Alimentos.jsx && git commit -m "feat: mis alimentos con buscador y filtros"
git add src/styles/_forms.scss && git commit -m "feat: estilos de formularios"
git add src/pages/Agregar.jsx && git commit -m "feat: formulario agregar y editar con validacion"
git add src/pages/Detalle.jsx && git commit -m "feat: detalle del alimento con editar y eliminar"
git add src/pages/Vencer.jsx && git commit -m "feat: proximos a vencer ordenado por urgencia"
git add src/pages/Compras.jsx && git commit -m "feat: lista de compras con pendientes y comprados"
git add COMMITS.md && git commit -m "docs: plan de trabajo del equipo"
git push -u origin develop
```

(Nota: el último `git add COMMITS.md` es el commit 23 — colchón por si alguno falla.)

---

## Steve Ellis — 10 commits (rama `feature/estilos`)

```bash
git checkout develop && git pull && git checkout -b feature/estilos
```

Cada tarea es un cambio pequeño + un commit:

1. En `_variables.scss` cambiar `$muted: #8A8883;` por `$muted: #85837E;` → `style: afinar gris de textos secundarios`
2. En `_components.scss`, dentro de `.stats__card`, agregar `box-shadow: 0 1px 3px rgba(43,43,40,0.05);` → `style: tarjetas de metricas del inicio`
3. En `.item:hover` agregar `background: $bg;` → `style: hover de items de lista`
4. En `.chips__chip` cambiar `padding: 7px 14px;` por `padding: 8px 15px;` → `style: chips de categorias`
5. En `_forms.scss`, dentro de `.field input, select, textarea` agregar `&:focus { border-color: $accent-dark; }` → `style: foco verde en formularios`
6. En `.compra__check` cambiar `border-radius: 6px;` por `border-radius: 7px;` → `style: checkboxes de compras`
7. En `.detalle dd` cambiar `font-weight: 600;` por `font-weight: 700;` → `style: tabla del detalle`
8. En `_base.scss` agregar `::selection { background: $ok-bg; }` → `style: seleccion de texto de la marca`
9. En `.vacio` agregar `padding: 16px; border: 1.5px dashed $border; border-radius: $radius;` → `style: estados vacios de las listas`
10. En `README.md` agregar una sección `## Capturas` con 2-3 imágenes de la app → `docs: capturas de la app en el readme`

```bash
git push -u origin feature/estilos
# luego Pull Request feature/estilos → develop en GitHub
```

---

## Juan Andrés Zhero — 10 commits (rama `feature/contenido`)

```bash
git checkout develop && git pull && git checkout -b feature/contenido
```

1. En `src/utils/fechas.js` agregar `'Panaderia'` a `CATEGORIAS` → `feat: categoria panaderia`
2. En `src/data/seed.js` agregar un alimento más (ej. Pan tajado, Panaderia, vence en 4 días) → `feat: dato semilla adicional`
3. En `Agregar.jsx` mejorar el placeholder de la nota (ej. 'Ej. Abierta el martes, consumir pronto') → `fix: textos del formulario`
4. En `Detalle.jsx` cambiar el texto del botón `Volver` por `Atras` (o viceversa, a gusto) → `fix: texto de navegacion`
5. En `Compras.jsx` cambiar placeholder `Nuevo item...` por `Ej. Cafe, azucar...` → `fix: textos lista de compras`
6. En `Inicio.jsx` cambiar `Ver todos` por `Ver todos →` → `fix: enlace ver todos`
7. En `Vencer.jsx` ajustar el texto de ayuda → `fix: texto de ayuda en vencer`
8. En `README.md` revisar la sección de ejecución (agregar la versión de Node usada) → `docs: instrucciones de ejecucion`
9. En `README.md` verificar/actualizar el enlace de Figma → `docs: enlace figma actualizado`
10. Merge final:
```bash
git push -u origin feature/contenido
# Pull Request feature/contenido → develop
# y al final:
git checkout main && git merge develop && git push -u origin main
```
→ `chore: merge de entrega a main`

---

## Verificación final

```bash
npm install
npm run build     # dist/ sin errores
npm run preview   # probar la app completa offline
```

Checklist: 40+ commits, 10+ por integrante, ramas visibles en GitHub, `.gitignore` funcionando (no debe aparecer `node_modules/` en el repo), README con Figma e instrucciones.
