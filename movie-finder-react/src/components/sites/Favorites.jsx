import React, { useState, useEffect } from 'react';
import '../sites/_Favorites.scss';
import MovieCard from '../MovieCard';
import Dropdown from '../reusables/Dropdown';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, [favorites]);
    

    return (
        <div className="favorites">
            <div className="slide__container">
                <div className="fav-container">
                    <h3 className='fav-header'>Favorites</h3>
                    <div className="fav-query-titles">
                        <Dropdown buttonStyle={{
                            border : 'none' , color : 'var(--primary-font-color)' , fontSize : '1rem',
                            background : 'none'

                        }} dropdownLabel={'All'} dropdownStyle={{
                            width : '200px' , height : '250px' , backgroundColor : 'var(--main-background)',
                            fontSize : '.9rem'
                        }}>
                            <div className="profile-list-items">
                                <ul>
                                    <li>All</li>
                                    <li>By Genre</li>
                                    <li>By Year</li>
                                    <li>By Popularity</li>
                                    <li>By Rating</li>
                                </ul>
                            </div>
                            
                        </Dropdown>
                        
                    </div>
                    <MovieCard movies={favorites} showScrollButtons={false} defaultGrid={false}></MovieCard>
                </div>
                
            </div>
        </div>
        
    );
}
