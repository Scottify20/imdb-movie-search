export interface OmdbResponse {
  Response: string;
  Error?: string;
}
import { SearchParamsObj } from './OmdbGeneralSearch';
import { FetchTitleDetailsParamsObj } from './OmdbTitleDetailsFetch';

export class OmdbFetch {
  protected static baseUrl =
    process.env.OMDB_API_PROXY_BASE_URL || `http://localhost:8000/api/omdb`;

  protected static requestUrl(params: SearchParamsObj | FetchTitleDetailsParamsObj): string {
    let fullUrl = this.baseUrl;
    const paramKeys = Object.keys(params);
    let paramKeyIndex = 0;

    for (const paramKey of paramKeys) {
      if (params[paramKey] && params[paramKey] !== '') {
        let paramVal = params[paramKey];
        paramVal = paramVal?.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '+');

        // console.log(paramKeyIndex);
        if (paramKeyIndex === 0) {
          fullUrl = fullUrl.concat(`?${paramKey}=${paramVal}`);
        } else if (paramKeyIndex < paramKeys.length - 1) {
          fullUrl = fullUrl.concat(`&${paramKey}=${paramVal}`);
        } else {
          fullUrl = fullUrl.concat(`${paramKey}=${paramVal}`);
        }
        paramKeyIndex++;
      }
    }
    // console.log('requesting data with url:', fullUrl);
    return fullUrl;
  }

  protected static async fetchOmdb(requestUrl: string): Promise<OmdbResponse> {
    try {
      const res = await fetch(requestUrl);
      const data: OmdbResponse = await res.json();
      if (data.Response === 'True') {
      } else if (data.Response === 'False' && data.Error === 'Movie not found!') {
        console.log('500 Server Error or Error 404 Not Found');
      }
      // console.log(data);
      return data;
    } catch {
      console.log('Fetch function failed', 'from reject by fetch promise');
      return { Response: 'False', Error: `Can't connect to server.` } as OmdbResponse;
    }
  }
}
