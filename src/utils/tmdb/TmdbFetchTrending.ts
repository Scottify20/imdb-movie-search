import { TmdbFetch, tmdbTimeWindowTypes } from './TmdbFetch';

export class TmdbFetchTrending extends TmdbFetch {
  public async fetchTrendingMovies(timeWindow: tmdbTimeWindowTypes, page: number = 1) {
    const fetchInstance = new TmdbFetchTrending();
    fetchInstance.setFrom('trending');
    fetchInstance.setTitleType('movie');
    fetchInstance.setTimeWindow(timeWindow);
    fetchInstance.setPage(page);
    const result = await fetchInstance.fetchTmdb();
  }

  public async fetchTrendingSeries(timeWindow: tmdbTimeWindowTypes, page: number = 1) {
    const fetchInstance = new TmdbFetchTrending();
    fetchInstance.setFrom('trending');
    fetchInstance.setTitleType('tv');
    fetchInstance.setTimeWindow(timeWindow);
    fetchInstance.setPage(page);
    const result = await fetchInstance.fetchTmdb();
  }

  public async fetchTrendingActors(timeWindow: tmdbTimeWindowTypes, page: number = 1) {
    const fetchInstance = new TmdbFetchTrending();
    fetchInstance.setFrom('trending');
    fetchInstance.setTitleType('person');
    fetchInstance.setTimeWindow(timeWindow);
    fetchInstance.setPage(page);
    const result = await fetchInstance.fetchTmdb();
  }
}

interface TmdbTrendingResponse {
  page: number;
  results: TmdbTrendingMediaTypes[];
  total_pages: number;
  total_results: number;
}

type TmdbTrendingMediaTypes = TmdbSeriesResult | TmdbMovieResult | TmdbPersonResult;

interface TmdbGeneralMediaResult {
  adult: boolean;
  id: number;
  popularity: number;
}

export interface TmdbMovieOrSeriesResult extends TmdbGeneralMediaResult {
  backdrop_path: string;
  original_language: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
}

export interface TmdbSeriesResult extends TmdbMovieOrSeriesResult {
  name: string;
  original_name: string;
  media_type: 'tv';
  first_air_date: string;
  origin_country: string[];
}

export interface TmdbMovieResult extends TmdbMovieOrSeriesResult {
  title: string;
  original_title: string;
  media_type: 'movie';
  release_date: string;
  video: boolean;
}

export interface TmdbPersonResult {
  name: string;
  original_name: string;
  media_type: 'person';
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: TmdbMovieOrSeriesResult[];
}
