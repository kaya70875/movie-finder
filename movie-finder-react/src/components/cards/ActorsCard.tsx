import React, {useRef} from 'react'
import useFetch from '../../hooks/useFetch'
import '../../sass/components/_ActorsCards.scss'
import useScroll from '../../hooks/useScroll';
import { CastResponse } from '../../types';

export default function ActorsCard({movieId} : {movieId : number}) {

    const { data : actors } = useFetch<CastResponse>(`/movie/${movieId}/credits?language=en-US&`);
    const scrollContainerRef = useRef(null);

    const {scrollPosition , scrollContainer} = useScroll(scrollContainerRef);
    

  return (
    <div className="actors-card">
        <div className="actors-header">
            <h2>Actors</h2>
            <div className="next__icons">
                <button className='ellipse-button ellipse-button--scroll' onClick={() => scrollContainer('left')} disabled={scrollPosition === 0 ? true : false}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button className='ellipse-button ellipse-button--scroll' onClick={() => scrollContainer('right')} disabled={scrollPosition > 4000 ? true : false}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
        </div>
        </div>
        
        <div className="actors-container" ref={scrollContainerRef}>
            {actors?.cast.map(actor => (
            <div className="actors">
                <div className="actors-image">
                    {actor.profile_path && (
                        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name}/>
                    )}
                </div>
                <div className="actors-info">
                    <p>{actor.name}</p>
                </div>
            </div>
            ))}
            
        </div>
    </div>
    
  )
}
