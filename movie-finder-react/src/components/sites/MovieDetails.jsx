import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CommentSection from "./CommentSection";
import { useFavorites } from "../../context/FavoritesContext";
import MovieCard from "../cards/MovieCard";

import "../sites/_MovieDetails.scss";
import MovieTrailers from "../videos/MovieTrailers";
import useClickOutside from "../../hooks/useClickOutside";
import ActorsCard from "../cards/ActorsCard";
import MovieButton from "../buttons/MovieButton";
import MovieDetailsBlock from "../reusables/movies/MovieDetailsBlock";

export default function MovieDetails() {
  const { id } = useParams();
  const data = useFetch(`/movie/${id}?language=en-US&`);
  const movieCreditsData = useFetch(`/movie/${id}/credits?`);
  
  const producerNames = movieCreditsData.crew?.filter(member => member.job === 'Producer').
  map(producer => producer.name);

  const { titles, handleAddToFavorites } = useFavorites();

  const similarMovies = useFetch(`/movie/${id}/similar?`);
  const resultSimilar = similarMovies?.results || [];

  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const popUpRef = useRef(null);

  useClickOutside(popUpRef, setIsTrailerVisible);

  const handlePopUp = () => setIsTrailerVisible(true);
  const handleCloseTrailer = () => setIsTrailerVisible(false);

  return (
    <>
      <div className="details">
        <div
          className="movie__slide"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 80%, #000 100%), url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
          }}
        ></div>
        <div className="details__container">
          <div className="movie__hero__section">
            <div className="card">
              {data.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title}
                />
              )}
            </div>
            <div className="movie__details">
              <div className="header__section">
                <h1>{data.title}</h1>
              </div>
              <div className="movie__tagline">
                <h4>{data.tagline}</h4>
              </div>
              <div className="movie__info__hero">
                <div className="movie__ratings">
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5805 4.77604C12.2752 3.00516 12.6226 2.11971 13.349 2.01056C14.0755 1.90141 14.6999 2.64083 15.9488 4.11967L16.2719 4.50226C16.6268 4.9225 16.8042 5.13263 17.0455 5.25261C17.2868 5.37259 17.5645 5.38884 18.1201 5.42135L18.6258 5.45095C20.5808 5.56537 21.5583 5.62258 21.8975 6.26168C22.2367 6.90079 21.713 7.69853 20.6656 9.29403L20.3946 9.7068C20.097 10.1602 19.9482 10.3869 19.908 10.6457C19.8678 10.9045 19.9407 11.1662 20.0866 11.6895L20.2195 12.166C20.733 14.0076 20.9898 14.9284 20.473 15.4325C19.9562 15.9367 19.0081 15.6903 17.1118 15.1975L16.6213 15.07C16.0824 14.93 15.813 14.86 15.5469 14.8999C15.2808 14.9399 15.0481 15.0854 14.5828 15.3763L14.1591 15.6412C12.5215 16.6649 11.7027 17.1768 11.0441 16.8493C10.3854 16.5217 10.3232 15.5717 10.1987 13.6717L10.1665 13.1801C10.1311 12.6402 10.1134 12.3702 9.98914 12.1361C9.86488 11.902 9.64812 11.7302 9.21459 11.3867L8.8199 11.0739C7.29429 9.86506 6.53149 9.26062 6.64124 8.55405C6.751 7.84748 7.66062 7.50672 9.47988 6.8252L9.95054 6.64888C10.4675 6.45522 10.726 6.35839 10.9153 6.17371C11.1046 5.98903 11.2033 5.73742 11.4008 5.23419L11.5805 4.77604Z"
                      fill="#24BAEF"
                    />
                    <g opacity="0.5">
                      <path
                        d="M5.31003 9.59277C2.87292 11.9213 1.27501 15.8058 2.33125 22.0002C3.27403 19.3966 5.85726 17.2407 8.91219 15.9528C8.80559 15.3601 8.7583 14.6364 8.70844 13.8733L8.66945 13.2782C8.66038 13.1397 8.65346 13.0347 8.64607 12.9443C8.643 12.9068 8.64012 12.8754 8.63743 12.8489C8.61421 12.829 8.58591 12.8053 8.55117 12.7769C8.47874 12.7177 8.39377 12.6503 8.28278 12.5623L7.80759 12.1858C7.11448 11.6368 6.46884 11.1254 6.02493 10.6538C5.77182 10.385 5.48876 10.0304 5.31003 9.59277Z"
                        fill="#24BAEF"
                      />
                      <path
                        d="M10.3466 15.4231C10.3415 15.3857 10.3365 15.3475 10.3316 15.3086L10.3877 15.41C10.374 15.4144 10.3603 15.4187 10.3466 15.4231Z"
                        fill="#24BAEF"
                      />
                    </g>
                  </svg>
                  <h3>{data.vote_average}</h3>
                </div>
                <button
                    className="ellipse-button ellipse-button--favorites"
                    onClick={(e) => handleAddToFavorites(e, data)}
                  >
                    {titles[data.id] || '🤍'}
                  </button>
              </div>

              <div className="movie__info">
                 <MovieDetailsBlock id={data.id} />
              </div>
              <div className="overview">
                <p>{data.overview}</p>
              </div>

              <div className="producers-info">
                <h5>Producers</h5>
                <p>{producerNames?.join('  | ')}</p>
              </div>
            </div>
          </div>
          <div className="buttons__section-details">
            <button className="primary-button" onClick={handlePopUp}>
              Watch Now !
            </button>
            <button className="secondary-button">Watch Trailer</button>
            <MovieTrailers
              movieId={id}
              isVisible={isTrailerVisible}
              onClose={handleCloseTrailer}
              ref={popUpRef}
            ></MovieTrailers>
            <MovieButton id={id} />
          </div>
        </div>

        <div className="container-comment-similar">
          <ActorsCard movieId={id} />
          <MovieCard
            movies={resultSimilar.slice(0, 21)}
            title={"Similar Movies"}
            content={'You may like this movies.'}
            showScrollButtons={true}
            mainStyle={'column'}
          ></MovieCard>
          <CommentSection id={id}></CommentSection>
        </div>
      </div>
    </>
  );
}
