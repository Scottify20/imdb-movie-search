import { OmdbSearch, OmdbResponse } from './OmdbSearch';

export class GeneralTitleSearch extends OmdbSearch<GeneralSearchResult> {
  public searchQuery: string = '';

  static async search(
    params: SearchParamsObj
  ): Promise<GeneralResultParsedTypes> {
    try {
      const searchResult = await new GeneralTitleSearch().processSearch(params);
      return searchResult;
    } catch {
      console.log('General Search Result Error');
    }
  }

  async processSearch(params: SearchParamsObj) {
    this.searchQuery = params.s;
    const requestUrl = this.requestUrl(params);
    const fetchData = await this.fetchOmdb(requestUrl);
    const parsedData = await this.parseData(fetchData);
    //add search query to parsed data;
    if (parsedData) {
      parsedData.searchQuery = this.searchQuery;
    }
    return parsedData;
  }

  requestUrl(params: SearchParamsObj): string {
    let fullUrl = this.baseUrl;
    const paramKeys = Object.keys(params);
    for (const paramKey of paramKeys) {
      if (params[paramKey] !== '') {
        fullUrl = fullUrl.concat(`&${paramKey}=${params[paramKey]}`);
      }
    }
    // fullUrl
    fullUrl = fullUrl.replace(/ /g, '+');
    console.log('requesting data with url:', fullUrl);
    return fullUrl;
  }

  async parseData(
    dataFromFetch: GeneralSearchResult | undefined
  ): Promise<GeneralResultParsedTypes> {
    if (dataFromFetch) {
      let parsedData: GeneralSearchResultParsed = {
        Search: [],
        Response: '',
        totalResults: 0,
        searchQuery: '',
        Error: 'No Error',
      };
      if (dataFromFetch.Response === 'True') {
        // parse the properties of films inside Search:[]
        const parsedFilms = this.parseSucessFilms(dataFromFetch);
        parsedData.Search = [...parsedFilms];
        // get parsedresponseString
        parsedData.Response = dataFromFetch.Response;
        // get total results number
        if (dataFromFetch.totalResults) {
          parsedData.totalResults = parseInt(dataFromFetch.totalResults);
        }
      } else if (dataFromFetch.Response === 'False') {
        parsedData.Response = dataFromFetch.Response;
        parsedData.Error = dataFromFetch.Error;
      }
      return parsedData;
    } else {
      console.log('fetch Error on method fetchData');
      return undefined;
    }
  }

  parseSucessFilms(fetchedData: GeneralSearchResult): ParsedFilm[] {
    let parsedFilms: ParsedFilm[] = [];
    if (fetchedData.Search) {
      const films = fetchedData.Search;

      films.forEach((film) => {
        let parsedFilm: ParsedFilm = {
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
            } else if (splitYear.length === 2 && splitYear[1] !== '') {
              splitYear.forEach((numstring) =>
                parsedFilm.Year.push(parseInt(numstring))
              );
            } else {
              parsedFilm.Year = [0];
            }
          } else if (filmProp === 'Type') {
            const [firstLetter, ...restOfLettters] = film.Type;
            const upperfirstLetter = firstLetter.toUpperCase();
            const joinedType = [upperfirstLetter, ...restOfLettters].join('');
            parsedFilm.Type = joinedType;
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

type GeneralSearchResultParsed = {
  Search?: ParsedFilm[];
  Response: string;
  totalResults?: number;
  Error?: string;
  searchQuery: string;
};

type ParsedFilm = {
  Title: string;
  Year: number[];
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: string | yearOrYearRange;
};

type yearOrYearRange = number | number[];

interface GeneralSearchResult extends OmdbResponse {
  Response: string;
  Search?: GeneralFilmProps[];
  totalResults?: string;
  Error?: string;
  searchQuery: string;
}

type GeneralFilmProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
  [key: string]: string;
};

export type GeneralResultParsedTypes = GeneralSearchResultParsed | undefined;

export type GeneralResultTypes = GeneralSearchResult | undefined;

// constructor(
//   public searchQuery: string,
//   public pageNumberQuery: string = '',
//   public typeQuery: movieOrSeriesOrEpisode = '',
//   public yearQuery = ''
// ) {
//   super();
// }

// public params: { [key: string]: string } = {
//   s: `${this.searchQuery}`,
//   page: `${this.pageNumberQuery}`,
//   type: `${this.typeQuery}`,
//   y: `${this.yearQuery}`,
// };
