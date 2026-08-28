import React, { useState } from 'react';

// Componente reutilizável de card de álbum
// Receber props: title, image, alt, review, isActive, onToggle
const AlbumCard = ({ title, image, alt, review, isActive, onToggle }) => {
    return (
        <div 
            className={`card ${isActive ? 'active' : ''}`}
            onClick={onToggle}
        >
            <img src={image} alt={alt} />
            <h1>{title}</h1>
            <div className="info">
                <p>{review}</p>
            </div>
        </div>
    );
};

export default AlbumCard;