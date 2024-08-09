import { useState } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import MovieDetails from './components/sites/MovieDetails';
import Register from './components/auth/Register';
import './style.css';
import Favorites from './components/sites/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import Login from './components/auth/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';

function AppWithLocation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const location = useLocation();

  // Conditionally render Navbar based on the current route
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <AuthProvider>
      <FavoritesProvider>
        <div className="app">
          {showNavbar && (
            <Navbar setSearchQuery={setSearchQuery} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
          )}
          <div className="container">
            <Routes>
              {/* Wrap protected routes with PrivateRoute */}
              <Route element={<PrivateRoute />}>
                <Route path="/page/:page" element={<MainContent searchQuery={searchQuery} selectedGenres={selectedGenres} />} />
                <Route path="/" element={<MainContent searchQuery={searchQuery} selectedGenres={selectedGenres} />} />
                <Route path="/details/:id" element={<MovieDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Route>
              {/* Public routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppWithLocation />
    </Router>
  );
}
