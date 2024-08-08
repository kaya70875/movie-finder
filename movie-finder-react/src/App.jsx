  import { useState } from 'react';
  import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
  import MainContent from './components/MainContent';
  import Navbar from './components/Navbar';
  import MovieDetails from './components/sites/MovieDetails';
  import './style.css';
  import Favorites from './components/sites/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';

  function AppWithLocation() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres , setSelectedGenres] = useState([]);

    return (
      <FavoritesProvider>
        <div className="app">
        <Navbar setSearchQuery={setSearchQuery} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
        <div className="container">
          <Routes>
            <Route path="/page/:page" element={<MainContent searchQuery={searchQuery} selectedGenres={selectedGenres}/>} />
            <Route exact path="/" element={<MainContent searchQuery={searchQuery} selectedGenres={selectedGenres}/>} />
            <Route path="/details/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
      </FavoritesProvider>
      
    );
  }

  export default function App() {
    return (
      <Router>
        <AppWithLocation />
      </Router>
    );
  }
