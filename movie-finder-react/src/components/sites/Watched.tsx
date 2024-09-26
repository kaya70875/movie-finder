import React, { useEffect, useReducer, useState } from "react";
import "../sites/_Watched.scss";
import MovieCard from "../cards/MovieCard";
import { auth } from "../../firebase/FirebaseAuth";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { shuffleArray } from "../utils/Shuffle";
import { useFilter } from "../../context/FilterContext";
import { filterAndSortMovies } from "../utils/FilterAndSortMovies";
import { useWatchList } from "../../context/WatchListContext";
import StatsCard from "../cards/StatsCard";
import useFetch from "../../hooks/useFetch";
import { Movie, MovieListResponse } from "../../types";

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
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const user = auth.currentUser;
  const { sortState } = useFilter();
  const { watchList } = useWatchList()!;

  const {data} = useFetch<MovieListResponse>('/movie/top_rated?language=en-US&page=2&');
  const topRated = data?.results;

  useEffect(() => {
    if (user && watchList.length) {
      const fetchHistory = async () => {
        try {
          dispatch({ type: "SET_LOADING", payload: true });

          // Fetch movie details and similar movies
          const watchedMovieDetailsResponses = await Promise.all(
            watchList.map((movieId) =>
              axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
              )
            )
          );

          const similarMoviesResponses = await Promise.all(
            watchList.map((movieId) =>
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
              !watchList.includes(movie.id)
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
  }, [user , watchList]);

  useEffect(() => {
    const applyFilters = filterAndSortMovies(state.movies, sortState);
    setFilteredMovies(applyFilters);
  }, [sortState, state.movies]);

  return (
    <div className="main__wrapper">
      <div className="watched__header__wrapper">
        <div className="watched-header">
          <h1>Watched List</h1>
          <p>Personalized Movie Dashboard. Get recommendations based on movies that you watched!</p>
        </div>
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
                movies={filteredMovies.slice(0, 12)}
                title="Based On Your Watch History"
                showScrollButtons={false}
                gridType={"fill"}
                mainStyle={'single'}
                showFilters={true}
              />
            </>
          )}
          <StatsCard />
          <h1 style={{display : 'flex', alignItems : 'center' , justifyContent : 'center' , padding : '2rem'}}>Discover More</h1>
        </div>

      ) : (
        <div className="no-watchlist">
          <h2>There is nothing here !</h2>
          <p>Add some movies to get started.</p>
        </div>
      )}
        <div className="content__more">
            <MovieCard 
            movies={topRated!}
            title="Discover More Content"
            content={'Add More Movies To Your Watchlist !'}
            showScrollButtons={true}
            showFilters={false}

            />
        </div>
    </div>
  );
}
