import '../../sass/components/_MainContent.scss';
import useFetch from '../../hooks/useFetch';
import MovieCard from '../cards/MovieCard';
import TrendingCard from '../cards/TrendingCard';
import { MovieListResponse } from '../../types';
import useRecommendations from '../../hooks/byMovie/useRecommendations';
import GenrePreview from '../reusables/genres/GenrePreview';

const MAX_CONTENT = 21;

export default function MainContent() {
  const { data: popular, loading: loadingPopular } = useFetch<MovieListResponse>('/movie/popular?language=en-US&');
  const { data: topRated, loading: loadingTopRated } = useFetch<MovieListResponse>('/movie/top_rated?language=en-US&');
  const { data: trending, loading: loadingTrending } = useFetch<MovieListResponse>('/trending/movie/day?language=en-US&');
  const { data: upcoming, loading: loadingUpcoming } = useFetch<MovieListResponse>('/movie/upcoming?language=en-US&');

  const resultsPopular = popular?.results || [];
  const resultsTop = topRated?.results || [];
  const resultsTrending = trending?.results || [];
  const resultsUpcoming = upcoming?.results || [];

  const {state} = useRecommendations();
  const personelMovies = state.movies;

  if (loadingPopular || loadingTopRated || loadingTrending || loadingUpcoming) return <div>Loading...</div>;

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
        <div className="personal__content">
          <MovieCard
            movies={personelMovies.slice(0, MAX_CONTENT)}
            title={'Personalized Recommendations'}
            content={'Discover movies that match your preferences and interests.'}
          />
        </div>
        <div className="genre__preview__content">
          <GenrePreview backgroundColor='var(--charcoal-grey)' shouldNavigate={true} />
        </div>
        <div className="coming__soon__content">
          <MovieCard movies={resultsUpcoming.slice(0 , MAX_CONTENT)} title={'Coming Soon'} content={'Stay tuned for upcoming releases and exciting movie announcements.'} />
        </div>
      </div>
    </div>
  );
}
