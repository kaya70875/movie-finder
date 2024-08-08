import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [titles, setTitles] = useState('');

    useEffect(() => {
        // Initialize favorites and titles from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);

        const savedTitles = savedFavorites.reduce((acc, movie) => {
            acc[movie.id] = '❤️';
            return acc;
        }, {});
        setTitles(savedTitles);
    }, []);

    const handleAddToFavorites = (movie) => {
        const movieId = movie.id;
        const isFavorite = favorites.some(favMovie => favMovie.id === movieId);

        const updatedFavorites = isFavorite
            ? favorites.filter(favMovie => favMovie.id !== movieId)
            : [...favorites, movie];

        // Update localStorage and state
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        setTitles(prevTitles => ({
            ...prevTitles,
            [movieId]: isFavorite ? '🤍' : '❤️'
        }));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, titles, handleAddToFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
