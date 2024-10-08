import useFetch from '../../../hooks/useFetch';
import { Movie } from '../../../types';

const MovieDetailsBlock = ({ id , runtime = true , language = true}) => {

  const { data  } = useFetch<Movie>(`/movie/${id}?language=en-US&`);

  if (!data) return <div>No data</div>;
  
  return (
    <>
      <p>{new Date(data?.release_date).getFullYear()}</p>
      {runtime && <p>{`${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}mins`}</p>}
      {data?.genres?.slice(0 , 2).map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
      { language && <p>{data?.original_language}</p>}
    </>
  );
};

export default MovieDetailsBlock;
