import '../../sass/components/_MainContent.scss';
import useFetch from '../../hooks/useFetch';
import MovieCard from '../cards/MovieCard';
import TrendingCard from '../cards/TrendingCard';
import { Movie } from '../../types';

const MAX_CONTENT = 21;

export default function MainContent() {
  const { data: popular, loading: loadingPopular } = useFetch<Movie[]>('/movie/popular?language=en-US&');
  const { data: topRated, loading: loadingTopRated } = useFetch<Movie[]>('/movie/top_rated?language=en-US&');
  const { data: trending, loading: loadingTrending } = useFetch<Movie[]>('/trending/movie/day?language=en-US&');

  const resultsPopular = popular || [];
  const resultsTop = topRated || [];
  const resultsTrending = trending || [];

  if (loadingPopular || loadingTopRated || loadingTrending) return <div>Loading...</div>;

  return (
    <div className="main">
      <div className="main__wrapper">
        <TrendingCard id={resultsTrending?.[0]?.id} />
        <div className="movie__slider__main">
          <MovieCard
            movies={resultsPopular.slice(0, MAX_CONTENT)}
            title={'Most Popular Movies To Watch Now!'}
            content={'See Most Popular Movies For Today.'}
          />
        </div>
        <div className="scroll__content">
          <MovieCard
            movies={resultsTrending.slice(0, MAX_CONTENT)}
            title={'Trending Today'}
            content={"Catch up on the latest buzz in the movie world."}
          />
        </div>
        <div className="bottom__content">
          <MovieCard
            movies={resultsTop.slice(0, MAX_CONTENT)}
            title={'Top Ratings'}
            content={'Discover cinematic masterpieces that have captivated audiences and critics alike.'}
          />
        </div>
      </div>
    </div>
  );
}
