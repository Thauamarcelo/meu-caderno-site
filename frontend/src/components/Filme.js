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
                                    <li><Link to="/filme">Filme</Link></li>
                                    <li><a href="#inicio">Série</a></li>
                                    <li><a href="#inicio">livro</a></li>
                                </ul>
                            </details>
                        </li>

                        <li className="dropdown">
                            <details>
                                <summary>Projetos</summary>
                                <ul className="submenu">
                                    <li><a href="#inicio">CodeMusic</a></li>
                                    <li><a href="#inicio">Blender</a></li>
                                    <li><a href="#inicio">SECREAT</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </nav>

                <button onClick={handleLogout} className="contact-btn">
                    Sair
                </button>

            </header>
            
            <main>

                <section className="filme">
                    <h1>Filmes</h1>
                    <p>Lista de filmes indicados.</p>
                </section>
            </main>
        </>
    );
};

export default Filme;