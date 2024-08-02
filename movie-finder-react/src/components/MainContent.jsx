import './MainContent.css'
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from './Pagination';

export default function MainContent({searchQuery , selectedGenres}) {
  const { page } = useParams()
  const [currentPage , setCurrentPage] = useState(Number(page) || 1);
  const navigate = useNavigate()

  const [query , setQuery] = useState(`/movie/popular?language=en-US&page=${currentPage}&`);
  const [title, setTitle] = useState('Most Popular :');
  const data = useFetch(query);

  useEffect(() =>{
    if(searchQuery){
      setQuery(`/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${currentPage}&`);
      setTitle(`Results For ${searchQuery} :`)
    }
    else if(selectedGenres && selectedGenres.length > 0){
      setQuery(`/discover/movie?with_genres=${selectedGenres.join(',')}&language=en-US&page=${currentPage}&`);
      setTitle('Filtered Movies:');
    }
    else{
      setQuery(`/movie/popular?language=en-US&page=${currentPage}&`);
      setTitle('Most Popular :');
    }

  },[searchQuery , selectedGenres , currentPage])

  const results = data?.results || [];
  const currentPosts = results.slice(0 , 18);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    navigate(`/page/${newPage}`)
    window.scrollTo(0 , 0)
  }

  return (
    <div className="main">
      <p className='results' id='queryResults'>{title}</p>
      <div className="main__content">
        {currentPosts.map(movie => (
          movie.poster_path && (
            <Link to={`/details/${movie.id}`} key={movie.id} className="item">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="item__overlay"></div>
            </Link>
          )
        ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={handlePageChange} results={data}></Pagination>
    </div>
  );
}
