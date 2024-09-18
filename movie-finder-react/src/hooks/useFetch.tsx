import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  tagline: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

interface ApiResponse {
  results: Movie[];
  genres: Genre[];
}

function useFetch(url: string) {
  const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API as string;
  const BASE_URL = "https://api.themoviedb.org/3";

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const showUrl = `${BASE_URL}${url}api_key=${API_KEY}`;
        console.log(showUrl);
        const response = await axios.get<ApiResponse>(
          `${BASE_URL}${url}api_key=${API_KEY}`
        );
        console.log(response);
        setData(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [url]);

  return data;
}
export default useFetch;
