import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCartShopping,
  faMinusCircle,
  faPlusCircle,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "../styles/ProductCard.css";

function ProductCard({ producto, onRemoveFromWishlist }) {
  const { carrito, toggleCarrito, actualizarCantidad } = useCart();
  const [likedProducts, setLikedProducts] = useState(new Set());

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(new Set(savedLikes));
  }, []);

  const handleLike = (producto) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(producto.id)) {
        newSet.delete(producto.id);
        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(producto.id);
        }
      } else {
        newSet.add(producto.id);
      }

      localStorage.setItem("likedProducts", JSON.stringify([...newSet]));

      const likedProductsData =
        JSON.parse(localStorage.getItem("likedProductsData")) || {};
      if (newSet.has(producto.id)) {
        likedProductsData[producto.id] = producto;
      } else {
        delete likedProductsData[producto.id];
      }
      localStorage.setItem(
        "likedProductsData",
        JSON.stringify(likedProductsData)
      );

      return newSet;
    });
  };

  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p className="precio">${producto.precio.toLocaleString()}</p>

      {carrito[producto.id] ? (
        <div className="carrito-controles">
          <button
            className="cantidad-btn"
            onClick={() =>
              actualizarCantidad(
                producto.id,
                carrito[producto.id]?.cantidad - 1 || 1
              )
            }
            disabled={carrito[producto.id]?.cantidad <= 1}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
          <span className="cantidad">
            {carrito[producto.id]?.cantidad || 0}
          </span>
          <button
            className="cantidad-btn"
            onClick={() =>
              actualizarCantidad(
                producto.id,
                (carrito[producto.id]?.cantidad || 0) + 1
              )
            }
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </div>
      ) : null}

      <div className="producto-actions">
        <button
          className={`carrito-btn ${carrito[producto.id] ? "en-carrito" : ""}`}
          onClick={() => toggleCarrito(producto)}
        >
          <FontAwesomeIcon
            icon={carrito[producto.id] ? faCartShopping : faCartPlus}
          />
          {carrito[producto.id] ? " Quitar del carrito" : " Agregar al carrito"}
        </button>
        <div className="like-container">
          <button className="like-btn" onClick={() => handleLike(producto)}>
            <FontAwesomeIcon
              icon={likedProducts.has(producto.id) ? fasHeart : farHeart}
              className="icon"
            />
          </button>
          <span className="likes-count">
            {likedProducts.has(producto.id) ? 1 : 0}
          </span>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveFromWishlist: PropTypes.func,
};

export default ProductCard;
