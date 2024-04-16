import { TmdbMovieResult2, TmdbSeriesResult2 } from '../tmdb/TmdbFetchTrending';

export class FetchTrendingTitles {
  // private static baseUrl = 'http://localhost:8000/api/stored/trending/';
  private static baseUrl = 'https://omdb-titles-browser-api-proxy.vercel.app/api/stored/trending/';

  public static async fetchTrending(
    type: TrendingTitleType,
    timeWindow: TimeWindow
  ): Promise<TrendingFetchResult<TmdbMovieResult2 | TmdbSeriesResult2> | TrendingFetchError> {
    const pathString = `${type}/${timeWindow}`;

    try {
      const res = await fetch(`${this.baseUrl}${pathString}`);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch {
      // if fetching is unsuccessful (mostly due to the lack of internet connection)
      return {
        results: [
          { id: 404.0, overview: `Fetching trending ${type} in this ${timeWindow} failed.` },
        ],
      };
    }
  }
}

// https://omdb-titles-browser-api-proxy.vercel.app/api/stored/trending/movies/week

type TrendingTitleType = 'movies' | 'series';
type TimeWindow = 'week' | 'day';

export type TrendingFetchResult<T> = { results: T[] };

export type TrendingFetchError = { results: TmdbProxyApiTrendingErrorResult[] };

interface TmdbProxyApiTrendingErrorResult {
  overview: string;
  id: 404.0;
}
