import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import '../../sass/components/_MainContent.scss';
import './_MovieCard.scss';
import useScroll from '../../hooks/useScroll';
import FilterComponent from '../filters/FilterComponent';
import MovieDetailsBlock from '../reusables/movies/MovieDetailsBlock';

export default function MovieCard({ movies, title , content , mainStyle , showScrollButtons = true , gridType = '' , showFilters = false}) {
    const { titles, handleAddToFavorites } = useFavorites();
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();

    const moviesArray = Array.isArray(movies) ? movies : [movies];
    const [isSingleCard, setIsSingleCard] = useState(moviesArray.length === 1);

    useEffect(() => {
        setIsSingleCard(moviesArray.length === 1);
    }, [moviesArray]);

    const {scrollPosition , scrollContainer} = useScroll(scrollContainerRef);

    function handleNavigate(movieId){
        navigate(`/movie-finder/details/${movieId}`);
    }

    return (
        <div className={`main__content main__content--${mainStyle}`}>
            {title?.length > 0 && (
                <div className="header__wrapper">
                <div className="header-filters">
                    <h2>{title}</h2>
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
            )}
            
            <div className={`cards__wrapper cards__wrapper--${gridType} ${isSingleCard ? 'single-card' : '' }`} ref={scrollContainerRef}>
                {moviesArray.length > 0 ? (moviesArray.map(movie => (
                    movie.poster_path && (
                        <div key={movie.id} className="item" onClick={() => handleNavigate(movie.id)}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h3 style={{minWidth : '200px' , textWrap : 'nowrap'}}>{movie.title}</h3>
                            <div className="movie__info movie__info--card">
                                <MovieDetailsBlock id={movie.id} runtime={false} language={false}/>
                            </div>
                            
                        </div>
                        
                    )
                ))) : (<h3>There is no results for current filter!</h3>)}
                {isSingleCard && (
                    moviesArray.poster_path && (
                        <div key={moviesArray.id} className="item" onClick={() => handleNavigate(movie.id)}>
                            <img src={`https://image.tmdb.org/t/p/w500${moviesArray.poster_path}`} alt={movie.title} />
                            <h3 style={{minWidth : '200px' , textWrap : 'nowrap'}}>{movie.title}</h3>
                            <div className="movie__info movie__info--card">
                                <MovieDetailsBlock id={moviesArray.id} runtime={false} language={false}/>
                            </div>
                            
                        </div>
                ))}
            </div>
        </div>
    );
}
