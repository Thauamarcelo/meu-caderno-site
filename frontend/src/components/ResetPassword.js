import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const ResetPassword = () => {
    const { token } = useParams();  // Pega o token da URL
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`,
                { password }
            );
            
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 3000);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Erro ao redefinir senha.');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">「 Nova Senha 」</h1>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="password">Nova senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            placeholder="**********"
                            autocomplete="new-password"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmar nova senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength="6"
                            placeholder="**********"
                            autocomplete="new-password"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="login-btn">
                        {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                    </button>
                </form>

                <p className="register-link">
                    <Link to="/login">← Voltar para o login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;