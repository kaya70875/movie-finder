import React, { useRef, useState } from "react";
import "./_TrendingCard.scss";
import useFetch from "../../hooks/useFetch";
import MovieTrailers from "../videos/MovieTrailers";
import MovieButton from "../buttons/MovieButton";
import useClickOutside from "../../hooks/useClickOutside";
import MovieDetailsBlock from "../reusables/movies/MovieDetailsBlock";

export default function TrendingCard({ id }) {
  const data = useFetch(`/movie/${id}?language=en-US&`);

  // Movie Trailer Set Up

  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const popUpRef = useRef(null);

  useClickOutside(popUpRef, setIsTrailerVisible);

  const handlePopUp = () => setIsTrailerVisible(true);
  const handleCloseTrailer = () => setIsTrailerVisible(false);

  // Movie Trailer Set Up

  return (
    <div className="trending__section">
      <div
        className="hero__slider__section"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
        }}
      ></div>
      <div className="trending__info__section">
        <div className="trending__info__content">
          <h5>Today's Recomendation</h5>
          <h1>{data?.title}</h1>
          <div className="movie__info">
            <MovieDetailsBlock data={data} />
          </div>
          <h2>{data.tagline}</h2>
          <h4>{data.overview}</h4>
        </div>
        <div className="trending__buttons__section">
            <button className="primary-button" onClick={handlePopUp}>
                Watch Now!
            </button>
          <MovieTrailers 
            movieId={id}
            isVisible = {isTrailerVisible}
            onClose = {handleCloseTrailer}
            ref={popUpRef}
          />
          <MovieButton  id={id}/>
        </div>
      </div>
    </div>
  );
}
