import './Card.css'
function Card({ imagen, nombre, marca, precio, disponible, detalle, cantidad }) {

    return (
        <div className="container">
            <div className="images">
                <img src={imagen} />
            </div>
            <div className="product">
                <p>Marca: {marca}</p>
                <h1>{nombre}</h1>
                <h2>Precio: ${precio}</h2>
                <h2>Cantidad {cantidad}</h2>
                <p className="desc">Detalles: {detalle}</p>
                <div className="buttons">
                    <button className="add">Añadir al carrito 🛒</button>
                </div>
            </div>

        </div>
    )
}


export default Card
