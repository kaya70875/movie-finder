import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useFetch = (url) => {
  const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API;
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [data , setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () =>{
      try{
        const showUrl = `${BASE_URL}${url}api_key=${API_KEY}`;
        console.log(showUrl);
        const response = await axios.get(`${BASE_URL}${url}api_key=${API_KEY}`); 
        console.log(response);
        setData(response.data);
        
      }catch (e){
        console.error(e)
      }
    }
    fetchMovies();
  } , [url]); 

  return data
}

export default useFetch
