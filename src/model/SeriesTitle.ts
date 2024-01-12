import { Runtime } from './Title';
type YearRange = [start: number, end: number];
// enum Ratings = {

// }

interface SeriesTitleProps {
  Title: string;
  Year: YearRange;
  Rated: string; // enums
  Released: Date;
  Runtime: Runtime;
  Genre: string[];
  Director: string;
  Writer: string[];
  Actors: string[];
  Plot: string;
  Language: string[];
  Country: string[];
  Awards: string[]; // ?/???
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: number | null;
  imdbRating: number;
  imdbVotes: number;
  imdbID: string;
  Type: string; /// enum series, movie
  totalSeasons: number;
  // Response: string;
}

export class SeriesTitle {
  constructor(public seriesTitleProps: SeriesTitleProps) {}
}
