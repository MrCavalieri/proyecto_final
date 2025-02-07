import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import CompraPopup from "../components/CompraPopup"; // Importamos el popup
import "../styles/Carrito.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarProducto,
    calcularTotal,
    finalizarCompra,
  } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log("Carrito actualizado:", carrito);
  }, [carrito]);

  const productosCarrito = Object.values(carrito).filter(
    (producto) =>
      producto &&
      producto.id &&
      producto.nombre &&
      producto.precio !== undefined &&
      producto.imagen
  );

  const handleFinalizarCompra = () => {
    finalizarCompra();
    setShowPopup(true);
  };

  return (
    <Layout>
      <div className="carrito-container">
        <h1 className="carrito-title">Carrito de Compras</h1>

        {productosCarrito.length > 0 ? (
          <div className="carrito-grid">
            {productosCarrito.map((producto) => (
              <div key={producto.id} className="carrito-item">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="carrito-img"
                />
                <div className="carrito-info">
                  <h3>{producto.nombre}</h3>
                  <p className="precio">${producto.precio.toLocaleString()}</p>
                  <div className="carrito-controles">
                    <button
                      className="cantidad-btn"
                      onClick={() =>
                        actualizarCantidad(producto.id, producto.cantidad - 1)
                      }
                      disabled={producto.cantidad <= 1}
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </button>
                    <span className="cantidad">{producto.cantidad}</span>
                    <button
                      className="cantidad-btn"
                      onClick={() =>
                        actualizarCantidad(producto.id, producto.cantidad + 1)
                      }
                    >
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                  </div>
                </div>
                <button
                  className="eliminar-btn"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-message">Tu carrito está vacío</div>
        )}

        <div className="carrito-total">
          <h2>Total: ${calcularTotal().toLocaleString()}</h2>
        </div>
        {productosCarrito.length > 0 && (
          <button
            className="button finalizar-compra"
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </button>
        )}
        {showPopup && <CompraPopup onClose={() => setShowPopup(false)} />}
      </div>
    </Layout>
  );
}

export default Carrito;
