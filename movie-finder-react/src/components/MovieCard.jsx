import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';

export default function MovieCard({ currentPosts }) {
    const favButton = useRef();
    
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return savedFavorites;
    });

    const [titles, setTitles] = useState(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return savedFavorites.reduce((acc, movie) => {
            acc[movie.id] = '❤️';
            return acc;
        }, {});
    });

    function handleAddToFavorites(movie) {
        const movieId = movie.id;
        const isFavorite = favorites.some(favMovie => favMovie.id === movieId);

        if (isFavorite) {
            const updatedFavorites = favorites.filter(favMovie => favMovie.id !== movieId);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
            setTitles(prevTitles => ({
                ...prevTitles,
                [movieId]: '🤍'
            }));
        } else {
            const updatedFavorites = [...favorites, movie];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
            setTitles(prevTitles => ({
                ...prevTitles,
                [movieId]: '❤️'
            }));
        }
    }

    return (
        <div className="main__content">
            {currentPosts.map(movie => (
                movie.poster_path && (
                    <p to={`/details/${movie.id}`} key={movie.id} className="item">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <div className="item__overlay">
                            
                            <button
                                onClick={(e) => {
                                    handleAddToFavorites(movie);
                                    e.target.classList.toggle('active');
                                }}
                                className='favorites_button'
                                id="favorites-button"
                                ref={favButton}
                            >
                                {titles[movie.id] || '🤍'}
                            </button>
                            <Link className='details_button' to={`/details/${movie.id}`}>ℹ️</Link>
                        </div>
                    </p>
                )
            ))}
        </div>
    );
}
