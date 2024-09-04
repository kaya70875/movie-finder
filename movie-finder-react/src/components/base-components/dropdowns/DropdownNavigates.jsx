import React from 'react'
import Dropdown from '../../reusables/Dropdown'
import './_DropdownNavigates.scss';
import useFetch from '../../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { useFilter } from '../../../context/FilterContext';
import DropdownTrendingMovies from './DropdownTrendingMovies';

export default function DropdownNavigates() {
  const genres = useFetch('/genre/movie/list?language=en&');
  
  const {dispatch} = useFilter();
  const navigate = useNavigate();

  const handleGenres = (genreId) => {
    dispatch({
      type : 'SET_GENRES',
      payload : [genreId]
    });
  }

  const exploreActions = {
    'Most Popular' : () => {
      navigate('/movie-finder/discover');
      dispatch({type : 'SET_SORT_BY' , payload : 'popularity.desc'});
    },
    'Top Ratings' : () => {
      navigate('/movie-finder/discover');
      dispatch({type : 'SET_SORT_BY' , payload : 'revenue.desc'});
    },
    'Newest' : () => {
      navigate('/movie-finder/discover');
      dispatch({type : 'SET_YEAR' , payload : 2024});
    },
    'For Family' : () => {
      navigate('/movie-finder/discover');
      dispatch({type : 'SET_GENRES' , payload : [10751]});
    },
    'Adult Movies' : () => {
      navigate('/movie-finder/discover');
      dispatch({type : 'SET_ADULT' , payload : true});
    }
    
  }

  return (
    <Dropdown dropdownLabel={'Browse'} buttonStyle={{
                  background : 'none' , border : 'none'
                }} dropdownStyle={{
                  left : '50%' ,top : 0,
                  width : '100vw', position : 'fixed' , background : '#F6F7F9',
                  minHeight : '500px' , marginTop : '120px' , transform: 'translateX(-50%)' , color : 'black'
                }}>
        
        <div className="dropdown__navigates">
            <div className="navigate__dropdown__movie__section">
                <p className='small-bold'>Discover More Content</p>
                <DropdownTrendingMovies />
                
            </div>

            <div className="navigate_dropdown__genres">
                <p className='small-bold'>Genres</p>
                <div className="genres__name">
                  {genres?.genres?.map(genre => (
                    <Link key={genre.id} className='small-normal' 
                    onClick={() => handleGenres(genre.id)}
                    to={'/movie-finder/discover'}>
                      {genre.name}
                      </Link>
                  ))}
                </div>
                
            </div>

            <div className="navigate__dropdown__discover">
                <p className='small-bold'>Explore</p>
                {Object.entries(exploreActions).map(([label , action]) => (
                  <p className='small-normal' key={label}
                  onClick={action}>{label}</p>
                ))}
            </div>
        </div>
    </Dropdown>
    
  )
}
