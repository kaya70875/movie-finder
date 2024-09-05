import React, { useEffect, useReducer, useState } from "react";
import "../sites/_Watched.scss";
import MovieCard from "../cards/MovieCard";
import { auth } from "../../firebase/FirebaseAuth";
import { getMovieHistory } from "../../firebase/movieHistory";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { shuffleArray } from "../utils/Shuffle";
import { useFilter } from "../../context/FilterContext";
import { filterAndSortMovies } from "../utils/FilterAndSortMovies";

const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API;

const initialState = {
  movies: [],
  watchedMovieDetails: [],
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_WATCHED_MOVIES":
      return { ...state, watchedMovieDetails: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function Watched() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const user = auth.currentUser;
  const { sortState } = useFilter();

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          const watchedMovieIds = await getMovieHistory(user.uid);

          // Fetch movie details and similar movies
          const watchedMovieDetailsResponses = await Promise.all(
            watchedMovieIds.map((movieId) =>
              axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
              )
            )
          );

          const similarMoviesResponses = await Promise.all(
            watchedMovieIds.map((movieId) =>
              axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`
              )
            )
          );

          // Extract data
          const watchedMovieDetailsData = watchedMovieDetailsResponses.map(
            (res) => res.data
          );
          const similarMovies = similarMoviesResponses.flatMap(
            (res) => res.data.results || []
          );

          // Filter out movies that are already watched
          const filteredMovies = similarMovies.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id) &&
              !watchedMovieIds.includes(movie.id.toString())
          );

          // Shuffle
          const shuffledList = shuffleArray(filteredMovies);

          // Update states
          dispatch({
            type: "SET_WATCHED_MOVIES",
            payload: watchedMovieDetailsData,
          });
          dispatch({ type: "SET_MOVIES", payload: shuffledList });
        } catch (error) {
          console.error("Error fetching movie data", error);
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      };

      fetchHistory();
    }
  }, [user]);

  useEffect(() => {
    const applyFilters = filterAndSortMovies(state.movies, sortState);
    setFilteredMovies(applyFilters);
  }, [sortState, state.movies]);

  return (
    <div className="main__wrapper">
      <div className="watched-header">
        <h2>Watched List</h2>
        <p>Get recommendations based on movies that you watched!</p>
      </div>

      {state.movies.length !== 0 ? (
        <div className="slide__container">
          {state.loading ? (
            <Skeleton
              count={2}
              height={500}
              baseColor="var(--main-background)"
              enableAnimation={true}
            />
          ) : (
            <>
              <MovieCard
                movies={state.watchedMovieDetails}
                title="You Watched"
                showScrollButtons={true}
                showFilters={false}
                content={'Movies You Recently Watched'}
                mainStyle={'column'}
                
              />
              <MovieCard
                movies={filteredMovies}
                title="Recommended For You"
                showScrollButtons={false}
                gridType={"fill"}
                mainStyle={'single'}
                showFilters={'true'}
              />
            </>
          )}
        </div>
      ) : (
        <div className="no-watchlist">
          <h2>There is nothing here !</h2>
          <p>Add some movies to get started.</p>
        </div>
      )}
    </div>
  );
}
