import React, { useEffect, useRef, useState } from 'react'
import {useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import starImage from '../../img/star-new.png'
import CommentSection from './CommentSection';
import {useFavorites} from '../../context/FavoritesContext';
import MovieCard from '../cards/MovieCard';

import '../sites/_MovieDetails.scss';
import MovieTrailers from '../videos/MovieTrailers';
import useClickOutside from '../../hooks/useClickOutside';
import ActorsCard from '../cards/ActorsCard';
import MovieButton from '../buttons/MovieButton';

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
            {data.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title}/>
            )}
          </div>
          <div className="movie__details">
            <div className="header__section">
              <h1>{data.title}</h1>
              <button className="ellipse-button ellipse-button--favorites" onClick={() => handleAddToFavorites(data)}>{titles[data.id] || '🤍'}</button>
            </div>
            <h4 className="release-date">Release Date : {data.release_date}</h4>
            <div className="overview">
              <h4>Overview :</h4>
              <p>{data.overview}</p>
            </div>
            <div className="buttons__section-details">
              <button className='primary-button' onClick={handlePopUp}>Watch Trailer</button>
              <MovieTrailers movieId={id} isVisible={isTrailerVisible} onClose={handleCloseTrailer} ref={popUpRef}></MovieTrailers>
              <MovieButton id={id} />
            </div>
          </div>
          <div className="rating__section">
              <h1>Rating</h1>
              <div className="stars" id='star-element'>
                {isEmpty && <p style={{color: 'red'}}>No Rating</p>}
              </div>
              
          </div>
        </div>
        <div className="container-comment-similar">
          <ActorsCard movieId={id} />
          <MovieCard movies={resultSimilar.slice(0 , 21)} title={'Similar Movies'} showScrollButtons={true}></MovieCard>
          <CommentSection id={id}></CommentSection>
        </div>
        
    </div>

    </>
    
  )
}
