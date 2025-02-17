import { GridRowId } from "@mui/x-data-grid";

export interface Genre {
  id: number;
  name: string;
}
export interface Language  {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface Country {
  iso_3166_1: string;
  name: string;
  english_name:string
}
export interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface Movie {
  id: number;
  genre_ids: Array<number | Genre>;
  backdrop_path: string;
  poster_path: string;
  adult?: boolean;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  belongs_to_collection?: null;
  budget?: number;
  status?: string;
  tagline: string;
  spoken_language?: Array<Language>;
  revenue?: number;
  runtime?: number;
  production_countries?: Array<Country>;
  production_companies?: Array<ProductionCompanies>;
  origin_country?: Array<string>;
  imdb_id?: string;
  homepage?: string;
  genres:Array<Genre>
}

export interface ReturnedMovies {
  results: Array<Movie>,
  page:number,
  total_pages:number,
  total_results:number
}
export interface MovieFilter {
  page: number;
  with_genres: string;
  with_original_language: string;
  with_origin_country: string;
}
export interface ReturnedGenres{
  genres: Array<Genre>,

}
export interface ToggleParams{
  watchlist?:boolean,
  favorite?:boolean,
  media_type:string,
  media_id:GridRowId
}