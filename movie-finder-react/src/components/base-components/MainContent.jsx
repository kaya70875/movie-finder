  import '../../sass/components/_MainContent.scss';
  import useFetch from '../../hooks/useFetch';
  import MovieCard from '../cards/MovieCard';
import TrendingCard from '../cards/TrendingCard';

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

    console.log('results : ' , resultsTrending);

    return (
      <div className="main">
        <div className="main__wrapper">
          <TrendingCard id={trending?.results?.[0]?.id} />
          <div className="movie__slider__main">
            <MovieCard movies={resultsPopular.slice(0 , MAX_CONTENT)} title={'Most Popular Movies To Watch Now!'} content={'See Most Popular Movies For Today.'}></MovieCard>

          </div>
          <div className="scroll__content">
            <MovieCard movies={resultsTrending.slice(0 , MAX_CONTENT)} title={'Trending Today'} content={"Catch up on the latest buzz in the movie world. "}></MovieCard>
          </div>

        <div className="bottom__content">
          <MovieCard movies={resultsTop.slice(0 , MAX_CONTENT)} title={'Top Ratings'} content={'Discover cinematic masterpieces that have captivated audiences and critics alike.'}></MovieCard>
        </div>
         
        </div>
      </div>
    );
  }