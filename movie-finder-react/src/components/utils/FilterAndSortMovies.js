export function filterAndSortMovies (movies , sortState) {
  let filtered = movies.filter((movie) => {
    const genreMatch =
      sortState.selectedGenres.length === 0 ||
      movie.genre_ids.some((id) => sortState.selectedGenres.includes(id));
    const yearMatch =
      !sortState.selectedYear ||
      new Date(movie.release_date).getFullYear() === sortState.selectedYear;

    return genreMatch && yearMatch;
  });

  // Sort the filtered movies based on selected sort criteria
  if (sortState.selectedSortBy) {
    if (sortState.selectedSortBy === "popularity.desc") {
      filtered = filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortState.selectedSortBy === "vote_count.desc") {
      filtered = filtered.sort((a, b) => b.vote_count - a.vote_count);
    } else if (sortState.selectedSortBy === "vote_average.desc") {
      filtered = filtered.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortState.selectedSortBy === "revenue.desc") {
      filtered = filtered.sort((a, b) => b.revenue - a.revenue);
    }
  }

  return filtered;
};
