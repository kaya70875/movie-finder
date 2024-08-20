import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import Dropdown from './reusables/Dropdown';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const [searchQuery , setSearchQuery] = useState('');
  const [isFocus , setIsFocus] = useState(false);

  const {toggleTheme , theme} = useTheme();

  const data = useFetch(`/search/movie?query=${searchQuery}&include_adult=false&language=en-US&`);
  const searchResults = data?.results;

  async function handleLogOut(){
    try{
      await logOut();
      navigate('/movie-finder/login');
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
    const dropdownContent = document.querySelector('.dropdown__content');
    searchQuery ? dropdownContent.style.display = 'block' : dropdownContent.style.display = 'none';
    
    if(!isFocus){
      dropdownContent.style.display = 'none';
    }
  } , [searchQuery , isFocus])

  return (
    <nav className="navbar">
        <div className="container">
          <div className="navbar__left">
            
            <p className='navbar__header'>Movie Finder</p>
            <div className="dropdown" tabIndex={0} onBlur={(e) => {
              if(!e.currentTarget.contains(e.relatedTarget)){
                setIsFocus(false);
              }
            }}>
              <input type="text" id='inputField' className='navbar-input' onFocus={() => setIsFocus(true)} onChange={(e) => (
                setSearchQuery(e.target.value)
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
                        <div className="item-info">
                          <p>{movie.title}</p>
                          <p>{movie.release_date}</p>
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
              <li onClick={toggleTheme}>
                {theme === '' ? <svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-toggle-left"><rect x="1" y="5" width="32" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle></svg>:
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-toggle-right"><rect x="1" y="5" width="32" height="14" rx="7" ry="7"></rect><circle cx="26" cy="12" r="3"></circle></svg> }
              </li>
              <li>
                <Dropdown dropdownStyle={dropdownStyle}
                buttonStyle={{backgroundColor : 'var(--primary-button-color)' , color : 'var(--secondary-background)' , borderRadius : '100%' , width : '48px' , height : '48px',
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
              </li>
            </ul>
          </div>
        </div>
    </nav>
  )
}
