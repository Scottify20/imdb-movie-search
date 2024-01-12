interface ResultTitleProps {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}
interface MutipleResultsTitleProps {
  Search: ResultTitleProps[];
}

export class TitleResults {
  constructor(public results: MutipleResultsTitleProps) {}

  fetchResults(): void {}
}
