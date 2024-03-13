import { OmdbFetch } from './OmdbFetch';

type omdbTitlePlotLength = 'short' | 'full';

export class OmdbTitleDetailsFetch extends OmdbFetch {
  static fetchTitleDetailsParamsObj: FetchTitleDetailsParamsObj = {
    i: '', //id
    plot: 'short',
    type: '',
    season: '',
    episode: '',
  };

  private static titleDetailsCollection: { [key: string]: TitlePropsParsed | undefined } = {
    placeholder: undefined,
  };

  private static storeToTitleDetailsCollection(titleResult: TitlePropsParsed) {
    if (!titleResult.imdbID) {
      return;
    }
    const imdbIdKeysInCollection = Object.keys(this.titleDetailsCollection);
    const imdbId = titleResult.imdbID;
    if (!imdbIdKeysInCollection.includes(imdbId)) {
      this.titleDetailsCollection[imdbId] = titleResult;
    }
  }

  static istitleInCache(imdbId: string): boolean {
    const imdbIdKeysInCollection = Object.keys(this.titleDetailsCollection);
    // console.log(imdbIdKeysInCollection);
    return imdbIdKeysInCollection.includes(imdbId);
  }

  static getCachedTitleData(imdbId: string): TitlePropsParsed {
    return this.titleDetailsCollection[imdbId] as TitlePropsParsed;
  }

  static async getTitleData(
    imdbID: string,
    plotLength?: omdbTitlePlotLength,
    type?: OmdbTitleType,
    season?: string,
    episode?: string
  ): Promise<TitlePropsParsed | undefined> {
    this.fetchTitleDetailsParamsObj.i = imdbID;
    if (plotLength) {
      this.fetchTitleDetailsParamsObj.plot = plotLength;
    }
    if (type) {
      this.fetchTitleDetailsParamsObj.type = type;
    }
    if (season) {
      this.fetchTitleDetailsParamsObj.season = season;
    }
    if (episode) {
      this.fetchTitleDetailsParamsObj.episode = episode;
    }

    try {
      const searchResult = (await OmdbTitleDetailsFetch.processSearch(
        this.fetchTitleDetailsParamsObj
      )) as TitlePropsParsed;

      // stores the results to the collection
      this.storeToTitleDetailsCollection(searchResult);
      // console.log(searchResult);
      return searchResult;
    } catch {
      console.log('Fetch Title Details Error');
    }
  }

  static async processSearch(params: FetchTitleDetailsParamsObj) {
    const requestUrl = this.requestUrl(params);
    // console.log(requestUrl);
    const fetchData = (await this.fetchOmdb(requestUrl)) as TitleProps;
    // console.log('unparsed', fetchData);
    // console.log('parsed', this.parseFetchedData(fetchData));
    return this.parseFetchedData(fetchData);
  }

  static parseFetchedData(fetchedData: TitleProps): TitlePropsParsed | undefined {
    return this.parseTitle(fetchedData);
  }

  static parseTitle(titleProps: TitleProps): TitlePropsParsed {
    let parsedTitle: BaseTitlePropsParsed = {
      imdbID: '',
      Title: '',
      Type: '',
      Year: [],
      Rated: '',
      Runtime: '',
      Poster: '',
      Genre: [],
      Plot: '',
      Ratings: [],
      Actors: [],
      Director: [],
      Writer: [],
      Awards: '',
      Language: [],
      Country: [],
      Released: '',
      Metascore: 0,
      imdbRating: 0,
      imdbVotes: 0,
      Response: '',
    };

    for (const propKey in titleProps) {
      if (plainStringKeysParsed.includes(propKey)) {
        // the expected parsed property is a string
        if (propKey === 'Type') {
          // change all types to have uppercase firstletter
          // and series to TV Series
          const type = titleProps[propKey];
          const typeChanged = type
            .replace(/^[a-z]/, type[0].toLocaleUpperCase())
            .replace('Series', 'TV Series');
          parsedTitle[propKey] = typeChanged as OmdbTitleType;
        } else {
          parsedTitle[propKey] = titleProps[propKey];
        }
      } else if (arrayStringKeysParsed.includes(propKey)) {
        // the unparsed property is a string of items separated by commas
        // the expected parsed property is an array of strings
        const commaString = titleProps[propKey] as string;
        const separatedStrings = commaString.split(', ');
        // console.log(separatedStrings);

        for (const stringValue of separatedStrings as string[]) {
          (parsedTitle[propKey] as string[]).push(stringValue);
        }
      } else if (plainNumberKeysParsed.includes(propKey)) {
        // it should still work if the string of number is separated by commas
        // if the expected parsed property is a number
        const stringNumber = titleProps[propKey] as string;
        const parsedStringNumber = parseFloat(stringNumber.replace(/,/g, ''));
        // console.log(titleProps[propKey], parsedStringNumber);
        parsedTitle[propKey] = parsedStringNumber;
      } else if (propKey === 'Ratings') {
        // if the expected parsed property is of type {Source: string, Value: number}
        for (const rating of titleProps.Ratings) {
          let parsedRating = { Source: '', Value: 0 };
          parsedRating.Source = rating.Source;
          parsedRating.Value = parseFloat(rating.Value);
          parsedTitle.Ratings.push(parsedRating);
        }
      } else if (propKey === 'Year') {
        let splitYearString: string[];
        splitYearString = titleProps.Year.split(/[^0-9]/);
        // console.log(splitYearString);
        for (const year of splitYearString) {
          if (year.length >= 4) {
            parsedTitle.Year.push(Number(year));
          }
        }
      }
    }
    return parsedTitle as TitlePropsParsed;
  }
}

