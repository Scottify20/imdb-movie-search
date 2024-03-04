import { OmdbTitleDetailsFetch } from '../../omdb/OmdbTitleDetailsFetch';

export function titleDetails(isOn: boolean) {
  if (isOn) {
    // OmdbTitleDetailsFetch.search('tt1480055', 'short');
  }
}

const sampleSeries = {
  Title: 'Game of Thrones',
  Year: '2011–2019',
  Rated: 'TV-MA',
  Released: '17 Apr 2011',
  Runtime: '57 min',
  Genre: 'Action, Adventure, Drama',
  Director: 'N/A',
  Writer: 'David Benioff, D.B. Weiss',
  Actors: 'Emilia Clarke, Peter Dinklage, Kit Harington',
  Plot: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for a millennia.',
  Language: 'English',
  Country: 'United States, United Kingdom',
  Awards: 'Won 59 Primetime Emmys. 389 wins & 636 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '9.2/10',
    },
  ],
  Metascore: 'N/A',
  imdbRating: '9.2',
  imdbVotes: '2,250,524',
  imdbID: 'tt0944947',
  Type: 'series',
  totalSeasons: '8',
  Response: 'True',
};

const sampleMovie = {
  Title: 'Dune',
  Year: '2021',
  Rated: 'PG-13',
  Released: '22 Oct 2021',
  Runtime: '155 min',
  Genre: 'Action, Adventure, Drama',
  Director: 'Denis Villeneuve',
  Writer: 'Jon Spaihts, Denis Villeneuve, Eric Roth',
  Actors: 'Timothée Chalamet, Rebecca Ferguson, Zendaya',
  Plot: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
  Language: 'English, Mandarin',
  Country: 'United States, Canada',
  Awards: 'Won 6 Oscars. 173 wins & 294 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '8.0/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '83%',
    },
    {
      Source: 'Metacritic',
      Value: '74/100',
    },
  ],
  Metascore: '74',
  imdbRating: '8.0',
  imdbVotes: '772,111',
  imdbID: 'tt1160419',
  Type: 'movie',
  DVD: '22 Oct 2021',
  BoxOffice: '$108,897,830',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

const sampleGame = {
  Title: 'Minecraft',
  Year: '2009',
  Rated: 'E10+',
  Released: '16 May 2009',
  Runtime: 'N/A',
  Genre: 'Action, Adventure, Family, Fantasy, Romance, Sci-Fi',
  Director: 'Markus Persson',
  Writer: 'N/A',
  Actors: 'N/A',
  Plot: 'Welcome to the world of Minecraft where you can build, brew potions, enchant your armor and tools and adventure other biomes. Visit the Nether, or even defeat the Ender Dragon in the End.',
  Language:
    'Swedish, French, Mandarin, Spanish, Japanese, Indonesian, Dutch, Turkish, Slovenian, Slovak, English',
  Country: 'Sweden, UK',
  Awards: '7 wins & 6 nominations.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZTc4ZTQ2YTctZjllYS00ZjUwLWI3NDktYzU5NmU5MTY3ODZjXkEyXkFqcGdeQXVyNjgzMzA5Mzk@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '8.4/10',
    },
  ],
  Metascore: 'N/A',
  imdbRating: '8.4',
  imdbVotes: '8,244',
  imdbID: 'tt2011970',
  Type: 'game',
  DVD: 'N/A',
  BoxOffice: 'N/A',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

const sampleEpisode = {
  Title: 'Winter Is Coming',
  Year: '2011',
  Rated: '18+',
  Released: '17 Apr 2011',
  Season: '1',
  Episode: '1',
  Runtime: '62 min',
  Genre: 'Action, Adventure, Drama',
  Director: 'Timothy Van Patten',
  Writer: 'David Benioff, D.B. Weiss, George R.R. Martin',
  Actors: 'Sean Bean, Mark Addy, Nikolaj Coster-Waldau',
  Plot: 'Eddard Stark is torn between his family and an old friend when asked to serve at the side of King Robert Baratheon; Viserys plans to wed his sister to a nomadic warlord in exchange for an army.',
  Language: 'English',
  Country: 'United States',
  Awards: 'N/A',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BMmVhODQ1NmUtMzJiYi00MGNiLWExNmQtYmUxNGJmY2U5ZmJlXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '8.9/10',
    },
  ],
  Metascore: 'N/A',
  imdbRating: '8.9',
  imdbVotes: '53917',
  imdbID: 'tt1480055',
  seriesID: 'tt0944947',
  Type: 'episode',
  Response: 'True',
};
