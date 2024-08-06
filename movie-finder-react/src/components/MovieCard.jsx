import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';
import useFavorites from '../hooks/useFavorites';

export default function MovieCard({ currentPosts }) {
    
    const {titles , handleAddToFavorites} = useFavorites();

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
                            >
                                {titles[movie.id] || '🤍'}
                            </button>
                            <Link className='details_button' to={`/details/${movie.id}`} state={{movie}}>ℹ️</Link>
                        </div>
                    </p>
                )
            ))}
        </div>
    );
}
