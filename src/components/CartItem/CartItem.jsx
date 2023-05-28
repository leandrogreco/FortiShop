import { useContext } from "react";
import { CarritoContext } from "../CartContext/CartContext";
import './CartItem.css'


const CartItem = ({item, cantidad}) => {
    const { eliminarProducto } = useContext(CarritoContext);
    return (
    <div className="cartItem">
        <div className="cartDet"><b>SKU: </b>{item.sku} </div>
        <h4 className="cartDet"> {item.nombre} </h4>
        <div className="cartDet"><b>Cantidad: </b>{cantidad} </div>
        <div className="cartDetPre"><b>Precio:</b> USD {item.precio}</div>
        <div className="cartDetPre"><b>Subtotal:</b> USD {(item.precio*cantidad)}</div>
        <button className="cartDetBot" style={{fontWeight:"bold"}} onClick={() => eliminarProducto(item.id)}>Eliminar</button>
    </div>
    )
}

export default CartItem;