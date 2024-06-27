import { insertHTMLInsideElementById } from '../../../utils/GlobalUtils';
import { TmdbMovieResult2 } from '../../../utils/tmdb/TmdbFetchTrending';
import { TmdbMovieGenreIds } from '../../../utils/tmdb/TmdbFetch';
import {
  FetchTrendingTitles,
  TrendingFetchResult,
} from '../../../utils/proxy_api/FetchTrendingtTitles';
import { TitleDetailsRenderer } from '../../title_details/TitleDetailsRenderer';
import { TmdbPropsToPass } from '../trending/TrendingMedia';
import { TrailerEmbed } from '../trailer_embed/TrailerEmbed';
import { TmdbFetchVideoProps, TmdbFetchVideos } from '../../../utils/tmdb/TmdbFetchVideos';

export class Hero {
  private static IsOn = false;
  private static MovieList: TmdbMovieResult2[] = [];

  constructor(isOn: boolean) {
    Hero.IsOn = isOn;

    if (Hero.IsOn) {
      Hero.render();
    }
  }

  private static heroPage: number = 0; // 0 to 4 hero cards/pages

  private static async render() {
    await this.fetchMovies();
    this.insertHeroContainer();
    this.insertCardsAndBindData();

    this.startScrollButtonsController();
    this.startPageIndicatorObserver();
    this.startHeroCardsClickListener();

    // console.log(this.MovieList);
  }

  private static async fetchMovies() {
    const movies = (await FetchTrendingTitles.fetchTrending(
      'movies',
      'day'
    )) as TrendingFetchResult<TmdbMovieResult2>;

    if (movies.results[0].id === 404.0) {
    } else {
      let index = 0;
      movies.results.forEach((movie) => {
        if (index < 5) {
          this.MovieList.push(movie);
        }
        index++;
      });
    }
  }

