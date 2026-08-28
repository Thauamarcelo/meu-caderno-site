import React from 'react';
import './Error.css';

const Error = ({ message, onRetry }) => {
    return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p className="error-text">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="retry-btn">
                    Tentar novamente
                </button>
            )}
        </div>
    );
};

export default Error;