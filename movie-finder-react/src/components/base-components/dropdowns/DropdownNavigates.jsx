import React from 'react'
import Dropdown from '../../reusables/Dropdown'
import MovieCard from '../../cards/MovieCard';
import './_DropdownNavigates.scss';
import useFetch from '../../../hooks/useFetch';

export default function DropdownNavigates() {
  const popular = useFetch('/movie/popular?');

  return (
    <Dropdown dropdownLabel={'Browse'} buttonStyle={{
                  background : 'none' , border : 'none'
                }} dropdownStyle={{
                  left : '50%' ,top : 0,
                  width : '100vw', position : 'fixed' , background : 'var(--primary-font-color)',
                  minHeight : '500px' , marginTop : '120px' , transform: 'translateX(-50%)' , color : 'black'
                }}>
        
        <div className="dropdown__navigates">
            <div className="navigate__dropdown__movie__section">
                <p className='small-bold'>Movie Of The Week</p>
                <MovieCard movies={popular?.results?.[0]} 
                showFilters={false} 
                showScrollButtons={false}
                />
            </div>

            <div className="navigate__dropdown__discover">
                <p className='small-bold'>Discover</p>
            </div>

            <div className="navigate_dropdown__genres">
                <p className='small-bold'>Genres</p>
            </div>
        </div>
    </Dropdown>
    
  )
}
