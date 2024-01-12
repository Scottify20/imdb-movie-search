import { Runtime } from './Title';

interface MovieTitleProps {
  Title: string;
  Year: number;
  Rated: string;
  Released: Date;
  Runtime: Runtime;
  Genre: string[];
  Director: string;
  Writer: string[];
  Actors: string[];
  Plot: string;
  Language: string[];
  Country: string[];
  Awards: string[];
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: number | null;
  imdbRating: number;
  imdbVotes: number;
  imdbID: string;
  Type: string;
  DVD: string | null;
  BoxOffice: { currency: string; amount: number } | null;
  Production: string | null;
  Website: string | null;
  // Response: 'True';
}

export class MovieTitle {}
