import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import './Filme.css';  // Ou './Movies.css'

const Movies = () => {
    const navigate = useNavigate();

    // Controle de qual filme está aberto
    const [activeMovie, setActiveMovie] = useState(null);

    // Filmes vindos da API
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Proteção da rota
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Buscar filmes da API OMDB ao carregar a página
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                
                // Lista de filmes que você quer mostrar
                const movieTitles = [
                    'Matrix',
                    'Inception',
                    'Interstellar',
                    'The Dark Knight',
                    'Pulp Fiction'
                ];
                
                // Busca cada filme individualmente
                const moviePromises = movieTitles.map(title =>
                    axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`)
                );
                
                const responses = await Promise.all(moviePromises);
                const movieData = responses.map(response => response.data);
                
                setMovies(movieData);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar filmes');
                setLoading(false);
            }
        };
        
        fetchMovies();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Abrir/fechar detalhes do filme
    const toggleMovie = (index) => {
        if (activeMovie === index) {
            setActiveMovie(null);
        } else {
            setActiveMovie(index);
        }
    };

    // Se estiver carregando
    if (loading) {
        return (
            <>
                <header>
                    <Link to="/home" className="logo">
                        <img src="/img/roma_fruta.png" alt="roman-fruta" />
                    </Link>
                    <nav className="navbar">
                        <ul className="nav-list">
                            <li className="dropdown">
                                <details>
                                    <summary>Indicações</summary>
                                    <ul className="submenu">
                                        <li><Link to="/music">Música/Albuns</Link></li>
                                        <li><Link to="/movies">Filme</Link></li>
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
                    <button onClick={handleLogout} className="contact-btn">Sair</button>
                </header>
                <main>
                    <section className="movies-section">
                        <h1 className="movies-title">「 Filmes 」</h1>
                        <p>Carregando filmes...</p>
                    </section>
                </main>
            </>
        );
    }

    // Se deu erro
    if (error) {
        return (
            <>
                <header>
                    <Link to="/home" className="logo">
                        <img src="/img/roma_fruta.png" alt="roman-fruta" />
                    </Link>
                    <nav className="navbar">
                        <ul className="nav-list">
                            <li className="dropdown">
                                <details>
                                    <summary>Indicações</summary>
                                    <ul className="submenu">
                                        <li><Link to="/music">Música/Albuns</Link></li>
                                        <li><Link to="/movies">Filme</Link></li>
                                        <li><button className="link-button">Série</button></li>
                                        <li><button className="link-button">livro</button></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </nav>
                    <button onClick={handleLogout} className="contact-btn">Sair</button>
                </header>
                <main>
                    <section className="movies-section">
                        <h1 className="movies-title">「 Filmes 」</h1>
                        <p className="error-message">{error}</p>
                    </section>
                </main>
            </>
        );
    }

    return (
        <>
            {/* HEADER */}
            <header>
                <Link to="/home" className="logo">
                    <img src="/img/roma_fruta.png" alt="roman-fruta" />
                </Link>

                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="dropdown">
                            <details>
                                <summary>Indicações</summary>
                                <ul className="submenu">
                                    <li><Link to="/music">Música/Albuns</Link></li>
                                    <li><Link to="/movies">Filme</Link></li>
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

                <button onClick={handleLogout} className="contact-btn">Sair</button>
            </header>

            {/* CONTEÚDO PRINCIPAL */}
            <main>
                <section className="movies-section">
                    <h1 className="movies-title">「 Filmes 」</h1>

                    <div className="movies-list">
                        {movies.map((movie, index) => (
                            <div key={movie.imdbID} className="movie-item">
                                {/* Cabeçalho clicável (pôster + nome) */}
                                <div 
                                    className={`movie-header ${activeMovie === index ? 'active' : ''}`}
                                    onClick={() => toggleMovie(index)}
                                >
                                    <img 
                                        src={movie.Poster !== 'N/A' ? movie.Poster : '/img/placeholder.jpg'} 
                                        alt={movie.Title} 
                                        className="movie-poster"
                                    />
                                    <div className="movie-name">
                                        <h2>{movie.Title} ({movie.Year})</h2>
                                        <span className="movie-rating">⭐ {movie.imdbRating}/10</span>
                                        <p className="movie-genre">{movie.Genre}</p>
                                    </div>
                                    <span className="movie-arrow">
                                        {activeMovie === index ? '▾' : '▸'}
                                    </span>
                                </div>

                                {/* Conteúdo expansível (sinopse + detalhes) */}
                                {activeMovie === index && (
                                    <div className="movie-content">
                                        <div className="movie-review">
                                            <h3>Sinopse</h3>
                                            <p>{movie.Plot}</p>
                                        </div>
                                        
                                        <div className="movie-details">
                                            <p><strong>Diretor:</strong> {movie.Director}</p>
                                            <p><strong>Elenco:</strong> {movie.Actors}</p>
                                            <p><strong>Duração:</strong> {movie.Runtime}</p>
                                            <p><strong>Prêmios:</strong> {movie.Awards}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer>
                <nav>
                    <button className="link-button">Política de privacidade</button>
                </nav>
            </footer>
        </>
    );
};

export default Movies;