import React, { useEffect, useState } from "react";
import "../sites/_Watched.scss";
import MovieCard from "../MovieCard";
import { auth } from "../../firebase/FirebaseAuth";
import { getMovieHistory } from "../../firebase/movieHistory";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

import { shuffleArray } from "../utils/Shuffle";

const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API;

export default function Watched() {
  const [movies, setMovies] = useState([]);
  const [watchedMovieDetails, setWatchedMovieDetails] = useState([]);
  const [loading , setLoading] = useState(true);
  
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        try {
          setLoading(true);
          const watchedMovieIds = await getMovieHistory(user.uid);

          // Fetch movie details and similar movies
          const watchedMovieDetailsResponses = await Promise.all(
            watchedMovieIds.map(movieId =>
              axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
            )
          );

          const similarMoviesResponses = await Promise.all(
            watchedMovieIds.map(movieId =>
              axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`
              )
            )
          );

          // Extract data
          const watchedMovieDetailsData = watchedMovieDetailsResponses.map(res => res.data);
          const similarMovies = similarMoviesResponses.flatMap(res => res.data.results || []);

          // Filter out movies that are already watched
          const filteredMovies = similarMovies.filter(
            (movie, index, self) =>
              index === self.findIndex(m => m.id === movie.id) &&
              !watchedMovieIds.includes(movie.id.toString())
          );

          // Shuffle
          const shuffledList = shuffleArray(filteredMovies);
          
          // Update states
          setWatchedMovieDetails(watchedMovieDetailsData);
          setMovies(shuffledList);
        } catch (error) {
          console.error("Error fetching movie data", error);
        } finally{
          setLoading(false);
        }
      };

      fetchHistory();
    }
  }, [user]);

  return (
    <div className="watched">
      <div className="watched-header">
        <h2>Watched List</h2>
        <p>Get recommendations based on movies that you watched!</p>
      </div>

      {movies.length !== 0 ? (
        <div className="slide__container">
        {loading ? (
          <Skeleton count={2} height={500} baseColor="var(--main-background)" enableAnimation={true}/>
        ) : (
          <>
            <MovieCard movies={watchedMovieDetails} title="You Watched" showScrollButtons={true} />
            <MovieCard movies={movies} title="Recommended For You" showScrollButtons={true} />
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
