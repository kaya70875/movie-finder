import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import '../../sass/components/_MainContent.scss';
import './_MovieCard.scss';
import useScroll from '../../hooks/useScroll';
import FilterComponent from '../filters/FilterComponent';

export default function MovieCard({ movies, title , content , mainStyle , showScrollButtons = true , gridType = '' , showFilters = false}) {
    const { titles, handleAddToFavorites } = useFavorites();
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();

    const isMobile = window.matchMedia('(max-width : 450px)').matches;
    const {scrollPosition , scrollContainer} = useScroll(scrollContainerRef);

    function handleNavigate(movieId){
        navigate(`/movie-finder/details/${movieId}`);
    }

    return (
        <div className={`main__content main__content--${mainStyle}`}>
            <div className="header__wrapper">
                <div className="header-filters">
                    <h1>{title}</h1>
                    <p>{content}</p>
                    {showFilters && <FilterComponent />}
                </div>
                {showScrollButtons &&
                <div className="next__icons">
                    <button className='ellipse-button ellipse-button--main' onClick={() => scrollContainer('left')} disabled={scrollPosition === 0 ? true : false}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button className='ellipse-button ellipse-button--main' onClick={() => scrollContainer('right')} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>}
 
            </div>
            <div className={`cards__wrapper cards__wrapper--${gridType}`} ref={scrollContainerRef}>
                {movies.length > 0 ? (movies.map(movie => (
                    movie.poster_path && (
                        <div key={movie.id} className="item" onClick={() => handleNavigate(movie.id)}>
                            
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p>
                        </div>
                        
                    )
                ))) : (<h3>There is no results for current filter!</h3>)}
            </div>
        </div>
    );
}
