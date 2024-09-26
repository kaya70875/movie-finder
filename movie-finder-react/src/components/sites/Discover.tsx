import { useEffect, useRef, useState } from "react";
import "../sites/_Discover.scss";
import useFetch from "../../hooks/useFetch";
import MovieCard from "../cards/MovieCard";
import { useFilter } from "../../context/FilterContext";
import DiscoverFilter from "../filters/DiscoverFilter";
import GetGenreId from "../utils/GetGenreId";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised, faLaugh, faBinoculars ,faMountainSun,faUserSecret , faBook, faUsers, faMask } from '@fortawesome/free-solid-svg-icons';
import ScrollToBottom from "../utils/scroll/ScrollToBottom";
import { MovieListResponse , Movie} from "../../types";
import { REDUCER_ACTION_TYPE } from "../../context/FilterContext";


export default function Discover() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [baseQuery, setBaseQuery] = useState("/discover/movie?language=en-US&");
  const [query, setQuery] = useState(`${baseQuery}page=${page}&`);

  const { sortState, resetFilters, dispatch} = useFilter();
  const movieCardRef = useRef(null);

  const {data} = useFetch<MovieListResponse>(query);
  const results = data?.results || [];

  const genres = GetGenreId();

  const genreIcons = {
    Action: faFistRaised,
    Comedy: faLaugh,
    Adventure: faBinoculars,
    Animation: faMountainSun,
    Crime: faUserSecret,
    Documentary: faBook,
    Drama: faMask,
    Family: faUsers,
  };

  useEffect(() => {
    resetFilters();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setMovies(results);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...results]);
      setIsFetching(false);
    }
  }, [results]);

  useEffect(() => {
    setMovies([]);
    setPage(1);

    const newBaseQuery = `/discover/movie?with_genres=${sortState?.selectedGenres?.join(
      ","
    )}&year=${sortState.selectedYear}&sort_by=${
      sortState.selectedSortBy
    }&language=en-US&include_adult=${sortState.isAdult}&`;
    setBaseQuery(newBaseQuery);

    setQuery(`${newBaseQuery}page=1&`);
  }, [sortState]);

  useEffect(() => {
    const movieCardContainer : HTMLElement = movieCardRef.current!;

    const handleScroll = () => {
      if (
        movieCardContainer.scrollTop + movieCardContainer.clientHeight >=
          movieCardContainer.scrollHeight - 10 &&
        !isFetching
      ) {
        setPage((prevPage) => prevPage + 1);
        setIsFetching(true);
      }
    };

    movieCardContainer.addEventListener("scroll", handleScroll);
    return () => movieCardContainer.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (page > 1) {
      setQuery(`${baseQuery}page=${page}&`);
    }
  }, [page]);

  return (
    <div className="main__wrapper">
      <div className="discover__header__wrapper">
        <div className="discover__header">
          <h1>Explore the Cinematic Universe</h1>
          <p>
            Dive into a world of movies tailored to your tastes. Use our powerful
            filters to discover films by genre, year, and popularity. Your next
            favorite movie is just a click away!
          </p>
        </div>
      </div>

      <div className="discover__genres__preview">
        <h2>Explore Genres</h2>
        <div className="discover__genres__preview__items">
          {genres.slice(0, 8).map((genre) => (
            <div key={genre.id} className="discover__genres__preview__item" onClick={() => {
                dispatch({ type: REDUCER_ACTION_TYPE.SET_GENRES, payload: [genre.id] });
                ScrollToBottom();
            }}>
              <FontAwesomeIcon icon={genreIcons[genre.name]} />
              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="discover__button__section" style={{marginTop : '70px'}}>
        <button className="primary-button" onClick={ScrollToBottom}>Discover Now!</button>
      </div>

      <div className="discover-content">
        <DiscoverFilter />
        <div className="discover-movie-section" ref={movieCardRef}>
          <MovieCard
            movies={movies}
            showScrollButtons={false}
            gridType={"discover"}
            mainStyle={"single"}
          />
        </div>
      </div>
    </div>
  );
}
