import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/MisCompras.css";

function MisCompras() {
  const [historialCompras, setHistorialCompras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const comprasPorPagina = 10;

  useEffect(() => {
    const compras = JSON.parse(localStorage.getItem("historialCompras")) || [];
    setHistorialCompras(compras.reverse()); // Mostramos las compras más recientes primero
  }, []);

  const indexOfLastCompra = currentPage * comprasPorPagina;
  const indexOfFirstCompra = indexOfLastCompra - comprasPorPagina;
  const comprasActuales = historialCompras.slice(
    indexOfFirstCompra,
    indexOfLastCompra
  );

  const totalPages = Math.ceil(historialCompras.length / comprasPorPagina);

  return (
    <Layout>
      <div className="mis-compras-container">
        <h1 className="mis-compras-title">Mis Compras</h1>

        {historialCompras.length === 0 ? (
          <p className="empty-message">No tienes compras registradas.</p>
        ) : (
          <>
            <div className="compras-grid">
              {comprasActuales.map((compra, index) => (
                <div key={index} className="compra-card">
                  <h3>Compra realizada el {compra.fecha}</h3>
                  <p>Total: ${compra.total.toLocaleString()}</p>
                  <ul className="productos-list">
                    {Object.values(compra.productos).map((producto) => (
                      <li key={producto.id}>
                        {producto.nombre} - ${producto.precio.toLocaleString()}{" "}
                        x {producto.cantidad}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default MisCompras;
