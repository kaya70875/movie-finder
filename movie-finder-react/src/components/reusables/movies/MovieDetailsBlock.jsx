import React from 'react';

const MovieDetailsBlock = ({ data }) => {
  return (
    <>
      <h4>{new Date(data.release_date).getFullYear()}</h4>
      <p>{`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}mins`}</p>
      {data.genres?.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
      <h5>{data.original_language}</h5>
    </>
  );
};

export default MovieDetailsBlock;
