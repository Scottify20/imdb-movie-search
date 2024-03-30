import { Trending } from './Trending';
import { insertHTMLInsideElementById } from '../../../utils/GlobalUtils';
import { TmdbMovieGenreIds } from '../../../utils/tmdb/TmdbFetch';

export class TrendingMovies extends Trending {
  private static IsOn = false;

  private static trendingMovies = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/4k46cQr1msDErfsEqZJVT10oKoH.jpg',
        id: 359410,
        title: 'Road House',
        original_language: 'en',
        original_title: 'Road House',
        overview:
          'Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.',
        poster_path: '/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg',
        media_type: 'movie',
        genre_ids: [28, 53],
        popularity: 340.262,
        release_date: '2024-03-08',
        video: false,
        vote_average: 6.908,
        vote_count: 196,
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
        poster_path: '/mKWalirPreEdCKDJjc5TKeOP2xi.jpg',
        media_type: 'movie',
        genre_ids: [10402, 36, 18],
        popularity: 819.473,
        release_date: '2024-02-14',
        video: false,
        vote_average: 6.97,
        vote_count: 322,
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
        popularity: 2483.029,
        release_date: '2024-02-14',
        video: false,
        vote_average: 5.553,
        vote_count: 666,
      },
      {
        adult: false,
        backdrop_path: '/87IVlclAfWL6mdicU1DDuxdwXwe.jpg',
        id: 693134,
        title: 'Dune: Part Two',
        original_language: 'en',
        original_title: 'Dune: Part Two',
        overview:
          'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.',
        poster_path: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
        media_type: 'movie',
        genre_ids: [878, 12],
        popularity: 736.807,
        release_date: '2024-02-27',
        video: false,
        vote_average: 8.397,
        vote_count: 1998,
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
        poster_path: '/sMp34cNKjIb18UBOCoAv4DpCxwY.jpg',
        media_type: 'movie',
        genre_ids: [9648, 14, 28, 12],
        popularity: 1398.123,
        release_date: '2024-03-08',
        video: false,
        vote_average: 7.181,
        vote_count: 1055,
      },
      {
        adult: false,
        backdrop_path: '/qPwA2tXV8fGXfOVYu3aIgctzqtB.jpg',
        id: 967847,
        title: 'Ghostbusters: Frozen Empire',
        original_language: 'en',
        original_title: 'Ghostbusters: Frozen Empire',
        overview:
          "The Spengler family returns to where it all started – the iconic New York City firehouse – to team up with the original Ghostbusters, who've developed a top-secret research lab to take busting ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age.",
        poster_path: '/5QKNegIYBUxNYdx39nCsemwgXM8.jpg',
        media_type: 'movie',
        genre_ids: [14, 12, 35],
        popularity: 336.024,
        release_date: '2024-03-20',
        video: false,
        vote_average: 6.776,
        vote_count: 29,
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
        popularity: 368.536,
        release_date: '2021-09-15',
        video: false,
        vote_average: 7.79,
        vote_count: 10893,
      },
      {
        adult: false,
        backdrop_path: '/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg',
        id: 792307,
        title: 'Poor Things',
        original_language: 'en',
        original_title: 'Poor Things',
        overview:
          'Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.',
        poster_path: '/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
        media_type: 'movie',
        genre_ids: [878, 10749, 35],
        popularity: 622.887,
        release_date: '2023-12-07',
        video: false,
        vote_average: 7.9,
        vote_count: 2567,
      },
      {
        adult: false,
        backdrop_path: '/keVfqCMKmJ55nHzmqR2Q5K7LwJt.jpg',
        id: 784651,
        title: 'Fighter',
        original_language: 'hi',
        original_title: 'फाइटर',
        overview:
          'Top IAF aviators come together in the face of imminent danger, to form Air Dragons. Fighter unfolds their camaraderie, brotherhood and battles, internal and external.',
        poster_path: '/zDZowwb9GZGEctAu2PCpjiPQAMM.jpg',
        media_type: 'movie',
        genre_ids: [28, 12, 53],
        popularity: 33.559,
        release_date: '2024-01-24',
        video: false,
        vote_average: 5.7,
        vote_count: 18,
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
        poster_path: '/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
        media_type: 'movie',
        genre_ids: [28, 12, 16, 35, 10751],
        popularity: 4814.65,
        release_date: '2024-03-02',
        video: false,
        vote_average: 6.853,
        vote_count: 241,
      },
      {
        adult: false,
        backdrop_path: '/sfKIRZ7jjOYZXMlg1waEkFrZrNN.jpg',
        id: 1216512,
        title: 'The Casagrandes Movie',
        original_language: 'en',
        original_title: 'The Casagrandes Movie',
        overview:
          "On a birthday trip to Mexico, 12-year-old Ronnie Anne accidentally frees a demigod trapped in a mountain and needs her family's help to set things right.",
        poster_path: '/tz0LZ9WR3zWOxcnbUpRpVv9ORcL.jpg',
        media_type: 'movie',
        genre_ids: [16, 35, 10751],
        popularity: 74.141,
        release_date: '2024-03-22',
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
      {
        adult: false,
        backdrop_path: '/5d6btuy7ehxwpE0Fd8MQkFFzmuu.jpg',
        id: 823464,
        title: 'Godzilla x Kong: The New Empire',
        original_language: 'en',
        original_title: 'Godzilla x Kong: The New Empire',
        overview:
          'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
        poster_path: '/vAoubdb2TeqA9joJ7FBcchUMSC3.jpg',
        media_type: 'movie',
        genre_ids: [28, 878, 12],
        popularity: 622.407,
        release_date: '2024-03-27',
        video: false,
        vote_average: 0,
        vote_count: 0,
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
        popularity: 827.115,
        release_date: '2024-01-31',
        video: false,
        vote_average: 6.155,
        vote_count: 668,
      },
      {
        adult: false,
        backdrop_path: '/qVrS8bu1B7G1tgLTlCZQi4CFsTh.jpg',
        id: 969492,
        title: 'Land of Bad',
        original_language: 'en',
        original_title: 'Land of Bad',
        overview:
          'When a Delta Force special ops mission goes terribly wrong, Air Force drone pilot Reaper has 48 hours to remedy what has devolved into a wild rescue operation. With no weapons and no communication other than the drone above, the ground mission suddenly becomes a full-scale battle when the team is discovered by the enemy.',
        poster_path: '/h3jYanWMEJq6JJsCopy1h7cT2Hs.jpg',
        media_type: 'movie',
        genre_ids: [28, 53, 10752],
        popularity: 651.355,
        release_date: '2024-01-25',
        video: false,
        vote_average: 7.077,
        vote_count: 396,
      },
      {
        adult: false,
        backdrop_path: '/xYNiy7nCN7C01QI8OKTutstY3Vq.jpg',
        id: 1117321,
        title: "You'll Never Find Me",
        original_language: 'en',
        original_title: "You'll Never Find Me",
        overview:
          'Patrick, a strange and lonely resident, lives in a mobile home at the back of an isolated caravan park. After a violent thunderstorm erupts, a mysterious young woman appears at his door, seeking shelter from the weather. The longer the night wears on and the more the young woman discovers about Patrick, the more difficult she finds it to leave. Soon she begins to question Patrick’s intentions, while Patrick begins to question his own grip on reality...',
        poster_path: '/dqtAOLQ8KqAYoZckYY9j99NNr9K.jpg',
        media_type: 'movie',
        genre_ids: [53, 27],
        popularity: 7.143,
        release_date: '2024-03-14',
        video: false,
        vote_average: 6.333,
        vote_count: 2,
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
        popularity: 417.887,
        release_date: '2023-07-19',
        video: false,
        vote_average: 8.1,
        vote_count: 7315,
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
        popularity: 312.376,
        release_date: '2023-12-20',
        video: false,
        vote_average: 6.816,
        vote_count: 2088,
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
        popularity: 163.367,
        release_date: '2023-08-23',
        video: false,
        vote_average: 7.646,
        vote_count: 1496,
      },
      {
        adult: false,
        backdrop_path: '/3sC0DdygqYHesLqzFT8etDmDTAX.jpg',
        id: 10135,
        title: 'Road House',
        original_language: 'en',
        original_title: 'Road House',
        overview:
          "The Double Deuce is the meanest, loudest and rowdiest bar south of the Mason-Dixon Line, and Dalton has been hired to clean it up. He might not look like much, but the Ph.D.-educated bouncer proves he's more than capable – busting the heads of troublemakers and turning the roadhouse into a jumping hot spot. But Dalton's romance with the gorgeous Dr. Clay puts him on the bad side of cutthroat local big shot Brad Wesley.",
        poster_path: '/r2hGyhvNneAifk7UpwAYxrkeFO4.jpg',
        media_type: 'movie',
        genre_ids: [28, 53],
        popularity: 76.985,
        release_date: '1989-05-19',
        video: false,
        vote_average: 6.655,
        vote_count: 1062,
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
        popularity: 478.702,
        release_date: '2023-12-06',
        video: false,
        vote_average: 7.209,
        vote_count: 2604,
      },
    ],
    total_pages: 1000,
    total_results: 20000,
  };

  constructor(isOn: boolean) {
    super();
    TrendingMovies.IsOn = isOn;

    if (TrendingMovies.IsOn) {
      TrendingMovies.render();
    }
  }

  private static render() {
    this.inserMoviesContainer();
    this.insertMovieCardsAndBindData();
    this.startTimeWindowToggle();
  }

  private static inserMoviesContainer() {
    insertHTMLInsideElementById(this.templateTrendingMoviesSection, 'homepage__hero', 'afterend');
  }

  private static insertMovieCardsAndBindData() {
    let cardIndex = 1;

    this.trendingMovies.results.forEach((movie) => {
      let bindedTemplate = String(this.templateCard);

      bindedTemplate = bindedTemplate
        .replace('[MOVIE-ID]', movie.id.toString())
        .replace('[POSTER-PATH]', movie.poster_path)
        .replace('[TITLE]', movie.title)
        .replace('[YEAR]', movie.release_date.substring(0, 4))
        .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()]);

      insertHTMLInsideElementById(bindedTemplate, 'homepage-trending__movies__cards-subcontainer');
    });
  }

  private static startTimeWindowToggle() {
    const dayRadio = document.getElementById('movies-day-radio');
    const weekRadio = document.getElementById('movies-week-radio');

    dayRadio?.addEventListener('change', (event) => {
      const radio = event.target as HTMLInputElement;

      if (radio.checked) {
        this.TrendingTimeWindow = 'day';
        // show day
      }
    });

    weekRadio?.addEventListener('change', (event) => {
      const radio = event.target as HTMLInputElement;

      if (radio.checked) {
        this.TrendingTimeWindow = 'week';
        // show week
      }
    });
  }

  private static templateTrendingMoviesSection = /*html*/ `
  <section class="homepage-trending__movies-container">
        <div class="homepage-trending__movies__title-and-toggle-container">
          <h3 class="homepage-trending__movies__title">Movies</h3>
          <div class="homepage-trending__movies__dw-toggle">
            <input
              checked
              class="trending-toggle-radio movie-day"
              type="radio"
              name="trending-movies-time-window"
              id="movies-day-radio"
            />
            <label class="trending-toggle-label" for="movies-day-radio">Day</label>
            <input
              class="trending-toggle-radio movie-week"
              type="radio"
              name="trending-movies-time-window"
              id="movies-week-radio"
            />
            <label class="trending-toggle-label" for="movies-week-radio">Week</label>
          </div>
        </div>
        <div class="homepage-trending__movies__cards-container">
          <div class="homepage-trending__movies__cards-subcontainer" id="homepage-trending__movies__cards-subcontainer">
          </div>
        </div>
      </div>
    </section>
  `;

  private static templateCard = /*html*/ `
  <div class="trending-card-container" id="trending-movie--[MOVIE-ID]">
  <img
    src="https://image.tmdb.org/t/p/w342[POSTER-PATH]"
    alt=""
    class="trending-card__poster"
  />
  <div class="trending-card__title-and-year-genre-container">
    <h4 class="trending-card__title">[TITLE]</h4>
    <p class="trending-card-year-and-genre">[YEAR] • [GENRE]</p>
  </div>
</div>
  `;
}
