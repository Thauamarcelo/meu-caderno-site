import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './Home.css';
import './Movies.css';

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

                // Dados pessoais (aqui dentro)
                const myMoviesData = [
                    {
                        searchTitle: 'All About Lily Chou-Chou',
                        myReview: 'Um filme delicado e poético que captura a essência da adolescência, com uma trilha sonora hipnotizante e uma narrativa que mistura realidade e fantasia de forma única.'
                    },
                    {
                        searchTitle: 'The Second Mother',
                        myReview: 'Um drama brasileiro poderoso que aborda as complexidades das relações familiares e sociais, com atuações emocionantes e uma direção sensível.'
                    },
                    {
                        searchTitle: 'Perfect Blue',
                        myReview: 'Um thriller psicológico intenso e perturbador que explora a identidade e a fama, com uma animação impressionante e uma narrativa cheia de reviravoltas.'
                    },
                    {
                        searchTitle: 'everything everywhere all at once',
                        myReview: 'Uma aventura multiversal criativa e emocionante que mistura ação, comédia e drama, com performances incríveis e uma história que celebra a diversidade e a conexão humana.'
                    }
                ];

                // Lista de filmes que você quer mostrar
                const movieTitles = [
                    'All About Lily Chou-Chou',
                    'The Second Mother',
                    'Perfect Blue',
                    'everything everywhere all at once'
                ];

                // Busca cada filme individualmente
                const moviePromises = movieTitles.map(title =>
                    axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`)
                );

                const responses = await Promise.all(moviePromises);
                const movieData = responses.map(response => response.data);

                // Juntar com opiniões
                const moviesWithReviews = movieData.map((movie, index) => ({
                    ...movie,
                    myReview: myMoviesData[index]?.myReview || 'Opinião em breve...'
                }));

                setMovies(moviesWithReviews);
                setLoading(false);
            } catch (err) {
                console.error('ERRO DETALHADO:', err);  // ← Mostra no console
                setError(`Erro: ${err.message}`);        // ← Mostra na tela
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

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
                <Header />
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
                <Header />
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
            <Header />

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

                                        <div className="movie-review my-review">
                                            <h2>O que eu achei:</h2>
                                            <p>{movie.myReview}</p>
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