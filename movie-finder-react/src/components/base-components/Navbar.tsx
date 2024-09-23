import '../../sass/components/_Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { useEffect, useReducer } from 'react';
import Dropdown from '../reusables/Dropdown';
import { initalState, reducer , REDUCER_ACTION_TYPE} from '../reducer';

import MovieDetailsBlock from '../reusables/movies/MovieDetailsBlock';
import DropdownNavigates from './dropdowns/DropdownNavigates';

import { MovieListResponse } from '../../types';

export default function Navbar() {
  const { logOut , currentUser } = useAuth()!;
  const navigate = useNavigate();

  const [state , dispatch] = useReducer(reducer , initalState);

  const { data } = useFetch<MovieListResponse>(`/search/movie?query=${state.searchQuery}&include_adult=false&language=en-US&`);
  const searchResults = data?.results;

  async function handleLogOut(){
    try{
      await logOut();
      navigate('/movie-finder');
    }catch(err){
      console.log(err)
    }
  }

  const isMobile = window.matchMedia('(max-width : 450px)').matches;

  const dropdownStyle = {
    width : isMobile ? '120px' : '200px',
    height : isMobile ? '180px' : '300px',
    left : isMobile ? '-80px' : '-150px'
  }

  useEffect(() => {
    const dropdownContent = document.querySelector<HTMLElement>('.dropdown__content');
    state.searchQuery && dropdownContent ? dropdownContent.style.display = 'block' : dropdownContent && dropdownContent.style.display === 'none';
    
    if(!state.isFocus && dropdownContent){
      dropdownContent.style.display = 'none';
    }
  } , [state.searchQuery , state.isFocus])

  return (
    <nav className="navbar">
        <div className="container">
          <div className="navbar__left">
            
            <h1 className='navbar__header'>Movie Finder</h1>
            <div className="dropdown" tabIndex={0} onBlur={(e) => {
              if(!e.currentTarget.contains(e.relatedTarget)){
                dispatch({type : REDUCER_ACTION_TYPE.TOGGLE_FOCUS , payload : false});
              }
            }}>
              <input type="text" id='inputField' className='navbar-input' onFocus={() => dispatch({type : REDUCER_ACTION_TYPE.TOGGLE_FOCUS , payload : true})} onChange={(e) => (
                dispatch({type : REDUCER_ACTION_TYPE.SET_SEARCH_QUERY , payload : e.target.value})
              )}/>
              <div className="dropdown__content">
                <h2>Top Results</h2>
                <div className="dropdown__elements">
                  {searchResults?.slice(0 , 12).map(movie => movie.poster_path && (
                    <Link to={`/movie-finder/details/${movie.id}`} state={{ movie }}>
                        <div className="dropdown__item">
                        <div className="item-image">
                          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </div>
                        <div className="movie__info--card">
                          <h3>{movie.title}</h3>
                          <MovieDetailsBlock id={movie.id} runtime={false} language={false}/>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
          <div className="items">
            <ul className="list-items">
              <li>Home</li>
              <li>
                <DropdownNavigates />
              </li>
              
              <li>
                {currentUser ? (
                  <Dropdown dropdownStyle={dropdownStyle}
                  buttonStyle={{borderRadius : '100%' , width : '48px' , height : '48px',
                    border : 'none' ,
                  }} dropdownLabel={'A'}>
                    <div className='profile-list-items'>
                      <ul style={{display : 'flex' , justifyContent : 'space-evenly' , alignItems : 'center'}}>
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li onClick={handleLogOut}>Log Out</li>
                      </ul>
                    </div>
                  </Dropdown>
                ) : (
                  <button className='primary-button' onClick={() => navigate('/movie-finder/login')}>Log In</button>
                )}
                
              </li>
            </ul>
          </div>
        </div>
    </nav>
  )
}
