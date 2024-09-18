import React, { useEffect } from 'react'
import '../../sass/components/_Sidebar.scss';
import {useNavigate } from 'react-router-dom'

export default function Sidebar() {

  const navigate = useNavigate();
  const isMobile = window.matchMedia('(max-width : 450px)').matches;

  const toggleSidebar = () => {
    const root = document.documentElement;
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    const isCollapsed = sidebar?.classList.toggle('collapsed');
    const text = sidebar?.querySelectorAll('p');

    if (isCollapsed || isMobile) {
        root.style.setProperty('--sidebar-width', '100px');
        
        text?.forEach(p => p.style.display = 'none');
    } else {
        root.style.setProperty('--sidebar-width', '250px');
        text?.forEach(p => p.style.display = 'block');
    }
  };
  useEffect(() => {
    toggleSidebar();
  } , [])

  return (
    <div className="sidebar-main">
      <div className="sidebar collapsed">
        <div className="sidebar__items">
          <div className="hamburger" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-align-justify"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
          </div>
          
          <div className="home" onClick={() => navigate('/movie-finder')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <p id='home'>Home</p>
          </div>
            <div className="discover" onClick={() => navigate('movie-finder/discover')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>                
              <p>Discover</p>
            </div>
            <div className="sidebar__favorites" onClick={() => navigate('movie-finder/favorites')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <p>Favorites</p>
            </div>
            <div className="watchlist" onClick={() => navigate('movie-finder/watched')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            <p>Watched</p>
            </div>
        </div>
      </div>
    </div>
    
  )
}
