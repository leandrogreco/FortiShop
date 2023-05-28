import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CarritoContext } from '../CartContext/CartContext'
import { useContext } from 'react'

const ItemDetail = ({ id, nombre, precio, img, stock, desc, sku }) => {

    const [agregarCantidad, setAgregarCantidad] = useState(0);

    const { agregarProducto } = useContext(CarritoContext);

    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);

        const item = { id, nombre, precio, stock, desc, sku };
        agregarProducto(item, cantidad);
    }
    return (
        <div className='contenedorItem'>
            <div >
                <img className='imgCant' src={img} alt={nombre} />
            </div>
            <div className='descripcion'>
                <h2 className='descNombre'>{nombre} </h2>
                <h3 className='descPrecio'>Precio: USD {precio} </h3>
                <h3 className='descSku'> SKU: {sku} </h3>
                <p className='desc'>Descripcion: {desc}</p>
                <h3 className='descStock'>Stock: {stock}</h3>
                <div className='buttonsDet'>
                    {
                        agregarCantidad > 0 ? (<Link to="/cart"> Terminar compra </Link>) : (<ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;