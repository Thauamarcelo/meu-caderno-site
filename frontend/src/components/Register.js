import React, { useState } from 'react';        // useState importado do React
import { useNavigate } from 'react-router-dom';  // useNavigate e Link importados
import axios from 'axios';                     // axios importado
import './Login.css';                          // Reutiliza o CSS do Login

const Register = () => {
    // ==========================================
    // ESTADOS: A memória do componente
    // ==========================================

    // Diferente do Login, aqui você tem 3 campos (username, email, password)
    const [formData, setFormData] = useState({
        username: '',  // NOVO: Campo de nome de usuário
        email: '',
        password: '',
        confirmPassword: '' 
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // FUNÇÃO: Verificar se o email tem formato válido

    const isValidEmail = (email) => {
        //regex simples: algo@algo.com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //FUNÇÃO: Verificar se a senha tem pelo menos 6 caracteres
    const isValidPassword = (password) => {
        return password.length >= 6;
    };

    //DERVIDADOS: Verificação em tempo real (opcional)
    const passwordValid = isValidPassword(formData.password);
    const emailValid = isValidEmail(formData.email);
    const passwordsMatch = formData.password === formData.confirmPassword; // Se houver campo de confirmação

    //se tudo estiver válido, habilita o botão de registro
    const formIsValid = passwordValid && emailValid && passwordMatch && formData.username.length >= 3;


    // ==========================================
    // FUNÇÃO: Lidar com mudanças nos campos
    // (IGUAL ao Login, mas agora com 3 campos)
    // ==========================================
    const handleChange = (e) => {
        setFormData({
            ...formData,                    // Mantém todos os campos atuais
            [e.target.name]: e.target.value // Atualiza só o que mudou
        });
    };

    // ==========================================
    // FUNÇÃO: Enviar o formulário de registro
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();  // Impede recarregar a página

        // Validações antes de enviar
        if (!emailValid) {
            setError('Email inválido');
            return;
        }
        if (!passwordValid) {
            setError('Senha deve ter pelo menos 6 caracteres');
            return;
        }
        if (!passwordMatch) {
            setError('Senhas não coincidem');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Envia os dados para a rota de REGISTRO (não login!)
            await axios.post(
                'https://meu-caderno-site.onrender.com/api/auth/registrar',
                formData
            );


            // Se chegou aqui, o registro deu certo!
            // Mostra mensagem de sucesso e redireciona para login
            alert('Conta criada com sucesso! Faça login para continuar.');
            navigate('/login');  // Vai para a tela de login
        }
        catch (err) {
            // Se deu erro (ex: email já cadastrado)
            setError(
                err.response?.data?.message ||
                'Erro ao criar conta'
            );
        }
        finally {
            setLoading(false);
        }
    };

    //oq aparece na tela
    return (
        <div className="login-container">
            <div classsName="login-box">
                <h1 className="login-title">「 Criar Conta 」 </h1>

                {/* mensgaem de erro*/}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    {/*CAMPO NOVO: nome de usuário */}
                    <div className="form-group">
                        <label htmlFor="username">Nome de Usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="seu_nome"
                        />
                        {/*VALIDAÇÃO EM TEMPO REAL*/}

                        {/* Validação em tempo real */}
                        <span className={`validation-message ${formData.username.length >= 3 ? 'valid' : 'invalid'}`}>
                            {formData.username.length >= 3
                                ? '✅ Nome válido'
                                : '❌ Mínimo 3 caracteres'}
                        </span>
                    </div>

                    <div className="form-group">
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

                    <div className="form-group">
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

                {/* Link para voltar ao login */}
                <p className="register-link">
                    Já tem uma conta? <a href="/login">Faça login</a>
                </p>
            </div>
        </div>
    )
};

export default Register;