import { useState, useEffect } from "react";
import "../sites/_Favorites.scss";
import MovieCard from "../cards/MovieCard";
import { useFilter } from "../../context/FilterContext";
import { filterAndSortMovies } from "../utils/FilterAndSortMovies";
import { Movie } from "../../types";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const { sortState, resetFilters } = useFilter();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || '[]');
    setFavorites(savedFavorites);
    resetFilters();
  }, []);

  useEffect(() => {
    const applyFilters = filterAndSortMovies(favorites, sortState);
    setFilteredMovies(applyFilters);
  }, [sortState, favorites]);

  return (
    <div className="main__wrapper">
      <div className="favorites__header__wrapper">
        <div className="favorites-header">
          <h1>Welcome to Favorites</h1>
          <p>
            Welcome to Your Favorites! This is your personal movie collection,
            curated by you. You can add , remove & access your favorites movies
            from here!
          </p>
        </div>
      </div>
      <div className="slide__container">
          <MovieCard
            movies={filteredMovies}
            showScrollButtons={false}
            gridType={"fill"}
            showFilters={true}
            mainStyle={"single"}
            title={"Your Favorites"}
            headerStyle="forFilters"
          ></MovieCard>
        </div>
    </div>
  );
}
