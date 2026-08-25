# Plan de trabajo — ramas y commits

Meta del criterio: **mínimo 40 commits en total, mínimo 10 por integrante**, con ramas y actividad repartida en el tiempo de la entrega (no todo el mismo día).

## Ramas

- `main` — solo versiones estables (se llega por merge)
- `develop` — integración
- `feature/inventario`, `feature/compras`, `feature/estilos` — trabajo por funcionalidad

Flujo: crear la rama desde `develop`, commits pequeños, merge a `develop` (idealmente con Pull Request), y al final merge `develop → main`.

## Reparto sugerido (42 commits)

### Integrante 3 (líder, ~22 commits) — base y funcionalidades
1. `chore: proyecto base con vite + react`
2. `chore: configurar sass y estructura de parciales`
3. `chore: .gitignore y readme inicial`
4. `feat: variables de color y tipografía (_variables.scss)`
5. `feat: estilos base y reset (_base.scss)`
6. `feat: layout app + navbar superior (_layout.scss, NavBar)`
7. `feat: tab bar inferior con botón central (+)`
8. `feat: rutas con react router (App.jsx)`
9. `feat: contexto global con persistencia en localStorage`
10. `feat: datos semilla de alimentos y compras`
11. `feat: utilidades de fechas y categorías`
12. `feat: pantalla inicio con métricas`
13. `feat: accesos rápidos en inicio`
14. `feat: componente ItemAlimento con badge de vencimiento`
15. `feat: pantalla mis alimentos con buscador`
16. `feat: filtros por categoría (chips)`
17. `feat: formulario agregar alimento con validación`
18. `feat: pantalla detalle del alimento`
19. `feat: editar alimento reutilizando el formulario`
20. `feat: eliminar alimento con confirmación`
21. `feat: pantalla próximos a vencer ordenada por urgencia`
22. `feat: pantalla lista de compras (pendientes/comprados)`

### Steve Ellis (~10 commits) — estilos y UX (rama `feature/estilos`)
1. `style: paleta neutra definitiva en _variables.scss`
2. `style: tarjetas de métricas del inicio`
3. `style: badges de vencimiento (vencido/pronto/ok)`
4. `style: chips de categorías y estados hover`
5. `style: formularios (_forms.scss)`
6. `style: lista de compras y checkboxes`
7. `style: pantalla detalle (tabla de datos y acciones)`
8. `fix: foco visible accesible en inputs y botones`
9. `style: estados vacíos de las listas`
10. `docs: capturas de la app en el readme`

### Juan Andrés Zhero (~10 commits) — contenido y pulido (rama `feature/inventario`)
1. `feat: categorías adicionales en el selector`
2. `fix: validación de cantidad mayor a cero`
3. `fix: textos y ortografía de la interfaz`
4. `feat: nota opcional en el detalle`
5. `fix: orden de grupos en mis alimentos`
6. `feat: contador de pendientes y comprados`
7. `fix: botón eliminar comprados solo si hay comprados`
8. `docs: instrucciones de ejecución en readme`
9. `docs: enlace de figma actualizado en readme`
10. `chore: merge develop a main para entrega`

## Cómo replicar el plan

Cada commit del reparto corresponde a un cambio pequeño y real del código ya incluido en este proyecto: para construir el historial, parte de un proyecto vacío y ve agregando/copiando cada pieza en el orden de la lista, con `git add -p` para separar cambios. Reparte los commits en varios días distintos.
