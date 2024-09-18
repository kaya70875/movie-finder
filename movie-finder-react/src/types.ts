export interface Genres {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path : string;
  vote_average: number;
  release_date: string;
  overview: string;
  tagline: string;
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
