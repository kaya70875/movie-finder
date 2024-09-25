import { useEffect, useState } from 'react'
import axios from 'axios';

const useMultipleFetch = <T,>(urls : string[]) => {
    
  const [data , setData] = useState<T[] | null>([]);
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      setError(null);
      try{
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const data = responses.map(response => response.data);
        setData(data); 
      }catch (e : any){
        console.error(e);
        setError(e);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  } , [urls]);

  return {data , loading , error}
}

export default useMultipleFetch;
