import { useEffect, useReducer } from "react";
import { Movie } from "../../types";
import { useWatchList } from "../../context/WatchListContext";
import { shuffleMovies } from "../../components/utils/Shuffle";
import axios from "axios";
import { auth } from "../../firebase/FirebaseAuth";

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

const useRecommendations = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { watchList } = useWatchList()!;
    console.log('watchList :' , watchList);

    const user = auth.currentUser;

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

      return { state };

}

export default useRecommendations;