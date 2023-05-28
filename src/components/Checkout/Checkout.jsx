import { useState, useContext } from "react";
import { CarritoContext } from "../CartContext/CartContext";
import { db } from "../../Services/firebase/config";
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore'
import './Checkout.css'

const Checkout = () => {
    const { carrito, vaciarCarrito } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");

    const discountStock = (err, id, stock, sellItems) => {
        if (err === "") {
            const productOut = doc(db, "productos", id)
            updateDoc(productOut, {
                stock: stock - sellItems,
            })
        }
    return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (carrito.length === 0 || !nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor complete todos los campos.");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los campos de correo electrónico no coinciden.");
            return;
        }

        const date = new Date()

        const orden = {
            items: carrito.map((producto) => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
            })),
            total: carrito.reduce(
                (total, producto) => total + producto.item.precio * producto.cantidad,
                0
            ),
            nombre,
            apellido,
            telefono,
            email,
            date,
        };

        addDoc(collection(db, "ordenes"), orden)
            .then((docRef) => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch((error) => {
                console.error("Error al crear la orden: ", error);
                setError(
                    "Se produjo un error al crear la orden. Por favor, inténtelo de nuevo."
                );
            });

            carrito.map((e) => (
                discountStock(error, e.item.id, e.item.stock, e.cantidad)
                    ))
        
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setEmailConfirmacion("");
    setError("");
    }

    return (
        <div>
            <h2 className="Checkout">Checkout</h2>
            <form className="formulario"onSubmit={handleSubmit}>
                <div className="formularioSect">
                    <label>Nombre:</label>
                    <input className= "input" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    <label>Apellido:</label>
                    <input className= "input" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    <label>Telefono:</label>
                    <input className= "input" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    <label>Mail:</label>
                    <input className= "input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Confirmacion de mail:</label>
                    <input className= "input" type="text" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                    <button className="buttonFin" type="submit" style={{width:"90%"}}>Finalizar compra</button>
                </div>
                </form>
                <div className="displays">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {ordenId && <p>¡Gracias por tu compra! Tu número de orden es <b>{ordenId}</b>.</p>}
                </div>
        </div>
    )
}

export default Checkout;