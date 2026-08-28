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
    // formData: Objeto que guarda o que o usuário digitou.
    // setFormData: Função que atualiza esse objeto.
    // useState(''): Valor inicial vazio.

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);

            localStorage.setItem('token', response.data.token);
            
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/home');
        }
        catch (err) {
            setError(
                err.response?.data?.message ||
                'Erro ao fazer login'
            );
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
                        />
                    </div>

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
                    </div>

                    <button type="submit" disabled={loading} className="login-btn">
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                {/* ADICIONE ESTE BLOCO: Link para registro */}
                <p className="register-link">
                    Não tem conta? <Link to="/register">Crie uma</Link>
                </p>

            </div>
        </div>
    );
};


export default Login;