import { useFilter } from "../../../context/FilterContext";
import GetGenreId from "../../utils/GetGenreId";
import ScrollToBottom from "../../utils/scroll/ScrollToBottom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised, faLaugh, faBinoculars ,faMountainSun,faUserSecret , faBook, faUsers, faMask } from '@fortawesome/free-solid-svg-icons';
import { REDUCER_ACTION_TYPE } from "../../../context/FilterContext";
import './_GenrePreview.scss';

export default function GenrePreview() {

    const genres = GetGenreId();
    const { dispatch } = useFilter();

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


  return (
    <div className="discover__genres__preview">
        <h2>Explore Genres</h2>
        <div className="discover__genres__preview__items">
          {genres.slice(0, 8).map((genre) => (
            <div key={genre.id} className="discover__genres__preview__item" onClick={() => {
                dispatch({ type: REDUCER_ACTION_TYPE.SET_GENRES, payload: [genre.id] });
                ScrollToBottom();
            }}>
              <FontAwesomeIcon icon={genreIcons[genre.name]} />
              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </div>
  )
}
