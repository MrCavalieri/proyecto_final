import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserManagement.css";
import Layout from "../components/Layout";

const API_URL = "https://tudominio.com/api/users"; // Agrega la URL correcta de la API

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Estado inicial como array vacío
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Cargar usuarios desde la API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log("Respuesta de la API:", response.data); // Debug
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("La API no devolvió un array:", response.data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error al cargar los usuarios:", error);
        setError("Error al obtener usuarios");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Cambiar estado activo/inactivo del usuario
  const toggleActiveStatus = async (id, currentStatus) => {
    try {
      const updatedUser = { active: !currentStatus };
      await axios.patch(`${API_URL}/${id}`, updatedUser);

      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  };

  // 🔹 Mostrar productos favoritos en modal
  const showLikedProducts = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <Layout>
      <div className="user-management">
        <h2>Gestión de Usuarios</h2>

        {/* 🔹 Mostrar mensaje de carga o error */}
        {loading ? <p>Cargando usuarios...</p> : null}
        {error ? <p className="error">{error}</p> : null}

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Inversión</th>
              <th>Última Compra</th>
              <th>Estado</th>
              <th colSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users && Array.isArray(users) ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>${user.investment?.toLocaleString() || "0"}</td>
                  <td>{user.lastPurchase || "No disponible"}</td>
                  <td className={user.active ? "active" : "inactive"}>
                    {user.active ? "Activo" : "Inactivo"}
                  </td>
                  <td>
                    <button
                      className="toggle-btn"
                      onClick={() => toggleActiveStatus(user.id, user.active)}
                    >
                      {user.active ? "Deshabilitar" : "Habilitar"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => showLikedProducts(user)}
                    >
                      Ver Favoritos
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay usuarios disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal de productos favoritos */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Productos Favoritos de {selectedUser.name}</h3>
            <ul className="modal-list">
              {Array.isArray(selectedUser.likedProducts) &&
              selectedUser.likedProducts.length > 0 ? (
                selectedUser.likedProducts.map((product, index) => (
                  <li key={index} className="modal-list-item">
                    {product}
                  </li>
                ))
              ) : (
                <li className="modal-list-item">No hay productos favoritos.</li>
              )}
            </ul>
            <button className="close-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserManagement;
