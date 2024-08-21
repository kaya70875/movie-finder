import React, { useEffect, useRef, useState } from 'react'
import {useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import starImage from '../../img/star-new.png'
import CommentSection from './CommentSection';
import {useFavorites} from '../../context/FavoritesContext';
import MovieCard from '../MovieCard';

import '../sites/_MovieDetails.scss';
import MovieTrailers from '../videos/MovieTrailers';
import useClickOutside from '../../hooks/useClickOutside';

export default function MovieDetails() {
    const {id} = useParams();
    const data = useFetch(`/movie/${id}?language=en-US&`);
    const [isEmpty , setIsEmpty] = useState(false);

    const {titles , handleAddToFavorites} = useFavorites();

    const similarMovies = useFetch(`/movie/${id}/similar?`);
    const resultSimilar = similarMovies?.results || [];

    const [isTrailerVisible , setIsTrailerVisible] = useState(false);
    const popUpRef = useRef(null);

    useClickOutside(popUpRef , setIsTrailerVisible);

    useEffect(() => {
      if (data && data.vote_average) {
        const imageSection = document.getElementById('star-element');
        const intStar = parseInt(data.vote_average / 2);
        imageSection.innerHTML = '';

        setIsEmpty(false)
  
        for (let i = 0; i < intStar; i++) {
          const img = document.createElement('img');
          img.setAttribute('src', starImage);
          imageSection.append(img);
        }
      }

      else if(data.vote_average === 0){
        setIsEmpty(true)
      }
    }, [data]);

    const handlePopUp = () => setIsTrailerVisible(true);
    const handleCloseTrailer = () => setIsTrailerVisible(false);

  return (
    <>
      <div className="details">
        <div className="details__container">
          <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title}/>
          </div>
          <div className="movie__details">
            <div className="header__section">
              <header>{data.title}</header>
              <button className="favorites_button" onClick={() => handleAddToFavorites(data)}>{titles[data.id] || '🤍'}</button>
            </div>
            <p className="release-date">Release Date : {data.release_date}</p>
            <div className="overview">
              <header>Overview :</header>
              <p>{data.overview}</p>
            </div>
            <div className="buttons__section-details">
              <button className='primary-button' onClick={handlePopUp}>Watch Trailer</button>
              <MovieTrailers movieId={id} isVisible={isTrailerVisible} onClose={handleCloseTrailer} ref={popUpRef}></MovieTrailers>
              <button className='secondary-button'>Comments</button>
            </div>
          </div>
          <div className="rating__section">
              <header>Rating</header>
              <div className="stars" id='star-element'>
                {isEmpty && <p style={{color: 'red'}}>No Rating</p>}
              </div>
              
          </div>
        </div>
        <div className="container-comment-similar">
          <MovieCard movies={resultSimilar.slice(0 , 21)} title={'Similar Movies'} showScrollButtons={true}></MovieCard>
          <CommentSection id={id}></CommentSection>
        </div>
        
    </div>

    </>
    
  )
}
