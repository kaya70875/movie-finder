import React from 'react'
import './_DropdownTrendingMovies.scss';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

export default function DropdownTrendingMovies() {
    const popular = useFetch('/movie/popular?page=4&');
    const navigate = useNavigate();
    
    const handleNavigate = (movie) => {
        navigate(`/movie-finder/details/${movie.id}`);
    };
  return (
    <div className="dropdown__trending__movies">
        {popular?.results?.map((movie) => (
            <div className="dropdown__trending__movies__item" key={movie.id} onClick={() => handleNavigate(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title} />
                <div className="dropdown__trending__movies__item__info">
                    <h4>{movie?.title}</h4>
                    <div className="dropdown__trending__movies__item__details">
                        <p className='small-normal'>{new Date(movie?.release_date).getFullYear()}</p>
                        <h5>{movie?.original_language}</h5>      
                        <h5>{movie?.vote_average}</h5>
                        
                    </div>
                </div>
            </div>
        ))}
    </div>
  )}
