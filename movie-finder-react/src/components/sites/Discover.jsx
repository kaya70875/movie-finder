import React, { useEffect, useState } from 'react';
import '../sites/_Discover.scss';
import useFetch from '../../hooks/useFetch';
import MovieCard from '../cards/MovieCard';
import { useFilter } from '../../context/FilterContext';
import FilterComponent from '../filters/FilterComponent';

export default function Discover() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [baseQuery, setBaseQuery] = useState('/discover/movie?language=en-US&');
    const [query, setQuery] = useState(`${baseQuery}page=${page}&`);

    const {sortState , resetFilters} = useFilter();

    const data = useFetch(query);
    const results = data?.results || [];

    useEffect(() => {
        resetFilters();
    } , [])

    useEffect(() => {
        if (page === 1) {
            setMovies(results);
        }else{
            setMovies(prevMovies => [...prevMovies, ...results]);
            setIsFetching(false);
        }
    }, [results]);

    useEffect(() => {
        setMovies([]);
        setPage(1);

        const newBaseQuery = `/discover/movie?with_genres=${sortState.selectedGenres.join(',')}&year=${sortState.selectedYear}&sort_by=${sortState.selectedSortBy}&language=en-US&include_adult=${sortState.isAdult}&`;
        setBaseQuery(newBaseQuery);

        setQuery(`${newBaseQuery}page=1&`);
    }, [sortState]);

    console.log('queries' , query);

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.clientHeight + window.scrollY >=
                (document.documentElement.scrollHeight || document.documentElement.clientHeight) && !isFetching) {
                setPage(prevPage => prevPage + 1);
                setIsFetching(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        if (page > 1) {
            setQuery(`${baseQuery}page=${page}&`);
        }
    }, [page]);

    return (
        <div className="main__wrapper">
            <div className="discover-content">
                <div className="discover-header-section">
                    <h2>Welcome to Discover!</h2>
                    <p>You can Filter Movies By Genre, Release Date, and More!</p>
                </div>
                <div className="discover-filter-section">
                    <div className="filters-filter">
                        <FilterComponent />
                    </div>

                </div>
                <div className="discover-movie-section">
                    <MovieCard movies={movies} showScrollButtons={false} gridType={'discover'}/>
                </div>
            </div>
        </div>
    );
}
