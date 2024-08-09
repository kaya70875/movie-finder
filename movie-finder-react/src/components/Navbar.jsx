import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import GetGenreId from './utils/GetGenreId';
import { useAuth } from '../context/AuthContext';

export default function Navbar({setSearchQuery , selectedGenres , setSelectedGenres}) {
  const genres = GetGenreId();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  function handleDropdown(e){
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if(!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

    let currentDropdown
    if(isDropdownButton){
      currentDropdown = e.target.closest("[data-dropdown]")
      currentDropdown.classList.toggle('active')
    }

    const dropdown = document.querySelector("[data-dropdown].active")
    if(dropdown === currentDropdown) return
      dropdown.classList.remove('active');
    
  }

  function handleButtonClick(e){
    const genreId = e.target.id;

    const isActive = e.target.classList.contains('active');
    if(isActive){
      setSelectedGenres([...selectedGenres, genreId]);
    }else{
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    }
  }

  function handleReset(){
    const buttons = document.querySelectorAll('.genre-button.active');
    buttons.forEach(button => button.classList.remove('active'));
    setSelectedGenres([])
  }

  async function handleLogOut(){
    try{
      await logOut();
      navigate('/login');
    }catch(err){
      console.log(err)
    }
  }

  return (
    <nav className="navbar">
        <div className="container">
          <header className='navbar__header'>Movie Finder</header>
          <input type="text" id='inputField' className='navbar-input' onChange={(e) => (
            setSearchQuery(e.target.value)
          )}/>
          <div className="items">
            <ul className="list-items">
              <li><Link to='/' onClick={handleReset}>Home</Link></li>
              <div className="dropdown" data-dropdown>
                <button className='link' data-dropdown-button onClick={e => handleDropdown(e)}>Filter</button>
                  <div className="dropdown__menu">
                    
                    <div className="dropdown__top">
                      <p className='dropdown__header'>Choose a Filter</p>
                      <button className="reset__button" onClick={handleReset}>Reset</button>
                    </div>
                    
                    
                    <div className="all-buttons">
                      {genres.map(genre => (
                        <button className='genre-button' key={genre.id} id={genre.id} onClick={(e) => {
                          e.target.classList.toggle('active');
                          handleButtonClick(e);
                        }}>{genre.name}</button>
                      ))}
                    </div>
                  </div>
                </div>
              
              <li><Link to='/favorites'>Favorites</Link></li>
              <li onClick={handleLogOut}>Log Out</li>
            </ul>
          </div>
        </div>
    </nav>
  )
}
