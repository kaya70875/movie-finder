import React from "react";
import "./_DiscoverFilter.scss";
import GetGenreId from "../utils/GetGenreId";
import createYearsList from "../utils/CreateYearsList";
import { useFilter } from "../../context/FilterContext";

export default function DiscoverFilter() {
  const genres = GetGenreId();
  const years = createYearsList();

  const { sortState, handleSelectedGenres, handleSelectedYear ,
    handleSelectedSortBy ,sortOptions} = useFilter();
  const { selectedGenres, selectedYear , selectedSortBy} = sortState;

  // Function to toggle genre selection
  const handleGenreToggle = (genreId) => {
    handleSelectedGenres(genreId);
  };

  // Function to toggle year selection
  const handleYearToggle = (year) => {
    handleSelectedYear(year);
  };

  return (
    <div className="discover__filter">
      <div className="discover__filter__header">
        <h2>Categories</h2>
      </div>
      <div className="discover__filter__elements">
        {genres.map((genre) => (
          <div
            className="discover__filter__item"
            key={genre.id}
            onClick={() => handleGenreToggle(genre.id)}
          >
            <input
              type="checkbox"
              id={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleGenreToggle(genre.id)}
            />
            <p className="small-normal--white">{genre.name}</p>
          </div>
        ))}
      </div>
      <div className="discover__filter__header">
        <h2>Movies By Year</h2>
      </div>
      <div className="discover__filter__elements">
        {years.map((year) => (
          <div
            className="discover__filter__item"
            key={year}
            onClick={() => handleYearToggle(year)}
          >
            <input
              type="checkbox"
              checked={selectedYear === year}
              onChange={() => handleYearToggle(year)}
            />
            <p className="small-normal--white">{year}</p>
          </div>
        ))}
      </div>
      <div className="discover__filter__header">
        <h2>Sort Movies By</h2>
      </div>
      <div className="discover__filter__elements">
        {sortOptions.map((option) => (
          <div
            className="discover__filter__item"
            key={option.value}
            onClick={() => handleSelectedSortBy(option.value)}
          >
            <input
              type="checkbox"
              checked={selectedSortBy === option.value}
              onChange={() => handleSelectedSortBy(option.value)}
            />
            <p className="small-normal--white">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
