import React, { useState, useEffect } from "react";
import "../sites/_Favorites.scss";
import MovieCard from "../cards/MovieCard";
import { useFilter } from "../../context/FilterContext";
import { filterAndSortMovies } from "../utils/FilterAndSortMovies";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { sortState , resetFilters } = useFilter();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    resetFilters();
  }, []);

  useEffect(() => {
    const applyFilters = filterAndSortMovies(favorites, sortState);
    setFilteredMovies(applyFilters);
  }, [sortState , favorites]);

  return (
    <div className="main__wrapper">
      <div className="favorites-header">
        <h2>Welcome to Favorites</h2>
        <p>You can add , remove & access your favorites movies from here!</p>
      </div>
      <div className="slide__container">
        <MovieCard
          movies={filteredMovies}
          showScrollButtons={false}
          gridType={'fill'}
          showFilters={true}
          mainStyle={'column'}
          title={"Your Favorites"}
        ></MovieCard>
      </div>
    </div>
  );
}
