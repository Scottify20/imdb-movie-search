export interface TmdbResponse {}

export class TmdbFetch {
  private static baseUrl = process.env.TMDB_API_PROXY_BASE_URL || `http://localhost:8000/api/tmdb`;

  protected async fetchTmdb(): Promise<undefined | any> {
    try {
      const res = await fetch(this.requestUrl);
      const data = await res.json();
      if (res.ok) {
        console.log('tmdb fetch OK');
      } else {
        console.log('tmdb fetch not OK');
      }
      console.log(data);
      return data;
    } catch {
      console.log('Fetch from TMDB failed', 'from reject by fetch promise');
    }
  }

  private fetchParams: TmdbTrendingParams = {
    path: {
      from: 'trending',
      type: 'movie',
      timeWindow: 'day',
    },

    query: {
      language: 'en-US',
      page: '1',
    },
  };

  protected setTitleType(type: tmdbEntityTypes) {
    this.fetchParams.path.type = type;
  }
  protected setTimeWindow(timeWindow: tmdbTimeWindowTypes) {
    this.fetchParams.path.timeWindow = timeWindow;
  }

  protected setPage(page: number) {
    this.fetchParams.query.page = page.toString();
  }

  protected setFrom(from: tmdbFromTypes) {
    this.fetchParams.path.from = from;
  }

  get requestUrl(): string {
    const params = this.fetchParams;

    const pathParamsString = (): string => {
      let mParamsString = '';
      let mParamsKeys = Object.keys(params.path);
      // console.log(mParamsKeys);
      for (const key of mParamsKeys) {
        if (!params.path[key]) {
          continue;
        }
        if (mParamsKeys.indexOf(key) === mParamsKeys.length - 1) {
          mParamsString += `${params.path[key]}?`;
        } else {
          mParamsString += `${params.path[key]}/`;
        }
      }
      return mParamsString;
    };

    const queryParamString = (): string => {
      let sParamString = '';
      let sParamKeys = Object.keys(params.query);
      // console.log(sParamKeys);
      for (const key of sParamKeys) {
        if (!params.query[key]) {
          continue;
        }
        if (sParamKeys.indexOf(key) === sParamKeys.length - 1) {
          sParamString += `${key}=${params.query[key]}`;
        } else {
          sParamString += `${key}=${params.query[key]}&`;
        }
      }
      return sParamString;
    };
    return `${TmdbFetch.baseUrl}/${pathParamsString()}${queryParamString()}`;
  }
}

// const sampleRequestUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

export type tmdbEntityTypes = 'tv' | 'movie' | 'person';
export type tmdbTimeWindowTypes = 'day' | 'week';
export type tmdbFromTypes = 'trending';

type TmdbTrendingParams = {
  path: {
    [key: string]: string;
  };
  query: {
    [key: string]: string;
  };
};

type TmdbHomePageTrendingResult = {
  page: number;
  results: TmdbHomePageTrendingFilm[];
  total_pages: number;
  total_results: number;
};

type TmdbHomePageTrendingFilm = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const imageSizes = {
  backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
  logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profile_sizes: ['w45', 'w185', 'h632', 'original'],
  still_sizes: ['w92', 'w185', 'w300', 'original'],
};

export const TmdbMovieGenreIds: { [key: string]: string } = {
  '12': 'Adventure',
  '14': 'Fantasy',
  '16': 'Animation',
  '18': 'Drama',
  '27': 'Horror',
  '28': 'Action',
  '35': 'Comedy',
  '36': 'History',
  '37': 'Western',
  '53': 'Thriller',
  '80': 'Crime',
  '99': 'Documentary',
  '878': 'Sci-Fi',
  '9648': 'Mystery',
  '10402': 'Music',
  '10749': 'Romance',
  '10751': 'Family',
  '10752': 'War',
  '10770': 'TV Movie',
};

export const TmdbSeriesGenreIds: { [key: string]: string } = {
  '16': 'Animation',
  '18': 'Drama',
  '35': 'Comedy',
  '37': 'Western',
  '80': 'Crime',
  '99': 'Documentary',
  '9648': 'Mystery',
  '10751': 'Family',
  '10759': 'Action & Adventure',
  '10762': 'Kids',
  '10763': 'News',
  '10764': 'Reality',
  '10765': 'Sci-Fi & Fantasy',
  '10766': 'Soap',
  '10767': 'Talk',
  '10768': 'War & Politics',
};

const imageBaseUrl = 'https://image.tmdb.org/t/p/';

// https://image.tmdb.org/t/p/w300/gma8o1jWa6m0K1iJ9TzHIiFyTtI.jpg
