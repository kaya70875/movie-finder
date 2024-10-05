import { useEffect, useState } from "react";
import "../sites/_Watched.scss";
import MovieCard from "../cards/MovieCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useFilter } from "../../context/FilterContext";
import { filterAndSortMovies } from "../utils/FilterAndSortMovies";
import StatsCard from "../cards/StatsCard";
import useFetch from "../../hooks/useFetch";
import { Movie, MovieListResponse } from "../../types";
import useRecommendations from "../../hooks/byMovie/useRecommendations";

export default function Watched() {
  const { state } = useRecommendations();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const { sortState } = useFilter();

  const {data} = useFetch<MovieListResponse>('/movie/top_rated?language=en-US&page=2&');
  const topRated = data?.results;

  // Filter and sort movie list Movies[]
  useEffect(() => {
    const applyFilters = filterAndSortMovies(state.movies, sortState);
    setFilteredMovies(applyFilters);
  }, [sortState.isAdult , sortState.selectedGenres , sortState.selectedSortBy , sortState.selectedYear , state.movies]);

  return (
    <div className="main__wrapper">
      <div className="watched__header__wrapper">
        <div className="watched-header">
          <h1>Watched List</h1>
          <p>Personalized Movie Dashboard. Get recommendations based on movies that you watched!</p>
        </div>
      </div> 

      {state.movies.length !== 0 ? (
        <div className="slide__container">
          {state.loading ? (
            <Skeleton
              count={2}
              height={500}
              baseColor="var(--main-background)"
              enableAnimation={true}
            />
          ) : (
            <>
              <MovieCard
                movies={state.watchedMovieDetails}
                title="You Watched"
                showScrollButtons={true}
                showFilters={false}
                content={'Movies You Recently Watched'}
                mainStyle={'column'}
                
              />
              <MovieCard
                movies={filteredMovies.slice(0, 12)}
                title="Based On Your Watch History"
                showScrollButtons={false}
                gridType={"fill"}
                mainStyle={'single'}
                showFilters={true}
              />
            </>
          )}
          <StatsCard />
          <h1 style={{display : 'flex', alignItems : 'center' , justifyContent : 'center' , padding : '2rem'}}>Discover More</h1>
        </div>

      ) : (
        <div className="no-watchlist">
          <h2>There is nothing here !</h2>
          <p>Add some movies to get started.</p>
        </div>
      )}
        <div className="content__more">
            {topRated && (
              <MovieCard 
              movies={topRated}
              title="Discover More Content"
              content={'Add More Movies To Your Watchlist !'}
              showScrollButtons={true}
              showFilters={false}
              />
            )}
            
        </div>
    </div>
  );
}
