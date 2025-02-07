import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import "../styles/NavBar.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faUser,
  faShoppingBag,
  faShoppingCart,
  faSignOutAlt,
  faSearch,
  faHeart,
  faUsers,
  faBoxes,
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);

    // Emitir evento de búsqueda en tiempo real si está en Home o la página raíz
    if (currentPath === "/home" || currentPath === "/") {
      const searchEvent = new CustomEvent("onSearch", {
        detail: { query: searchQuery },
      });
      window.dispatchEvent(searchEvent);
    }
  }, [searchQuery, currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/auth/verify", {
          withCredentials: true,
        });
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUserRole(response.data.user.rol); // Extraer el rol del backend
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error("❌ Error al verificar autenticación:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuthStatus();
  }, []);

  const handleSearch = () => {
    localStorage.setItem("searchQuery", searchQuery);
    if (currentPath !== "/home" && currentPath !== "/") {
      navigate("/home");
      const searchEvent = new CustomEvent("onSearch", {
        detail: { query: searchQuery },
      });
      window.dispatchEvent(searchEvent);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    localStorage.removeItem("searchQuery");
    const clearEvent = new CustomEvent("onSearch", {
      detail: { query: "" },
    });
    window.dispatchEvent(clearEvent);
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    if (newValue === "") {
      clearSearch();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUserRole(null);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className={`nav-header ${isScrolled ? "scrolled" : ""}`}>
      <div>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          className="search-input"
        />
        {currentPath !== "/home" && currentPath !== "/" && (
          <button className="search-button" onClick={handleSearch}>
            <span className="icon">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <span>Buscar</span>
          </button>
        )}
      </div>

      {/* Opciones de navegación */}
      <nav className="nav-links">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-button login-button">
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Iniciar Sesión</span>
            </Link>
            <Link to="/register" className="nav-button register-button">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Registrarse</span>
            </Link>
          </>
        ) : userRole === "admin" ? (
          <>
            <Link to="/gestion-usuarios" className="nav-button">
              <FontAwesomeIcon icon={faUsers} />
              <span>Gestión de Usuarios</span>
            </Link>
            <Link to="/gestion-productos" className="nav-button">
              <FontAwesomeIcon icon={faBoxes} />
              <span>Gestión de Productos</span>
            </Link>
            <button onClick={handleLogout} className="nav-button logout-button">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Cerrar Sesión</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/perfil" className="nav-button">
              <FontAwesomeIcon icon={faUser} />
              <span>Mi Perfil</span>
            </Link>
            <Link to="/mis-deseos" className="nav-button">
              <FontAwesomeIcon icon={faHeart} />
              <span>Mis Deseos</span>
            </Link>
            <Link to="/mis-compras" className="nav-button">
              <FontAwesomeIcon icon={faShoppingBag} />
              <span>Mis Compras</span>
            </Link>
            <Link to="/carrito" className="nav-button">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Carrito</span>
            </Link>
            <button onClick={handleLogout} className="nav-button logout-button">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Cerrar Sesión</span>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
