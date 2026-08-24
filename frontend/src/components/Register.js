import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Register = () => {
    const navigate = useNavigate();

    // Estado do formulário
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''  // NOVO: campo de confirmar senha
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // FUNÇÃO: Verifica se o email tem formato válido
    const isValidEmail = (email) => {
        // Regex simples: algo@algo.com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // FUNÇÃO: Verifica se a senha tem 6+ caracteres
    const isValidPassword = (password) => {
        return password.length >= 6;
    };

    // DERIVADOS: Verificações em tempo real
    const passwordValid = isValidPassword(formData.password);
    const emailValid = isValidEmail(formData.email);
    const passwordsMatch = formData.password === formData.confirmPassword;
    
    // Se TUDO estiver válido, habilita o botão
    const formIsValid = passwordValid && emailValid && passwordsMatch && formData.username.length >= 3;

    // FUNÇÃO: Atualiza os campos quando usuário digita
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // FUNÇÃO: Enviar formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação final antes de enviar
        if (!emailValid) {
            setError('Digite um email válido.');
            return;
        }
        if (!passwordValid) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (!passwordsMatch) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/registrar`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            );

            alert('Conta criada com sucesso! Faça login para continuar.');
            navigate('/login');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar conta');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">「 Criar Conta 」</h1>

                {/* Mensagem de erro (se houver) */}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    {/* ========================================== */}
                    {/* CAMPO: Nome de Usuário                   */}
                    {/* ========================================== */}
                    <div className="input-group">
                        <label htmlFor="username">Nome de usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="seu_nome"
                        />
                        {/* Validação em tempo real */}
                        <span className={`validation-message ${formData.username.length >= 3 ? 'valid' : 'invalid'}`}>
                            {formData.username.length >= 3 
                                ? '✅ Nome válido' 
                                : '❌ Mínimo 3 caracteres'}
                        </span>
                    </div>

                    {/* ========================================== */}
                    {/* CAMPO: Email                             */}
                    {/* ========================================== */}
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
                        {/* Validação em tempo real */}
                        <span className={`validation-message ${emailValid ? 'valid' : 'invalid'}`}>
                            {emailValid 
                                ? '✅ Email válido' 
                                : '❌ Digite um email válido (ex: nome@dominio.com)'}
                        </span>
                    </div>

                    {/* ========================================== */}
                    {/* CAMPO: Senha                             */}
                    {/* ========================================== */}
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="**********"
                        />
                        {/* Validação em tempo real */}
                        <span className={`validation-message ${passwordValid ? 'valid' : 'invalid'}`}>
                            {passwordValid 
                                ? '✅ Senha válida' 
                                : '❌ Mínimo 6 caracteres'}
                        </span>
                    </div>

                    {/* ========================================== */}
                    {/* CAMPO: Confirmar Senha                   */}
                    {/* ========================================== */}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="**********"
                        />
                        {/* Validação em tempo real */}
                        <span className={`validation-message ${passwordsMatch ? 'valid' : 'invalid'}`}>
                            {passwordsMatch 
                                ? '✅ Senhas coincidem' 
                                : '❌ As senhas não coincidem'}
                        </span>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || !formIsValid}  // Desabilita se formulário inválido
                        className="login-btn"
                    >
                        {loading ? 'Criando conta...' : 'Criar Conta'}
                    </button>
                </form>

                <p className="register-link">
                    Já tem conta? <Link to="/login">Faça login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;