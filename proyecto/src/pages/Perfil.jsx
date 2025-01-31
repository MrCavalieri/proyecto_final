import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "../config/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Perfil.css";

function Perfil() {
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/user/profile");
        setUserData(response.data);
        setTempData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(userData);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("/user/profile", tempData);
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar datos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <div className="perfil-container">
        <h1 className="perfil-title">Mi Perfil</h1>

        <div className="perfil-form">
          <div className="form-group">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={isEditing ? tempData.nombre : userData.nombre}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder=" "
            />
            <label htmlFor="nombre">Nombre</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              id="correo"
              name="correo"
              value={isEditing ? tempData.correo : userData.correo}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder=" "
            />
            <label htmlFor="correo">Correo Electrónico</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={isEditing ? tempData.direccion : userData.direccion}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder=" "
            />
            <label htmlFor="direccion">Dirección</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={isEditing ? tempData.ciudad : userData.ciudad}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder=" "
            />
            <label htmlFor="ciudad">Ciudad</label>
          </div>

          <div className="form-group">
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={isEditing ? tempData.telefono : userData.telefono}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder=" "
            />
            <label htmlFor="telefono">Teléfono</label>
          </div>

          <div className="perfil-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={handleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} /> Actualizar Datos
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} /> Guardar
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <FontAwesomeIcon icon={faTimes} /> Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Perfil;
