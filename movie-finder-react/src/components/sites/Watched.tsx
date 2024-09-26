import React, { useEffect, useReducer, useState } from "react";
import "../sites/_Watched.scss";
import MovieCard from "../cards/MovieCard";
import { auth } from "../../firebase/FirebaseAuth";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { shuffleMovies } from "../utils/Shuffle";
import { useFilter } from "../../context/FilterContext";
import { filterAndSortMovies } from "../utils/FilterAndSortMovies";
import { useWatchList } from "../../context/WatchListContext";
import StatsCard from "../cards/StatsCard";
import useFetch from "../../hooks/useFetch";
import { Movie, MovieListResponse } from "../../types";

const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API;

type InitialState = {
  movies: Movie[],
  watchedMovieDetails: Movie[],
  loading: boolean,
};

const initialState = {
  movies: [],
  watchedMovieDetails: [],
  loading: false,
};

enum REDUCER_ACTION_TYPE {
  SET_MOVIES,
  SET_WATCHED_MOVIES,
  SET_LOADING,
}

type ReducerAction = 
 | {type : REDUCER_ACTION_TYPE.SET_MOVIES, payload : Movie[]}
 | {type : REDUCER_ACTION_TYPE.SET_WATCHED_MOVIES, payload : Movie[]}
 | {type : REDUCER_ACTION_TYPE.SET_LOADING, payload : boolean}


const reducer = (state : InitialState, action : ReducerAction) : InitialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_MOVIES:
      return { ...state, movies: action.payload };
    case REDUCER_ACTION_TYPE.SET_WATCHED_MOVIES:
      return { ...state, watchedMovieDetails: action.payload };
    case REDUCER_ACTION_TYPE.SET_LOADING:
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
          dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: true });

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
          const shuffledList = shuffleMovies(filteredMovies);

          // Update states
          dispatch({
            type: REDUCER_ACTION_TYPE.SET_WATCHED_MOVIES,
            payload: watchedMovieDetailsData,
          });
          dispatch({ type: REDUCER_ACTION_TYPE.SET_MOVIES, payload: shuffledList });
        } catch (error) {
          console.error("Error fetching movie data", error);
        } finally {
          dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: false });
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
            {topRated && (
              <MovieCard 
              movies={topRated}
              title="Discover More Content"
              content={'Add More Movies To Your Watchlist !'}
              showScrollButtons={true}
              showFilters={false}
              />
            )}
            
        </div>
    </div>
  );
}
