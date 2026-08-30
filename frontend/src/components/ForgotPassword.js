import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
                { email }
            );
            
            setMessage(response.data.message);
            
            if (response.data.resetToken) {
                setResetToken(response.data.resetToken);
            }
        }
        catch (err) {
            setMessage('Erro ao solicitar redefinição. Tente novamente.');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">「 Redefinir Senha 」</h1>

                {message && <div className="success-message">{message}</div>}

                {resetToken && (
                    <div className="reset-link-box">
                        <p>Link de redefinição (desenvolvimento):</p>
                        <Link to={`/reset-password/${resetToken}`}>
                            Clique aqui para redefinir sua senha
                        </Link>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email cadastrado</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="seu@email.com"
                            autocomplete="email"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="login-btn">
                        {loading ? 'Enviando...' : 'Enviar link de redefinição'}
                    </button>
                </form>

                <p className="register-link">
                    <Link to="/login">← Voltar para o login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;