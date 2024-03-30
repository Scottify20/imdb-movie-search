export class FetchTrendingTitles {
  // private static baseUrl = 'http://localhost:8000/api/stored/trending/';
  private static baseUrl = 'https://omdb-titles-browser-api-proxy.vercel.app/api/stored/trending/';

  public static async fetchTrending(
    type: TrendingTitleType,
    timeWindow: TimeWindow
  ): Promise<TrendingFetchResult | TrendingFetchError> {
    const pathString = `${type}/${timeWindow}`;

    try {
      const res = await fetch(`${this.baseUrl}${pathString}`);
      const data = await res.json();
      console.log(data);
      return data;
    } catch {
      // if fetching is unsuccessful (mostly due to the lack of internet connection)
      return { message: `Fetching trending ${type} in this ${timeWindow} failed.` };
    }
  }
}

// https://omdb-titles-browser-api-proxy.vercel.app/api/stored/trending/movies/week

type TrendingTitleType = 'movies' | 'series';
type TimeWindow = 'week' | 'day';

type TrendingFetchResult = { results: TmdbSeriesResult[] } | { results: TmdbMovieResult[] };

type TrendingFetchError = { message: string; error: string } | { message: string };

interface TmdbGeneralMediaResult {
  adult: boolean;
  id: number;
  popularity: number;
}

interface TmdbMovieAndSeriesResultBase extends TmdbGeneralMediaResult {
  backdrop_path: string;
  original_language: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
}

export interface TmdbSeriesResult extends TmdbMovieAndSeriesResultBase {
  name: string;
  original_name: string;
  media_type: 'tv';
  first_air_date: string;
  origin_country: string[];
}

export interface TmdbMovieResult extends TmdbMovieAndSeriesResultBase {
  title: string;
  original_title: string;
  media_type: 'movie';
  release_date: string;
  video: boolean;
}
