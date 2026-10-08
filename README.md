# pan-y-miel-react

Sitio web de **Pan y Miel**, una panadería artesanal, desarrollado con React.
Proyecto de la materia **Proyecto II** (Universidad de Guadalajara, UDGVirtual), trabajado con la metodología Scrum.

Sitio publicado: https://fatimaguadalupe9.github.io/pan-y-miel-react/paginaprincipal.html

## Cómo verlo

React y Babel se cargan desde un CDN, así que no hay que instalar Node ni npm. Hace falta conexión a internet.

Como `paginaprincipal.html` carga el archivo `app.js`, el navegador puede dejar la página en blanco si se abre con doble clic. Para verla bien:

- En VS Code, abre la carpeta del proyecto y usa **Go Live** (extensión Live Server), o
- Abre el sitio publicado con GitHub Pages (el enlace de arriba).

## Avance por sprint

### Sprint 1 (terminado)

| ID | Elemento del backlog | Componente | Archivo |
|---|---|---|---|
| PB-01 | Diseño del logotipo e identidad visual | `Header` | `app.js` |
| PB-02 | Página de inicio (Home) | `Home` | `app.js` |
| PB-03 | Catálogo de productos | `Catalogo` | `app.js` |

El catálogo muestra 4 productos con nombre, descripción y precio. Las fotografías de los productos están pendientes.

### Siguientes sprint

Los demás elementos del Product Backlog quedan para los siguientes sprint, según la calendarización del proyecto.

## Archivos

- `paginaprincipal.html`: estructura de la página y estilos.
- `app.js`: componentes de React (`Header`, `Home`, `Catalogo`, `Footer`, `App`).
- `README.md`: esta descripción.
