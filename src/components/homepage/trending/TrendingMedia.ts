import { insertHTMLInsideElementById } from '../../../utils/GlobalUtils';
import { FetchTrendingTitles } from '../../../utils/proxy_api/FetchTrendingtTitles';
import {
  TmdbFetch,
  TmdbMovieGenreIds,
  TmdbSeriesGenreIds,
  tmdbTimeWindowTypes,
} from '../../../utils/tmdb/TmdbFetch';
import { TmdbMovieResult2, TmdbSeriesResult2 } from '../../../utils/tmdb/TmdbFetchTrending';

import {
  TrendingFetchResult,
  TrendingFetchError,
} from '../../../utils/proxy_api/FetchTrendingtTitles';

export class TrendingMedia {
  private static IsOn = false;
  private static TrendingTimeWindow: tmdbTimeWindowTypes = 'day';
  private static movieCardsContainer: HTMLElement;
  private static seriesCardsContainer: HTMLElement;

  public static trendingMoviesDay: TmdbMovieResult2[] = [];
  public static trendingMoviesWeek: TmdbMovieResult2[] = [];
  public static trendingSeriesDay: TmdbSeriesResult2[] = [];
  public static trendingSeriesWeek: TmdbSeriesResult2[] = [];

  constructor(isOn: boolean) {
    TrendingMedia.IsOn = isOn;

    if (TrendingMedia.IsOn) {
      TrendingMedia.render();
    }
  }

  private static async render() {
    await this.fetchTrendingMedia();
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
    this.overrideScrollingToHorizontalOnHover();
  }

  private static reRender() {
    this.removeCardsFromContainers();
    this.insertMovieCardsAndBindData();
    this.insertSeriesCardsAndBindData();
    this.resetScroll();
  }

  private static async fetchTrendingMedia() {
    const moviesDay = (await FetchTrendingTitles.fetchTrending(
      'movies',
      'day'
    )) as TrendingFetchResult<TmdbMovieResult2>;
    const moviesWeek = (await FetchTrendingTitles.fetchTrending(
      'movies',
      'week'
    )) as TrendingFetchResult<TmdbMovieResult2>;
    const seriesDay = (await FetchTrendingTitles.fetchTrending(
      'series',
      'week'
    )) as TrendingFetchResult<TmdbSeriesResult2>;
    const seriesWeek = (await FetchTrendingTitles.fetchTrending(
      'series',
      'week'
    )) as TrendingFetchResult<TmdbSeriesResult2>;

    if (moviesDay.results[0].id === 404.0) {
    } else {
      this.trendingMoviesDay = moviesDay.results;
    }

    if (moviesWeek.results[0].id === 404.0) {
    } else {
      this.trendingMoviesWeek = moviesWeek.results;
    }

    if (seriesDay.results[0].id === 404.0) {
    } else {
      this.trendingSeriesDay = seriesDay.results;
    }

    if (seriesWeek.results[0].id === 404.0) {
    } else {
      this.trendingSeriesWeek = seriesWeek.results;
    }
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

  private static overrideScrollingToHorizontalOnHover() {
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
    let trendingMovies: TmdbMovieResult2[] = [];

    if (this.TrendingTimeWindow === 'day') {
      trendingMovies = [...this.trendingMoviesDay];
    } else {
      trendingMovies = [...this.trendingMoviesWeek];
    }

    let cardIndex = 1;

    trendingMovies.forEach((movie) => {
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

  private static insertSeriesCardsAndBindData() {
    let trendingSeries: TmdbSeriesResult2[];
    if (this.TrendingTimeWindow === 'day') {
      trendingSeries = [...this.trendingSeriesDay];
    } else {
      trendingSeries = [...this.trendingSeriesWeek];
    }

    let cardIndex = 1;

    trendingSeries.forEach((series) => {
      let bindedTemplate = String(this.templateCard);

      bindedTemplate = bindedTemplate
        .replace('[MOVIE-ID]', series.id.toString())
        .replace('[POSTER-PATH]', series.poster_path)
        .replace('[POSTER-ALT]', `A poster image of a TV Series entitled: ${series.name}`)
        .replace('[TITLE]', series.name)
        .replace('[YEAR]', series.first_air_date.substring(0, 4))
        .replace('[GENRE]', TmdbSeriesGenreIds[series.genre_ids[0].toString()]);

      if (cardIndex > 5) {
        insertHTMLInsideElementById(
          bindedTemplate,
          'homepage-trending__series__cards-subcontainer'
        );
      }

      cardIndex++;
    });
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
  <section class="homepage-trending__movies-container" id="homepage-trending__movies-container">
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
  <section class="homepage-trending__movies-container" id="homepage-trending__series-container">
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
