import { TmdbSearch } from './TmdbSearch';

export class TmdbHomePagePopular extends TmdbSearch {
  static async fetch() {
    const tmdbfetchPop = new TmdbHomePagePopular();
    const fetchUrl = tmdbfetchPop.tmdbRequestUrl;
    const fetchedData = await tmdbfetchPop.fetchTmdb(fetchUrl);
    console.log(fetchedData);
    return fetchedData;
  }

  get tmdbRequestUrl(): string {
    const params: TmdbParams = {
      main: {
        type: 'tv',
        from: 'popular',
      },

      sub: {
        language: 'en-US',
        page: '1',
      },
    };

    const mainParamsString = (): string => {
      let mParamsString = '';
      let mParamsKeys = Object.keys(params.main);
      // console.log(mParamsKeys);
      for (const key of mParamsKeys) {
        if (mParamsKeys.indexOf(key) === mParamsKeys.length - 1) {
          mParamsString += `${params.main[key]}?`;
        } else {
          mParamsString += `${params.main[key]}/`;
        }
      }
      return mParamsString;
    };

    const subParamString = (): string => {
      let sParamString = '';
      let sParamKeys = Object.keys(params.sub);
      // console.log(sParamKeys);
      for (const key of sParamKeys) {
        if (sParamKeys.indexOf(key) === sParamKeys.length - 1) {
          sParamString += `${key}=${params.sub[key]}`;
        } else {
          sParamString += `${key}=${params.sub[key]}&`;
        }
      }
      // console.log(sParamString);
      return sParamString;
    };

    return `${this.baseUrl}/${mainParamsString()}?${subParamString()}`;
  }
}

// const sample = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

type TmdbParams = {
  main: {
    [key: string]: string;
  };
  sub: {
    [key: string]: string;
  };
};

type TmdbHomePagePopularResult = {
  page: number;
  results: TmdbHomePagePopularFilm[];
  total_pages: number;
  total_results: number;
};

type TmdbHomePagePopularFilm = {
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

// for series

const paramsSeries: TmdbParams = {
  main: {
    type: 'tv',
    from: 'popular',
  },

  sub: {
    language: 'en-US',
    page: '1',
  },
};
