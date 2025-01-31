import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCartShopping,
  faMinusCircle,
  faPlusCircle,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/MisDeseos.css";

function MisDeseos() {
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState({});

  useEffect(() => {
    // Cargar productos favoritos del localStorage
    const likedProductsData =
      JSON.parse(localStorage.getItem("likedProductsData")) || {};
    setFavoritos(Object.values(likedProductsData));
  }, []);

  const handleRemoveFavorito = (productoId) => {
    // Actualizar likedProducts
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    const newLikedProducts = likedProducts.filter((id) => id !== productoId);
    localStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));

    // Actualizar likedProductsData
    const likedProductsData =
      JSON.parse(localStorage.getItem("likedProductsData")) || {};
    delete likedProductsData[productoId];
    localStorage.setItem(
      "likedProductsData",
      JSON.stringify(likedProductsData)
    );

    // Actualizar estado
    setFavoritos(Object.values(likedProductsData));
  };

  const toggleCarrito = (productoId) => {
    if (carrito[productoId]) {
      const nuevoCarrito = { ...carrito };
      delete nuevoCarrito[productoId];
      setCarrito(nuevoCarrito);
    } else {
      setCarrito({ ...carrito, [productoId]: 1 });
    }
  };

  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad < 1) {
      const nuevoCarrito = { ...carrito };
      delete nuevoCarrito[productoId];
      setCarrito(nuevoCarrito);
      return;
    }
    setCarrito({ ...carrito, [productoId]: cantidad });
  };

  return (
    <Layout>
      <div className="misdeseos-container">
        <h1 className="misdeseos-title">Mis Productos Favoritos</h1>

        <div className="misdeseos-grid">
          {favoritos.length > 0 ? (
            favoritos.map((producto) => (
              <div key={producto.id} className="producto-card">
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p className="precio">${producto.precio.toLocaleString()}</p>

                {carrito[producto.id] && (
                  <div className="carrito-controles">
                    <button
                      className="cantidad-btn"
                      onClick={() =>
                        actualizarCantidad(
                          producto.id,
                          carrito[producto.id] - 1
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </button>
                    <span className="cantidad">{carrito[producto.id]}</span>
                    <button
                      className="cantidad-btn"
                      onClick={() =>
                        actualizarCantidad(
                          producto.id,
                          carrito[producto.id] + 1
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                  </div>
                )}

                <div className="producto-actions">
                  <button
                    className={`carrito-btn ${
                      carrito[producto.id] ? "en-carrito" : ""
                    }`}
                    onClick={() => toggleCarrito(producto.id)}
                  >
                    <FontAwesomeIcon
                      icon={carrito[producto.id] ? faCartShopping : faCartPlus}
                    />
                    {carrito[producto.id]
                      ? " Quitar del carrito"
                      : " Agregar al carrito"}
                  </button>
                  <div className="like-container">
                    <button
                      className="like-btn"
                      onClick={() => handleRemoveFavorito(producto.id)}
                    >
                      <FontAwesomeIcon icon={fasHeart} className="icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-message">
              No tienes productos favoritos aún
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MisDeseos;
