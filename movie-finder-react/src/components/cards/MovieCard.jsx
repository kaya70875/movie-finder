import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import '../../sass/components/_MainContent.scss';
import './_MovieCard.scss';
import useScroll from '../../hooks/useScroll';
import FilterComponent from '../filters/FilterComponent';

export default function MovieCard({ movies, title , showScrollButtons = true , gridType = '' , showFilters = false}) {
    const { titles, handleAddToFavorites } = useFavorites();
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();

    const isMobile = window.matchMedia('(max-width : 450px)').matches;
    const {scrollPosition , scrollContainer} = useScroll(scrollContainerRef);

    function handleMobileNavigate(movieId){
        navigate(`/movie-finder/details/${movieId}`);
    }

    return (
        <div className="main__content">
            <div className="header__wrapper">
                <div className="header-filters">
                    <h2>{title}</h2>
                    {showFilters && <FilterComponent />}
                </div>
                {showScrollButtons && <div className="next__icons">
                    <button onClick={() => scrollContainer('left')} disabled={scrollPosition === 0 ? true : false}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button onClick={() => scrollContainer('right')} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>}
                
            </div>
            <div className={`cards__wrapper cards__wrapper--${gridType}`} ref={scrollContainerRef}>
                {movies.length > 0 ? (movies.map(movie => (
                    movie.poster_path && (
                        <div key={movie.id} className="item" onClick={() => isMobile && handleMobileNavigate(movie.id)}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="item__overlay">
                                <button
                                    onClick={(e) => {
                                        handleAddToFavorites(movie);
                                        e.target.classList.toggle('active');
                                    }}
                                    className='ellipse-button ellipse-button--favorites'
                                    id="favorites-button"
                                >
                                    {titles[movie.id] || '🤍'}
                                </button>
                                <Link className='ellipse-button ellipse-button--details' to={`/movie-finder/details/${movie.id}`}>i</Link>
                            </div>
                        </div>
                    )
                ))) : (<h3>There is no results for current filter!</h3>)}
            </div>
        </div>
    );
}
