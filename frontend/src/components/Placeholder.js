import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'; //reutilizando o css global

const PlaceHolder = ({ title, description }) => {
    const navigate = useNavigate();

    //Proteção: só acessa se estiver logado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/Login');
    };

    return (
        <>
            {/*HEADER NEE BB*/}
            <header>
                <Link to="/home" className="logo">
                    <img src="/img/roma_fruta.png" alt="roman-fruta" />
                </Link>
            </header>
        </>
    )
}

