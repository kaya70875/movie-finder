import React, { useState, useEffect } from 'react';
import '../sites/_Favorites.scss';
import MovieCard from '../cards/MovieCard';
import FilterComponent from '../filters/FilterComponent';
import { useFilter } from '../../context/FilterContext';
import { filterAndSortMovies } from '../utils/FilterAndSortMovies';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [filteredMovies , setFilteredMovies] = useState([]);
    const {sortState} = useFilter();

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, [favorites]);
    
    useEffect(() => {
        const applyFilters = filterAndSortMovies(favorites , sortState);
        setFilteredMovies(applyFilters);
      
      }, [sortState, favorites]);

    return (
        <div className="favorites">
            <div className="slide__container">
                <div className="fav-container">
                    <div className="favorites-header">
                        <h2>Welcome to Favorites</h2>
                        <p>You can add , remove & access your favorites movies from here!</p>
                    </div>
                    <MovieCard movies={filteredMovies} showScrollButtons={false} defaultGrid={false} showFilters={true} title={'Your Favorites'}></MovieCard>
                </div>
                
            </div>
        </div>
        
    );
}
