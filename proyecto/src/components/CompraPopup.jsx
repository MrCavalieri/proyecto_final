import PropTypes from "prop-types";
import "../styles/CompraPopup.css";

function CompraPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>¡Compra realizada con éxito!</h2>
        <p>Tu compra ha sido procesada correctamente.</p>
        <button className="button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

CompraPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CompraPopup;
