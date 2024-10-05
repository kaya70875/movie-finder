import { useFilter } from "../../../context/FilterContext";
import GetGenreId from "../../utils/GetGenreId";
import ScrollToBottom from "../../utils/scroll/ScrollToBottom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised, faLaugh, faBinoculars ,faMountainSun,faUserSecret , faBook, faUsers, faMask } from '@fortawesome/free-solid-svg-icons';
import { REDUCER_ACTION_TYPE } from "../../../context/FilterContext";
import './_GenrePreview.scss';
import { useNavigate } from "react-router";

interface GenrePreviewProps {
    backgroundColor?: string;
    shouldNavigate: boolean;
}

export default function GenrePreview({backgroundColor , shouldNavigate} : GenrePreviewProps) {

    const genres = GetGenreId();
    const { dispatch } = useFilter();
    const navigate = useNavigate();

    const genreIcons = {
        Action: faFistRaised,
        Comedy: faLaugh,
        Adventure: faBinoculars,
        Animation: faMountainSun,
        Crime: faUserSecret,
        Documentary: faBook,
        Drama: faMask,
        Family: faUsers,
      };

    const handleButtonClick = async (genreId: number) => {

        if(shouldNavigate) {
            await navigate(`/movie-finder/discover`);
        }

        dispatch({ type: REDUCER_ACTION_TYPE.SET_GENRES, payload: [genreId] });
        ScrollToBottom();
    }


  return (
    <div className="discover__genres__preview" style={{backgroundColor}}>
        <h2>Explore Genres</h2>
        <div className="discover__genres__preview__items">
          {genres.slice(0, 8).map((genre) => (
            <div key={genre.id} className="discover__genres__preview__item" onClick={() => handleButtonClick(genre.id)}>
              <FontAwesomeIcon icon={genreIcons[genre.name]} />
              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </div>
  )
}
