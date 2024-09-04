import {
  createContext,
  useContext,
  useState,
  useReducer,
} from "react";
import GetGenreId from "../components/utils/GetGenreId";
import createYearsList from '../components/utils/CreateYearsList';

const FilterContext = createContext();

const initialState = {
  selectedGenres: [],
  selectedYear: null,
  selectedSortBy: "",
  isAdult : false
};

function sortReducer(state, action) {
  switch (action.type) {
    case "SET_GENRES":
      return { ...state, selectedGenres: action.payload };
    case "SET_YEAR":
      return { ...state, selectedYear: action.payload };
    case "SET_SORT_BY":
      return { ...state, selectedSortBy: action.payload };
    case "SET_ADULT" : 
      return { ...state , isAdult : action.payload };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
}

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [sortState, dispatch] = useReducer(sortReducer, initialState);
  const [isFilterOpen, setIsFilterOpen] = useState({
    genre: false,
    year: false,
    popularity: false,
  });

  const genres = GetGenreId() || [];
  const years = createYearsList();
  const sortOptions = [
    { label: "Most Popular", value: "popularity.desc" },
    { label: "Most Votes", value: "vote_count.desc" },
    { label: "Highest Rated", value: "vote_average.desc" },
    { label: "Revenue", value: "revenue.desc" },
  ];

  const handleSelectedGenres = (genreId) => {
    dispatch({
      type: "SET_GENRES",
      payload: sortState.selectedGenres.includes(genreId)
        ? sortState.selectedGenres.filter((id) => id !== genreId)
        : [...sortState.selectedGenres, genreId],
    });
  };

  const resetFilters = () => {
      dispatch({type : 'RESET_FILTERS'});
    };


  const handleSelectedYear = (year) => {
    dispatch({
      type: "SET_YEAR",
      payload: sortState.selectedYear === year ? null : year,
    });
  };

  const handleSelectedSortBy = (sort) => {
    dispatch({
      type: "SET_SORT_BY",
      payload: sortState.selectedSortBy === sort ? "" : sort,
    });
  };

  const handleIcons = (filterName) => {
    setIsFilterOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const value = {
    sortState,
    dispatch,
    genres,
    years,
    sortOptions,
    isFilterOpen,
    handleSelectedGenres,
    handleSelectedYear,
    handleSelectedSortBy,
    handleIcons,
    resetFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
