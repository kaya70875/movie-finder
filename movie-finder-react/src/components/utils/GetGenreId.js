import useFetch from '../../hooks/useFetch'

export default function GetGenreId() {
    const getGenres = useFetch('/genre/movie/list?language=en&');
    
    return getGenres?.genres || [];
}
