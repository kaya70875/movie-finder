import {
  createContext,
  useContext,
  useState,
  useReducer,
} from "react";
import GetGenreId from "../components/utils/GetGenreId";
import createYearsList from '../components/utils/CreateYearsList';

interface ContextType {
  sortState: {
    selectedGenres: string[];
    selectedYear: number;
    selectedSortBy: string;
    isAdult: boolean;
  };
  genres: string[];
  years: number[];
  sortOptions: { label: string; value: string }[];
  isFilterOpen: { genre: boolean; year: boolean; popularity: boolean };
  handleSelectedGenres: (genreId: string) => void;
  handleSelectedYear: (year: number) => void;
  handleSelectedSortBy: (sort: string) => void;
  handleIcons: (filterName: string) => void;
  resetFilters: () => void;
  dispatch: React.Dispatch<ReducerAction>;
}

interface FilterContextProviderProps {
  children: React.ReactNode;
}

const FilterContext = createContext<ContextType | null>(null);

const initialState = {
  selectedGenres: [''],
  selectedYear: 2024,
  selectedSortBy: "popularity.desc",
  isAdult : false
};

export enum REDUCER_ACTION_TYPE {
  SET_GENRES,
  SET_YEAR,
  SET_SORT_BY,
  SET_ADULT,
  RESET_FILTERS,
}

type ReducerAction = 
  | { type: REDUCER_ACTION_TYPE.SET_GENRES, payload: string[] }
  | { type: REDUCER_ACTION_TYPE.SET_YEAR, payload: number}
  | { type: REDUCER_ACTION_TYPE.SET_SORT_BY, payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_ADULT, payload: boolean }
  | { type: REDUCER_ACTION_TYPE.RESET_FILTERS }; // No payload for RESET_FILTERS


const sortReducer = (state : typeof initialState, action : ReducerAction) : typeof initialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_GENRES:
      return { ...state, selectedGenres: action.payload };
    case REDUCER_ACTION_TYPE.SET_YEAR:
      return { ...state, selectedYear: action.payload };
    case REDUCER_ACTION_TYPE.SET_SORT_BY:
      return { ...state, selectedSortBy: action.payload };
    case REDUCER_ACTION_TYPE.SET_ADULT : 
      return { ...state , isAdult : action.payload };
    case REDUCER_ACTION_TYPE.RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
}

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children } : FilterContextProviderProps) {
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

  const handleSelectedGenres = (genreId : string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_GENRES,
      payload: sortState.selectedGenres.includes(genreId)
        ? sortState.selectedGenres.filter((id) => id !== genreId)
        : [...sortState.selectedGenres, genreId],
    });
  };

  const resetFilters = () => {
      dispatch({type : REDUCER_ACTION_TYPE.RESET_FILTERS});
    };


  const handleSelectedYear = (year : number) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_YEAR,
      payload: sortState.selectedYear === year ? 2024 : year,
    });
  };

  const handleSelectedSortBy = (sort : string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_SORT_BY,
      payload: sortState.selectedSortBy === sort ? "" : sort,
    });
  };

  const handleIcons = (filterName : string) => {
    setIsFilterOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const value : ContextType = {
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
