import { insertHTMLInsideElementById } from '../../../utils/GlobalUtils';
import { FetchTrendingTitles } from '../../../utils/proxy_api/FetchTrendingtTitles';
import {
  TmdbFetch,
  TmdbMovieGenreIds,
  TmdbSeriesGenreIds,
  tmdbTimeWindowTypes,
} from '../../../utils/tmdb/TmdbFetch';
import { TmdbMovieResult2, TmdbSeriesResult2 } from '../../../utils/tmdb/TmdbFetchTrending';
import { TitleDetailsRenderer } from '../../title_details/TitleDetailsRenderer';

interface StoredTrendingMedia {
  moviesDay: TmdbMovieResult2[];
  moviesWeek: TmdbMovieResult2[];
  seriesDay: TmdbSeriesResult2[];
  seriesWeek: TmdbSeriesResult2[];
  timeLastUpdated: number;
}

// The properties of the title to pass to the view Title Window
export interface TmdbPropsToPass {
  tmdbTitle: string;
  description: string;
  posterURL: string;
}

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
    const localTrendingMedia = this.storedTrendingMediaFromLocalStorage();
    // console.log(localTrendingMedia);
    ////////////////////////////////////////////////////////////////////////////////
    if (localTrendingMedia?.timeLastUpdated === 1) {
      this.getLocallyStoredTrendingMedia(localTrendingMedia);
    } else {
      await this.fetchTrendingMedia();
    }

    this.insertMoviesContainer();
    this.insertMovieCardsAndBindData();
    this.movieCardsContainer = document.getElementById(
      'homepage-trending__movies__cards-container'
    ) as HTMLElement;

    this.insertSeriesContainer();
    this.insertSeriesCardsAndBindData();
    this.seriesCardsContainer = document.getElementById(
      'homepage-trending__series__cards-container'
    ) as HTMLElement;

    this.startCardClickListeners();
    this.startTimeWindowToggle();

    this.overrideScrollingToHorizontalOnHover();
  }

  private static reRender() {
    this.removeCardsFromContainers();
    this.insertMovieCardsAndBindData();
    this.insertSeriesCardsAndBindData();
    this.resetScroll();
  }

  private static startCardClickListeners() {
    document.addEventListener('click', (event) => {
      // console.log(event.target);
      const target = event.target as HTMLElement;
      let props: TmdbPropsToPass = { tmdbTitle: '', description: '', posterURL: '' };

      if (target.classList.contains('trending-card-container')) {
        // propsfs / fse;

        const imdbId = target.getAttribute('data-imdb-id') as string;
        const tmdbTitle = target.getAttribute('data-tmdb-title') as string;
        const desc = target.getAttribute('data-tmdb-desc') as string;
        const posterUrl = target.getAttribute('data-poster-path') as string;

        const tmdbProps: TmdbPropsToPass = {
          tmdbTitle: tmdbTitle,
          description: desc,
          posterURL: posterUrl,
        };

        // console.log(tmdbProps);

        TitleDetailsRenderer.viewTitle(imdbId, tmdbProps);
      }
    });
  }

  private static getLocallyStoredTrendingMedia(localTrendingMedia: StoredTrendingMedia) {
    const moviesDay = localTrendingMedia.moviesDay;
    const moviesWeek = localTrendingMedia.moviesWeek;
    const seriesDay = localTrendingMedia.seriesDay;
    const seriesWeek = localTrendingMedia.seriesWeek;

    this.trendingMoviesDay = moviesDay;
    this.trendingMoviesWeek = moviesWeek;
    this.trendingSeriesDay = seriesDay;
    this.trendingSeriesWeek = seriesWeek;
  }

  private static async fetchTrendingMedia() {
    const [moviesDay, moviesWeek, seriesDay, seriesWeek] = await Promise.all([
      FetchTrendingTitles.fetchTrending('movies', 'day'),
      FetchTrendingTitles.fetchTrending('movies', 'week'),
      FetchTrendingTitles.fetchTrending('series', 'day'),
      FetchTrendingTitles.fetchTrending('series', 'week'),
    ]);

    let trendingMedia: StoredTrendingMedia = {
      moviesDay: [],
      moviesWeek: [],
      seriesDay: [],
      seriesWeek: [],
      timeLastUpdated: new Date().getTime(),
    };

    if (moviesDay.results[0].id === 404.0) {
    } else {
      this.trendingMoviesDay = moviesDay.results as TmdbMovieResult2[];
      trendingMedia.moviesDay = this.trendingMoviesDay;
    }

    if (moviesWeek.results[0].id === 404.0) {
    } else {
      this.trendingMoviesWeek = moviesWeek.results as TmdbMovieResult2[];
      trendingMedia.moviesWeek = this.trendingMoviesWeek;
    }

    if (seriesDay.results[0].id === 404.0) {
    } else {
      this.trendingSeriesDay = seriesDay.results as TmdbSeriesResult2[];
      trendingMedia.seriesDay = this.trendingSeriesDay;
    }

    if (seriesWeek.results[0].id === 404.0) {
    } else {
      this.trendingSeriesWeek = seriesWeek.results as TmdbSeriesResult2[];
      trendingMedia.seriesWeek = this.trendingSeriesWeek;
    }
    trendingMedia.timeLastUpdated = new Date().getTime();
    this.storeTrendingMediaToLocalStorage(trendingMedia);
  }

  private static storeTrendingMediaToLocalStorage(trendingMedia: StoredTrendingMedia) {
    localStorage.setItem('trendingMedia', JSON.stringify(trendingMedia));
  }

  private static storedTrendingMediaFromLocalStorage(): StoredTrendingMedia | undefined {
    const trendingMedia = localStorage.getItem('trendingMedia');
    if (trendingMedia) {
      const trendingMediaObj = JSON.parse(trendingMedia) as StoredTrendingMedia;

      // console.log(trendingMediaObj);

      const presentDate = new Date();
      const timeDifference = presentDate.getTime() - trendingMediaObj.timeLastUpdated;
      const maxHours = 3;

      if (timeDifference < maxHours * 60 * 60 * 1000) {
        console.log('less than 3 hours');
        return trendingMediaObj;
      }
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
        .replace('[IMDB-ID]', movie.imdbId)
        .replace(/\[POSTER-PATH\]/g, movie.poster_path)
        .replace(/\[POSTER-ALT\]/g, `A poster image of a TV Series entitled: ${movie.title}`)
        .replace(/\[TITLE\]/g, movie.title)
        .replace('[YEAR]', movie.release_date.substring(0, 4))
        .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()])
        .replace('[DESCRIPTION]', movie.overview);

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

    // let cardIndex = 1;

    trendingSeries.forEach((series) => {
      let bindedTemplate = String(this.templateCard);

      bindedTemplate = bindedTemplate
        .replace('[MOVIE-ID]', series.id.toString())
        .replace('[IMDB-ID]', series.imdbId)
        .replace(/\[POSTER-PATH\]/g, series.poster_path)
        .replace('[POSTER-ALT]', `A poster image of a TV Series entitled: ${series.name}`)
        .replace(/\[TITLE\]/g, series.name)
        .replace('[YEAR]', series.first_air_date.substring(0, 4))
        .replace('[GENRE]', TmdbSeriesGenreIds[series.genre_ids[0].toString()])
        .replace('[DESCRIPTION]', series.overview);

      // if (cardIndex > 5) {
      //   insertHTMLInsideElementById(
      //     bindedTemplate,
      //     'homepage-trending__series__cards-subcontainer'
      //   );
      // }

      insertHTMLInsideElementById(bindedTemplate, 'homepage-trending__series__cards-subcontainer');

      // cardIndex++;
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
          // console.log('day');
        } else if (index === 1) {
          this.TrendingTimeWindow = 'week';
          // console.log('week');
        }

        this.reRender();
      });
    });

    radiosMovie.forEach((radio, index) => {
      radio.addEventListener('change', () => {
        radiosSeries[index].checked = true;

        if (index === 0) {
          this.TrendingTimeWindow = 'day';
          // console.log('day');
        } else if (index === 1) {
          this.TrendingTimeWindow = 'week';
          // console.log('week');
        }

        this.reRender();
      });
    });
  }

  private static templateTrendingMoviesSection = /*html*/ `
  <section class="homepage-trending__movies-container" id="homepage-trending__movies-container">
        <div class="homepage-trending__movies__title-and-toggle-container">
          <h3 class="homepage-trending__movies__title">Movies</h3>
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
          <h3 class="homepage-trending__movies__title">TV Series</h3>
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
  <div class="trending-card-container" id="trending-movie--[MOVIE-ID]" data-tmdb-desc="[DESCRIPTION]" data-tmdb-title="[TITLE]" data-poster-path="https://image.tmdb.org/t/p/w500[POSTER-PATH]" data-imdb-id="[IMDB-ID]" role="button" tabindex="0">
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
