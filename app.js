// ---------------------------------------------------------
// Pan y Miel — Sitio web (Sprint 3)
// Componentes de React correspondientes al Sprint Backlog:
//   PB-01 Diseño del logotipo e identidad visual  -> <Header />
//   PB-02 Página de inicio (Home)                 -> <Home />
//   PB-03 Catálogo de productos                   -> <Catalogo />
//   PB-04 Fotografías de los productos            -> campo "imagen" + <img> en <Catalogo />
//   PB-05 Sección de contacto                     -> <Contacto />
//   PB-06 Carrito de compras                      -> <Carrito /> y botón en <Catalogo />   (Sprint 3)
//   PB-07 Formulario de pedido                    -> <Pedido />                            (Sprint 3)
// ---------------------------------------------------------

// Hooks de React que usamos en este sprint (React se carga desde el CDN, por eso se toman de React)
const { useState, useEffect } = React;

// Datos del catálogo (correspondiente a PB-03: fotos y precios de productos)
const productos = [
    { id: 1, nombre: "Concha de vainilla", imagen: "img/concha.jpg", precio: 18, descripcion: "Pan dulce tradicional cubierto de azúcar" },
    { id: 2, nombre: "Pan de miel", imagen: "img/pan-de-miel.jpg", precio: 22, descripcion: "Elaborado con miel de abeja local" },
    { id: 3, nombre: "Baguette artesanal", imagen: "img/baguette.jpg", precio: 35, descripcion: "Corteza crujiente, migas suaves" },
    { id: 4, nombre: "Cuernito de mantequilla", imagen: "img/cuernito.jpg", precio: 16, descripcion: "Hojaldrado, horneado diario" },
];

// Costo de envío a domicilio (PB-07)
const COSTO_ENVIO = 30;

