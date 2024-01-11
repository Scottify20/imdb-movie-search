const apiKey = 'cbb2cfa7';

// search parameter
let searchQuery = 'Game';
//params
let pageNumber = 2; // (page)
let type = 'series'; // (type) movie, series, episode
let year = 2023; // (y)

// // other by ID or Title
let imdbID = 'tt0944947'; // (i) game of thrones' ID
let title = 'The Imitation Game'; //(t)
let type2 = 'movie'; // (type) movie, series, episode
let year2 = 2023; // (y)
let plot = 'short'; // (plot) short, full
//params

// const requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}}`;
const requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;

let users = {};

// fetch(requestUrl)
//   .then((res) => {
//     if (!res.ok) {
//       console.log('Error 404, Not Found');
//     } else {
//       console.log('Success');
//     }
//     return res.json();
//   })
//   .then((list) => {
//     console.log(list);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// searchQuery - General
// response.json()
// 10 results
const sampleSearchGeneral = {
  Search: [
    {
      Title: 'Game of Thrones',
      Year: '2011–2019',
      imdbID: 'tt0944947',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
    },
    {
      Title: 'The Imitation Game',
      Year: '2014',
      imdbID: 'tt2084970',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_SX300.jpg',
    },
    {
      Title: 'Squid Game',
      Year: '2021–',
      imdbID: 'tt10919420',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg',
    },
    {
      Title: 'Sherlock Holmes: A Game of Shadows',
      Year: '2011',
      imdbID: 'tt1515091',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTQwMzQ5Njk1MF5BMl5BanBnXkFtZTcwNjIxNzIxNw@@._V1_SX300.jpg',
    },
    {
      Title: 'The Game',
      Year: '1997',
      imdbID: 'tt0119174',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNWQ2ODFhNWItNTA4NS00MzkyLTgyYzUtZjlhYWE5MmEzY2Q1XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
    },
    {
      Title: 'Game Night',
      Year: '2018',
      imdbID: 'tt2704998',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjI3ODkzNDk5MF5BMl5BanBnXkFtZTgwNTEyNjY2NDM@._V1_SX300.jpg',
    },
    {
      Title: "Ender's Game",
      Year: '2013',
      imdbID: 'tt1731141',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjAzMzI5OTgzMl5BMl5BanBnXkFtZTgwMTU5MTAwMDE@._V1_SX300.jpg',
    },
    {
      Title: "Molly's Game",
      Year: '2017',
      imdbID: 'tt4209788',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNTkzMzRlYjEtMTQ5Yi00OWY3LWI0NzYtNGQ4ZDkzZTU0M2IwXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    },
    {
      Title: 'Spy Game',
      Year: '2001',
      imdbID: 'tt0266987',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNjNhOGZkNzktMGU3NC00ODk2LWE4NjctZTliN2JjZTQxZmIxXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
    },
    {
      Title: "Gerald's Game",
      Year: '2017',
      imdbID: 'tt3748172',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMzg0NGE0N2MtYTg1My00NTBkLWI5NjEtZTgyMDA0MTU4MmIyXkEyXkFqcGdeQXVyMTU2NTcyMg@@._V1_SX300.jpg',
    },
  ],
  totalResults: '4853',
  Response: 'True',
};

// Title Search - Series
// response.json()
const sampleTitleSeries = {
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
  Awards: 'Won 59 Primetime Emmys. 389 wins & 634 nominations total',
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
  imdbVotes: '2,237,126',
  imdbID: 'tt0944947',
  Type: 'series',
  totalSeasons: '8',
  Response: 'True',
};

const sampleTitleMovie = {
  Title: 'The Imitation Game',
  Year: '2014',
  Rated: 'PG-13',
  Released: '25 Dec 2014',
  Runtime: '114 min',
  Genre: 'Biography, Drama, Thriller',
  Director: 'Morten Tyldum',
  Writer: 'Graham Moore, Andrew Hodges',
  Actors: 'Benedict Cumberbatch, Keira Knightley, Matthew Goode',
  Plot: 'During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians while attempting to come to terms with his troubled private life.',
  Language: 'English, German',
  Country: 'United Kingdom, United States',
  Awards: 'Won 1 Oscar. 49 wins & 165 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '8.0/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '90%',
    },
    {
      Source: 'Metacritic',
      Value: '71/100',
    },
  ],
  Metascore: '71',
  imdbRating: '8.0',
  imdbVotes: '813,828',
  imdbID: 'tt2084970',
  Type: 'movie',
  DVD: '30 Nov 2016',
  BoxOffice: '$91,125,683',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};
