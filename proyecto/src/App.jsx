import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Perfil from "./pages/Perfil";
import MisCompras from "./pages/MisCompras";
import Carrito from "./pages/Carrito";
import MisDeseos from "./pages/MisDeseos";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import ProductManagement from "./pages/ProductManagement";
import UpdateProduct from "./pages/UpdateProduct";
import CreateProduct from "./pages/CreateProduct";
import UserManagement from "./pages/UserManagement";
import axios from "./config/axios";
import { CartProvider } from "./context/CartContext"; // Importación del CartContext
import CreatePassword from "./pages/CreatePassword";

// Componente para rutas protegidas
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/auth/verify");
        setIsAuthenticated(response.data.authenticated);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Añadimos la validación de PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Rutas privadas */}
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-password/:id"
            element={
              <PrivateRoute>
                <CreatePassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/mis-compras"
            element={
              <PrivateRoute>
                <MisCompras />
              </PrivateRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Carrito />
              </PrivateRoute>
            }
          />
          <Route
            path="/mis-deseos"
            element={
              <PrivateRoute>
                <MisDeseos />
              </PrivateRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <PrivateRoute>
                <ResetPasswordForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/gestion-productos"
            element={
              <PrivateRoute>
                <ProductManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-product"
            element={
              <PrivateRoute>
                <UpdateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-product"
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/control-usuarios"
            element={
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            }
          />
          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
