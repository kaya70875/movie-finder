import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import MovieDetails from './components/sites/MovieDetails';
import Register from './components/auth/Register';
import Favorites from './components/sites/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import Login from './components/auth/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/reusables/ScrollToTop';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Discover from './components/sites/Discover';
import Watched from './components/sites/Watched';

import './style.scss';

function AppWithLocation() {
  const location = useLocation();
  const {theme} = useTheme();

  const showNavbar = location.pathname !== '/movie-finder/login' && location.pathname !== '/movie-finder/register';

  return (
      <AuthProvider>
        <FavoritesProvider>
          <div className="app" data-theme={theme}>
            {showNavbar && (
              <>
                <Navbar/>
                <Sidebar></Sidebar>
              </>
            )}
            <div className="container">
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/movie-finder" element={<MainContent/>} />
                  <Route path="/movie-finder/details/:id" element={<MovieDetails />} />
                  <Route path="/movie-finder/favorites" element={<Favorites />} />
                  <Route path="/movie-finder/discover" element={<Discover />} />
                  <Route path="/movie-finder/watched" element={<Watched />}/>
                </Route>
                {/* Public routes */}
                <Route path="/movie-finder/register" element={<Register />} />
                <Route path="/movie-finder/login" element={<Login />} />
              </Routes>
            </div>
          </div>
        </FavoritesProvider>
      </AuthProvider>
    
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <AppWithLocation />
      </Router>
    </ThemeProvider>
    
  );
}
