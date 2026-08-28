import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    // 2. ESTADOS (A memória do porteiro)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 3. FUNÇÃO PARA CAPTURAR DIGITAÇÃO
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // FUNÇÃO: Validar email
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // FUNÇÃO: Validar senha (mínimo 6 caracteres)
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // VALIDAÇÕES EM TEMPO REAL
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);
    
    // Botão só habilita se tudo for válido
    const formIsValid = emailValid && passwordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // VALIDANDO ANTES DE ENVIAR
        if (!emailValid) {
            setError('Digite um email válido.');
            setLoading(false);
            return;
        }

        if (!passwordValid) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/login`,
                formData
            );

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/home');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">「 Login 」</h1>

                {/* Se existir erro, mostra a mensagem */}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    {/* CAMPO: Email */}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="seu@email.com"
                            autocomplete="email"
                        />
                        {/* Validação em tempo real */}
                        <span className={`validation-message ${emailValid ? 'valid' : 'invalid'}`}>
                            {emailValid 
                                ? '✅ Email válido' 
                                : '❌ Digite um email válido'}
                        </span>
                    </div>

                    {/* CAMPO: Senha */}
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='**********'
                            autocomplete="current-password"
                        />
                        {/* Validação em tempo real */}
                        <span className={`validation-message ${passwordValid ? 'valid' : 'invalid'}`}>
                            {passwordValid 
                                ? '✅ Senha válida' 
                                : '❌ Mínimo 6 caracteres'}
                        </span>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || !formIsValid}  // ← Desabilita se inválido
                        className="login-btn"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                {/* Link para registro */}
                <p className="register-link">
                    Não tem conta? <Link to="/register">Crie uma</Link>
                </p>

                {/* Link para esqueci minha senha */}
                <p className="register-link">
                    <Link to="/forgot-password">Esqueci minha senha?</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;