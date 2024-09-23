import useFetch from '../../hooks/useFetch'
import { Genres } from '../../types';

export default function GetGenreId() {
    const {data : getGenres} = useFetch<Genres>('/genre/movie/list?language=en&');
    
    return getGenres?.genres || [];
}
