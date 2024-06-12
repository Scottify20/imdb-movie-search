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
    this.scrollButtonsVisibilityController('trending-movie');

    this.insertSeriesContainer();
    this.insertSeriesCardsAndBindData();
    this.seriesCardsContainer = document.getElementById(
      'homepage-trending__series__cards-container'
    ) as HTMLElement;
    this.scrollButtonsVisibilityController('trending-series');

    this.startCardClickListeners();
    this.startTimeWindowToggle();
    this.moviesScrollButtonsListener();
    this.seriesScrollButtonsListener();
  }

  private static reRender() {
    this.removeCardsFromContainers();
    this.insertMovieCardsAndBindData();
    this.insertSeriesCardsAndBindData();
    this.resetScroll();
    this.scrollButtonsVisibilityController('trending-movie');
    this.scrollButtonsVisibilityController('trending-series');
  }

  private static startCardClickListeners() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      let props: TmdbPropsToPass = { tmdbTitle: '', description: '', posterURL: '' };

      if (target.classList.contains('trending-card-container')) {
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

      if (cardIndex === 6) {
        bindedTemplate = bindedTemplate.replace('[CARD-INDEX]', 'first');
      } else if (cardIndex === trendingMovies.length) {
        bindedTemplate = bindedTemplate.replace('[CARD-INDEX]', 'last');
      } else {
        bindedTemplate = bindedTemplate.replace('[CARD-INDEX]', (cardIndex - 5).toString());
      }

      /// only cards 6 and higher are inserted
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
        .replace('[IMDB-ID]', series.imdbId)
        .replace(/\[POSTER-PATH\]/g, series.poster_path)
        .replace('[POSTER-ALT]', `A poster image of a TV Series entitled: ${series.name}`)
        .replace(/\[TITLE\]/g, series.name)
        .replace('[YEAR]', series.first_air_date.substring(0, 4))
        .replace('[GENRE]', TmdbSeriesGenreIds[series.genre_ids[0].toString()])
        .replace('[DESCRIPTION]', series.overview);

      if (cardIndex === 1) {
        bindedTemplate = bindedTemplate.replace('[CARD-INDEX]', 'first');
      } else if (cardIndex === trendingSeries.length) {
        bindedTemplate = bindedTemplate.replace('[CARD-INDEX]', 'last');
      } else {
        bindedTemplate = bindedTemplate.replace('[CARD-INDEX]', cardIndex.toString());
      }

      insertHTMLInsideElementById(bindedTemplate, 'homepage-trending__series__cards-subcontainer');

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

  private static scrollButtonsVisibilityController(category: 'trending-movie' | 'trending-series') {
    let cardsContainer = document.getElementById(
      'random-id-string-to-bypass-assignment-checks'
    ) as HTMLElement;
    let LeftButton: HTMLElement;
    let RightButton: HTMLElement;
    let firstCard = document.getElementById(
      'random-id-string-to-bypass-assignment-checks'
    ) as HTMLElement;
    let lastCard = document.getElementById(
      'random-id-string-to-bypass-assignment-checks'
    ) as HTMLElement;

    if (category === 'trending-movie') {
      cardsContainer = document.getElementById(
        'homepage-trending__movies__cards-subcontainer'
      ) as HTMLElement;
      LeftButton = document.getElementById(
        'homepage-trending-movies__scroll-left-btn'
      ) as HTMLElement;
      RightButton = document.getElementById(
        'homepage-trending-movies__scroll-right-btn'
      ) as HTMLElement;

      firstCard = cardsContainer.firstElementChild as HTMLElement;
      lastCard = cardsContainer.lastElementChild as HTMLElement;

      const movieObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.getAttribute('data-card-index') === 'first') {
              LeftButton.classList.toggle('hide', entry.isIntersecting);
            } else if (entry.target.getAttribute('data-card-index') === 'last') {
              RightButton.classList.toggle('hide', entry.isIntersecting);
            }
          });
        },
        { threshold: 1 }
      );

      movieObserver.observe(firstCard);
      movieObserver.observe(lastCard);
    }

    if (category === 'trending-series') {
      cardsContainer = document.getElementById(
        'homepage-trending__series__cards-subcontainer'
      ) as HTMLElement;

      LeftButton = document.getElementById(
        'homepage-trending-series__scroll-left-btn'
      ) as HTMLElement;

      RightButton = document.getElementById(
        'homepage-trending-series__scroll-right-btn'
      ) as HTMLElement;

      firstCard = cardsContainer.firstElementChild as HTMLElement;
      lastCard = cardsContainer.lastElementChild as HTMLElement;

      const seriesObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.getAttribute('data-card-index') === 'first') {
              LeftButton.classList.toggle('hide', entry.isIntersecting);
            } else if (entry.target.getAttribute('data-card-index') === 'last') {
              RightButton.classList.toggle('hide', entry.isIntersecting);
            }
          });
        },
        { threshold: 1 }
      );

      seriesObserver.observe(firstCard);
      seriesObserver.observe(lastCard);
    }
  }

  private static moviesScrollButtonsListener() {
    const trendingMovies = document.getElementById(
      'homepage-trending__movies__cards-container'
    ) as HTMLElement;
    const movieLeft = document.getElementById(
      'homepage-trending-movies__scroll-left-btn'
    ) as HTMLElement;

    const movieRight = document.getElementById(
      'homepage-trending-movies__scroll-right-btn'
    ) as HTMLElement;

    const unclippedContainer = document.getElementById(
      'homepage-trending__movies__cards-subcontainer'
    ) as HTMLElement;

    const scrollContentWidth =
      this.getVisibleCardNumbers * this.getCardWidth + this.getVisibleCardNumbers * this.getCardGap;

    movieLeft.addEventListener('click', () => {
      if (trendingMovies.scrollLeft <= scrollContentWidth) {
        trendingMovies.scrollLeft = 0;
      } else {
        trendingMovies.scrollLeft = trendingMovies.scrollLeft -= scrollContentWidth;
      }
    });

    movieRight.addEventListener('click', () => {
      if (trendingMovies.scrollLeft > trendingMovies.scrollLeft + scrollContentWidth) {
        trendingMovies.scrollLeft = unclippedContainer.offsetWidth;
      } else {
        trendingMovies.scrollLeft = trendingMovies.scrollLeft += scrollContentWidth;
      }
    });
  }

  private static seriesScrollButtonsListener() {
    const trendingSeries = document.getElementById(
      'homepage-trending__series__cards-container'
    ) as HTMLElement;
    const movieLeft = document.getElementById(
      'homepage-trending-series__scroll-left-btn'
    ) as HTMLElement;

    const movieRight = document.getElementById(
      'homepage-trending-series__scroll-right-btn'
    ) as HTMLElement;

    const unclippedContainer = document.getElementById(
      'homepage-trending__series__cards-subcontainer'
    ) as HTMLElement;

    const scrollContentWidth =
      this.getVisibleCardNumbers * this.getCardWidth + this.getVisibleCardNumbers * this.getCardGap;

    movieLeft.addEventListener('click', () => {
      if (trendingSeries.scrollLeft <= scrollContentWidth) {
        trendingSeries.scrollLeft = 0;
      } else {
        trendingSeries.scrollLeft = trendingSeries.scrollLeft -= scrollContentWidth;
      }
    });

    movieRight.addEventListener('click', () => {
      if (trendingSeries.scrollLeft > trendingSeries.scrollLeft + scrollContentWidth) {
        trendingSeries.scrollLeft = unclippedContainer.offsetWidth;
      } else {
        trendingSeries.scrollLeft = trendingSeries.scrollLeft += scrollContentWidth;
      }
    });
  }

  private static get getVisibleCardNumbers(): number {
    const container = document.getElementById(
      'homepage-trending__movies__cards-container'
    ) as HTMLElement;
    let containerWidth = container.offsetWidth;
    let cardGap = 16; //1rem
    let cardWidth = 150; // 150px

    // based of the css windows width layout breakpoints on the trending sections
    // if container width is more than 768px, card width and gap will be assigned to 20px and 175px
    if (window.innerWidth > 768) {
      cardGap = 20; // 1.25rem
      cardWidth = 175; // 175px

      // No of Cards = (Cw + Cg) / (9.75 * Cg)
      const Nc = (containerWidth + cardGap) / (9.75 * cardGap);
      // console.log(Math.floor(Nc));
      // return Nc;
      return Math.floor(Nc);
    }
    // if container width is less than or equal to 768px, card width and gap will remain as 16px and 150px

    // No of Cards = (Cw + Cg) / (10.375 * Cg)
    const Nc = (containerWidth + cardGap) / (10.375 * cardGap);
    // console.log(Math.floor(Nc));
    // return Nc;
    return Math.floor(Nc);
  }

  private static get getCardWidth(): number {
    return window.innerWidth > 768 ? 175 : 150;
  }

  private static get getCardGap(): number {
    return window.innerWidth > 768 ? 20 : 16;
  }

  private static templateTrendingMoviesSection = /*html*/ `
  <section class="homepage-trending__movies-container" id="homepage-trending__movies-container">
  <div class="homepage-trending__scroll-buttons-container">
  <button id="homepage-trending-movies__scroll-left-btn" aria-label="Scroll Left" type="button" class="homepage-trending__scroll-button homepage-trending__scroll-left-btn" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7.44">
      <path id="arrow_down_expanded" data-name="arrow down expanded" class="cls-1" d="M6.44,7.44a1,1,0,0,1-.71-.29L.29,1.71A1,1,0,0,1,1.71.29L6.45,5,11.3.29a1,1,0,1,1,1.4,1.42L7.14,7.16A1,1,0,0,1,6.44,7.44Z"/>
    </svg></button>

  <button id="homepage-trending-movies__scroll-right-btn" aria-label="Scroll Right" type="button" class="homepage-trending__scroll-button homepage-trending__scroll-right-btn" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7.44">
      <path id="arrow_down_expanded" data-name="arrow down expanded" class="cls-1" d="M6.44,7.44a1,1,0,0,1-.71-.29L.29,1.71A1,1,0,0,1,1.71.29L6.45,5,11.3.29a1,1,0,1,1,1.4,1.42L7.14,7.16A1,1,0,0,1,6.44,7.44Z"/>
    </svg></button>
</div>
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
              aria-label="Show Daily Trending Movies"
              tabindex="0"
            />

            <input
              class="trending-toggle-radio movie-week"
              type="radio"
              name="trending-movies-time-window-toggle"
              id="movies-week-radio"
              value="2"
              dw-toggle-data-sync="2"
              aria-label="Show Weekly Trending Movies"
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
  <div class="homepage-trending__scroll-buttons-container">
  <button id="homepage-trending-series__scroll-left-btn" aria-label="Scroll Left" type="button" class="homepage-trending__scroll-button homepage-trending__scroll-left-btn" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7.44">
      <path id="arrow_down_expanded" data-name="arrow down expanded" class="cls-1" d="M6.44,7.44a1,1,0,0,1-.71-.29L.29,1.71A1,1,0,0,1,1.71.29L6.45,5,11.3.29a1,1,0,1,1,1.4,1.42L7.14,7.16A1,1,0,0,1,6.44,7.44Z"/>
    </svg></button>

  <button id="homepage-trending-series__scroll-right-btn" aria-label="Scroll Right" type="button" class="homepage-trending__scroll-button homepage-trending__scroll-right-btn" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7.44">
      <path id="arrow_down_expanded" data-name="arrow down expanded" class="cls-1" d="M6.44,7.44a1,1,0,0,1-.71-.29L.29,1.71A1,1,0,0,1,1.71.29L6.45,5,11.3.29a1,1,0,1,1,1.4,1.42L7.14,7.16A1,1,0,0,1,6.44,7.44Z"/>
    </svg></button>
  </div>
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
              aria-label="Show Daily Trending TV Series"
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
              aria-label="Show Weekly Trending TV Series"
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
  <div class="trending-card-container" id="trending-movie--[MOVIE-ID]" data-tmdb-desc="[DESCRIPTION]" data-tmdb-title="[TITLE]" data-poster-path="https://image.tmdb.org/t/p/w500[POSTER-PATH]" data-imdb-id="[IMDB-ID]" role="button" tabindex="0" data-card-index="[CARD-INDEX]">
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
