import { useState } from 'react';

export default function useFavorites() {
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

    return {
        favorites,
        titles,
        handleAddToFavorites
    };
}
