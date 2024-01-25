import { TMDBACCESSTOKEN } from '../../private/TMDBACESSTOKEN';

export interface TmdbResponse {}

export abstract class TmdbSearch {
  abstract tmdbRequestUrl: string;

  private _accessToken = TMDBACCESSTOKEN;
  protected baseUrl = `https://api.themoviedb.org/3`;

  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this._accessToken}`,
    },
  };

  async fetchTmdb(tmdbRequestUrl: string): Promise<undefined | any> {
    try {
      const res = await fetch(tmdbRequestUrl, this.options);
      const data = await res.json();
      if (res.ok) {
        console.log('tmdb fetch OK');
      } else {
        console.log('tmdb fetch not OK');
      }
      // console.log(data);
      return data;
      // console.log(res);
      // return res;
    } catch {
      console.log('Fetch from TMDB failed', 'from reject by fetch promise');
    }
  }
}

const imageSizes = {
  backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
  logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profile_sizes: ['w45', 'w185', 'h632', 'original'],
  still_sizes: ['w92', 'w185', 'w300', 'original'],
};

const imageBaseUrl = 'https://image.tmdb.org/t/p/';

// https://image.tmdb.org/t/p/w300/gma8o1jWa6m0K1iJ9TzHIiFyTtI.jpg
