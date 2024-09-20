import useFetch from '../../../hooks/useFetch';
import { Movie } from '../../../types';

const MovieDetailsBlock = ({ id , runtime = true , language = true}) => {

  const { data  } = useFetch<Movie>(`/movie/${id}?language=en-US&`);

  if (!data) return <div>No data</div>;
  
  return (
    <>
      <h4>{new Date(data?.release_date).getFullYear()}</h4>
      {runtime && <p>{`${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}mins`}</p>}
      {data?.genres?.slice(0 , 2).map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
      { language && <h5>{data?.original_language}</h5>}
    </>
  );
};

export default MovieDetailsBlock;
