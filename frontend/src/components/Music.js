import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'; 
import './Music.css'; 

const Music = () => {
    const navigate = useNavigate();

    const [activeCard, setActiveCard] = React.useState(null);

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


            <main>
                <section className="musica">
                    {/* Card 1: Addison */}
                    <div className={`card ${activeCard === 0 ? 'active' : ''}`}
                        onClick={() => setActiveCard(activeCard === 0 ? null : 0)}>
                        <img src="/img/addison.png" alt="cd-addison" />
                        <h1>ADDISON</h1>
                        <div className="info">
                            <p>
                                Como podemos falar da filha legítima de Britney, Lana e da própria Madonna? Calma, ainda não dá
                                — o mundo ainda está conhecendo Addison Rae, diretamente dos escombros da Hype House, é a
                                estrela em ascensão. Addison Rae apareceu na internet por volta de 2019, onde gravava vídeos de
                                dancinhas virais que, para a época, eram "divertidas".
                            </p>
                            <p>Rae se lançou ao mundo pop em 2021 com o lançamento de "Obsessed", que faria parte do seu
                                primeiro álbum de estreia, mas que futuramente foi descartado por conta de vários vazamentos.
                                Porém, entretanto e todavia, ela lançou o EP nomeado como "AR", que particularmente não me
                                agrada muito, com exceção de "I Got It Bad", que me lembra bastante Britney em seu início.
                            </p>
                            <p>Futuramente, Rae lançaria singles para o seu álbum de estreia, o famoso "Addison". Com bastante
                                cuidado, ela soube escolher sabiamente os singles para introduzir o público ao seu futuro álbum
                                debut, quando muitos ainda tinham dúvidas do que seria apresentado. Com "Diet Pepsi", ela nos
                                mostrou os elementos que seriam sua inspiração para o álbum, e a expectativa poderia, no caso,
                                ser alta. </p>
                            <p>Com o lançamento de "Diet Pepsi", Rae nos remete ao início de Lana Del Rey, mas com seu jeito
                                caloroso, fazendo até quem odeia o calor se sentir pertencente a ele. Após um tempo, ela nos
                                presenteia com a famosa "Aquamarine", que mais tarde ganharia um feat com a incrível produtora
                                Arca. "Aquamarine" nos mergulha em um mar logo após uma noite tão viva, como se fosse para nos
                                purificar. E não posso deixar de citar os singles "Headphone On", que foi para pessoas
                                performáticas mas que entendem que não são apenas um fone, e a minha favorita do álbum, "High
                                Fashion", sobre a qual falarei mais no próximo parágrafo.
                            </p>
                            <p>"High Fashion" se destaca para mim por ser uma música com um aspecto diferente das demais
                                cantoras novatas. O trabalho de Addison se destaca por ser fora da curva. A bateria eletrônica,
                                sintetizadores, baixo e sua voz com um reverb bem feito nos fazem sentir como se estivéssemos
                                sendo introduzidos ao seu "High Fashion". Agradeço a Elvira Anderfjärd e Luka Kloser. </p>
                            <p>
                                Escutar o album por completo é uma experiencia tanta quanto incomum com outras cantoras ja que é
                                calmo agitado e sexy. Escutar ela no Lollapalooz 2026 foi a minha escolha certa de se fazer, ela
                                é um prodígio na música pop e com uma boa cordenação de carreira, pode apostar que ainda veremos
                                muito a se falar sobre Addison Rae.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Virgin */}
                    <div className={`card ${activeCard === 1 ? 'active' : ''}`}
                        onClick={() => setActiveCard(activeCard === 1 ? null : 1)}>
                        <img src="/img/virgin.png" alt="virgin" />
                        <h1>VIRGIN</h1>
                        <div className="info">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima accusantium expedita animi
                                recusandae aliquam pariatur culpa, nam consequuntur totam aspernatur tempore dolor,
                                necessitatibus, earum dolore adipisci velit in consequatur.</p>
                        </div>
                    </div>

                    <div className={`card ${activeCard === 2 ? 'active' : ''}`}
                        onClick={() => setActiveCard(activeCard === 2 ? null : 2)}>
                        <img src="/img/magdalene.png" alt="magdalene" />
                        <h1>MAGDALENE</h1>
                        <div className="info">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima accusantium expedita animi
                                recusandae aliquam pariatur culpa, nam consequuntur totam aspernatur tempore dolor,
                                necessitatibus, earum dolore adipisci velit in consequatur.</p>
                        </div>
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

export default Music;