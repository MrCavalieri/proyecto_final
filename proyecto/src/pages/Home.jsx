import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductCarousel from "../components/ProductCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const itemsPerPage = 12;
  const totalPages = Math.ceil(productos.length / itemsPerPage);
  const { carrito, toggleCarrito } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(productos);

  useEffect(() => {
    const handleStorageChange = () => {
      setSearchQuery(localStorage.getItem("searchQuery") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    // Aplicar filtro inicial si hay una búsqueda guardada
    const savedQuery = localStorage.getItem("searchQuery");
    if (savedQuery) {
      const searchEvent = new CustomEvent("onSearch", {
        detail: { query: savedQuery },
      });
      window.dispatchEvent(searchEvent);
    }

    const handleSearch = (event) => {
      const query = event.detail.query.toLowerCase();
      if (query === "") {
        setFilteredProducts(productos);
      } else {
        const filtered = productos.filter(
          (product) =>
            product.nombre.toLowerCase().includes(query) ||
            product.nombre.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
      }
    };

    window.addEventListener("onSearch", handleSearch);

    return () => {
      window.removeEventListener("onSearch", handleSearch);
    };
  }, [productos]);

  const getCurrentProducts = () => {
    return filteredProducts
      .map((producto) => ({
        ...producto,
        cantidad: carrito[producto.id]?.cantidad || 0,
      }))
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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

  return (
    <Layout setSearchQuery={setSearchQuery}>
      <h2 className="featured-title">Productos Destacados</h2>
      <ProductCarousel />

      <section className="productos-section">
        <h2 className="section-title">Nuestros Productos</h2>
        <div className="productos-grid">
          {getCurrentProducts().map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              carrito={carrito}
              onToggleCarrito={toggleCarrito}
            />
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
