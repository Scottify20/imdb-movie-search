export interface OmdbResponse {
  Response: string;
  Error?: string;
}

export abstract class OmdbSearch<T extends OmdbResponse> {
  private _apiKey = 'cbb2cfa7';
  protected baseUrl = `https://www.omdbapi.com/?apikey=${this._apiKey}`;

  async fetchOmdb(requestUrl: string): Promise<T | undefined> {
    try {
      const res = await fetch(requestUrl);
      const data: T = await res.json();
      if (data.Response === 'True') {
      } else if (data.Response === 'False' && data.Error === 'Movie not found!') {
        console.log('500 Server Error or Error 404 Not Found');
      }
      return data;
    } catch {
      console.log('Fetch function failed', 'from reject by fetch promise');
      return { Response: 'False', Error: `Can't connect to server.` } as T;
    }
    ``;
  }
}
