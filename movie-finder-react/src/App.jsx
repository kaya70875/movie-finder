import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import MainContent from "./components//base-components/MainContent";
import Navbar from "./components//base-components/Navbar";
import MovieDetails from "./components/sites/MovieDetails";
import Register from "./components/auth/Register";
import Favorites from "./components/sites/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import Login from "./components/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Sidebar from "./components/base-components/Sidebar";
import ScrollToTop from "./components/reusables/ScrollToTop";
import Discover from "./components/sites/Discover";
import Watched from "./components/sites/Watched";

import "./style.scss";
import "./sass/base/_global.scss";
import { FilterProvider } from "./context/FilterContext";
import ErrorBoundry from "./components/errors/ErrorBoundry";
import { WatchListProvider } from "./context/WatchListContext";

function AppWithLocation() {
  const location = useLocation();

  const showNavbar =
    location.pathname !== "/movie-finder/login" &&
    location.pathname !== "/movie-finder/register";

  return (
    <WatchListProvider>
      <FilterProvider>
        <AuthProvider>
          <FavoritesProvider>
            <div className="app">
              {showNavbar && (
                <>
                  <Navbar />
                  <Sidebar></Sidebar>
                </>
              )}
              <div className="container">
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route path="/movie-finder/watched" element={<Watched />} />
                  </Route>
                  {/* Public routes */}
                  <Route path="/movie-finder/" element={<MainContent />} />
                  <Route
                    path="/movie-finder/details/:id"
                    element={<MovieDetails />}
                  />
                  <Route
                    path="/movie-finder/favorites"
                    element={<Favorites />}
                  />
                  <Route path="/movie-finder/discover" element={<Discover />} />
                  <Route path="/movie-finder/register" element={<Register />} />
                  <Route path="/movie-finder/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </FavoritesProvider>
        </AuthProvider>
      </FilterProvider>
    </WatchListProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundry fallback="There is an Error in component render!">
      <Router>
        <ScrollToTop />
        <AppWithLocation />
      </Router>
    </ErrorBoundry>
  );
}
