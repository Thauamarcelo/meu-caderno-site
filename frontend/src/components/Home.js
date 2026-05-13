import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  //proteção caso nao tenha login, volta para fazer login

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  //função  delogout, limpa o localStorage e redireciona para login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* HEADER - Convertido do meu antigo HTML           */}

      <header>
        <a href="#inicio" className="logo">
          <img src="/img/roma_fruta.png" />
        </a>

        <nav className="navbar">
          <ul className="nav-list">
            {/* menu dropdown 1 */}
            <li className="dropdown">
              <details>
                <summary>Interaja comigo</summary>
                <ul className="submenu">
                  <li><a href="#">dia a dia</a></li>
                  <li><a href="#">curiosidades</a></li>
                  <li><a href="#">DIGA-ME ALGO</a></li>
                </ul>
              </details>
            </li>

            {/* Menu Dropdown 2 */}
            <li className="dropdown">
              <details>
                <summary>Indicações</summary>
                <ul className="submenu">
                  <li><a href="#">Música/Albuns</a></li>
                  <li><a href="#">Filme</a></li>
                  <li><a href="#">Série</a></li>
                  <li><a href="#">livro</a></li>
                </ul>
              </details>
            </li>

            {/* Menu Dropdown 3 */}
            <li className="dropdown">
              <details>
                <summary>Projetos</summary>
                <ul className="submenu">
                  <li><a href="#">CodeMusic</a></li>
                  <li><a href="#">Blender</a></li>
                  <li><a href="#">SECREAT</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>

        {/*substitui o contact me para logout */}
        <button onClick={handleLogout} className="contact-btn">
          Sair ({user.username})
        </button>
      </header>

      {/* MAIN - Conteúdo principal                 */}

      <main>
        {/*PLAYER DDO SOUNDCLOUD*/}

        <section>
          <div className="music">
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A87841248&color=%23fafaf9&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              title="SoundCloud Player"
            />
            <div style={{
              fontSize: '10px',
              color: '#cccccc',
              lineBreak: 'anywhere',
              wordBreak: 'normal',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
              fontWeight: 100
            }}>
              <a href="https://soundcloud.com/sean-chen-12" title="Tigger" target="_blank" rel="noreferrer" style={{ color: '#000000', textDecoration: 'none' }}>Tigger</a> · <a href="https://soundcloud.com/sean-chen-12/glide" title="グライド(Glide)" target="_blank" rel="noreferrer" style={{ color: '#000000', textDecoration: 'none' }}>グライド(Glide)</a>
            </div>
          </div>
        </section>

        {/* SEÇÃO INÍCIO*/}
        <section className="inicio" id="inicio">
          <div className="content">
            <div className="inicio-content">
              <h1>《 Mas afinal, o'que seria esse site? 》</h1>

              <section>
                <div className="subclasse-box">
                  « ⸝⸝... »
                  <p>« sendo sincero... nem eu sei. »</p>
                </div>
              </section>

              <p>─•─────•─────•─────•─────•─────•────</p>

              <p><sub>.ᐟ </sub>Não é sobre retorno. Não é sobre números.
                É só sobre deixar algo aqui.
                Sobre falar das coisas que me atravessam —
                paixões momentâneas, obsessões passageiras,
                ideias soltas e pequenos tutoriais.
                Se alguém encontrar isso por acaso,
                e se isso ajudar em algo...
                já é o suficiente.</p>

              <p>─•─────•─────•─────•─────•─────•────</p>
            </div>
          </div>
        </section>

        {/*SEÇÃO RESUMO*/}
        <section className="resumo" id="resumo">
          <div className="content">
            <div className="resumo-content">
              <h1>《 Resumo do que pode ser visto 》</h1>
              <p>𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂</p>

              <p>
                <sub>.ᐟ </sub>
                Algumas das coisas que andam ocupando minha mente ultimamente:
                <sub>.ᐟ </sub>
              </p>

              <ul className="resumo-lista">
                <li>Indicações de música, álbuns, filmes, séries e livros</li>
                <li>Projetos pessoais envolvendo código, música e modelagem 3D</li>
                <li>Pensamentos soltos do dia a dia</li>
                <li>Tutoriais simples que talvez ajudem alguém por acaso</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <nav>
          <a href="#">Política de privacidade</a>
        </nav>
      </footer>

    </>
  );
};

export default Home;