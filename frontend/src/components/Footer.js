import React from 'react';
import './Home.css';  // Para usar os estilos globais

const Footer = () => {
    return (
        <footer className="main-footer">
            <nav>
                <button className="link-button">Política de privacidade</button>
            </nav>
            <p className="footer-tech">
                React.js | Node.js | MongoDB | JWT | OMDB API
            </p>
        </footer>
    );
};

export default Footer;