// End of Class
// Type and interface Definitions

const plainStringKeysParsed: string[] = [
  'Title',
  'Type',
  'Rated',
  'Runtime',
  'Plot',
  'Awards',
  'Poster',
  'imdbID',
  'Response',
  'BoxOffice',
  'Production',
  'Website',
  'SeriesID',
  'Released',
  'DVD',
];

const plainNumberKeysParsed: string[] = [
  'totalSeasons',
  'Season',
  'Episode',
  'Metascore',
  'imdbVotes',
  'imdbRating',
];

const arrayStringKeysParsed: string[] = [
  'Genre',
  'Writer',
  'Actors',
  'Language',
  'Country',
  'Director',
];

// const dateKeysParsed: string[] = ['Released', 'DVD'];

export type FetchTitleDetailsParamsObj = {
  i: string; // id
  plot: omdbTitlePlotLength;
  type: OmdbTitleType;
  season: string;
  episode: string;
  [key: string]: string | undefined;
};

type OmdbTitleType =
  | 'movie'
  | 'series'
  | 'episode'
  | 'game'
  | ''
  | 'Movie'
  | 'Game'
  | 'Series'
  | 'Episode'
  | 'TV Series';

type TitleProps = MovieProps | SeriesProps | EpisodeProps | GameProps;

export type TitlePropsParsed =
  | MoviePropsParsed
  | SeriesPropsParsed
  | GamePropsParsed
  | EpisodePropsParsed;

interface MoviePropsParsed extends BaseTitlePropsParsed {
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  [key: string]: string | string[] | number | {};
}

interface SeriesPropsParsed extends BaseTitlePropsParsed {
  totalSeasons: number;
  [key: string]: string | string[] | number | {};
}

interface GamePropsParsed extends BaseTitlePropsParsed {
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  [key: string]: string | string[] | number | {};
}

interface EpisodePropsParsed extends BaseTitlePropsParsed {
  Season: number;
  Episode: number;
  seriesID: string;
  [key: string]: string | string[] | number | {};
}

interface BaseTitlePropsParsed {
  Title: string;
  Year: number[];
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string[];
  Director: string[];
  Writer: string[];
  Actors: string[];
  Plot: string;
  Language: string[];
  Country: string[];
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: number }[];
  Metascore: number;
  imdbRating: number;
  imdbVotes: number;
  imdbID: string;
  Type: OmdbTitleType;
  Response: string;
  [key: string]: string | string[] | number | {};
}

interface MovieProps extends BaseTitleProps {
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  [key: string]: string | {};
}

interface SeriesProps extends BaseTitleProps {
  totalSeasons: string;
  [key: string]: string | {};
}

interface GameProps extends BaseTitleProps {
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  [key: string]: string | {};
}

interface EpisodeProps extends BaseTitleProps {
  Season: string;
  Episode: string;
  seriesID: string;
  [key: string]: string | {};
}

interface BaseTitleProps {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: OmdbTitleType;
  Response: string;
  [key: string]: string | {};
}
