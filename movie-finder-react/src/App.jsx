import { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import MovieDetails from './components/sites/MovieDetails';
import './style.css';

function AppWithLocation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres , setSelectedGenres] = useState([]);

  return (
    <div className="app">
      <Navbar setSearchQuery={setSearchQuery} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <div className="container">
        <Routes>
          <Route path="/page/:page" element={<MainContent searchQuery={searchQuery} selectedGenres={selectedGenres}/>} />
          <Route exact path="/" element={<MainContent searchQuery={searchQuery} selectedGenres={selectedGenres}/>} />
          <Route path="/details/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWithLocation />
    </Router>
  );
}
