import React, { useState } from 'react';        // ✅ useState importado do React
import { useNavigate, Link } from 'react-router-dom';  // ✅ useNavigate e Link importados
import axios from 'axios';                     // ✅ axios importado
import './Login.css';                          // Reutiliza o CSS do Login

const Register = () => {
    // ==========================================
    // ESTADOS: A memória do componente
    // ==========================================
    
    // Diferente do Login, aqui temos 3 campos (username, email, password)
    const [formData, setFormData] = useState({
        username: '',  // NOVO: Campo de nome de usuário
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        setLoading(true);
        setError('');

        try {
            // Envia os dados para a rota de REGISTRO (não login!)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/registrar`, formData);

            
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
        <div className= "login-container">
            <div classsName = "login-box">
                <h1 className = "login-title">「 Criar Conta 」 </h1>

                {/* mensgaem de erro*/}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit = {handleSubmit} className = "login-form">
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
                    </div>

                    <button type="submit" disabled={loading} className="login-btn">
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