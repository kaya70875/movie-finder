import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetch<T>(url: string) {
  const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API as string;
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fullUrl = `${BASE_URL}${url}api_key=${API_KEY}`;
        const response = await axios.get<T>(fullUrl);
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return {data, loading, error};
}

export default useFetch;

