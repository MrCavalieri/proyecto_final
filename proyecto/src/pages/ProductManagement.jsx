import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/product-management.css";
import Layout from "../components/Layout";

const ProductManagement = () => {
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProductList(response.data);
          setError(null);
        } else {
          setError("Sin productos disponibles");
        }
      })
      .catch((err) => {
        setError("Servidor fuera de línea");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateStock = (index, action) => {
    const updatedProducts = [...productList];
    if (action === "add") {
      updatedProducts[index].stock += 1;
    } else if (action === "subtract" && updatedProducts[index].stock > 0) {
      updatedProducts[index].stock -= 1;
    }

    setProductList(updatedProducts);

    const productToUpdate = updatedProducts[index];
    axios
      .put(`/products/${productToUpdate.id}`, {
        stock: productToUpdate.stock,
      })
      .then((response) => {
        console.log("Stock actualizado en la base de datos:", response.data);
      })
      .catch((error) => {
        console.error("Error actualizando el stock:", error);
        setError("No se pudo actualizar el stock en la base de datos");
      });
  };

  const handleEdit = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  return (
    <Layout>
      <div className="productos-section">
        <h2 className="section-title">Gestión de Productos</h2>

        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="productos-list">
            {productList.length > 0 ? (
              productList.map((product, index) => (
                <div key={index} className="producto-item">
                  <div className="producto-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="producto-image"
                    />
                  </div>
                  <div className="producto-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="stock-info">
                    <span>Stock actual: {product.stock}</span>
                  </div>
                  <div className="stock-actions">
                    <button
                      className="pagination-btn"
                      onClick={() => updateStock(index, "add")}
                    >
                      Agregar
                    </button>
                    <button
                      className="pagination-btn"
                      onClick={() => updateStock(index, "subtract")}
                      disabled={product.stock === 0}
                    >
                      Quitar
                    </button>
                    <button
                      className="pagination-btn"
                      onClick={() => handleEdit(product.id)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Sin productos disponibles</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductManagement;
