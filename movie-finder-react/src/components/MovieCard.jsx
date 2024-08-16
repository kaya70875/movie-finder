import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieCard({ movies, title , showScrollButtons = true , defaultGrid = true}) {
    const { titles, handleAddToFavorites } = useFavorites();
    const [scrollPosition , setScrollPosition] = useState(0);
    const scrollContainerRef = useRef(null);

    const scrollContainer = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = direction === 'left' ? -900 : 900;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };
    
    useEffect(() => {
        const container = scrollContainerRef.current;
        const handleScroll = () => {
            setScrollPosition(container.scrollLeft);
        }

        container.addEventListener('scroll' , handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        }

    }, []);

    console.log(defaultGrid);

    return (
        <div className="main__content">
            <div className="header__wrapper">
                <h2>{title}</h2>
                {showScrollButtons && <div className="next__icons">
                    <button onClick={() => scrollContainer('left')} disabled={scrollPosition === 0 ? true : false}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button onClick={() => scrollContainer('right')} disabled={scrollPosition > 4000 ? true : false}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>}
                
            </div>
            <div className="cards__wrapper snaps-inline" ref={scrollContainerRef} style={!defaultGrid ? {gridTemplateColumns : 'repeat(4 , auto)',
                gridAutoFlow : 'rows'
            }: {gridTemplateColumns : 'repeat(4 , auto)' , gridAutoFlow : 'column'}}>
                {movies.map(movie => (
                    movie.poster_path && (
                        <div key={movie.id} className="item">
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
                                <Link className='details_button' to={`/details/${movie.id}`}>i</Link>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
