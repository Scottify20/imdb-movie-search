import { OmdbSearch } from './OmdbSearch';

export class GeneralTitleSearch extends OmdbSearch<GeneralTitleResult> {
  constructor(
    public searchQuery: string,
    public pageNumberQuery: string = '',
    public typeQuery: movieOrSeriesOrEpisode = '',
    public yearQuery = ''
  ) {
    super();
    this.search();
  }

  public searchResults: ParsedFilm[] = [];
  public totalResults = 0;
  public ErrorMessage = '';

  public params: { [key: string]: string } = {
    s: `${this.searchQuery}`,
    page: `${this.pageNumberQuery}`,
    type: `${this.typeQuery}`,
    y: `${this.yearQuery}`,
  };

  setParamFilter(paramKey: ParamKeys, paramValue: string): void {
    this.params[paramKey] = paramValue;
    this.search();
    console.log(this.requestUrl);
  }

  get requestUrl() {
    let fullUrl = this.baseUrl;
    const params = this.params;
    const paramKeys = Object.keys(params);

    for (const paramKey of paramKeys) {
      if (params[paramKey] !== '') {
        fullUrl = fullUrl.concat(`&${paramKey}=${params[paramKey]}`);
      }
    }
    fullUrl = fullUrl.replace(/ /g, '+');
    return fullUrl;
  }

  parseData(): void {
    // arrays of movie/series/episode results
    if ('Search' in this.data && this.data.Search) {
      const films = this.data.Search;
      films.forEach((film) => {
        let parsedFilm: ParsedFilm = {
          Title: '',
          Year: 0,
          imdbID: '',
          Type: 'movie',
          Poster: '',
        };

        for (const filmProp in film) {
          if (filmProp === 'Year') {
            const splitYear = film.Year.split('–');
            if (splitYear[1] === '' || splitYear.length === 1) {
              parsedFilm.Year = parseInt(splitYear[0]);
            } else if (splitYear.length === 2) {
              splitYear.forEach((numstring) => parseInt(numstring));
            } else {
              parsedFilm.Year = 0;
            }
          } else {
            parsedFilm[filmProp] = film[filmProp];
          }
        }
        this.searchResults.push(parsedFilm);
      });
    }

    // total number of results
    if ('totalResults' in this.data && this.data.totalResults) {
      this.totalResults = parseInt(this.data.totalResults);
    }

    // Error Message if error occurs
    if ('Error' in this.data && this.data.Error) {
      this.ErrorMessage = this.data.Error;
    }
  }
}

type ParamKeys = 'page' | 'type' | 'y';

type ParsedFilm = {
  Title: string;
  Year: yearOrYearRange;
  imdbID: string;
  Type: movieOrSeriesOrEpisode;
  Poster: string;
  [key: string]: string | yearOrYearRange | movieOrSeriesOrEpisode;
};

type yearOrYearRange = number | number[];
type movieOrSeriesOrEpisode = 'movie' | 'series' | 'episode' | '';

type GeneralTitleResult = {
  Response: string;
  Search?: GeneralTitleProps[];
  totalResults?: string;
  Error?: string;
};

type GeneralTitleProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
  [key: string]: string;
};
