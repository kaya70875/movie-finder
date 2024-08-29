  import '../../sass/components/_MainContent.scss';
  import useFetch from '../../hooks/useFetch';
  import MovieCard from '../cards/MovieCard';

  const MAX_CONTENT = 21

  export default function MainContent() {
    const popular = useFetch('/movie/popular?language=en-US&');
    const topRated = useFetch('/movie/top_rated?language=en-US&');
    const upcoming = useFetch('/movie/upcoming?language=en-US&page=1&region=tr&');
    const trending = useFetch('/trending/movie/day?language=en-US&');

    const resultsPopular = popular?.results || [];
    const resultsTop = topRated?.results || [];
    const resultsUpcoming = upcoming?.results || [];
    const resultsTrending = trending?.results || [];

    return (
      <div className="main">
        <div className="main__wrapper">
          <div className="slide__container">
            <MovieCard movies={resultsPopular.slice(0 , MAX_CONTENT)} title={'Most Popular'}></MovieCard>
            <MovieCard movies={resultsTrending.slice(0 , MAX_CONTENT)} title={'Trending Today'}></MovieCard>
            <MovieCard movies={resultsTop.slice(0 , MAX_CONTENT)} title={'Top Ratings'}></MovieCard>
            <MovieCard movies={resultsUpcoming.slice(0 , MAX_CONTENT)} title={'Upcoming In Turkey'}></MovieCard>
          </div>
        </div>
      </div>
    );
  }
