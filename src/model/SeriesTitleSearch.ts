import { TitleProps } from './TitleProps';

interface SeriesTitleProps extends TitleProps {
  totalSeasons: string;
}

export class SeriesTitleSearch {
  constructor(public seriesTitleProps: SeriesTitleProps) {}
}
