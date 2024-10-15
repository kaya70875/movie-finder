import '../../sass/components/_Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { useEffect, useReducer, useState } from 'react';
import Dropdown from '../reusables/Dropdown';
import { initalState, reducer, REDUCER_ACTION_TYPE } from '../reducer';

import MovieDetailsBlock from '../reusables/movies/MovieDetailsBlock';
import DropdownNavigates from './dropdowns/DropdownNavigates';

import { MovieListResponse } from '../../types';

export default function Navbar() {
  const { logOut, currentUser } = useAuth()!;
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initalState);
  const [isOpen , setIsOpen] = useState(false);

  const { data } = useFetch<MovieListResponse>(`/search/movie?query=${state.searchQuery}&include_adult=false&language=en-US&`);
  const searchResults = data?.results;

  async function handleLogOut() {
    try {
      await logOut();
      navigate('/movie-finder');
    } catch (err) {
      console.log(err)
    }
  }

  const isMobile = window.matchMedia('(max-width : 450px)').matches;
  const hamburgerNav = window.matchMedia('(max-width : 768px)').matches;

  const dropdownStyle = {
    width: isMobile ? '120px' : '200px',
    height: isMobile ? '180px' : '300px',
    left: isMobile ? '-80px' : '-150px'
  }

  const handleHamburgerMenu = () => {
    setIsOpen(!isOpen);
  }

  // Display search results when only user writing something.
  useEffect(() => {
    if(state.searchQuery !== '') {
      dispatch({ type: REDUCER_ACTION_TYPE.TOGGLE_FOCUS, payload: true });
    } else {
      dispatch({ type: REDUCER_ACTION_TYPE.TOGGLE_FOCUS, payload: false });
    }
  } , [state.searchQuery])

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__left">
          <h1 className='navbar__header'>Movie Finder</h1>
          <div className="dropdown" data-dropdown-type="navbar" tabIndex={0} onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              dispatch({ type: REDUCER_ACTION_TYPE.TOGGLE_FOCUS, payload: false });
            }
          }}>
            <input type="text" id='inputField' className='navbar-input' onChange={(e) => (
              dispatch({ type: REDUCER_ACTION_TYPE.SET_SEARCH_QUERY, payload: e.target.value })
            )} />
            <div className={`dropdown__content ${state.isFocus ? 'active' : ''}`}>
              <h2>Top Results</h2>
              <div className="dropdown__elements" onClick={() => dispatch({ type: REDUCER_ACTION_TYPE.TOGGLE_FOCUS, payload: false })}>
                {searchResults?.slice(0, 12).map(movie => movie.poster_path && (
                  <Link to={`/movie-finder/details/${movie.id}`} state={{ movie }}>
                    <div className="dropdown__item">
                      <div className="item-image">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                      </div>
                      <div className="navbar-movie-info">
                        <h3>{movie.title}</h3>
                        <MovieDetailsBlock id={movie.id} runtime={false} language={false} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
        <div className="items">
          <ul className={`list-items ${isOpen ? 'active' : ''}`}>
            <li>Home</li>
            <li>
              <DropdownNavigates />
            </li>
            <li>
              {currentUser ? (
                hamburgerNav ? (
                  <div className="mobile-navbar-menu">
                    <ul className="mobile-navbar-menu-list">
                      <li><a>Profile</a></li>
                      <li><a>Settings</a></li>
                      <li onClick={handleLogOut}>Log Out</li>
                    </ul>
                  </div>
                ) : (
                  <Dropdown dropdownStyle={dropdownStyle}
                  buttonStyle={{
                    borderRadius: '100%', width: '48px', height: '48px',
                    border: 'none',
                  }} dropdownLabel={'A'}>
                  <div className='profile-list-items'>
                    <ul style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                      <li><a>Profile</a></li>
                      <li><a>Settings</a></li>
                      <li onClick={handleLogOut}>Log Out</li>
                    </ul>
                  </div>
                </Dropdown>
                )
              ) : (
                <button className='primary-button' onClick={() => navigate('/movie-finder/login')}>Log In</button>
              )}

            </li>
          </ul>
        </div>
        <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={handleHamburgerMenu}>
          <svg width="26" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 9H1" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M33 1H1" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M33 17H1" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M33 25H1" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </nav>
  )
}
