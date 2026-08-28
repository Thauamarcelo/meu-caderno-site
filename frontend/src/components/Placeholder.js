import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';  // ← Usa o componente Header pronto!
import './Home.css';

const Placeholder = ({ title, description }) => {
    const navigate = useNavigate();

    // Proteção: só acessa se estiver logado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');  // ← minúsculo!
        }
    }, [navigate]);

    return (
        <>
            {/* Header reutilizável */}
            <Header />

            {/* Conteúdo principal */}
            <main>
                <section className="placeholder-section">
                    <h1 className="movies-title">「 {title} 」</h1>
                    <p className="placeholder-text">{description}</p>
                    <Link to="/home" className="back-link">
                        ← Voltar para Home
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer>
                <nav>
                    <button className="link-button">Política de privacidade</button>
                </nav>
            </footer>
        </>
    );
};

export default Placeholder;  