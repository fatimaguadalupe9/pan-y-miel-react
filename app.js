// ---------------------------------------------------------
// Pan y Miel — Sitio web (Sprint 2)
// Componentes de React correspondientes al Sprint Backlog:
//   PB-01 Diseño del logotipo e identidad visual  -> <Header />
//   PB-02 Página de inicio (Home)                 -> <Home />
//   PB-03 Catálogo de productos                   -> <Catalogo />
//   PB-04 Fotografías de los productos            -> campo "imagen" + <img> en <Catalogo />
//   PB-05 Sección de contacto                     -> <Contacto />
// ---------------------------------------------------------

// Datos del catálogo (correspondiente a PB-03: fotos y precios de productos)
const productos = [
    { nombre: "Concha de vainilla", imagen: "img/concha.jpg", precio: 18, descripcion: "Pan dulce tradicional cubierto de azúcar" },
    { nombre: "Pan de miel", imagen: "img/pan-de-miel.jpg", precio: 22, descripcion: "Elaborado con miel de abeja local" },
    { nombre: "Baguette artesanal", imagen: "img/baguette.jpg", precio: 35, descripcion: "Corteza crujiente, migas suaves" },
    { nombre: "Cuernito de mantequilla", imagen: "img/cuernito.jpg", precio: 16, descripcion: "Hojaldrado, horneado diario" },
];

// PB-01: Encabezado con el logotipo e identidad de la marca
function Header() {
    return (
        <header className="header">
            <div className="logo">Pan y Miel</div>
            <nav className="nav">
                <a href="#inicio">Inicio</a>
                <a href="#catalogo">Catálogo</a>
                <a href="#contacto">Contacto</a>
            </nav>
        </header>
    );
}

// PB-02: Sección de inicio con la presentación de la marca
function Home() {
    return (
        <section id="inicio" className="hero">
            <h1>Pan recién horneado, todos los días</h1>
            <p>
                Somos una panadería artesanal que elabora cada pieza con ingredientes
                locales y procesos tradicionales. Desde 2024 llevamos el sabor de la
                miel de abeja a cada rincón del barrio.
            </p>
        </section>
    );
}

// PB-03 y PB-04: Catálogo de productos, cada producto como tarjeta con su fotografía
function Catalogo() {
    return (
        <section id="catalogo" className="catalogo">
            <h2>Nuestro catálogo</h2>
            <div className="grid-productos">
                {productos.map((producto, index) => (
                    <div className="tarjeta-producto" key={index}>
                        <img className="foto-producto" src={producto.imagen} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                        <p>{producto.descripcion}</p>
                        <span className="precio">${producto.precio} MXN</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

// PB-05: Sección de contacto (el enlace "Contacto" del menú lleva aquí)
// IMPORTANTE: cambia estos datos por los reales de la panadería
function Contacto() {
    return (
        <section id="contacto" className="contacto">
            <h2>Contacto</h2>
            <ul>
                <li><strong>Dirección:</strong> Calle Ejemplo 123, Guadalajara, Jalisco</li>
                <li><strong>Teléfono:</strong> 33 0000 0000</li>
                <li><strong>Correo:</strong> contacto@panymiel.example</li>
                <li><strong>Horario:</strong> Lunes a sábado, de 7:00 a 20:00</li>
            </ul>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <p>Pan y Miel · Panadería artesanal · Sprint 2 desarrollado en React</p>
        </footer>
    );
}

// Componente principal: agrupa todo el sitio
function App() {
    return (
        <React.Fragment>
            <Header />
            <Home />
            <Catalogo />
            <Contacto />
            <Footer />
        </React.Fragment>
    );
}

// Montamos la aplicación dentro del <div id="root"> del index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
