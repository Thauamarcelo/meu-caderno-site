import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Loading from './Loading';
import './Home.css';
import './Music.css';

const Music = () => {
    const navigate = useNavigate();

    // Estados para recomendação
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [recommendMessage, setRecommendMessage] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);

    const [pageLoading, setPageLoading] = useState(true);
    // Proteção da rota
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1000);
        
    }, [navigate]);

    // Função para buscar música na iTunes API
    const searchMusic = async () => {
        if (!searchTerm.trim()) return;
        
        setSearchLoading(true);
        try {
            const response = await axios.get(
                `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=8`
            );
            setSearchResults(response.data.results);
        } catch (err) {
            console.error('Erro na busca:', err);
        } finally {
            setSearchLoading(false);
        }
    };

    // Selecionar música
    const selectSong = (song) => {
        setSelectedSong(song);
    };

    // Enviar recomendação
    const sendRecommendation = async () => {
        if (!selectedSong || !recommendMessage) return;

        setSearchLoading(true);
        try {
            await axios.post('https://formspree.io/f/mwlkvlvb', {
                songName: selectedSong.trackName,
                artistName: selectedSong.artistName,
                albumName: selectedSong.collectionName || 'N/A',
                message: recommendMessage,
                senderEmail: senderEmail || 'Anônimo'
            });
            
            setSentSuccess(true);
            // Resetar após 3 segundos
            setTimeout(() => {
                setSentSuccess(false);
                setSelectedSong(null);
                setRecommendMessage('');
                setSenderEmail('');
                setSearchResults([]);
                setSearchTerm('');
            }, 3000);
        } catch (err) {
            console.error('Erro ao enviar:', err);
            alert('Erro ao enviar recomendação. Tente novamente.');
        } finally {
            setSearchLoading(false);
        }
    };

    return (
        <>
            <Header />

            <main>
                {/* ========================================== */}
                {/* TÍTULO PRINCIPAL                          */}
                {/* ========================================== */}
                <section className="recommend-main-section">
                    <h1 className="recommend-main-title">「 Recomende uma Música 」</h1>

                    {sentSuccess ? (
                        <div className="success-message">
                            Grato! Sua recomendação foi enviada!
                        </div>
                    ) : (
                        <div className="recommend-layout">
                            {/* ========================================== */}
                            {/* LADO ESQUERDO: BUSCA                     */}
                            {/* ========================================== */}
                            <div className="recommend-left">
                                <div className="search-box">
                                    <input
                                        className="recommend-input"
                                        placeholder="Pesquise uma música ou artista..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && searchMusic()}
                                    />
                                    <button className="login-btn" onClick={searchMusic}>
                                        Buscar
                                    </button>
                                </div>

                                {searchLoading && <Loading message="Buscando músicas..." />}

                                <div className="search-results">
                                    {searchResults.map((song) => (
                                        <div 
                                            key={song.trackId} 
                                            className={`song-item ${selectedSong?.trackId === song.trackId ? 'selected' : ''}`}
                                            onClick={() => selectSong(song)}
                                        >
                                            <img 
                                                src={song.artworkUrl100} 
                                                alt={song.trackName} 
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                            <div>
                                                <p className="song-name">{song.trackName}</p>
                                                <p className="song-artist">{song.artistName}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ========================================== */}
                            {/* LADO DIREITO: CARTA                      */}
                            {/* ========================================== */}
                            <div className="recommend-right">
                                {selectedSong ? (
                                    <div className="selected-song-display">
                                        <img 
                                            src={selectedSong.artworkUrl100} 
                                            alt={selectedSong.trackName}
                                            style={{ width: '80px', height: '80px' }}
                                        />
                                        <div>
                                            <p className="selected-song-name">{selectedSong.trackName}</p>
                                            <p className="selected-song-artist">{selectedSong.artistName}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="placeholder-text">
                                        ← Pesquise e selecione uma música para recomendar
                                    </p>
                                )}

                                <textarea
                                    className="recommend-textarea"
                                    placeholder="Escreva sua cartinha sobre essa música..."
                                    value={recommendMessage}
                                    onChange={(e) => setRecommendMessage(e.target.value)}
                                    rows="5"
                                />
                                
                                <input
                                    className="recommend-input"
                                    type="email"
                                    placeholder="Seu email (opcional)"
                                    value={senderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                />
                                
                                <button 
                                    className="login-btn" 
                                    onClick={sendRecommendation}
                                    disabled={searchLoading || !recommendMessage || !selectedSong}
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* ========================================== */}
                {/* SEÇÃO FUTURA: RECOMENDAR ÁLBUM           */}
                {/* ========================================== */}
                <section className="album-recommend-section">
                    <h2 className="recommend-title">「 Recomendar Álbum 」</h2>
                    <p className="placeholder-text">
                        Em breve, você poderá recomendar álbuns completos.
                    </p>
                    {/* Futuro componente AlbumRecommend vai aqui */}
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

export default Music;