import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordForm = () => {
    const { token } = useParams(); // Extraer el token de la URL
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/reset-password/${token}`, { newPassword });
            alert(response.data.message); // Mostrar mensaje de éxito
            navigate('/login')
        } catch (error) {
            alert('Hubo un error al actualizar la contraseña');
            navigate('/login')
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                />
                <button type="submit">Actualizar Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
