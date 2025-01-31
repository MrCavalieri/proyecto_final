import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de recuperación de contraseña
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      
      <div className="auth-form-container">
        <h2>Recuperar Contraseña</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>

          <button type="submit" className="button submit-button">
            Enviar instrucciones
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="link">Volver a inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword