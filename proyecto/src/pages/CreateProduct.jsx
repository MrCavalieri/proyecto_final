import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateProduct.css";
import Layout from "../components/Layout";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("stock", formData.stock);
    formDataToSubmit.append("image", formData.image);

    axios
      .post("/products", formDataToSubmit)
      .then(() => {
        navigate("/product-management");
      })
      .catch(() => {
        setError("Error al guardar el producto");
      });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });
    setImagePreview(null);
  };

  return (
    <Layout>
      <div className="create-product-section">
        <h2 className="section-title">Crear Producto</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-container">
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nombre del Producto"
              />
            </div>

            <div className="form-group">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Descripción del Producto"
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Precio del Producto"
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                placeholder="Stock del Producto"
              />
            </div>

            <div className="form-group">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="image">Imagen del Producto</label>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Vista previa" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Guardar Producto
              </button>
              <button type="button" onClick={handleReset} className="reset-btn">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
