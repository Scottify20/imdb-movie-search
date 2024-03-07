import { OmdbResponse, OmdbFetch } from './OmdbFetch';

export class GeneralTitleSearch extends OmdbFetch {
  static async search(params: SearchParamsObj): Promise<GeneralResultParsedTypes> {
    try {
      const searchResult = await GeneralTitleSearch.processSearch(params);
      return searchResult;
    } catch {
      console.log('General Search Result Error');
    }
  }

  static async processSearch(params: SearchParamsObj) {
    const searchQuery = params.s;
    const pageNumberString = params.page;

    const requestUrl = this.requestUrl(params);
    // console.log(requestUrl);
    const fetchData = await this.fetchOmdb(requestUrl);
    const parsedData = await this.parseSearchResults(fetchData as GeneralSearchResult);
    //add search query and page number and showed results to parsed data;
    if (parsedData) {
      parsedData.searchQuery = searchQuery;
      parsedData.pageNumber = parseInt(pageNumberString);
    }
    // console.log(parsedData);
    return parsedData;
  }

  static requestUrl(params: SearchParamsObj): string {
    let fullUrl = this.baseUrl;
    const paramKeys = Object.keys(params);
    for (const paramKey of paramKeys) {
      if (params[paramKey] !== '') {
        let paramVal = params[paramKey];
        if (paramVal) {
          paramVal = paramVal.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '+');
        }
        fullUrl = fullUrl.concat(`&${paramKey}=${paramVal}`);
      }
    }
    // console.log('requesting data with url:', fullUrl);
    return fullUrl;
  }

  static async parseSearchResults(
    dataFromFetch: GeneralSearchResult | undefined
  ): Promise<GeneralResultParsedTypes> {
    if (dataFromFetch) {
      let parsedResult: GeneralSearchResultParsed = {
        Search: [],
        Response: '',
        totalResults: 0,
        searchQuery: '',
        Error: 'No Error',
      };
      if (dataFromFetch.Response === 'True') {
        // parse the properties of films inside Search:{}[]
        const parsedFilms = this.parseSearchedFilms(dataFromFetch);
        parsedResult.Search = [...parsedFilms];
        // get parsedresponseString
        parsedResult.Response = dataFromFetch.Response;
        // get total results number
        if (dataFromFetch.totalResults) {
          parsedResult.totalResults = parseInt(dataFromFetch.totalResults);
        }
      } else if (dataFromFetch.Response === 'False') {
        parsedResult.Response = dataFromFetch.Response;
        parsedResult.Error = dataFromFetch.Error;
      }
      return parsedResult;
    } else {
      console.log('fetch Error on method fetchData');
      return undefined;
    }
  }

  static parseSearchedFilms(fetchedData: GeneralSearchResult): GeneralParsedFilm[] {
    let parsedFilms: GeneralParsedFilm[] = [];
    if (fetchedData.Search) {
      const films = fetchedData.Search;

      films.forEach((film) => {
        let parsedFilm: GeneralParsedFilm = {
          Title: '',
          Year: [],
          imdbID: '',
          Type: 'movie',
          Poster: '',
        };
        for (const filmProp in film) {
          if (filmProp === 'Year') {
            const splitYear = film.Year.split('–');
            if (splitYear[1] === '' || splitYear.length === 1) {
              parsedFilm.Year.push(parseInt(splitYear[0]));
            } else if (splitYear.length === 2) {
              splitYear.forEach((numstring) => parsedFilm.Year.push(parseInt(numstring)));
            } else {
              parsedFilm.Year = [0];
            }
          } else if (filmProp === 'Type') {
            const type = film[filmProp];
            const typeChanged = type
              .replace(/^[a-z]/, type[0].toLocaleUpperCase())
              .replace('Series', 'TV Series');
            parsedFilm[filmProp] = typeChanged;
          } else {
            parsedFilm[filmProp] = film[filmProp];
          }
        }
        parsedFilms.push(parsedFilm);
      });
    }
    return parsedFilms;
  }
}

// End of Class
// Type and interface Definitions

export type SearchParamsObj = {
  s: string;
  page: string;
  type: string;
  y: string;
  [key: string]: string | undefined;
};

export type GeneralResultParsedTypes = GeneralSearchResultParsed | undefined;
export type GeneralResultTypes = GeneralSearchResult | undefined;

type GeneralSearchResultParsed = {
  Search?: GeneralParsedFilm[];
  Response: string;
  totalResults?: number;
  Error?: string;
  searchQuery?: string;
  pageNumber?: number;
};

interface GeneralSearchResult extends OmdbResponse {
  Search?: GeneralFilmProps[];
  totalResults?: string;
  searchQuery: string;
}

type GeneralParsedFilm = {
  Title: string;
  Year: number[];
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: string | yearOrYearRange;
};

type GeneralFilmProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
  [key: string]: string;
};

type yearOrYearRange = number | number[];
