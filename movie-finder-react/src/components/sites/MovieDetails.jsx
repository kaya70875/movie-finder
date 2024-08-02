import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import './MovieDetails.css'
import starImage from '../../img/star-new.png'
import CommentSection from './CommentSection';

export default function MovieDetails() {
    const {id} = useParams();
    const data = useFetch(`/movie/${id}?language=en-US&`);
    const [isEmpty , setIsEmpty] = useState(false);

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

  return (
    <>
      <div className="details">
        <div className="details__container">
          <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title}/>
          </div>
          <div className="movie__details">
            <header>{data.title}</header>
            <p className="release-date">Release Date : {data.release_date}</p>
            <div className="overview">
              <header>Overview :</header>
              <p>{data.overview}</p>
            </div>
            <div className="buttons__section-details">
              <button className='button-play'>Play</button>
              <button className='button-comments'>Comments</button>
            </div>
          </div>
          <div className="rating__section">
              <header>Rating</header>
              <div className="stars" id='star-element'>
                {isEmpty && <p style={{color: 'red'}}>No Rating</p>}
              </div>
              
          </div>
        </div>
        <CommentSection id={id}></CommentSection>
    </div>
    
    </>
    
  )
}
