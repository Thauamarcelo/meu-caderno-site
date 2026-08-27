import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'; //reutilizando o css global


const Header = () => {
    const navigate = useNavigate();

    //Proteção: só acessa se estiver logado
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header>
            <Link to="/home" className="logo">
                <img src="/img/roma_fruta.png" alt="roma-fruta" />
            </Link>

            <nav class="navbar">
                <ul class="nav-list">
                    <li className="dropdown">
                        <details>
                            <summary>Indicações</summary>
                            <ul className="submenu">
                                <li><Link to="/music">Música/Albuns</Link></li>
                                <li><Link to="/movies">Filme</Link></li>
                                <li><Link to="/series">Série</Link></li>
                                <li><Link to="/books">livro</Link></li>
                            </ul>
                        </details>
                    </li>

                    <li className="dropdown">
                        <details>
                            <summary>Projetos</summary>
                            <ul className="submenu">
                                <li><Link to="/codemusic">CodeMusic</Link></li>
                                <li><Link to="/blender">Blender</Link></li>
                                <li><Link to="/secret">SECREAT</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </nav>

            <button onClick={handleLogout} className="contact-btn">Sair</button>
        </header>
    );
};

export default Header;