import { insertHTMLInsideElementById } from '../../../utils/GlobalUtils';
import { TmdbMovieGenreIds, tmdbTimeWindowTypes } from '../../../utils/tmdb/TmdbFetch';

export class TrendingMedia {
  private static IsOn = false;
  private static TrendingTimeWindow: tmdbTimeWindowTypes = 'day';
  private static movieCardsContainer: HTMLElement;
  private static seriesCardsContainer: HTMLElement;

  private static trendingMoviesDay = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/tZ7ZWsmAg3HMxLbzDj9nl0OC5bX.jpg',
        id: 984324,
        title: 'The Wages of Fear',
        original_language: 'fr',
        original_title: 'Le salaire de la peur',
        overview:
          'When an explosion at an oil well threatens hundreds of lives, a crack team is called upon to make a deadly desert crossing with nitroglycerine in tow.',
        poster_path: '/jFK2ZLQUzo9pea0jfMCHDfvWsx7.jpg',
        media_type: 'movie',
        genre_ids: [28, 53],
        popularity: 70.491,
        release_date: '2024-03-28',
        video: false,
        vote_average: 5.517,
        vote_count: 30,
      },
      {
        adult: false,
        backdrop_path: '/sR0SpCrXamlIkYMdfz83sFn5JS6.jpg',
        id: 823464,
        title: 'Godzilla x Kong: The New Empire',
        original_language: 'en',
        original_title: 'Godzilla x Kong: The New Empire',
        overview:
          'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
        poster_path: '/gmGK5Gw5CIGMPhOmTO0bNA9Q66c.jpg',
        media_type: 'movie',
        genre_ids: [28, 878, 12],
        popularity: 4825.24,
        release_date: '2024-03-27',
        video: false,
        vote_average: 7.246,
        vote_count: 171,
      },
      {
        adult: false,
        backdrop_path: '/wUp0bUXaveR40ikBhDgWwNTijuD.jpg',
        id: 1181548,
        title: 'Heart of the Hunter',
        original_language: 'en',
        original_title: 'Heart of the Hunter',
        overview:
          'A retired assassin is pulled back into action when his friend uncovers a dangerous conspiracy at the heart of the South African government.',
        poster_path: '/n726fdyL1dGwt15bY7Nj3XOXc4Q.jpg',
        media_type: 'movie',
        genre_ids: [28, 9648, 53],
        popularity: 78.245,
        release_date: '2024-03-28',
        video: false,
        vote_average: 4.7,
        vote_count: 9,
      },
      {
        adult: false,
        backdrop_path: '/39LxWqvQCsbAe0Cm2B7dtBe3Rd4.jpg',
        id: 359410,
        title: 'Road House',
        original_language: 'en',
        original_title: 'Road House',
        overview:
          'Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.',
        poster_path: '/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg',
        media_type: 'movie',
        genre_ids: [28, 53],
        popularity: 3944.132,
        release_date: '2024-03-08',
        video: false,
        vote_average: 7.266,
        vote_count: 903,
      },
      {
        adult: false,
        backdrop_path: '/1tDMeyxEMa2zNMWL8BXvXydKxTX.jpg',
        id: 857655,
        title: 'The Beautiful Game',
        original_language: 'en',
        original_title: 'The Beautiful Game',
        overview:
          'Advocates to end homelessness, organize an annual tournament for Homeless people to compete in a series of football matches known as The Homeless World Cup.',
        poster_path: '/3Laz0p3Qg47vI2XIalpL2SlNUDI.jpg',
        media_type: 'movie',
        genre_ids: [18],
        popularity: 26.699,
        release_date: '2024-03-22',
        video: false,
        vote_average: 6.5,
        vote_count: 14,
      },
      {
        adult: false,
        backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
        id: 693134,
        title: 'Dune: Part Two',
        original_language: 'en',
        original_title: 'Dune: Part Two',
        overview:
          'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.',
        poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        media_type: 'movie',
        genre_ids: [878, 12],
        popularity: 791.212,
        release_date: '2024-02-27',
        video: false,
        vote_average: 8.381,
        vote_count: 2263,
      },
      {
        adult: false,
        backdrop_path: '/TGsfNWkASegCfAn6ED1b08a9O6.jpg',
        id: 1125311,
        title: 'Imaginary',
        original_language: 'en',
        original_title: 'Imaginary',
        overview:
          'When Jessica moves back into her childhood home with her family, her youngest stepdaughter Alice develops an eerie attachment to a stuffed bear named Chauncey she finds in the basement. Alice starts playing games with Chauncey that begin playful and become increasingly sinister. As Alice’s behavior becomes more and more concerning, Jessica intervenes only to realize Chauncey is much more than the stuffed toy bear she believed him to be.',
        poster_path: '/9u6HEtZJdZDjPGGJq6YEuhPnoan.jpg',
        media_type: 'movie',
        genre_ids: [27, 9648, 53],
        popularity: 307.994,
        release_date: '2024-03-06',
        video: false,
        vote_average: 5.882,
        vote_count: 106,
      },
      {
        adult: false,
        backdrop_path: '/cNffd3wkuIYZMelbPRAZ23E5HBT.jpg',
        id: 792307,
        title: 'Poor Things',
        original_language: 'en',
        original_title: 'Poor Things',
        overview:
          'Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.',
        poster_path: '/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
        media_type: 'movie',
        genre_ids: [878, 10749, 35],
        popularity: 642.689,
        release_date: '2023-12-07',
        video: false,
        vote_average: 7.825,
        vote_count: 2838,
      },
      {
        adult: false,
        backdrop_path: '/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg',
        id: 1011985,
        title: 'Kung Fu Panda 4',
        original_language: 'en',
        original_title: 'Kung Fu Panda 4',
        overview:
          'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
        poster_path: '/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
        media_type: 'movie',
        genre_ids: [28, 12, 16, 35, 10751],
        popularity: 4327.321,
        release_date: '2024-03-02',
        video: false,
        vote_average: 6.9,
        vote_count: 433,
      },
      {
        adult: false,
        backdrop_path: '/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg',
        id: 438631,
        title: 'Dune',
        original_language: 'en',
        original_title: 'Dune',
        overview:
          "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
        poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
        media_type: 'movie',
        genre_ids: [878, 12],
        popularity: 468.8,
        release_date: '2021-09-15',
        video: false,
        vote_average: 7.8,
        vote_count: 11015,
      },
      {
        adult: false,
        backdrop_path: '/3IoSYT0gnuImnZ73rqYySJnmefA.jpg',
        id: 967847,
        title: 'Ghostbusters: Frozen Empire',
        original_language: 'en',
        original_title: 'Ghostbusters: Frozen Empire',
        overview:
          "The Spengler family returns to where it all started – the iconic New York City firehouse – to team up with the original Ghostbusters, who've developed a top-secret research lab to take busting ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age.",
        poster_path: '/r65fWcFELCSeyyrkq5wY09EPSGN.jpg',
        media_type: 'movie',
        genre_ids: [14, 12, 35],
        popularity: 496.794,
        release_date: '2024-03-20',
        video: false,
        vote_average: 6.764,
        vote_count: 127,
      },
      {
        adult: false,
        backdrop_path: '/kPDhJ0abEc8OCulKgE1PNLzRj68.jpg',
        id: 1106049,
        title: 'Rest in Peace',
        original_language: 'es',
        original_title: 'Descansar en paz',
        overview:
          'A debt-ridden father takes advantage of an unforeseen situation to disappear and live off the grid under a false identity. But a chance event occurs and the temptation to want to know his family resurfaces.',
        poster_path: '/rQTpmzVlg55Fj0IXnkhzOyBP6kz.jpg',
        media_type: 'movie',
        genre_ids: [53, 18],
        popularity: 51.985,
        release_date: '2024-03-21',
        video: false,
        vote_average: 6.875,
        vote_count: 8,
      },
      {
        adult: false,
        backdrop_path: '/zAepSrO99owYwQqi0QG2AS0dHXw.jpg',
        id: 634492,
        title: 'Madame Web',
        original_language: 'en',
        original_title: 'Madame Web',
        overview:
          'Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.',
        poster_path: '/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg',
        media_type: 'movie',
        genre_ids: [28, 14],
        popularity: 2434.816,
        release_date: '2024-02-14',
        video: false,
        vote_average: 5.6,
        vote_count: 864,
      },
      {
        adult: false,
        backdrop_path: '/deLWkOLZmBNkm8p16igfapQyqeq.jpg',
        id: 763215,
        title: 'Damsel',
        original_language: 'en',
        original_title: 'Damsel',
        overview:
          "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
        poster_path: '/AgHbB9DCE9aE57zkHjSmseszh6e.jpg',
        media_type: 'movie',
        genre_ids: [14, 28, 12],
        popularity: 1430.564,
        release_date: '2024-03-07',
        video: false,
        vote_average: 7.184,
        vote_count: 1307,
      },
      {
        adult: false,
        backdrop_path: '/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
        id: 872585,
        title: 'Oppenheimer',
        original_language: 'en',
        original_title: 'Oppenheimer',
        overview:
          "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        media_type: 'movie',
        genre_ids: [18, 36],
        popularity: 619.546,
        release_date: '2023-07-19',
        video: false,
        vote_average: 8.1,
        vote_count: 7444,
      },
      {
        adult: false,
        backdrop_path: '/giLoSoPXYTB4vtB5jOiRhhltL8H.jpg',
        id: 1257130,
        title: 'No Pressure',
        original_language: 'pl',
        original_title: 'Nic na siłę',
        overview:
          "After being tricked into dropping everything to save her grandmother's farm, big-city chef Oliwia falls for a handsome farmer who's hiding a secret.",
        poster_path: '/mlGjb0Cku6EVYNg1VM0cddwIgkX.jpg',
        media_type: 'movie',
        genre_ids: [35, 10749],
        popularity: 96.485,
        release_date: '2024-03-27',
        video: false,
        vote_average: 5.2,
        vote_count: 5,
      },
      {
        adult: false,
        backdrop_path: '/1ZSKH5GGFlM8M32K34GMdaNS2Ew.jpg',
        id: 802219,
        title: 'Bob Marley: One Love',
        original_language: 'en',
        original_title: 'Bob Marley: One Love',
        overview:
          'Jamaican singer-songwriter Bob Marley overcomes adversity to become the most famous reggae musician in the world.',
        poster_path: '/4eWeXswkAUIvdVWFvPrUFu2TxuI.jpg',
        media_type: 'movie',
        genre_ids: [10402, 36, 18],
        popularity: 460.026,
        release_date: '2024-02-14',
        video: false,
        vote_average: 7.049,
        vote_count: 419,
      },
      {
        adult: false,
        backdrop_path: '/yyFc8Iclt2jxPmLztbP617xXllT.jpg',
        id: 787699,
        title: 'Wonka',
        original_language: 'en',
        original_title: 'Wonka',
        overview:
          'Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.',
        poster_path: '/qhb1qOilapbapxWQn9jtRCMwXJF.jpg',
        media_type: 'movie',
        genre_ids: [35, 10751, 14],
        popularity: 676.84,
        release_date: '2023-12-06',
        video: false,
        vote_average: 7.211,
        vote_count: 2700,
      },
      {
        adult: false,
        backdrop_path: '/fGe1ej335XbqN1j9teoDpofpbLX.jpg',
        id: 915935,
        title: 'Anatomy of a Fall',
        original_language: 'fr',
        original_title: "Anatomie d'une chute",
        overview:
          "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness.",
        poster_path: '/kQs6keheMwCxJxrzV83VUwFtHkB.jpg',
        media_type: 'movie',
        genre_ids: [53, 9648, 80],
        popularity: 168.419,
        release_date: '2023-08-23',
        video: false,
        vote_average: 7.642,
        vote_count: 1624,
      },
      {
        adult: false,
        backdrop_path: '/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg',
        id: 399566,
        title: 'Godzilla vs. Kong',
        original_language: 'en',
        original_title: 'Godzilla vs. Kong',
        overview:
          'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
        poster_path: '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
        media_type: 'movie',
        genre_ids: [28, 878, 53],
        popularity: 814.662,
        release_date: '2021-03-24',
        video: false,
        vote_average: 7.6,
        vote_count: 9472,
      },
    ],
    total_pages: 1000,
    total_results: 20000,
  };
  private static trendingMoviesWeek = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/39LxWqvQCsbAe0Cm2B7dtBe3Rd4.jpg',
        id: 359410,
        title: 'Road House',
        original_language: 'en',
        original_title: 'Road House',
        overview:
          'Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.',
        poster_path: '/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg',
        media_type: 'movie',
        genre_ids: [28, 53],
        popularity: 3944.132,
        release_date: '2024-03-08',
        video: false,
        vote_average: 7.266,
        vote_count: 903,
      },
      {
        adult: false,
        backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
        id: 693134,
        title: 'Dune: Part Two',
        original_language: 'en',
        original_title: 'Dune: Part Two',
        overview:
          'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.',
        poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        media_type: 'movie',
        genre_ids: [878, 12],
        popularity: 791.212,
        release_date: '2024-02-27',
        video: false,
        vote_average: 8.381,
        vote_count: 2263,
      },
      {
        adult: false,
        backdrop_path: '/sR0SpCrXamlIkYMdfz83sFn5JS6.jpg',
        id: 823464,
        title: 'Godzilla x Kong: The New Empire',
        original_language: 'en',
        original_title: 'Godzilla x Kong: The New Empire',
        overview:
          'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
        poster_path: '/gmGK5Gw5CIGMPhOmTO0bNA9Q66c.jpg',
        media_type: 'movie',
        genre_ids: [28, 878, 12],
        popularity: 4825.24,
        release_date: '2024-03-27',
        video: false,
        vote_average: 7.246,
        vote_count: 171,
      },
      {
        adult: false,
        backdrop_path: '/zAepSrO99owYwQqi0QG2AS0dHXw.jpg',
        id: 634492,
        title: 'Madame Web',
        original_language: 'en',
        original_title: 'Madame Web',
        overview:
          'Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.',
        poster_path: '/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg',
        media_type: 'movie',
        genre_ids: [28, 14],
        popularity: 2434.816,
        release_date: '2024-02-14',
        video: false,
        vote_average: 5.6,
        vote_count: 864,
      },
      {
        adult: false,
        backdrop_path: '/cNffd3wkuIYZMelbPRAZ23E5HBT.jpg',
        id: 792307,
        title: 'Poor Things',
        original_language: 'en',
        original_title: 'Poor Things',
        overview:
          'Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.',
        poster_path: '/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
        media_type: 'movie',
        genre_ids: [878, 10749, 35],
        popularity: 642.689,
        release_date: '2023-12-07',
        video: false,
        vote_average: 7.825,
        vote_count: 2838,
      },
      {
        adult: false,
        backdrop_path: '/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg',
        id: 438631,
        title: 'Dune',
        original_language: 'en',
        original_title: 'Dune',
        overview:
          "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
        poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
        media_type: 'movie',
        genre_ids: [878, 12],
        popularity: 468.8,
        release_date: '2021-09-15',
        video: false,
        vote_average: 7.8,
        vote_count: 11015,
      },
      {
        adult: false,
        backdrop_path: '/deLWkOLZmBNkm8p16igfapQyqeq.jpg',
        id: 763215,
        title: 'Damsel',
        original_language: 'en',
        original_title: 'Damsel',
        overview:
          "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
        poster_path: '/AgHbB9DCE9aE57zkHjSmseszh6e.jpg',
        media_type: 'movie',
        genre_ids: [14, 28, 12],
        popularity: 1430.564,
        release_date: '2024-03-07',
        video: false,
        vote_average: 7.184,
        vote_count: 1307,
      },
      {
        adult: false,
        backdrop_path: '/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg',
        id: 1011985,
        title: 'Kung Fu Panda 4',
        original_language: 'en',
        original_title: 'Kung Fu Panda 4',
        overview:
          'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
        poster_path: '/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
        media_type: 'movie',
        genre_ids: [28, 12, 16, 35, 10751],
        popularity: 4327.321,
        release_date: '2024-03-02',
        video: false,
        vote_average: 6.9,
        vote_count: 433,
      },
      {
        adult: false,
        backdrop_path: '/1ZSKH5GGFlM8M32K34GMdaNS2Ew.jpg',
        id: 802219,
        title: 'Bob Marley: One Love',
        original_language: 'en',
        original_title: 'Bob Marley: One Love',
        overview:
          'Jamaican singer-songwriter Bob Marley overcomes adversity to become the most famous reggae musician in the world.',
        poster_path: '/4eWeXswkAUIvdVWFvPrUFu2TxuI.jpg',
        media_type: 'movie',
        genre_ids: [10402, 36, 18],
        popularity: 460.026,
        release_date: '2024-02-14',
        video: false,
        vote_average: 7.049,
        vote_count: 419,
      },
      {
        adult: false,
        backdrop_path: '/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
        id: 872585,
        title: 'Oppenheimer',
        original_language: 'en',
        original_title: 'Oppenheimer',
        overview:
          "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        media_type: 'movie',
        genre_ids: [18, 36],
        popularity: 619.546,
        release_date: '2023-07-19',
        video: false,
        vote_average: 8.1,
        vote_count: 7444,
      },
      {
        adult: false,
        backdrop_path: '/xvk5AhfhgQcTuaCQyq3XqAnhEma.jpg',
        id: 848538,
        title: 'Argylle',
        original_language: 'en',
        original_title: 'Argylle',
        overview:
          "When the plots of reclusive author Elly Conway's fictional espionage novels begin to mirror the covert actions of a real-life spy organization, quiet evenings at home become a thing of the past. Accompanied by her cat Alfie and Aiden, a cat-allergic spy, Elly races across the world to stay one step ahead of the killers as the line between Conway's fictional world and her real one begins to blur.",
        poster_path: '/95VlSEfLMqeX36UVcHJuNlWEpwf.jpg',
        media_type: 'movie',
        genre_ids: [28, 12, 35],
        popularity: 723.266,
        release_date: '2024-01-31',
        video: false,
        vote_average: 6.135,
        vote_count: 740,
      },
      {
        adult: false,
        backdrop_path: '/TGsfNWkASegCfAn6ED1b08a9O6.jpg',
        id: 1125311,
        title: 'Imaginary',
        original_language: 'en',
        original_title: 'Imaginary',
        overview:
          'When Jessica moves back into her childhood home with her family, her youngest stepdaughter Alice develops an eerie attachment to a stuffed bear named Chauncey she finds in the basement. Alice starts playing games with Chauncey that begin playful and become increasingly sinister. As Alice’s behavior becomes more and more concerning, Jessica intervenes only to realize Chauncey is much more than the stuffed toy bear she believed him to be.',
        poster_path: '/9u6HEtZJdZDjPGGJq6YEuhPnoan.jpg',
        media_type: 'movie',
        genre_ids: [27, 9648, 53],
        popularity: 307.994,
        release_date: '2024-03-06',
        video: false,
        vote_average: 5.882,
        vote_count: 106,
      },
      {
        adult: false,
        backdrop_path: '/3IoSYT0gnuImnZ73rqYySJnmefA.jpg',
        id: 967847,
        title: 'Ghostbusters: Frozen Empire',
        original_language: 'en',
        original_title: 'Ghostbusters: Frozen Empire',
        overview:
          "The Spengler family returns to where it all started – the iconic New York City firehouse – to team up with the original Ghostbusters, who've developed a top-secret research lab to take busting ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age.",
        poster_path: '/r65fWcFELCSeyyrkq5wY09EPSGN.jpg',
        media_type: 'movie',
        genre_ids: [14, 12, 35],
        popularity: 496.794,
        release_date: '2024-03-20',
        video: false,
        vote_average: 6.764,
        vote_count: 127,
      },
      {
        adult: false,
        backdrop_path: '/yyFc8Iclt2jxPmLztbP617xXllT.jpg',
        id: 787699,
        title: 'Wonka',
        original_language: 'en',
        original_title: 'Wonka',
        overview:
          'Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.',
        poster_path: '/qhb1qOilapbapxWQn9jtRCMwXJF.jpg',
        media_type: 'movie',
        genre_ids: [35, 10751, 14],
        popularity: 676.84,
        release_date: '2023-12-06',
        video: false,
        vote_average: 7.211,
        vote_count: 2700,
      },
      {
        adult: false,
        backdrop_path: '/fGe1ej335XbqN1j9teoDpofpbLX.jpg',
        id: 915935,
        title: 'Anatomy of a Fall',
        original_language: 'fr',
        original_title: "Anatomie d'une chute",
        overview:
          "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness.",
        poster_path: '/kQs6keheMwCxJxrzV83VUwFtHkB.jpg',
        media_type: 'movie',
        genre_ids: [53, 9648, 80],
        popularity: 168.419,
        release_date: '2023-08-23',
        video: false,
        vote_average: 7.642,
        vote_count: 1624,
      },
      {
        adult: false,
        backdrop_path: '/bckxSN9ueOgm0gJpVJmPQrecWul.jpg',
        id: 572802,
        title: 'Aquaman and the Lost Kingdom',
        original_language: 'en',
        original_title: 'Aquaman and the Lost Kingdom',
        overview:
          "Black Manta seeks revenge on Aquaman for his father's death. Wielding the Black Trident's power, he becomes a formidable foe. To defend Atlantis, Aquaman forges an alliance with his imprisoned brother. They must protect the kingdom.",
        poster_path: '/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg',
        media_type: 'movie',
        genre_ids: [28, 12, 14],
        popularity: 451.843,
        release_date: '2023-12-20',
        video: false,
        vote_average: 6.819,
        vote_count: 2152,
      },
      {
        adult: false,
        backdrop_path: '/tZ7ZWsmAg3HMxLbzDj9nl0OC5bX.jpg',
        id: 984324,
        title: 'The Wages of Fear',
        original_language: 'fr',
        original_title: 'Le salaire de la peur',
        overview:
          'When an explosion at an oil well threatens hundreds of lives, a crack team is called upon to make a deadly desert crossing with nitroglycerine in tow.',
        poster_path: '/jFK2ZLQUzo9pea0jfMCHDfvWsx7.jpg',
        media_type: 'movie',
        genre_ids: [28, 53],
        popularity: 70.491,
        release_date: '2024-03-28',
        video: false,
        vote_average: 5.517,
        vote_count: 30,
      },
      {
        adult: false,
        backdrop_path: '/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg',
        id: 866398,
        title: 'The Beekeeper',
        original_language: 'en',
        original_title: 'The Beekeeper',
        overview:
          "One man's campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.",
        poster_path: '/A7EByudX0eOzlkQ2FIbogzyazm2.jpg',
        media_type: 'movie',
        genre_ids: [28, 53, 18],
        popularity: 410.78,
        release_date: '2024-01-08',
        video: false,
        vote_average: 7.476,
        vote_count: 1864,
      },
      {
        adult: false,
        backdrop_path: '/nTPFkLUARmo1bYHfkfdNpRKgEOs.jpg',
        id: 1072790,
        title: 'Anyone But You',
        original_language: 'en',
        original_title: 'Anyone But You',
        overview:
          'After an amazing first date, Bea and Ben’s fiery attraction turns ice cold — until they find themselves unexpectedly reunited at a destination wedding in Australia. So they do what any two mature adults would do: pretend to be a couple.',
        poster_path: '/5qHoazZiaLe7oFBok7XlUhg96f2.jpg',
        media_type: 'movie',
        genre_ids: [10749, 35],
        popularity: 622.354,
        release_date: '2023-12-21',
        video: false,
        vote_average: 7.068,
        vote_count: 1179,
      },
      {
        adult: false,
        backdrop_path: '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',
        id: 346698,
        title: 'Barbie',
        original_language: 'en',
        original_title: 'Barbie',
        overview:
          'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
        poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
        media_type: 'movie',
        genre_ids: [35, 12],
        popularity: 258.192,
        release_date: '2023-07-19',
        video: false,
        vote_average: 7.097,
        vote_count: 7873,
      },
    ],
    total_pages: 1000,
    total_results: 20000,
  };
  private static trendingSeriesDay = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/kSh5AfkJ38UqjbUvFrPQlvKNU0v.jpg',
        id: 108545,
        name: '3 Body Problem',
        original_language: 'en',
        original_name: '3 Body Problem',
        overview:
          'Across continents and decades, five brilliant friends make earth-shattering discoveries as the laws of science unravel and an existential threat emerges.',
        poster_path: '/ykZ7hlShkdRQaL2aiieXdEMmrLb.jpg',
        media_type: 'tv',
        genre_ids: [10765, 9648, 18],
        popularity: 1442.755,
        first_air_date: '2024-03-21',
        vote_average: 7.4,
        vote_count: 301,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/nU1gVdTDT140CJr4kAGtb1fYQAy.jpg',
        id: 157569,
        name: 'Renegade Nell',
        original_language: 'en',
        original_name: 'Renegade Nell',
        overview:
          'England, 1705: Framed for murder and on the run with her sisters, Nell Jackson turns her hand to highway robbery to survive. Aided by her superpowered sidekick, a plucky little sprite called Billy Blind, Nell realizes that fate has put her on the wrong side of the law for a reason. A reason much bigger than she could have ever imagined: to defeat a magical plot against the Queen of England.',
        poster_path: '/t5EvzK6KJnSrm5rDo59hOvSgpyv.jpg',
        media_type: 'tv',
        genre_ids: [10759, 10765],
        popularity: 109.834,
        first_air_date: '2024-03-29',
        vote_average: 6.765,
        vote_count: 17,
        origin_country: ['GB'],
      },
      {
        adult: false,
        backdrop_path: '/odVlTMqPPiMksmxpN9cCbPCjUPP.jpg',
        id: 127532,
        name: 'Solo Leveling',
        original_language: 'ja',
        original_name: '俺だけレベルアップな件',
        overview:
          'They say whatever doesn’t kill you makes you stronger, but that’s not the case for the world’s weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that’s leveling him up in every way. Now, he’s inspired to discover the secrets behind his powers and the dungeon that spawned them.',
        poster_path: '/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg',
        media_type: 'tv',
        genre_ids: [16, 10759, 10765],
        popularity: 693.422,
        first_air_date: '2024-01-07',
        vote_average: 8.724,
        vote_count: 221,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/5zmiBoMzeeVdQ62no55JOJMY498.jpg',
        id: 126308,
        name: 'Shōgun',
        original_language: 'en',
        original_name: 'Shōgun',
        overview:
          'In Japan in the year 1600, at the dawn of a century-defining civil war, Lord Yoshii Toranaga is fighting for his life as his enemies on the Council of Regents unite against him, when a mysterious European ship is found marooned in a nearby fishing village.',
        poster_path: '/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
        media_type: 'tv',
        genre_ids: [18, 10768],
        popularity: 1316.236,
        first_air_date: '2024-02-27',
        vote_average: 8.8,
        vote_count: 324,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/pIGLdSGbdBAKu5diYFkU5nLpXkI.jpg',
        id: 197125,
        name: 'Constellation',
        original_language: 'en',
        original_name: 'Constellation',
        overview:
          'When a fatal accident occurs on board the International Space Station, a lone astronaut makes the heroic journey back to Earth, only to discover key pieces of her life—including her young daughter—have changed.',
        poster_path: '/21ICs3fxlxGslbzS4moCHk9HNo6.jpg',
        media_type: 'tv',
        genre_ids: [10765, 9648, 18],
        popularity: 399.431,
        first_air_date: '2024-02-21',
        vote_average: 7.8,
        vote_count: 98,
        origin_country: ['DE', 'FR', 'GB'],
      },
      {
        adult: false,
        backdrop_path: '/zxfBtHz5UmSTfIEC4O4GngyjHwa.jpg',
        id: 204541,
        name: 'Three-Body',
        original_language: 'zh',
        original_name: '三体',
        overview:
          "Nanotechnology researcher Wang Miao is taken to the Joint Operations Center by police officer Shi Qiang, who's investigating the mysterious suicide wave among scientists worldwide,  and recruited to sneak into an organization called the Frontiers of Science to help the investigation. When Wang Miao is contacted by the leader of the organization, Shen Yufei, she introduces him to a sophisticated VR video game called Three-Body, but soon he discovers that it's more than just a game.",
        poster_path: '/buXHm2shttFRQIBsCFlv5L2TmKh.jpg',
        media_type: 'tv',
        genre_ids: [18, 9648, 10765],
        popularity: 392.049,
        first_air_date: '2023-01-15',
        vote_average: 7.877,
        vote_count: 163,
        origin_country: ['CN'],
      },
      {
        adult: false,
        backdrop_path: '/xzjZDyqUobuJtkBljhgLH4Fdnye.jpg',
        id: 82684,
        name: 'That Time I Got Reincarnated as a Slime',
        original_language: 'ja',
        original_name: '転生したらスライムだった件',
        overview:
          '37-year-old corporate worker Mikami Satoru is stabbed by a random killer, and is reborn to an alternate world. But he turns out to be reborn a slime! Thrown into this new world with the name Rimuru Tempest, he begins his quest to create a world that’s welcoming to all races. Broken free from ordinary, stale past life, his fresh adventure in a fantasy world as a slime monster with unique abilities begins.',
        poster_path: '/jQb1ztdko9qc4aCdnMXShcIHXRG.jpg',
        media_type: 'tv',
        genre_ids: [10759, 16, 10765, 35],
        popularity: 106.197,
        first_air_date: '2018-10-02',
        vote_average: 8.5,
        vote_count: 693,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/rV5wNwckVBkhHq3kXR5raP7T8fA.jpg',
        id: 197460,
        name: 'The Source',
        original_language: 'fr',
        original_name: 'Ourika',
        overview:
          'In 2005, in a French suburb, a drug bust shatters the network of a family of drug dealers. Driss, a brilliant student, is forced to take over the family business, setting off on a downward spiral. Facing him is William, an ambitious and idealistic young cop who will do everything in his power to stop him. Their relentless struggle will take them from the suburbs to the Ourika valley.',
        poster_path: '/7T1E4Paj1dt7d8dv1L34lxTryKc.jpg',
        media_type: 'tv',
        genre_ids: [10759, 18],
        popularity: 157.448,
        first_air_date: '2024-03-28',
        vote_average: 7,
        vote_count: 1,
        origin_country: ['FR'],
      },
      {
        adult: false,
        backdrop_path: '/lFzmyLYydG4Cp7NTVn8jTNyEVKR.jpg',
        id: 208942,
        name: 'A Gentleman in Moscow',
        original_language: 'en',
        original_name: 'A Gentleman in Moscow',
        overview:
          'Count Alexander Rostov finds himself going from riches to rags following the Russian revolution. A Soviet tribunal banishes him to the attic room of an opulent hotel, where, oblivious to the world outside, he discovers the true value of friendship, family and love.',
        poster_path: '/awIufRN7dWaG813VWQWpKD2ErpP.jpg',
        media_type: 'tv',
        genre_ids: [18],
        popularity: 122.381,
        first_air_date: '2024-03-29',
        vote_average: 6.4,
        vote_count: 5,
        origin_country: ['GB'],
      },
      {
        adult: false,
        backdrop_path: '/zW0v2YT74C6tRafzqqBkfSqLAN0.jpg',
        id: 52814,
        name: 'Halo',
        original_language: 'en',
        original_name: 'Halo',
        overview:
          'Depicting an epic 26th-century conflict between humanity and an alien threat known as the Covenant, the series weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future.',
        poster_path: '/hmHA5jqxN3ESIAGx0jAwV7TJhTQ.jpg',
        media_type: 'tv',
        genre_ids: [10759, 10765],
        popularity: 2037.794,
        first_air_date: '2022-03-24',
        vote_average: 8.339,
        vote_count: 2519,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg',
        id: 37854,
        name: 'One Piece',
        original_language: 'ja',
        original_name: 'ワンピース',
        overview:
          'Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous "One Piece" behind. Whoever claims the "One Piece" will be named the new King of the Pirates.\n\nMonkey D. Luffy, a boy who consumed a "Devil Fruit," decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he\'s surrounded by a bevy of skilled fighters and thieves to help him along the way.\n\nLuffy will do anything to get the One Piece and become King of the Pirates!',
        poster_path: '/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
        media_type: 'tv',
        genre_ids: [10759, 35, 16],
        popularity: 186.451,
        first_air_date: '1999-10-20',
        vote_average: 8.729,
        vote_count: 4381,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/p1swd15DRtCnNj20U904dbXeVsi.jpg',
        id: 204832,
        name: 'MASHLE: MAGIC AND MUSCLES',
        original_language: 'ja',
        original_name: 'マッシュル-MASHLE-',
        overview:
          'In the magic realm, magic is everything—everyone can use it, and one’s social status is determined by their skill level. Deep in the forest, oblivious to the ways of the world, lives Mash. Thanks to his daily training, he’s become a fitness god, but he harbors a secret that could turn his life upside down—he can’t use magic! When he’s found out, rather than his life being over, he’s unexpectedly enrolled in magic school, where he must beat the competition!',
        poster_path: '/dzCABR0joqtA0flLYpWAXc8mML1.jpg',
        media_type: 'tv',
        genre_ids: [16, 35, 10759, 10765],
        popularity: 575.643,
        first_air_date: '2023-04-08',
        vote_average: 8.4,
        vote_count: 277,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/96RT2A47UdzWlUfvIERFyBsLhL2.jpg',
        id: 209867,
        name: "Frieren: Beyond Journey's End",
        original_language: 'ja',
        original_name: '葬送のフリーレン',
        overview:
          'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.',
        poster_path: '/dqZENchTd7lp5zht7BdlqM7RBhD.jpg',
        media_type: 'tv',
        genre_ids: [16, 18, 10759, 10765],
        popularity: 307.392,
        first_air_date: '2023-09-29',
        vote_average: 8.935,
        vote_count: 155,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/n5pumhzyH0jIBtRoGGjJd8O0wQ0.jpg',
        id: 138502,
        name: "X-Men '97",
        original_language: 'en',
        original_name: "X-Men '97",
        overview:
          'The X-Men, a band of mutants who use their uncanny gifts to protect a world that hates and fears them, are challenged like never before, forced to face a dangerous and unexpected new future.',
        poster_path: '/383PV0WolYYQvTriH0NfvMUA28R.jpg',
        media_type: 'tv',
        genre_ids: [16, 10759, 10765],
        popularity: 631.076,
        first_air_date: '2024-03-20',
        vote_average: 8.7,
        vote_count: 105,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/hVArI1JuGKT95TzSXCQGWvHkY85.jpg',
        id: 207250,
        name: 'The Dangers in My Heart',
        original_language: 'ja',
        original_name: '僕の心のヤバイやつ',
        overview:
          "Kyotaro Ichikawa, a boy barely clinging to the bottom rung of his school's social ladder, secretly believes he’s the tortured lead in some psychological thriller. He spends his days dreaming up ways to disrupt his classmates' peaceful lives and pining after Anna Yamada, the class idol. But Kyotaro's not nearly the troubled teen he pretends to be…and it turns out Anna's a bit odd herself!",
        poster_path: '/mKhMmREBOKXtp3tlv9rnLRxZec5.jpg',
        media_type: 'tv',
        genre_ids: [16, 35],
        popularity: 246.886,
        first_air_date: '2023-04-02',
        vote_average: 8.3,
        vote_count: 94,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/4W9kyBFT69ORP5Jzk9mVMGBBO4R.jpg',
        id: 206586,
        name: 'The Walking Dead: The Ones Who Live',
        original_language: 'en',
        original_name: 'The Walking Dead: The Ones Who Live',
        overview:
          "The love story of Rick Grimes and Michonne is changed by a changed world. Kept apart by distance. By an unstoppable power. Can they find each other and who they were in a situation unlike any they've ever known?",
        poster_path: '/ywbacot78IuNhGW4uVZPxxxVTkm.jpg',
        media_type: 'tv',
        genre_ids: [10765, 18],
        popularity: 1632.91,
        first_air_date: '2024-02-25',
        vote_average: 8.3,
        vote_count: 203,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/6LWy0jvMpmjoS9fojNgHIKoWL05.jpg',
        id: 1399,
        name: 'Game of Thrones',
        original_language: 'en',
        original_name: 'Game of Thrones',
        overview:
          "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
        poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
        media_type: 'tv',
        genre_ids: [10765, 18, 10759],
        popularity: 2252.883,
        first_air_date: '2011-04-17',
        vote_average: 8.447,
        vote_count: 22878,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg',
        id: 95557,
        name: 'Invincible',
        original_language: 'en',
        original_name: 'Invincible',
        overview:
          'Mark Grayson is a normal teenager except for the fact that his father is the most powerful superhero on the planet. Shortly after his seventeenth birthday, Mark begins to develop powers of his own and enters into his father’s tutelage.',
        poster_path: '/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg',
        media_type: 'tv',
        genre_ids: [16, 10765, 10759, 18],
        popularity: 786.357,
        first_air_date: '2021-03-25',
        vote_average: 8.657,
        vote_count: 4120,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg',
        id: 1429,
        name: 'Attack on Titan',
        original_language: 'ja',
        original_name: '進撃の巨人',
        overview:
          'Several hundred years ago, humans were nearly exterminated by Titans. Titans are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source. A small percentage of humanity survived by walling themselves in a city protected by extremely high walls, even taller than the biggest Titans. Flash forward to the present and the city has not seen a Titan in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something horrific as the city walls are destroyed by a Colossal Titan that appears out of thin air. As the smaller Titans flood the city, the two kids watch in horror as their mother is eaten alive. Eren vows that he will murder every single Titan and take revenge for all of mankind.',
        poster_path: '/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
        media_type: 'tv',
        genre_ids: [16, 10765, 10759],
        popularity: 102.263,
        first_air_date: '2013-04-07',
        vote_average: 8.66,
        vote_count: 5974,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/yGkKI766rRvPiJLwEJ9MMRE4Trg.jpg',
        id: 247441,
        name: 'Testament: The Story of Moses',
        original_language: 'en',
        original_name: 'Testament: The Story of Moses',
        overview:
          "This illuminating docudrama series chronicles Moses' remarkable life as a prince, prophet and more with insights from theologians and historians.",
        poster_path: '/1ylraenvcOtKBP5bp5cTC365fAV.jpg',
        media_type: 'tv',
        genre_ids: [99, 18],
        popularity: 491.54,
        first_air_date: '2024-03-27',
        vote_average: 8,
        vote_count: 11,
        origin_country: ['US'],
      },
    ],
    total_pages: 1000,
    total_results: 20000,
  };
  private static trendingSeriesWeek = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/kSh5AfkJ38UqjbUvFrPQlvKNU0v.jpg',
        id: 108545,
        name: '3 Body Problem',
        original_language: 'en',
        original_name: '3 Body Problem',
        overview:
          'Across continents and decades, five brilliant friends make earth-shattering discoveries as the laws of science unravel and an existential threat emerges.',
        poster_path: '/ykZ7hlShkdRQaL2aiieXdEMmrLb.jpg',
        media_type: 'tv',
        genre_ids: [10765, 9648, 18],
        popularity: 1442.755,
        first_air_date: '2024-03-21',
        vote_average: 7.4,
        vote_count: 301,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/5zmiBoMzeeVdQ62no55JOJMY498.jpg',
        id: 126308,
        name: 'Shōgun',
        original_language: 'en',
        original_name: 'Shōgun',
        overview:
          'In Japan in the year 1600, at the dawn of a century-defining civil war, Lord Yoshii Toranaga is fighting for his life as his enemies on the Council of Regents unite against him, when a mysterious European ship is found marooned in a nearby fishing village.',
        poster_path: '/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
        media_type: 'tv',
        genre_ids: [18, 10768],
        popularity: 1316.236,
        first_air_date: '2024-02-27',
        vote_average: 8.8,
        vote_count: 324,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/zW0v2YT74C6tRafzqqBkfSqLAN0.jpg',
        id: 52814,
        name: 'Halo',
        original_language: 'en',
        original_name: 'Halo',
        overview:
          'Depicting an epic 26th-century conflict between humanity and an alien threat known as the Covenant, the series weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future.',
        poster_path: '/hmHA5jqxN3ESIAGx0jAwV7TJhTQ.jpg',
        media_type: 'tv',
        genre_ids: [10759, 10765],
        popularity: 2037.794,
        first_air_date: '2022-03-24',
        vote_average: 8.339,
        vote_count: 2519,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/n5pumhzyH0jIBtRoGGjJd8O0wQ0.jpg',
        id: 138502,
        name: "X-Men '97",
        original_language: 'en',
        original_name: "X-Men '97",
        overview:
          'The X-Men, a band of mutants who use their uncanny gifts to protect a world that hates and fears them, are challenged like never before, forced to face a dangerous and unexpected new future.',
        poster_path: '/383PV0WolYYQvTriH0NfvMUA28R.jpg',
        media_type: 'tv',
        genre_ids: [16, 10759, 10765],
        popularity: 631.076,
        first_air_date: '2024-03-20',
        vote_average: 8.7,
        vote_count: 105,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/zxfBtHz5UmSTfIEC4O4GngyjHwa.jpg',
        id: 204541,
        name: 'Three-Body',
        original_language: 'zh',
        original_name: '三体',
        overview:
          "Nanotechnology researcher Wang Miao is taken to the Joint Operations Center by police officer Shi Qiang, who's investigating the mysterious suicide wave among scientists worldwide,  and recruited to sneak into an organization called the Frontiers of Science to help the investigation. When Wang Miao is contacted by the leader of the organization, Shen Yufei, she introduces him to a sophisticated VR video game called Three-Body, but soon he discovers that it's more than just a game.",
        poster_path: '/buXHm2shttFRQIBsCFlv5L2TmKh.jpg',
        media_type: 'tv',
        genre_ids: [18, 9648, 10765],
        popularity: 392.049,
        first_air_date: '2023-01-15',
        vote_average: 7.877,
        vote_count: 163,
        origin_country: ['CN'],
      },
      {
        adult: false,
        backdrop_path: '/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg',
        id: 37854,
        name: 'One Piece',
        original_language: 'ja',
        original_name: 'ワンピース',
        overview:
          'Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous "One Piece" behind. Whoever claims the "One Piece" will be named the new King of the Pirates.\n\nMonkey D. Luffy, a boy who consumed a "Devil Fruit," decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he\'s surrounded by a bevy of skilled fighters and thieves to help him along the way.\n\nLuffy will do anything to get the One Piece and become King of the Pirates!',
        poster_path: '/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
        media_type: 'tv',
        genre_ids: [10759, 35, 16],
        popularity: 186.451,
        first_air_date: '1999-10-20',
        vote_average: 8.729,
        vote_count: 4381,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/pIGLdSGbdBAKu5diYFkU5nLpXkI.jpg',
        id: 197125,
        name: 'Constellation',
        original_language: 'en',
        original_name: 'Constellation',
        overview:
          'When a fatal accident occurs on board the International Space Station, a lone astronaut makes the heroic journey back to Earth, only to discover key pieces of her life—including her young daughter—have changed.',
        poster_path: '/21ICs3fxlxGslbzS4moCHk9HNo6.jpg',
        media_type: 'tv',
        genre_ids: [10765, 9648, 18],
        popularity: 399.431,
        first_air_date: '2024-02-21',
        vote_average: 7.8,
        vote_count: 98,
        origin_country: ['DE', 'FR', 'GB'],
      },
      {
        adult: false,
        backdrop_path: '/4W9kyBFT69ORP5Jzk9mVMGBBO4R.jpg',
        id: 206586,
        name: 'The Walking Dead: The Ones Who Live',
        original_language: 'en',
        original_name: 'The Walking Dead: The Ones Who Live',
        overview:
          "The love story of Rick Grimes and Michonne is changed by a changed world. Kept apart by distance. By an unstoppable power. Can they find each other and who they were in a situation unlike any they've ever known?",
        poster_path: '/ywbacot78IuNhGW4uVZPxxxVTkm.jpg',
        media_type: 'tv',
        genre_ids: [10765, 18],
        popularity: 1632.91,
        first_air_date: '2024-02-25',
        vote_average: 8.3,
        vote_count: 203,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/6snBXmgkscLEJQmxx46qEIlqYlB.jpg',
        id: 46518,
        name: 'Masters of the Air',
        original_language: 'en',
        original_name: 'Masters of the Air',
        overview:
          'During World War II, airmen risk their lives with the 100th Bomb Group, a brotherhood forged by courage, loss, and triumph.',
        poster_path: '/rSAmgcoA74371rplbqM27yVsd3y.jpg',
        media_type: 'tv',
        genre_ids: [10768, 18],
        popularity: 317.238,
        first_air_date: '2024-01-25',
        vote_average: 7.934,
        vote_count: 213,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/96RT2A47UdzWlUfvIERFyBsLhL2.jpg',
        id: 209867,
        name: "Frieren: Beyond Journey's End",
        original_language: 'ja',
        original_name: '葬送のフリーレン',
        overview:
          'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.',
        poster_path: '/dqZENchTd7lp5zht7BdlqM7RBhD.jpg',
        media_type: 'tv',
        genre_ids: [16, 18, 10759, 10765],
        popularity: 307.392,
        first_air_date: '2023-09-29',
        vote_average: 8.935,
        vote_count: 155,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/odVlTMqPPiMksmxpN9cCbPCjUPP.jpg',
        id: 127532,
        name: 'Solo Leveling',
        original_language: 'ja',
        original_name: '俺だけレベルアップな件',
        overview:
          'They say whatever doesn’t kill you makes you stronger, but that’s not the case for the world’s weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that’s leveling him up in every way. Now, he’s inspired to discover the secrets behind his powers and the dungeon that spawned them.',
        poster_path: '/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg',
        media_type: 'tv',
        genre_ids: [16, 10759, 10765],
        popularity: 693.422,
        first_air_date: '2024-01-07',
        vote_average: 8.724,
        vote_count: 221,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/iJMSvEENvkgIEImhBSKmGCev15w.jpg',
        id: 236235,
        name: 'The Gentlemen',
        original_language: 'en',
        original_name: 'The Gentlemen',
        overview:
          "When aristocratic Eddie inherits the family estate, he discovers that it's home to an enormous weed empire — and its proprietors aren't going anywhere.",
        poster_path: '/tw3tzfXaSpmUZIB8ZNqNEGzMBCy.jpg',
        media_type: 'tv',
        genre_ids: [35, 18, 10759, 80],
        popularity: 257.654,
        first_air_date: '2024-03-07',
        vote_average: 8.336,
        vote_count: 183,
        origin_country: ['GB'],
      },
      {
        adult: false,
        backdrop_path: '/ydf1CeiBLfdxiyNTpskM0802TKl.jpg',
        id: 12971,
        name: 'Dragon Ball Z',
        original_language: 'ja',
        original_name: 'ドラゴンボールゼット',
        overview:
          "The adventures of Earth's martial arts defender, Son Goku, continue with a new family and the revelation of his alien origins. Now Goku and his allies must defend the planet from an onslaught of new extraterrestrial enemies.",
        poster_path: '/dBsDWUcdfbuZwglgyeeQ9ChRoS4.jpg',
        media_type: 'tv',
        genre_ids: [16, 10765, 10759],
        popularity: 388.99,
        first_air_date: '1989-04-26',
        vote_average: 8.327,
        vote_count: 4274,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/6LWy0jvMpmjoS9fojNgHIKoWL05.jpg',
        id: 1399,
        name: 'Game of Thrones',
        original_language: 'en',
        original_name: 'Game of Thrones',
        overview:
          "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
        poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
        media_type: 'tv',
        genre_ids: [10765, 18, 10759],
        popularity: 2252.883,
        first_air_date: '2011-04-17',
        vote_average: 8.447,
        vote_count: 22878,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg',
        id: 1429,
        name: 'Attack on Titan',
        original_language: 'ja',
        original_name: '進撃の巨人',
        overview:
          'Several hundred years ago, humans were nearly exterminated by Titans. Titans are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source. A small percentage of humanity survived by walling themselves in a city protected by extremely high walls, even taller than the biggest Titans. Flash forward to the present and the city has not seen a Titan in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something horrific as the city walls are destroyed by a Colossal Titan that appears out of thin air. As the smaller Titans flood the city, the two kids watch in horror as their mother is eaten alive. Eren vows that he will murder every single Titan and take revenge for all of mankind.',
        poster_path: '/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
        media_type: 'tv',
        genre_ids: [16, 10765, 10759],
        popularity: 102.263,
        first_air_date: '2013-04-07',
        vote_average: 8.66,
        vote_count: 5974,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/nU1gVdTDT140CJr4kAGtb1fYQAy.jpg',
        id: 157569,
        name: 'Renegade Nell',
        original_language: 'en',
        original_name: 'Renegade Nell',
        overview:
          'England, 1705: Framed for murder and on the run with her sisters, Nell Jackson turns her hand to highway robbery to survive. Aided by her superpowered sidekick, a plucky little sprite called Billy Blind, Nell realizes that fate has put her on the wrong side of the law for a reason. A reason much bigger than she could have ever imagined: to defeat a magical plot against the Queen of England.',
        poster_path: '/t5EvzK6KJnSrm5rDo59hOvSgpyv.jpg',
        media_type: 'tv',
        genre_ids: [10759, 10765],
        popularity: 109.834,
        first_air_date: '2024-03-29',
        vote_average: 6.765,
        vote_count: 17,
        origin_country: ['GB'],
      },
      {
        adult: false,
        backdrop_path: '/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg',
        id: 95557,
        name: 'Invincible',
        original_language: 'en',
        original_name: 'Invincible',
        overview:
          'Mark Grayson is a normal teenager except for the fact that his father is the most powerful superhero on the planet. Shortly after his seventeenth birthday, Mark begins to develop powers of his own and enters into his father’s tutelage.',
        poster_path: '/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg',
        media_type: 'tv',
        genre_ids: [16, 10765, 10759, 18],
        popularity: 786.357,
        first_air_date: '2021-03-25',
        vote_average: 8.657,
        vote_count: 4120,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/1YMx2eZs8kr32Y2gxrRN9MdPNr.jpg',
        id: 12609,
        name: 'Dragon Ball',
        original_language: 'ja',
        original_name: 'ドラゴンボール',
        overview:
          "Long ago in the mountains, a fighting master known as Son Gohan discovered a strange boy whom he named Son Goku. Gohan raised him and trained Goku in martial arts until he died. The young and very strong boy was on his own, but easily managed. Then one day, Goku met a teenage girl named Bulma, whose search for the mystical Dragon Balls brought her to Goku's home. Together, they set off to find all seven and to grant her wish.",
        poster_path: '/onCLyCOgszTIyyVs2XKYSkKPOPG.jpg',
        media_type: 'tv',
        genre_ids: [16, 10759, 10765],
        popularity: 20.241,
        first_air_date: '1986-02-26',
        vote_average: 8.251,
        vote_count: 2958,
        origin_country: ['JP'],
      },
      {
        adult: false,
        backdrop_path: '/x3XEQ3Wey8enS7mMjo3eUJp8Myi.jpg',
        id: 155533,
        name: 'Manhunt',
        original_language: 'en',
        original_name: 'Manhunt',
        overview:
          "A conspiracy thriller about one of the best known but least understood crimes in history. This is the astonishing story of the hunt for John Wilkes Booth in the aftermath of Abraham Lincoln's assassination—as the fate of the country hangs in the balance.",
        poster_path: '/pN5qeqDgCG1Pij7KaEBKLkyjn4A.jpg',
        media_type: 'tv',
        genre_ids: [18, 80],
        popularity: 186.037,
        first_air_date: '2024-03-14',
        vote_average: 7,
        vote_count: 13,
        origin_country: ['US'],
      },
      {
        adult: false,
        backdrop_path: '/dR0yRkeitRpgKe6JiIt2qj0CYr5.jpg',
        id: 206829,
        name: 'The Regime',
        original_language: 'en',
        original_name: 'The Regime',
        overview:
          'The story of one year within the walls of the palace of a modern European regime as it begins to unravel.',
        poster_path: '/ztqPixNyezY6pWSNIP2AlhwPMO0.jpg',
        media_type: 'tv',
        genre_ids: [18, 35],
        popularity: 247.423,
        first_air_date: '2024-03-03',
        vote_average: 7.6,
        vote_count: 33,
        origin_country: ['US'],
      },
    ],
    total_pages: 1000,
    total_results: 20000,
  };

  constructor(isOn: boolean) {
    TrendingMedia.IsOn = isOn;

    if (TrendingMedia.IsOn) {
      TrendingMedia.render();
    }
  }

  private static render() {
    this.insertSeriesContainer();
    this.insertSeriesCardsAndBindData();
    this.seriesCardsContainer = document.getElementById(
      'homepage-trending__series__cards-container'
    ) as HTMLElement;

    this.insertMoviesContainer();
    this.insertMovieCardsAndBindData();
    this.movieCardsContainer = document.getElementById(
      'homepage-trending__movies__cards-container'
    ) as HTMLElement;

    this.startTimeWindowToggle();
    this.overrideScrollingToHorizontal();
  }

  private static reRender() {
    this.removeCardsFromContainers();
    this.insertMovieCardsAndBindData();
    this.insertSeriesCardsAndBindData();
    this.resetScroll();
  }

  private static resetScroll() {
    this.movieCardsContainer.style.scrollBehavior = 'auto';
    this.movieCardsContainer.scrollLeft = 0;
    this.movieCardsContainer.style.scrollBehavior = 'smooth';

    this.seriesCardsContainer.style.scrollBehavior = 'auto';
    this.seriesCardsContainer.scrollLeft = 0;
    this.seriesCardsContainer.style.scrollBehavior = 'smooth';
  }

  private static removeCardsFromContainers() {
    const movieContainer = document.getElementById('homepage-trending__movies__cards-subcontainer');

    const seriesContainer = document.getElementById(
      'homepage-trending__series__cards-subcontainer'
    );

    if (movieContainer) {
      movieContainer.innerHTML = '';
    }

    if (seriesContainer) {
      seriesContainer.innerHTML = '';
    }
  }

  private static overrideScrollingToHorizontal() {
    this.movieCardsContainer.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        // console.log(e.deltaY);
        this.movieCardsContainer.scrollLeft += e.deltaY * 3;
        e.preventDefault();
      } else if (e.deltaY < 0) {
        // console.log(e.deltaY);
        this.movieCardsContainer.scrollLeft += e.deltaY * 3;
        e.preventDefault();
      }
    });

    this.seriesCardsContainer.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        // console.log(e.deltaY);
        this.seriesCardsContainer.scrollLeft += e.deltaY * 3;
        e.preventDefault();
      } else if (e.deltaY < 0) {
        // console.log(e.deltaY);
        this.seriesCardsContainer.scrollLeft += e.deltaY * 3;
        e.preventDefault();
      }
    });
  }

  private static insertSeriesContainer() {
    insertHTMLInsideElementById(this.templateTrendingSeriesSection, 'homepage__hero', 'afterend');
  }

  private static insertMoviesContainer() {
    insertHTMLInsideElementById(this.templateTrendingMoviesSection, 'homepage__hero', 'afterend');
  }

  private static insertMovieCardsAndBindData() {
    if (this.TrendingTimeWindow === 'day') {
      let cardIndex = 1;

      this.trendingMoviesDay.results.forEach((movie) => {
        let bindedTemplate = String(this.templateCard);

        bindedTemplate = bindedTemplate
          .replace('[MOVIE-ID]', movie.id.toString())
          .replace('[POSTER-PATH]', movie.poster_path)
          .replace('[POSTER-ALT]', `A poster image of a movie entitled: ${movie.title}`)
          .replace('[TITLE]', movie.title)
          .replace('[YEAR]', movie.release_date.substring(0, 4))
          .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()]);

        if (cardIndex > 5) {
          insertHTMLInsideElementById(
            bindedTemplate,
            'homepage-trending__movies__cards-subcontainer'
          );
        }

        cardIndex++;
      });
    } else if (this.TrendingTimeWindow === 'week') {
      let cardIndex = 1;

      this.trendingMoviesWeek.results.forEach((movie) => {
        let bindedTemplate = String(this.templateCard);

        bindedTemplate = bindedTemplate
          .replace('[MOVIE-ID]', movie.id.toString())
          .replace('[POSTER-PATH]', movie.poster_path)
          .replace('[POSTER-ALT]', `A poster image of a TV Series entitled: ${movie.title}`)
          .replace('[TITLE]', movie.title)
          .replace('[YEAR]', movie.release_date.substring(0, 4))
          .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()]);

        if (cardIndex > 5) {
          insertHTMLInsideElementById(
            bindedTemplate,
            'homepage-trending__movies__cards-subcontainer'
          );
        }

        cardIndex++;
      });
    }
  }

  private static insertSeriesCardsAndBindData() {
    if (this.TrendingTimeWindow === 'day') {
      let cardIndex = 1;

      this.trendingSeriesDay.results.forEach((movie) => {
        let bindedTemplate = String(this.templateCard);

        bindedTemplate = bindedTemplate
          .replace('[MOVIE-ID]', movie.id.toString())
          .replace('[POSTER-PATH]', movie.poster_path)
          .replace('[POSTER-ALT]', `A poster image of a TV Series entitled: ${movie.name}`)
          .replace('[TITLE]', movie.name)
          .replace('[YEAR]', movie.first_air_date.substring(0, 4))
          .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()]);

        if (cardIndex > 5) {
          insertHTMLInsideElementById(
            bindedTemplate,
            'homepage-trending__series__cards-subcontainer'
          );
        }

        cardIndex++;
      });
    } else if (this.TrendingTimeWindow === 'week') {
      let cardIndex = 1;

      this.trendingSeriesWeek.results.forEach((movie) => {
        let bindedTemplate = String(this.templateCard);

        bindedTemplate = bindedTemplate
          .replace('[MOVIE-ID]', movie.id.toString())
          .replace('[POSTER-PATH]', movie.poster_path)
          .replace('[TITLE]', movie.name)
          .replace('[YEAR]', movie.first_air_date.substring(0, 4))
          .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()]);

        if (cardIndex > 5) {
          insertHTMLInsideElementById(
            bindedTemplate,
            'homepage-trending__series__cards-subcontainer'
          );
        }

        cardIndex++;
      });
    }
  }

  private static startTimeWindowToggle() {
    const radiosMovie = Array.from(
      document.querySelectorAll('input[name="trending-movies-time-window-toggle"]')
    ) as HTMLInputElement[];
    const radiosSeries = Array.from(
      document.querySelectorAll('input[name="trending-series-time-window-toggle"]')
    ) as HTMLInputElement[];

    radiosSeries.forEach((radio, index) => {
      radio.addEventListener('change', () => {
        radiosMovie[index].checked = true;

        if (index === 0) {
          this.TrendingTimeWindow = 'day';
        } else if (index === 1) {
          this.TrendingTimeWindow = 'week';
        }

        this.reRender();
      });
    });

    radiosMovie.forEach((radio, index) => {
      radio.addEventListener('change', () => {
        radiosSeries[index].checked = true;

        if (index === 0) {
          this.TrendingTimeWindow = 'day';
        } else if (index === 1) {
          this.TrendingTimeWindow = 'week';
        }

        this.reRender();
      });
    });
  }

  private static templateTrendingMoviesSection = /*html*/ `
  <section class="homepage-trending__movies-container">
        <div class="homepage-trending__movies__title-and-toggle-container">
          <h3 class="homepage-trending__movies__title">Trending Movies</h3>
          <div class="homepage-trending__movies__dw-toggle">
            <input
              checked
              class="trending-toggle-radio movie-day"
              type="radio"
              name="trending-movies-time-window-toggle"
              id="movies-day-radio"
              value="1"
              dw-toggle-data-sync="1"
              aria-label="Switch to Daily Trending Movies"
              tabindex="0"
            />

            <input
              class="trending-toggle-radio movie-week"
              type="radio"
              name="trending-movies-time-window-toggle"
              id="movies-week-radio"
              value="2"
              dw-toggle-data-sync="2"
              aria-label="Switch to Weekly Trending Movies"
              tabindex="0"
            />
            
          </div>
        </div>
        <div class="homepage-trending__movies__cards-container" id="homepage-trending__movies__cards-container">
          <div class="homepage-trending__movies__cards-subcontainer" id="homepage-trending__movies__cards-subcontainer">
          </div>
        </div>
      </div>
    </section>
  `;

  private static templateTrendingSeriesSection = /*html*/ `
  <section class="homepage-trending__movies-container">
        <div class="homepage-trending__movies__title-and-toggle-container">
          <h3 class="homepage-trending__movies__title">Trending TV Series</h3>
          <div class="homepage-trending__movies__dw-toggle">
            <input
              checked
              class="trending-toggle-radio movie-day"
              type="radio"
              name="trending-series-time-window-toggle"
              id="series-day-radio"
              value="1"
              dw-toggle-data-sync="1"
              aria-label="Switch to Daily Trending TV Series"
              tabindex="0"
            />
            <label class="trending-toggle-label" for="series-day-radio">Today</label>
            <input
              class="trending-toggle-radio movie-week"
              type="radio"
              name="trending-series-time-window-toggle"
              id="series-week-radio"
              value="2"
              dw-toggle-data-sync="2"
              aria-label="Switch to Weekly Trending TV Series"
              tabindex="0"
            />
            <label class="trending-toggle-label" for="series-week-radio">This Week</label>
          </div>
        </div>
        <div class="homepage-trending__movies__cards-container" id="homepage-trending__series__cards-container">
          <div class="homepage-trending__movies__cards-subcontainer" id="homepage-trending__series__cards-subcontainer">
          </div>
        </div>
      </div>
    </section>
  `;

  private static templateCard = /*html*/ `
  <div class="trending-card-container" id="trending-movie--[MOVIE-ID]" role="button" tabindex="0">
  <img
    src="https://image.tmdb.org/t/p/w342[POSTER-PATH]"
    alt="[POSTER-ALT]"
    class="trending-card__poster"
  />
  <div class="trending-card__title-and-year-genre-container">
    <h4 class="trending-card__title">[TITLE]</h4>
    <p class="trending-card-year-and-genre">[YEAR] • [GENRE]</p>
  </div>
</div>
  `;
}
