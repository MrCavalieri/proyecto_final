import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import "../styles/MisDeseos.css";

function MisDeseos() {
  const [favoritos, setFavoritos] = useState([]);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [carrito, setCarrito] = useState({});

  const actualizarFavoritos = () => {
    const likedProductsData =
      JSON.parse(localStorage.getItem("likedProductsData")) || {};
    const likedIds = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setFavoritos(Object.values(likedProductsData));
    setLikedProducts(new Set(likedIds));
  };

  useEffect(() => {
    actualizarFavoritos();
    const savedCarrito = JSON.parse(localStorage.getItem("carrito")) || {};
    setCarrito(savedCarrito);
    window.addEventListener("storage", actualizarFavoritos);
    return () => {
      window.removeEventListener("storage", actualizarFavoritos);
    };
  }, []);

  const handleRemoveFavorito = (productoId) => {
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    const newLikedProducts = likedProducts.filter((id) => id !== productoId);
    localStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));

    const likedProductsData =
      JSON.parse(localStorage.getItem("likedProductsData")) || {};
    delete likedProductsData[productoId];
    localStorage.setItem(
      "likedProductsData",
      JSON.stringify(likedProductsData)
    );
    setFavoritos(Object.values(likedProductsData));
    setLikedProducts(new Set(newLikedProducts));
  };

  const toggleCarrito = (productoId) => {
    setCarrito((prevCarrito) => {
      const newCarrito = { ...prevCarrito };
      if (newCarrito[productoId]) {
        delete newCarrito[productoId];
      } else {
        newCarrito[productoId] = 1;
      }
      localStorage.setItem("carrito", JSON.stringify(newCarrito));
      return newCarrito;
    });
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      const newCarrito = { ...carrito };
      delete newCarrito[productoId];
      setCarrito(newCarrito);
      localStorage.setItem("carrito", JSON.stringify(newCarrito));
    } else {
      const newCarrito = { ...carrito, [productoId]: nuevaCantidad };
      setCarrito(newCarrito);
      localStorage.setItem("carrito", JSON.stringify(newCarrito));
    }
  };

  const handleRemoveFromWishlist = (productoId) => {
    handleRemoveFavorito(productoId);
  };

  return (
    <Layout>
      <div className="misdeseos-container">
        <h1 className="misdeseos-title">Mis Productos Favoritos</h1>

        <div className="misdeseos-grid">
          {favoritos.length > 0 ? (
            favoritos.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                carrito={carrito}
                likedProducts={likedProducts}
                onToggleCarrito={toggleCarrito}
                onUpdateCantidad={actualizarCantidad}
                handleRemoveFavorito={handleRemoveFavorito}
              />
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
