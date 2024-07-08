export class UpdateTrendingTitles {
  // private static baseUrl = 'http://localhost:8000/api/stored/trending/';
  private static baseUrl =
    'https://omdb-titles-browser-api-proxy.vercel.app/api/stored/trending-fetch';

  private static returnWhenFailure(statusCode: number): TrendingFetchErrorMessage {
    if (statusCode === 500) {
      return { statusCode: 500, message: 'Failed to fetch trending titles from Tmdb' };
    } else {
      return {
        statusCode: 0,
        message: 'Fetch operation failed possibly due to lack of internet connection',
      };
    }
  }

  public static async update(): Promise<TrendingFetchSucessMessage | TrendingFetchErrorMessage> {
    try {
      const res = await fetch(this.baseUrl);
      const data = await res.json();

      if (res.status === 200) {
        data.statusCode = 200;
        // console.log(data);
        return data;
      } else {
        return this.returnWhenFailure(500);
      }
    } catch {
      // if fetching is unsuccessful (mostly due to the lack of internet connection)
      return this.returnWhenFailure(0);
    }
  }
}

export interface TrendingFetchSucessMessage {
  statusCode: number;
  results: [
    {
      'movies/day': number;
    },
    {
      'movies/week': number;
    },
    {
      'series/day': number;
    },
    {
      'series/week': number;
    }
  ];
}

export interface TrendingFetchErrorMessage {
  statusCode: number;
  message: string;
}
