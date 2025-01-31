import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductCarousel from "../components/ProductCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCartShopping,
  faMinusCircle,
  faPlusCircle,
  faChevronLeft,
  faChevronRight,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "../styles/Home.css";

// Productos de ejemplo
const productos = [
  {
    id: 1,
    nombre: "Smartphone Premium X",
    precio: 899990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 2,
    nombre: "Laptop Ultra Pro",
    precio: 1299990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 3,
    nombre: "Consola Gaming Plus",
    precio: 599990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 4,
    nombre: "Auriculares Pro Max",
    precio: 249990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 5,
    nombre: "Tablet Elite 2023",
    precio: 349990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 6,
    nombre: "Monitor Gaming 4K",
    precio: 1099990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 7,
    nombre: "Smartwatch Series X",
    precio: 499990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 8,
    nombre: "Cámara Pro 4K",
    precio: 449990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 9,
    nombre: "Teclado Mecánico RGB",
    precio: 299990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 10,
    nombre: "Mouse Gaming Pro",
    precio: 399990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 11,
    nombre: "Drone 4K Plus",
    precio: 749990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 12,
    nombre: "Altavoces Bluetooth Pro",
    precio: 199990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 13,
    nombre: "Micrófono Streaming",
    precio: 149990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 14,
    nombre: "Webcam 4K Ultra",
    precio: 129990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 15,
    nombre: "Router Gaming Pro",
    precio: 159990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 16,
    nombre: "SSD 2TB Ultra",
    precio: 299990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 17,
    nombre: "Tarjeta Gráfica RTX",
    precio: 899990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 18,
    nombre: "Procesador Elite",
    precio: 549990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 19,
    nombre: "Memoria RAM Pro",
    precio: 199990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 20,
    nombre: "Placa Base Gaming",
    precio: 399990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 21,
    nombre: "Gabinete RGB Plus",
    precio: 149990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 22,
    nombre: "Fuente 850W Gold",
    precio: 129990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 23,
    nombre: "Refrigeración Líquida",
    precio: 199990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
  {
    id: 24,
    nombre: "Kit Ventiladores RGB",
    precio: 89990,
    imagen: "https://via.placeholder.com/300x300?text=Producto",
  },
];

function Home() {
  const [carrito, setCarrito] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const itemsPerPage = 12;
  const totalPages = Math.ceil(productos.length / itemsPerPage);

  // Cargar likes guardados al iniciar, se debe cambiar para cargar desde BD
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(new Set(savedLikes));
  }, []);

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

  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productos.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const maxPages = 10;
    let pages = [];

    if (totalPages <= maxPages) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const leftOffset = Math.max(0, currentPage - Math.floor(maxPages / 2));
      const startPage = Math.max(1, leftOffset);

      pages = Array.from({ length: maxPages }, (_, i) => startPage + i).filter(
        (page) => page <= totalPages
      );
    }

    return pages;
  };

  const handleLike = (producto) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(producto.id)) {
        newSet.delete(producto.id);
      } else {
        newSet.add(producto.id);
      }

      // Guardar IDs en localStorage, se debe cambiar para usar BD
      localStorage.setItem("likedProducts", JSON.stringify([...newSet]));

      // Guardar datos completos de productos, también se requiere cambiar
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
    <Layout>
      <h2 className="featured-title">Productos Destacados</h2>
      <ProductCarousel />

      <section className="productos-section">
        <h2 className="section-title">Nuestros Productos</h2>
        <div className="productos-grid">
          {getCurrentProducts().map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p className="precio">${producto.precio.toLocaleString()}</p>

              {carrito[producto.id] ? (
                <div className="carrito-controles">
                  <button
                    className="cantidad-btn"
                    onClick={() =>
                      actualizarCantidad(producto.id, carrito[producto.id] - 1)
                    }
                  >
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </button>
                  <span className="cantidad">{carrito[producto.id]}</span>
                  <button
                    className="cantidad-btn"
                    onClick={() =>
                      actualizarCantidad(producto.id, carrito[producto.id] + 1)
                    }
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </div>
              ) : null}

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
                    onClick={() => handleLike(producto)}
                  >
                    <FontAwesomeIcon
                      icon={
                        likedProducts.has(producto.id) ? fasHeart : farHeart
                      }
                      className="icon"
                    />
                  </button>
                  <span className="likes-count">
                    {likedProducts.has(producto.id) ? 1 : 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={`pagination-btn ${
                pageNum === currentPage ? "active" : ""
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
