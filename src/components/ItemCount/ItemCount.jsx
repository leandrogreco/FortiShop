import './ItemCount.css'
import {useState} from 'react';

const ItemCount = ({inicial, stock, funcionAgregar}) => {
    const [contador, setContador] = useState(inicial);

    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }
    return (
        <>        
            < div className = "itemContador" >
                <button className = "itemMod" onClick={decrementar}>
                -
                </button>
                <p
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        color:'black',
                    }}>
                    {contador}
                </p>
                <button className = "itemMod" onClick={incrementar}>
                +
                </button>
                <button className = "agregarAlCar" onClick={() => funcionAgregar(contador)}><b>Agregar</b></button>
            </div>
        </>
    )
}

export default ItemCount;