  private static async startHeroCardsClickListener() {
    const heroContainer = document.getElementById('homepage__hero');

    heroContainer?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // console.log(target);

      if (
        target.classList.contains('homepage-hero-hero') ||
        target.classList.contains('homepage-hero__title')
      ) {
        const imdbId = target.getAttribute('data-imdb-id') as string;

        const heroCard = document.getElementsByClassName(
          `homepage-hero-card-${imdbId}`
        )[0] as HTMLElement;

        const tmdbTitle = heroCard.getAttribute('data-tmdb-title') as string;
        const desc = heroCard.getAttribute('data-tmdb-desc') as string;
        const posterUrl = heroCard.getAttribute('data-poster-path') as string;

        const tmdbProps: TmdbPropsToPass = {
          tmdbTitle: tmdbTitle,
          description: desc,
          posterURL: posterUrl,
        };

        TitleDetailsRenderer.viewTitle(imdbId, tmdbProps);
      }

      if (target.classList.contains('homepage-hero__play-trailer-btn')) {
        this.trailerButtonController(target);
      }
      if (target.classList.contains('homepage-hero__poster')) {
      }
    });
  }

  private static async trailerButtonController(button: HTMLElement) {
    const tmdbId = parseInt(button.getAttribute('data-tmdb-id') as string);
    const trailerKey = await TmdbFetchVideos.fetchYoutubeTrailerPriorityKey(tmdbId, 'movie');

    if (trailerKey) {
      TrailerEmbed.render(trailerKey);
    } else {
      const trailers = (await TmdbFetchVideos.fetchVideos(
        tmdbId,
        'movie'
      )) as TmdbFetchVideoProps[];
      try {
        const trailerKeyFallback = trailers[0].key;
        TrailerEmbed.render(trailerKeyFallback);
        console.log('using fallback first video');
      } catch {
        ////////////////////
        console.log('no video found');
        this.disablePlayTrailerButton(`hero-play-trailer-btn-${tmdbId}`);
      }
    }
  }

  private static animatePlayTrailerButton(buttonId: string) {
    const button = document.getElementById(buttonId) as HTMLInputElement;
  }

  private static disablePlayTrailerButton(buttonId: string) {
    const button = document.getElementById(buttonId) as HTMLInputElement;
    button.classList.add('button-disabled');
    button.style.pointerEvents = 'none';
  }

  private static insertHeroContainer() {
    insertHTMLInsideElementById(this.templateHero, 'main-element', 'afterbegin');
  }

  private static insertCardsAndBindData() {
    let cardIndex = 1;

    this.MovieList.forEach((movie) => {
      let bindedTemplate = String(this.templateHeroCard);

      bindedTemplate = bindedTemplate
        .replace('[CARD-NUMBER]', cardIndex.toString())
        .replace(/\[IMDB-ID\]/g, movie.imdbId)
        .replace(/\[TMDB-ID\]/g, movie.id.toString())
        .replace(/\[TITLE\]/g, movie.title)
        .replace('[YEAR]', movie.release_date.substring(0, 4))
        .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()])
        .replace(/\[POSTER-PATH\]/g, movie.poster_path)
        .replace(/\[POSTER-ALT\]/g, `A poster image of a movie entitled: ${movie.title}`)
        .replace('[BACKDROP-PATH]', movie.backdrop_path)
        .replace('[BACKDROP-ALT]', `A backdrop image of a movie entitled: ${movie.title}`)
        .replace('[DESCRIPTION]', movie.overview);

      insertHTMLInsideElementById(bindedTemplate, 'homepage-hero-cards-container');

      cardIndex++;
    });
  }

  private static startPageIndicatorObserver() {
    const oberserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const indicatorId = entry.target.id.replace(
          'homepage-hero__card--',
          'homepage-hero__indicator__'
        );
        const indicator = document.getElementById(indicatorId) as HTMLElement;
        indicator.classList.toggle('visible', entry.isIntersecting);
      });
    });

    const heroCards: HTMLElement[] = Array.from(document.querySelectorAll('.homepage-hero-hero'));

    heroCards.forEach(
      (card) => {
        oberserver.observe(card);
      },
      { threshold: 1 }
    );
  }

  private static startScrollButtonsController() {
    const heroCardsContainer = document.getElementById(
      'homepage-hero-cards-container'
    ) as HTMLElement;

    const heroCardWidth = (): number => {
      let width = 0;
      width = heroCardsContainer.offsetWidth as number;
      document.addEventListener('resize', () => {
        width = heroCardsContainer.offsetWidth as number;
      });
      return width;
    };

    const leftButton = document.getElementById('homepage-hero__scroll-left-btn');
    const rightButton = document.getElementById('homepage-hero__scroll-right-btn');

    leftButton?.addEventListener('click', () => {
      if (this.heroPage === 0) {
        // jump to card 5
        this.heroPage = 4;
        heroCardsContainer.style.scrollBehavior = 'auto';
        heroCardsContainer.scrollLeft = heroCardWidth() * this.heroPage;
        heroCardsContainer.style.scrollBehavior = 'smooth';
        return;
      }
      // move to left
      this.heroPage -= 1;
      heroCardsContainer.scrollLeft = heroCardWidth() * this.heroPage;
      // this.setPageIndicator();
      // console.log(this.heroPage);
    });

    rightButton?.addEventListener('click', () => {
      if (this.heroPage === 4) {
        // jump to card 1
        this.heroPage = 0;
        heroCardsContainer.style.scrollBehavior = 'auto';
        heroCardsContainer.scrollLeft = 0;
        heroCardsContainer.style.scrollBehavior = 'smooth';
        return;
      }

      // move to right
      this.heroPage += 1;
      heroCardsContainer.scrollLeft = heroCardWidth() * this.heroPage;
    });
  }

  private static templateHero = /*html*/ `
 <section class="homepage-hero__container" id="homepage__hero">
 <div class="homepage-hero__scroll-buttons-container">
   <button id="homepage-hero__scroll-left-btn" aria-label="Scroll Left" type="button" class="homepage-hero__scroll-button homepage-hero__scroll-left-btn" tabindex="0">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7.44">
       <path id="arrow_down_expanded" data-name="arrow down expanded" class="cls-1" d="M6.44,7.44a1,1,0,0,1-.71-.29L.29,1.71A1,1,0,0,1,1.71.29L6.45,5,11.3.29a1,1,0,1,1,1.4,1.42L7.14,7.16A1,1,0,0,1,6.44,7.44Z"/>
     </svg></button>

   <button id="homepage-hero__scroll-right-btn" aria-label="Scroll Right" type="button" class="homepage-hero__scroll-button homepage-hero__scroll-right-btn" tabindex="0">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7.44">
       <path id="arrow_down_expanded" data-name="arrow down expanded" class="cls-1" d="M6.44,7.44a1,1,0,0,1-.71-.29L.29,1.71A1,1,0,0,1,1.71.29L6.45,5,11.3.29a1,1,0,1,1,1.4,1.42L7.14,7.16A1,1,0,0,1,6.44,7.44Z"/>
     </svg></button>
 </div>
 <div id="homepage-hero-cards-container" class="homepage-hero-cards-container">
 </div>
 <div class="homepage-hero__page-indicator-container">
 <div
   class="homepage-hero__indicator homepage-hero__indicator__1"
   id="homepage-hero__indicator__1"
 ></div>
 <div
   class="homepage-hero__indicator homepage-hero__indicator__2"
   id="homepage-hero__indicator__2"
 ></div>
 <div
   class="homepage-hero__indicator homepage-hero__indicator__3"
   id="homepage-hero__indicator__3"
 ></div>
 <div
   class="homepage-hero__indicator homepage-hero__indicator__4"
   id="homepage-hero__indicator__4"
 ></div>
 <div
   class="homepage-hero__indicator homepage-hero__indicator__5"
   id="homepage-hero__indicator__5"
 ></div>
</div>
</section>
 `;

  private static templateHeroCard = /*html*/ `<div id="homepage-hero__card--[CARD-NUMBER]" class="homepage-hero-hero homepage-hero-card-[IMDB-ID]" data-imdb-id="[IMDB-ID]" data-tmdb-title="[TITLE]" data-tmdb-desc="[DESCRIPTION]" data-poster-path="https://image.tmdb.org/t/p/w500[POSTER-PATH]">
 <img
   src="https://image.tmdb.org/t/p/w1280[BACKDROP-PATH]"
   alt="[BACKDROP-ALT]"
   class="homepage-hero__backdrop"
   width="100%"
 />
 <div class="homepage-hero-hero-details-and-poster">
   <img
     class="homepage-hero__poster"
     src="https://image.tmdb.org/t/p/w342[POSTER-PATH]"
     alt="[POSTER-ALT]"
     role="button"
     tabindex="0"
   />
   <h4 class="homepage-hero__title active--underline hover--darken" role="button" tabindex="0" data-imdb-id="[IMDB-ID]">[TITLE]</h4>
   <p class="homepage-hero__year-and-genre">
    <span class="homepage-hero__year">[YEAR]<span> • <span class="homepage-hero__genre">[GENRE]</span>
   </p>
    <div class="homepage-hero__play-trailer-btn btn-click-animation-and-cursor hover--darken" id="hero-play-trailer-btn-[TMDB-ID]" role="button" tabindex="0" data-tmdb-id="[TMDB-ID]">
      <img class="play-trailer-button-img-bg" src="https://image.tmdb.org/t/p/w92[POSTER-PATH]" alt="">
      <p class="play-trailer-txt">Play Trailer</p>
      <svg width="14px" class="play-icon"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.18 93.81"><path d="M78.64,37.3l-62-35.8A11.09,11.09,0,0,0,0,11.1V82.71A11.08,11.08,0,0,0,16.63,92.3l62-35.8A11.09,11.09,0,0,0,78.64,37.3Z"/></svg>
   </div>
 </div>
</div>`;
}
