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
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
        const response = await axios.get("/auth/verify");
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUserData(null);
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button">
          <span className="icon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <span>Buscar</span>
        </button>
      </div>
      <nav className="nav-links">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-button login-button">
              <span className="icon">
                <FontAwesomeIcon icon={faSignInAlt} />
              </span>
              <span>Iniciar Sesión</span>
            </Link>
            <Link to="/register" className="nav-button register-button">
              <span className="icon">
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              <span>Registrarse</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/perfil" className="nav-button">
              <span className="icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>Mi Perfil</span>
            </Link>
            <Link to="/mis-deseos" className="nav-button">
              <span className="icon">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <span>Mis Deseos</span>
            </Link>
            <Link to="/mis-compras" className="nav-button">
              <span className="icon">
                <FontAwesomeIcon icon={faShoppingBag} />
              </span>
              <span>Mis Compras</span>
            </Link>
            <Link to="/carrito" className="nav-button">
              <span className="icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
              <span>Carrito</span>
            </Link>
            <button onClick={handleLogout} className="nav-button logout-button">
              <span className="icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              <span>Cerrar Sesión</span>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
