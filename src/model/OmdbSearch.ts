export interface OmdbResponse {
  Response: string;
  Error?: string;
}

export abstract class OmdbSearch<T extends OmdbResponse> {
  private apiKey = 'cbb2cfa7';
  protected baseUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  async fetchOmdb(requestUrl: string): Promise<T | undefined> {
    try {
      const res = await fetch(requestUrl);
      const data: T = await res.json();
      if (data.Response === 'True') {
        console.log('Success');
      } else if (
        data.Response === 'False' &&
        data.Error === 'Movie not found!'
      ) {
        console.log('500 Server Error, or Error 404 Not Found');
      }
      return data;
    } catch {
      console.log('Fetch function failed', 'from reject by fetch promise');
      return undefined;
    }
  }
}
