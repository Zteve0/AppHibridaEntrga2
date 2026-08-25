# Checklist Entrega 2 — App Híbrida MiNevera

Marca con [x] a medida que avancen. Última actualización: tanda 2 de commits.

## Criterios de evaluación

### (10%) SASS y clases parciales
- [x] SASS configurado (dependencia `sass` + Vite lo compila)
- [x] Parciales: `_variables`, `_base`, `_layout`, `_components`, `_forms` integrados en `main.scss`

### (10%) Bundler
- [x] Vite configurado (`vite.config.js`): compila SCSS, minifica CSS y JS
- [x] Assets incrustados en el bundle (`assetsInlineLimit`)
- [ ] Verificar: correr `npm run build` sin errores y probar `npm run preview`

### (10%) Repositorio
- [x] Repo público: github.com/Zteve0/AppHibridaEntrga2
- [x] `.gitignore` (node_modules, dist)
- [x] `README.md` con instrucciones de ejecución
- [ ] Mínimo 40 commits en total
- [ ] Integrante 3: 22 commits (van 6 de 22 — base + tanda 1)
- [ ] Steve: 10 commits en rama `feature/estilos`
- [ ] Juan: 10 commits en rama `feature/contenido`
- [ ] Uso de ramas visible (develop + features + merges a main)
- [ ] Commits repartidos en varios días (no todos el mismo día)

### (10%) Funciona sin internet
- [x] Sin peticiones a red: datos en localStorage
- [x] HashRouter + rutas relativas (funciona abriendo dist/index.html directo)
- [ ] Prueba final: desconectar wifi y usar la app completa

### (10%) Asistencia y entrega puntual
- [ ] Asistir a clase
- [ ] Entregar a tiempo

### (20%) Refleja el prototipo + Figma
- [x] Las 6 pantallas del wireframe: Inicio, Mis Alimentos, Agregar, Detalle, Próximos a Vencer, Compras
- [x] Enlace de Figma en el README
- [ ] Actualizar el archivo de Figma si el diseño final cambió respecto al wireframe

### (30%) App completa y funcional, todo incrustado en el bundle
- [x] CRUD de alimentos (crear, ver, editar, eliminar) con validación
- [x] Búsqueda y filtros por categoría
- [x] Alertas de vencimiento ordenadas por urgencia
- [x] Lista de compras (agregar, marcar, eliminar comprados)
- [ ] Probar todos los flujos en el build final (`npm run preview`)

## Recomendaciones del profe

- [x] Paleta de tonos neutros (coolors.co) + verde distintivo
- [x] Navegación coherente: botones fijos, color distintivo, jerarquía clara
- [x] Barra de navegación con nombre e ícono de la app
- [x] Íconos SVG propios (fondo transparente)
- [ ] Google Fonts sin internet: descargar Archivo (fonts.google.com), poner los .woff2 en `src/assets/fonts/` y declarar `@font-face` en `_base.scss` (la pila ya la tiene de primera)
- [ ] Preparar sustentación: repartir qué presenta cada integrante (sugerencia: Integrante 3 = arquitectura y demo, Steve = SASS y estilos, Juan = repo/ramas y build)

## Plan de commits restantes (Integrante 3)

- Tanda 2 (commits 7–11): contador de búsqueda, formulario, vencidos separados, confirmación en compras, título del documento
- Tanda 3 (commits 12–16): orden alfabético del inventario, indicador en navbar + estilo, accesibilidad tab bar, más datos semilla
- Tanda 4 (commits 17–22): scroll al cambiar de ruta, estilos de foco/placeholder, fuente local, docs finales y CHECKLIST.md
