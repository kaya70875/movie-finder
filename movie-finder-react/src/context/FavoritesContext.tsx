import { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '../types';

interface ContextProps {
    favorites : Movie[];
    titles : {
        [key : number] : string;
    }
    handleAddToFavorites : (event : React.MouseEvent<HTMLButtonElement>, movie : Movie) => void;
}

const FavoritesContext = createContext<ContextProps | null>(null);

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [titles, setTitles] = useState({});

    useEffect(() => {
        // Initialize favorites and titles from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);

        const savedTitles = savedFavorites.reduce((acc: string[], movie : Movie) => {
            acc[movie.id] = '❤️';
            return acc;
        }, {});
        setTitles(savedTitles);
    }, []);

    const handleAddToFavorites = (event : React.MouseEvent<HTMLButtonElement> , movie : Movie) => {
        event.stopPropagation();

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
