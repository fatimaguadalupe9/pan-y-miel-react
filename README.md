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

### Sprint 2 (terminado)

| ID | Elemento del backlog | Componente | Archivo |
|---|---|---|---|
| PB-04 | Fotografías de los productos en el catálogo | `Catalogo` y carpeta `img/` | `app.js` |
| PB-05 | Sección de contacto | `Contacto` | `app.js` |

### Sprint 3 (terminado)

| ID | Elemento del backlog | Componente | Archivo |
|---|---|---|---|
| PB-06 | Carrito de compras | `Carrito` y botón "Agregar al carrito" en `Catalogo` | `app.js` |
| PB-07 | Formulario de pedido | `Pedido` | `app.js` |

- El carrito vive en el estado de `App` (`useState`) y se guarda en el navegador (`localStorage`), así que no se pierde al recargar.
- El menú muestra cuántas piezas hay en el carrito.
- El formulario valida nombre, teléfono de 10 dígitos y, si es a domicilio, la dirección. Al enviarlo muestra una confirmación con folio y total (aún no hay servidor).
- El envío a domicilio tiene un costo fijo de ejemplo de $30 MXN.

### Sprint 4 (terminado)

| ID | Elemento del backlog | Qué se hizo | Archivo |
|---|---|---|---|
| PB-08 | Diseño adaptable a celular | Se agregó la etiqueta `viewport` y estilos `@media (max-width: 700px)`: menú en dos filas, productos en una columna, carrito reorganizado y botones y campos más grandes para tocar con el dedo | `paginaprincipal.html` |
| PB-09 | Pruebas finales y publicación | Pruebas en computadora y en ancho de celular. Ajuste: al enviar un pedido la pantalla baja a la confirmación. Sitio publicado en GitHub Pages | `app.js`, `README.md` |

## Archivos

- `paginaprincipal.html`: estructura de la página y estilos (incluye los estilos para celular).
- `app.js`: componentes de React (`Header`, `Home`, `Catalogo`, `Carrito`, `Pedido`, `Contacto`, `Footer` y `App`).
- `img/`: fotografías de los productos.
