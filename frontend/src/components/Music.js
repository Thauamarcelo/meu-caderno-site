import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AlbumCard from './AlbumCard';
import './Home.css';
import './Music.css';

const Music = () => {
    const navigate = useNavigate();

    // Qual card está aberto (0, 1, 2, ou null)
    const [activeCard, setActiveCard] = useState(null);

    // Proteção da rota
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Função para abrir/fechar card
    const toggleCard = (index) => {
        if (activeCard === index) {
            setActiveCard(null); // Fecha se já estiver aberto
        } else {
            setActiveCard(index); // Abre o card clicado
        }
    };

    return (
        <>
            <Header />

            <main>
                <section className="musica">
                    {/* Card 1: Addison */}
                    <AlbumCard
                        title="ADDISON"
                        image="/img/addison.png"
                        alt="cd-addison"
                        isActive={activeCard === 0}
                        onToggle={() => toggleCard(0)}
                        review={`Como podemos falar da filha legítima de Britney, Lana e da própria Madonna? Calma, ainda não dá — o mundo ainda está conhecendo Addison Rae, diretamente dos escombros da Hype House, é a estrela em ascensão. Addison Rae apareceu na internet por volta de 2019, onde gravava vídeos de dancinhas virais que, para a época, eram "divertidas".

Rae se lançou ao mundo pop em 2021 com o lançamento de "Obsessed", que faria parte do seu primeiro álbum de estreia, mas que futuramente foi descartado por conta de vários vazamentos. Porém, entretanto e todavia, ela lançou o EP nomeado como "AR", que particularmente não me agrada muito, com exceção de "I Got It Bad", que me lembra bastante Britney em seu início.

Futuramente, Rae lançaria singles para o seu álbum de estreia, o famoso "Addison". Com bastante cuidado, ela soube escolher sabiamente os singles para introduzir o público ao seu futuro álbum debut, quando muitos ainda tinham dúvidas do que seria apresentado. Com "Diet Pepsi", ela nos mostrou os elementos que seriam sua inspiração para o álbum, e a expectativa poderia, no caso, ser alta.

Com o lançamento de "Diet Pepsi", Rae nos remete ao início de Lana Del Rey, mas com seu jeito caloroso, fazendo até quem odeia o calor se sentir pertencente a ele. Após um tempo, ela nos presenteia com a famosa "Aquamarine", que mais tarde ganharia um feat com a incrível produtora Arca. "Aquamarine" nos mergulha em um mar logo após uma noite tão viva, como se fosse para nos purificar. E não posso deixar de citar os singles "Headphone On", que foi para pessoas performáticas mas que entendem que não são apenas um fone, e a minha favorita do álbum, "High Fashion", sobre a qual falarei mais no próximo parágrafo.

"High Fashion" se destaca para mim por ser uma música com um aspecto diferente das demais cantoras novatas. O trabalho de Addison se destaca por ser fora da curva. A bateria eletrônica, sintetizadores, baixo e sua voz com um reverb bem feito nos fazem sentir como se estivéssemos sendo introduzidos ao seu "High Fashion". Agradeço a Elvira Anderfjärd e Luka Kloser.

Escutar o album por completo é uma experiencia tanta quanto incomum com outras cantoras ja que é calmo agitado e sexy. Escutar ela no Lollapalooz 2026 foi a minha escolha certa de se fazer, ela é um prodígio na música pop e com uma boa cordenação de carreira, pode apostar que ainda veremos muito a se falar sobre Addison Rae.`}
                    />

                    {/* Card 2: Virgin */}
                    <AlbumCard
                        title="VIRGIN"
                        image="/img/virgin.png"
                        alt="virgin"
                        isActive={activeCard === 1}
                        onToggle={() => toggleCard(1)}
                        review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima accusantium expedita animi recusandae aliquam pariatur culpa, nam consequuntur totam aspernatur tempore dolor, necessitatibus, earum dolore adipisci velit in consequatur."
                    />

                    {/* Card 3: Magdalene */}
                    <AlbumCard
                        title="MAGDALENE"
                        image="/img/magdalene.png"
                        alt="magdalene"
                        isActive={activeCard === 2}
                        onToggle={() => toggleCard(2)}
                        review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima accusantium expedita animi recusandae aliquam pariatur culpa, nam consequuntur totam aspernatur tempore dolor, necessitatibus, earum dolore adipisci velit in consequatur."
                    />
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