import React, { forwardRef } from 'react'
import useFetch from '../../hooks/useFetch';
import './_MovieTrailers.scss';

const MovieTrailers = forwardRef(({movieId , isVisible , onClose} , ref) => {

    const trailerData = useFetch(`/movie/${movieId}/videos?language=en-US&`);
    const trailerVideo = trailerData?.results?.find(video => video.site === 'YouTube' && video.type === 'Trailer') || [];

    if(!isVisible) return null;
    
  return (
    <div className='popup'>
      <div className="popup-content" ref={ref}>
        <span class="close" onClick={onClose}>×</span>
        <div style={{height : '10px'}}>
        </div>
        {trailerVideo ? (
              <iframe width="560"
              height='315'
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              >
              </iframe>
          ) : (
              <p style={{color : 'white'}}>No Trailer Available</p>
          )}
      </div>
        
    </div>
  )
})

export default MovieTrailers;
