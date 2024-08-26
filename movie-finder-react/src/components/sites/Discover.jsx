import React, { useEffect, useReducer, useState } from 'react';
import '../sites/_Discover.scss';
import useFetch from '../../hooks/useFetch';
import MovieCard from '../MovieCard';
import GetGenreId from '../utils/GetGenreId';
import DropdownFilter from '../reusables/DropdownFilter';
import ChevronIcon from '../reusables/ChevronIcon';

const initialState = {
    selectedGenres : [],
    selectedYear : null,
    selectedSortBy : ''
}

function sortReducer(state , action){
    switch(action.type){
        case 'SET_GENRES' :
            return {...state , selectedGenres : action.payload};
        case 'SET_YEAR' : 
            return{...state , selectedYear : action.payload};
        case 'SET_SORT_BY' : 
            return {...state , selectedSortBy : action.payload};
        default:
            return state;
    }
}

export default function Discover() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [baseQuery, setBaseQuery] = useState('/discover/movie?language=en-US&');
    const [query, setQuery] = useState(`${baseQuery}page=${page}&`);

    const [isFilterOpen , setIsFilterOpen] = useState({
        genre : false,
        year : false,
        popularity : false
    });

    const [sortState , dispatch] = useReducer(sortReducer , initialState);

    const genres = GetGenreId() || [];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);
    const sortOptions = [
        { label: 'Most Popular', value: 'popularity.desc' },
        { label: 'Most Votes', value: 'vote_count.desc' },
        { label: 'Highest Rated', value: 'vote_average.desc' },
        { label: 'Revenue', value: 'revenue.desc' }
    ];

    const data = useFetch(query);
    const results = data?.results || [];

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

        const newBaseQuery = `/discover/movie?with_genres=${sortState.selectedGenres.join(',')}&year=${sortState.selectedYear}&sort_by=${sortState.selectedSortBy}&language=en-US&`;
        setBaseQuery(newBaseQuery);

        setQuery(`${newBaseQuery}page=1&`);
    }, [sortState.selectedGenres, sortState.selectedYear, sortState.selectedSortBy]);

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

    function handleSelectedGenres(genreId) {
        dispatch({type : 'SET_GENRES' , 
            payload: sortState.selectedGenres.includes(genreId)
            ? sortState.selectedGenres.filter(id => id !== genreId)
            : [...sortState.selectedGenres, genreId],
        });
    }

    const handleSelectedYear = year => {
        dispatch({type : 'SET_YEAR' , payload : sortState.selectedYear === year ? null : year});
    };

    const handleSelectedSortBy = sort => {
        dispatch({type : 'SET_SORT_BY' , payload : sortState.selectedSortBy === sort ? '' : sort});
    };

    const handleIcons = (filterName) => {
        setIsFilterOpen((prev) => ({
            [filterName] : !prev[filterName],
        }));
    };

    return (
        <div className="discover-d">
            <div className="discover-content">
                <div className="discover-header-section">
                    <h2>Welcome to Discover!</h2>
                    <p>You can Filter Movies By Genre, Release Date, and More!</p>
                </div>
                <div className="discover-filter-section">
                    <div className="discover-cards-header">
                        <h3>All Movies</h3>
                    </div>
                    <div className="filters-filter">
                        <DropdownFilter
                            label={
                                <div className='discover-icons' onClick={() => handleIcons('genre')}>
                                    <p>Genre</p>
                                    <ChevronIcon isOpen={isFilterOpen.genre} />
                                </div>
                            }
                            items={genres.map(genre => ({ label: genre.name, value: genre.id }))}
                            onSelect={handleSelectedGenres}
                            selectedItems={sortState.selectedGenres}
                        />

                        <DropdownFilter
                            label={
                                <div className='discover-icons'onClick={() => handleIcons('year')}>
                                    <p>Release Date</p>
                                    <ChevronIcon isOpen={isFilterOpen.year} />
                                </div>
                            }
                            items={years.map(year => ({ label: year, value: year }))}
                            onSelect={handleSelectedYear}
                            selectedItems={[sortState.selectedYear]}
                        />

                        <DropdownFilter
                            label={
                                <div className='discover-icons' onClick={() => handleIcons('popularity')}>
                                    <p>By Popularity</p>
                                    <ChevronIcon isOpen={isFilterOpen.popularity} />
                                </div>
                            }
                            items={sortOptions}
                            onSelect={handleSelectedSortBy}
                            selectedItems={[sortState.selectedSortBy]}
                        />
                    </div>

                </div>
                <div className="discover-movie-section">
                    <MovieCard movies={movies} title={''} showScrollButtons={false} defaultGrid={false} />
                </div>
            </div>
        </div>
    );
}
