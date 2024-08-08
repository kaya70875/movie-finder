import React, { useState, useEffect } from 'react';
import './Favorites.css';
import MovieCard from '../MovieCard';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, [favorites]);

    return (
        <div className="favorites">
            <header>Favorites</header>
            <MovieCard movies={favorites}></MovieCard>
        </div>
    );
}
