import React, { useState, useEffect } from 'react';
import '../sites/_Favorites.scss';
import MovieCard from '../MovieCard';
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
                    <h3 className='fav-header'>Favorites</h3>
                    <div className="fav-query-titles">
                        <FilterComponent />
                    </div>
                    <MovieCard movies={filteredMovies} showScrollButtons={false} defaultGrid={false}></MovieCard>
                </div>
                
            </div>
        </div>
        
    );
}
