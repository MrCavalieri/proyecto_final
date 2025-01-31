import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDesktop,
  faMicrochip,
  faTelevision,
  faKeyboard,
  faHeadphones,
  faCode,
  faPuzzlePiece,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav className="sidebar-links">
        <Link to="/home" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faHome} />
          </span>
          <span className={collapsed ? "hidden" : ""}>Tienda</span>
        </Link>
        <Link to="/home/pcs" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faDesktop} />
          </span>
          <span className={collapsed ? "hidden" : ""}>PCs</span>
        </Link>
        <Link to="/home/cpus" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faMicrochip} />
          </span>
          <span className={collapsed ? "hidden" : ""}>CPUs</span>
        </Link>
        <Link to="/home/monitores" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faTelevision} />
          </span>
          <span className={collapsed ? "hidden" : ""}>Monitores</span>
        </Link>
        <Link to="/home/perifericos" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faKeyboard} />
          </span>
          <span className={collapsed ? "hidden" : ""}>Periféricos</span>
        </Link>
        <Link to="/home/audio" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faHeadphones} />
          </span>
          <span className={collapsed ? "hidden" : ""}>Audio</span>
        </Link>
        <Link to="/home/softwares" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faCode} />
          </span>
          <span className={collapsed ? "hidden" : ""}>Softwares</span>
        </Link>
        <Link to="/home/accesorios" className="sidebar-item">
          <span className="icon">
            <FontAwesomeIcon icon={faPuzzlePiece} />
          </span>
          <span className={collapsed ? "hidden" : ""}>Accesorios</span>
        </Link>
      </nav>
      <button
        className="toggle-button"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