// PB-01 (actualizado en Sprint 3): el menú muestra cuántas piezas hay en el carrito
function Header({ cantidadCarrito }) {
    return (
        <header className="header">
            <div className="logo">Pan y Miel</div>
            <nav className="nav">
                <a href="#inicio">Inicio</a>
                <a href="#catalogo">Catálogo</a>
                <a href="#contacto">Contacto</a>
                <a href="#carrito" className="nav-carrito">Carrito ({cantidadCarrito})</a>
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

// PB-03, PB-04 y PB-06: Catálogo; cada tarjeta ahora tiene un botón para agregar al carrito
function Catalogo({ onAgregar }) {
    return (
        <section id="catalogo" className="catalogo">
            <h2>Nuestro catálogo</h2>
            <div className="grid-productos">
                {productos.map((producto) => (
                    <div className="tarjeta-producto" key={producto.id}>
                        <img className="foto-producto" src={producto.imagen} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                        <p>{producto.descripcion}</p>
                        <span className="precio">${producto.precio} MXN</span>
                        <button className="boton boton-agregar" onClick={() => onAgregar(producto.id)}>
                            Agregar al carrito
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

// PB-06: Carrito de compras. Muestra los productos elegidos, permite cambiar cantidades y quitar piezas.
function Carrito({ items, onCambiar, onQuitar, onVaciar }) {
    // Unimos cada elemento del carrito (id + cantidad) con los datos del producto
    const lineas = items.map((it) => ({ ...productos.find((p) => p.id === it.id), cantidad: it.cantidad }));
    const total = lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0);

    return (
        <section id="carrito" className="carrito">
            <h2>Tu carrito</h2>
            {lineas.length === 0 ? (
                <p className="vacio">Todavía no agregas productos. Elige algo del catálogo.</p>
            ) : (
                <React.Fragment>
                    <ul className="lista-carrito">
                        {lineas.map((l) => (
                            <li key={l.id}>
                                <span className="linea-nombre">{l.nombre}</span>
                                <span className="cantidad">
                                    <button className="boton-mini" onClick={() => onCambiar(l.id, -1)} aria-label={"Quitar una pieza de " + l.nombre}>−</button>
                                    <strong>{l.cantidad}</strong>
                                    <button className="boton-mini" onClick={() => onCambiar(l.id, 1)} aria-label={"Agregar una pieza de " + l.nombre}>+</button>
                                </span>
                                <span className="subtotal">${l.precio * l.cantidad} MXN</span>
                                <button className="enlace-quitar" onClick={() => onQuitar(l.id)}>Quitar</button>
                            </li>
                        ))}
                    </ul>
                    <p className="total">Total: <strong>${total} MXN</strong></p>
                    <button className="boton boton-secundario" onClick={onVaciar}>Vaciar carrito</button>
                </React.Fragment>
            )}
        </section>
    );
}

// PB-07: Formulario de pedido. Valida los datos y muestra la confirmación con el resumen.
function Pedido({ items, onPedidoEnviado }) {
    const [datos, setDatos] = useState({ nombre: "", telefono: "", entrega: "recoger", direccion: "", notas: "" });
    const [errores, setErrores] = useState({});
    const [confirmacion, setConfirmacion] = useState(null);

    const lineas = items.map((it) => ({ ...productos.find((p) => p.id === it.id), cantidad: it.cantidad }));
    const subtotal = lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0);
    const envio = datos.entrega === "domicilio" && lineas.length > 0 ? COSTO_ENVIO : 0;

    // Actualiza un campo del formulario
    function cambiar(campo, valor) {
        setDatos({ ...datos, [campo]: valor });
    }

    // Revisa que los datos sean válidos antes de enviar
    function validar() {
        const e = {};
        if (datos.nombre.trim().length < 2) e.nombre = "Escribe tu nombre (mínimo 2 letras).";
        if (!/^\d{10}$/.test(datos.telefono.replace(/[\s-]/g, ""))) e.telefono = "Escribe un teléfono de 10 dígitos.";
        if (datos.entrega === "domicilio" && datos.direccion.trim().length < 5) e.direccion = "Escribe la dirección de entrega.";
        if (lineas.length === 0) e.carrito = "Agrega al menos un producto al carrito.";
        return e;
    }

    function enviar(evento) {
        evento.preventDefault(); // evita que el navegador recargue la página
        const e = validar();
        setErrores(e);
        if (Object.keys(e).length > 0) return;

        // Todavía no hay servidor: el pedido se confirma en pantalla (el envío real queda para una fase futura)
        setConfirmacion({
            folio: "PM-" + String(Date.now()).slice(-6),
            nombre: datos.nombre.trim(),
            entrega: datos.entrega,
            direccion: datos.direccion.trim(),
            lineas: lineas,
            total: subtotal + envio,
        });
        onPedidoEnviado();
        setDatos({ nombre: "", telefono: "", entrega: "recoger", direccion: "", notas: "" });
    }

    if (confirmacion) {
        return (
            <section id="pedido" className="pedido">
                <h2>¡Pedido recibido!</h2>
                <div className="confirmacion">
                    <p>Gracias, <strong>{confirmacion.nombre}</strong>. Tu folio es <strong>{confirmacion.folio}</strong>.</p>
                    <ul>
                        {confirmacion.lineas.map((l) => (
                            <li key={l.id}>{l.cantidad} × {l.nombre} — ${l.precio * l.cantidad} MXN</li>
                        ))}
                    </ul>
                    <p>
                        {confirmacion.entrega === "domicilio"
                            ? "Entrega a domicilio en: " + confirmacion.direccion
                            : "Lo recoges en la panadería."}
                    </p>
                    <p className="total">Total: <strong>${confirmacion.total} MXN</strong></p>
                    <button className="boton" onClick={() => setConfirmacion(null)}>Hacer otro pedido</button>
                </div>
            </section>
        );
    }

    return (
        <section id="pedido" className="pedido">
            <h2>Haz tu pedido</h2>
            <form onSubmit={enviar} noValidate>
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" type="text" value={datos.nombre} onChange={(e) => cambiar("nombre", e.target.value)} />
                {errores.nombre && <span className="error">{errores.nombre}</span>}

                <label htmlFor="telefono">Teléfono (10 dígitos)</label>
                <input id="telefono" type="tel" value={datos.telefono} onChange={(e) => cambiar("telefono", e.target.value)} />
                {errores.telefono && <span className="error">{errores.telefono}</span>}

                <fieldset>
                    <legend>Entrega</legend>
                    <label className="opcion">
                        <input type="radio" name="entrega" value="recoger" checked={datos.entrega === "recoger"} onChange={() => cambiar("entrega", "recoger")} />
                        Recoger en la panadería (sin costo)
                    </label>
                    <label className="opcion">
                        <input type="radio" name="entrega" value="domicilio" checked={datos.entrega === "domicilio"} onChange={() => cambiar("entrega", "domicilio")} />
                        A domicilio (+${COSTO_ENVIO} MXN)
                    </label>
                </fieldset>

                {datos.entrega === "domicilio" && (
                    <React.Fragment>
                        <label htmlFor="direccion">Dirección de entrega</label>
                        <input id="direccion" type="text" value={datos.direccion} onChange={(e) => cambiar("direccion", e.target.value)} />
                        {errores.direccion && <span className="error">{errores.direccion}</span>}
                    </React.Fragment>
                )}

                <label htmlFor="notas">Notas (opcional)</label>
                <textarea id="notas" rows="3" value={datos.notas} onChange={(e) => cambiar("notas", e.target.value)} />

                <p className="resumen">
                    Piezas: <strong>{lineas.reduce((s, l) => s + l.cantidad, 0)}</strong> ·
                    Envío: <strong>${envio} MXN</strong> ·
                    Total a pagar: <strong>${subtotal + envio} MXN</strong>
                </p>
                {errores.carrito && <span className="error">{errores.carrito}</span>}

                <button type="submit" className="boton">Enviar pedido</button>
            </form>
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
            <p>Pan y Miel · Panadería artesanal · Sprint 3 desarrollado en React</p>
        </footer>
    );
}

// Lee el carrito guardado en el navegador (para que no se pierda al recargar la página)
function leerCarritoGuardado() {
    try {
        const guardado = JSON.parse(localStorage.getItem("carritoPanYMiel"));
        return Array.isArray(guardado) ? guardado : [];
    } catch (error) {
        return [];
    }
}

// Componente principal: guarda el carrito en su estado y lo comparte con los demás componentes
function App() {
    const [items, setItems] = useState(leerCarritoGuardado); // lista de { id, cantidad }

    // Cada vez que cambia el carrito, se guarda en el navegador
    useEffect(() => {
        try { localStorage.setItem("carritoPanYMiel", JSON.stringify(items)); } catch (error) { /* si no se puede guardar, el carrito sigue funcionando */ }
    }, [items]);

    function agregar(id) {
        setItems((actual) => {
            const existe = actual.find((it) => it.id === id);
            return existe
                ? actual.map((it) => (it.id === id ? { ...it, cantidad: it.cantidad + 1 } : it))
                : [...actual, { id: id, cantidad: 1 }];
        });
    }

    // delta = +1 o -1; si la cantidad llega a 0, el producto sale del carrito
    function cambiarCantidad(id, delta) {
        setItems((actual) =>
            actual.map((it) => (it.id === id ? { ...it, cantidad: it.cantidad + delta } : it)).filter((it) => it.cantidad > 0)
        );
    }

    function quitar(id) {
        setItems((actual) => actual.filter((it) => it.id !== id));
    }

    const cantidadTotal = items.reduce((suma, it) => suma + it.cantidad, 0);

    return (
        <React.Fragment>
            <Header cantidadCarrito={cantidadTotal} />
            <Home />
            <Catalogo onAgregar={agregar} />
            <Carrito items={items} onCambiar={cambiarCantidad} onQuitar={quitar} onVaciar={() => setItems([])} />
            <Pedido items={items} onPedidoEnviado={() => setItems([])} />
            <Contacto />
            <Footer />
        </React.Fragment>
    );
}

// Montamos la aplicación dentro del <div id="root"> del index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
