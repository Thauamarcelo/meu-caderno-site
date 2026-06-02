import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import './Filme.css';

const Filme = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <header>
                <Link to="/home" className="logo">
                    <img src="/img/roma_fruta.png" alt="roman-fruta" />
                </Link>

                <nav className="navbar">
                    <ul className="nav-list">
                        {/* menu dropdown 1 */}
                        {/*<li className="dropdown">
                                       <details>
                                           <summary>Interaja comigo</summary>
                                           <ul className="submenu">
                                               <li><a href="#inicio">dia a dia</a></li>
                                               <li><a href="#inicio">curiosidades</a></li>
                                               <li><a href="#inicio">DIGA-ME ALGO</a></li>
                                           </ul>
                                       </details>
                                   </li></>*/}


                        <li className="dropdown">
                            <details>
                                <summary>Indicações</summary>
                                <ul className="submenu">
                                    <li><Link to="/music">Música/Albuns</Link></li>
                                    <li><button className="link-button">Filme</button></li>
                                    <li><button className="link-button">Série</button></li>
                                    <li><button className="link-button">livro</button></li>
                                </ul>
                            </details>
                        </li>

                        <li className="dropdown">
                            <details>
                                <summary>Projetos</summary>
                                <ul className="submenu">
                                    <li><button className="link-button">CodeMusic</button></li>
                                    <li><button className="link-button">Blender</button></li>
                                    <li><button className="link-button">SECREAT</button></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </nav>

                <button onClick={handleLogout} className="contact-btn">
                    Sair
                </button>
            </header>
        </>
    )
}