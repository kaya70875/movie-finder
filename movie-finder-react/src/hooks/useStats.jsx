import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API;

const useStats = (watchList) => {
  const [stats, setStats] = useState({
    movieCount: 0,
    averageRatingValue: 0,
    mostWatchedGenresValue: [],
  });

  console.log('WL' , watchList);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const movieCount = watchList?.length || 0;
        console.log('initial count : ' , movieCount);

        const movieDetailsResponses = await Promise.all(
          watchList.map(async (movieId) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch movie details");
            }
            const data = await response.json();
            return data;
          })
        );

        // Extract genres and ratings
        const mostWatchedGenresData = movieDetailsResponses.flatMap((res) =>
          res.genres ? res.genres.map((genre) => genre.name) : []
        );
        const averageRating = movieDetailsResponses
          .filter((res) => res.vote_average)
          .map((res) => res.vote_average);

        // Calculate most watched genres
        const mostWatchedGenresValue = mostWatchedGenresData.reduce(
          (acc, genre) => {
            acc[genre] = (acc[genre] || 0) + 1;
            return acc;
          },
          {}
        );

        // Calculate average rating
        const averageRatingValue =
          averageRating.length > 0
            ? averageRating.reduce((acc, rating) => acc + rating, 0) /
              averageRating.length
            : 0;
        console.log('movieCount : ' , movieCount);

        setStats({
          movieCount,
          averageRatingValue,
          mostWatchedGenresValue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (watchList && watchList.length > 0) {
        fetchStats();
      }
  }, [watchList]);

  return stats;
};

export default useStats;
