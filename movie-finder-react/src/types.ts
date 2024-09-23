export interface Genres {
  id: number;
  name: string;
  genres : Genres[];
}

export interface MovieReviewsResults {
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  }
  id : string;
  author : string;
  content : string;
  created_at : string;
  results : MovieReviewsResults[];
}

export interface Movie {
  id: number;
  title: string;
  original_language: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  release_date: string;
  overview: string;
  tagline?: string;
  runtime: number;
  genres: Genres[];
  genre_ids : number[]
  popularity : number;
  vote_count : number;
  revenue : number;
}

export interface MovieMedia {
  site : string;
  type : string;
  key : string;
  results : MovieMedia[];
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

export interface SortState {
    selectedGenres: number[] | null;
    selectedYear: number;
    selectedSortBy: string;
    isAdult: boolean;
}

export interface MovieListResponse {
  results: Movie[];
}

export interface CrewResponse {
  crew: Crew[];
}

export interface CastResponse {
  cast: Cast[];
}
