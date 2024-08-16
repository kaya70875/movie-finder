import React, { useEffect, useRef, useState } from 'react'
import './Discover.css'
import useFetch from '../../hooks/useFetch'
import MovieCard from '../MovieCard'
import GetGenreId from '../utils/GetGenreId'
import DropdownFilter from '../reusables/DropdownFilter'

export default function Discover() {
    const [movies , setMovies] = useState([]);
    const [page , setPage] = useState(1);
    const [isFetching , setIsFetching] = useState(false);

    const filterRef = useRef();

    const [selectedGenres , setSelectedGenres] = useState([]);
    const [selectedYear , setSelectedYear] = useState(null);
    const [selectedSortBy , setSelectedSortBy] = useState('');

    const genres = GetGenreId() || [];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);
    const sortOptions = [
        { label: 'Most Popular', value: 'popularity.desc' },
        { label: 'Most Votes', value: 'vote_count.desc' },
        { label: 'Highest Rated', value: 'vote_average.desc' },
        { label: 'Revenue' , value : 'revenue.desc'}
      ];

    const filterQuery = `/discover/movie?with_genres=${selectedGenres.join(',')}&year=${selectedYear}&language=en-US&page=${page}&sort_by=${selectedSortBy}&`;
    const data = useFetch(filterQuery);
    const results = data?.results || [];

    useEffect(() => {
        if(results.length > 0) {
            setMovies(prevMovies => [...prevMovies , ...results]);  
            setIsFetching(false);
        }
    } , [results])

    useEffect(() => {
        setMovies([]);
        setPage(1);
    } , [filterQuery])

    useEffect(() => {
        const handleScroll = () => {
        if (document.documentElement.clientHeight + window.scrollY >=
            (document.documentElement.scrollHeight ||
              document.documentElement.clientHeight)){
            setPage(prevPage => prevPage + 1);
            setIsFetching(true);
        }
    
    };
    
        window.addEventListener('scroll', handleScroll); 
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isFetching]);

      function handleSelectedGenres(genreId){
        setSelectedGenres(prevGenres => {
            if(prevGenres.includes(genreId)){
                return prevGenres.filter(id => id !== genreId)
            }else{
                return[...prevGenres , genreId];
            }
        })
      }

      const handleSelectedYear = year => {
        setSelectedYear(prevYear => prevYear === year ? null : year);
      }

      const handleSelectedSortBy = sort => {
        setSelectedSortBy(prevSort => prevSort === sort ? null : sort);
      }

      const handleFilters = () => {
        filterRef.current.classList.toggle('active');
      }

  return (
    <div className="discover-d">
        <div className="discover-content">
            <div className="discover-header-section">
                <h2>Welcome to Discover !</h2>
                <p>You can Filter Movies By Genre , Release Date and More ! </p>
            </div>
            <div className="discover-filter-section">
                <div className="discover-cards-header">
                    <h3>All Movies</h3>
                </div>
                <div className="filters-filter" ref={filterRef} onClick={handleFilters}>
                    <DropdownFilter 
                            label={
                                <div className='discover-icons'>
                                    <p>Genre</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                                
                            }
                            items={genres.map(genre => ({label : genre.name ,value : genre.id}))}
                            onSelect={handleSelectedGenres}
                            selectedItems={selectedGenres}
                        />

                        <DropdownFilter 
                            label={
                                <div className='discover-icons'>
                                    <p>Release Date</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>                                </div>
                            }
                            items={years.map(year => ({label : year , value : year}))}
                            onSelect={handleSelectedYear}
                            selectedItems={[selectedYear]}
                        />

                        <DropdownFilter 
                            label={
                                <div className='discover-icons'>
                                    <p>By Popularity</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>                                </div>
                            }
                            items={sortOptions}
                            onSelect={handleSelectedSortBy}
                            selectedItems={[selectedSortBy]}
                        />
                </div>
                    
            </div>
            <div className="discover-movie-section">
                <MovieCard movies={movies} title={''} showScrollButtons={false} defaultGrid={false}/>
            </div>
        </div>
    </div>
  )
}
