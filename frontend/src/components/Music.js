import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Loading from './Loading';
import './Home.css';
import './Music.css';

const Music = () => {
    const navigate = useNavigate();

    // Controle de qual card está aberto
    const [activeCard, setActiveCard] = useState(null);

    // Estados para API
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Proteção da rota
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Buscar metadados da iTunes API
    useEffect(() => {
        // ✅ SEUS ÁLBUNS AGORA ESTÃO AQUI DENTRO
        const myAlbumsData = [
            {
                id: 0,
                title: 'ADDISON',
                artist: 'Addison Rae',
                searchTerm: 'Addison Rae Addison',
                localImage: '/img/addison.png',
                myReview: `Como podemos falar da filha legítima de Britney, Lana e da própria Madonna? Calma, ainda não dá — o mundo ainda está conhecendo Addison Rae, diretamente dos escombros da Hype House, é a estrela em ascensão. Addison Rae apareceu na internet por volta de 2019, onde gravava vídeos de dancinhas virais que, para a época, eram "divertidas".

Rae se lançou ao mundo pop em 2021 com o lançamento de "Obsessed", que faria parte do seu primeiro álbum de estreia, mas que futuramente foi descartado por conta de vários vazamentos. Porém, entretanto e todavia, ela lançou o EP nomeado como "AR", que particularmente não me agrada muito, com exceção de "I Got It Bad", que me lembra bastante Britney em seu início.

Futuramente, Rae lançaria singles para o seu álbum de estreia, o famoso "Addison". Com bastante cuidado, ela soube escolher sabiamente os singles para introduzir o público ao seu futuro álbum debut, quando muitos ainda tinham dúvidas do que seria apresentado. Com "Diet Pepsi", ela nos mostrou os elementos que seriam sua inspiração para o álbum, e a expectativa poderia, no caso, ser alta.

Com o lançamento de "Diet Pepsi", Rae nos remete ao início de Lana Del Rey, mas com seu jeito caloroso, fazendo até quem odeia o calor se sentir pertencente a ele. Após um tempo, ela nos presenteia com a famosa "Aquamarine", que mais tarde ganharia um feat com a incrível produtora Arca. "Aquamarine" nos mergulha em um mar logo após uma noite tão viva, como se fosse para nos purificar. E não posso deixar de citar os singles "Headphone On", que foi para pessoas performáticas mas que entendem que não são apenas um fone, e a minha favorita do álbum, "High Fashion", sobre a qual falarei mais no próximo parágrafo.

"High Fashion" se destaca para mim por ser uma música com um aspecto diferente das demais cantoras novatas. O trabalho de Addison se destaca por ser fora da curva. A bateria eletrônica, sintetizadores, baixo e sua voz com um reverb bem feito nos fazem sentir como se estivéssemos sendo introduzidos ao seu "High Fashion". Agradeço a Elvira Anderfjärd e Luka Kloser.

Escutar o album por completo é uma experiencia tanta quanto incomum com outras cantoras ja que é calmo agitado e sexy. Escutar ela no Lollapalooz 2026 foi a minha escolha certa de se fazer, ela é um prodígio na música pop e com uma boa cordenação de carreira, pode apostar que ainda veremos muito a se falar sobre Addison Rae.`
            },
            {
                id: 1,
                title: 'VIRGIN',
                artist: 'FKA Twigs',
                searchTerm: 'FKA Twigs Magdalene',
                localImage: '/img/virgin.png',
                myReview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima accusantium expedita animi recusandae aliquam pariatur culpa, nam consequuntur totam aspernatur tempore dolor, necessitatibus, earum dolore adipisci velit in consequatur.'
            },
            {
                id: 2,
                title: 'MAGDALENE',
                artist: 'FKA Twigs',
                searchTerm: 'FKA Twigs Magdalene',
                localImage: '/img/magdalene.png',
                myReview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima accusantium expedita animi recusandae aliquam pariatur culpa, nam consequuntur totam aspernatur tempore dolor, necessitatibus, earum dolore adipisci velit in consequatur.'
            }
        ];

        const fetchAlbums = async () => {
            try {
                setLoading(true);
                setError('');

                // Buscar cada álbum na iTunes API
                const albumPromises = myAlbumsData.map(album =>
                    axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(album.searchTerm)}&entity=album&limit=1`)
                );

                const responses = await Promise.all(albumPromises);

                // Juntar dados da API com seus dados
                const albumsData = responses.map((response, index) => {
                    const apiData = response.data.results[0] || {};
                    const localData = myAlbumsData[index];

                    return {
                        ...localData,
                        artworkUrl: apiData.artworkUrl100 
                            ? apiData.artworkUrl100.replace('100x100', '300x300') 
                            : localData.localImage,
                        releaseDate: apiData.releaseDate || 'Data não disponível',
                        genre: apiData.primaryGenreName || 'Gênero não informado',
                        trackCount: apiData.trackCount || '?',
                        title: localData.title,
                        artist: apiData.artistName || localData.artist
                    };
                });

                setAlbums(albumsData);
                setLoading(false);
            } catch (err) {
                console.error('ERRO DETALHADO:', err);
                const fallbackAlbums = myAlbumsData.map(album => ({
                    ...album,
                    artworkUrl: album.localImage,
                    releaseDate: 'Data não disponível',
                    genre: 'Gênero não informado',
                    trackCount: '?'
                }));
                setAlbums(fallbackAlbums);
                setError('API indisponível. Mostrando dados locais.');
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []); // ✅ Array vazio, sem warnings!

    // Abrir/fechar card
    const toggleCard = (index) => {
        if (activeCard === index) {
            setActiveCard(null);
        } else {
            setActiveCard(index);
        }
    };

    // Se estiver carregando
    if (loading) {
        return (
            <>
                <Header />
                <main>
                    <section className="music-section">
                        <h1 className="movies-title">「 Música 」</h1>
                        <Loading message="Buscando metadados na iTunes..." />
                    </section>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main>
                {error && (
                    <div className="api-warning">
                        {error}
                    </div>
                )}

                <section className="musica">
                    {albums.map((album, index) => (
                        <div 
                            key={album.id} 
                            className={`card ${activeCard === index ? 'active' : ''}`}
                            onClick={() => toggleCard(index)}
                        >
                            <img 
                                src={album.artworkUrl} 
                                alt={album.title} 
                            />
                            <h1>{album.title}</h1>
                            
                            <div className="album-metadata">
                                <p><strong>Artista:</strong> {album.artist}</p>
                                <p><strong>Gênero:</strong> {album.genre}</p>
                                <p><strong>Lançamento:</strong> {new Date(album.releaseDate).toLocaleDateString('pt-BR')}</p>
                                <p><strong>Faixas:</strong> {album.trackCount}</p>
                            </div>
                            
                            <div className="info">
                                <h3>O que eu achei:</h3>
                                <p>{album.myReview}</p>
                            </div>
                        </div>
                    ))}
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