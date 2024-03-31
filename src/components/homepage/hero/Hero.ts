import { insertHTMLInsideElementById } from '../../../utils/GlobalUtils';
import { TmdbMovieResult, TmdbSeriesResult } from '../../../utils/tmdb/TmdbFetchTrending';
import { TmdbMovieGenreIds } from '../../../utils/tmdb/TmdbFetch';

export class Hero {
  private static IsOn = false;
  private static MovieList: TmdbMovieResult[] = [
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
  ];

  constructor(isOn: boolean) {
    Hero.IsOn = isOn;

    if (Hero.IsOn) {
      Hero.render();
    }
  }

  private static heroPage: number = 0; // 0 to 4 hero cards/pages

  private static render() {
    this.insertHeroContainer();
    this.insertCardsAndBindData();

    this.startScrollButtonsController();
    this.startPageIndicatorObserver();
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
        .replace('[TITLE]', movie.title)
        .replace('[YEAR]', movie.release_date.substring(0, 4))
        .replace('[GENRE]', TmdbMovieGenreIds[movie.genre_ids[0].toString()])
        .replace(/\[POSTER-PATH\]/g, movie.poster_path)
        .replace(/\[POSTER-ALT\]/g, `A poster image of a movie entitled: ${movie.title}`)
        .replace('[BACKDROP-PATH]', movie.backdrop_path)
        .replace('[BACKDROP-ALT]', `A backdrop image of a movie entitled: ${movie.title}`);

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
        // console.log('max left');
        // jump to card 5
        this.heroPage = 4;
        // console.log(this.heroPage);
        heroCardsContainer.style.scrollBehavior = 'auto';
        heroCardsContainer.scrollLeft = heroCardWidth() * this.heroPage;
        // this.setPageIndicator();
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
        // console.log('max right');

        // jump to card 1
        this.heroPage = 0;
        // console.log(this.heroPage);
        heroCardsContainer.style.scrollBehavior = 'auto';
        heroCardsContainer.scrollLeft = 0;
        // this.setPageIndicator();
        heroCardsContainer.style.scrollBehavior = 'smooth';
        return;
      }

      // move to right
      this.heroPage += 1;
      heroCardsContainer.scrollLeft = heroCardWidth() * this.heroPage;
      // this.setPageIndicator();
      // console.log(this.heroPage);
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

  private static templateHeroCard = /*html*/ `<div id="homepage-hero__card--[CARD-NUMBER]" class="homepage-hero-hero">
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
   <h4 class="homepage-hero__title" role="button" tabindex="0">[TITLE]</h4>
   <p class="homepage-hero__year-and-genre"><span class="homepage-hero__year">[YEAR]<span> • <span class="homepage-hero__genre">[GENRE]</span></p>
   <div class="homepage-hero__play-trailer-btn" role="button" tabindex="0">
     <img class="play-trailer-button-img-bg" src="https://image.tmdb.org/t/p/w92[POSTER-PATH]" alt="">
     <p class="play-trailer-txt">Play Trailer</p>
     <svg width="14px" class="play-icon"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.18 93.81"><path d="M78.64,37.3l-62-35.8A11.09,11.09,0,0,0,0,11.1V82.71A11.08,11.08,0,0,0,16.63,92.3l62-35.8A11.09,11.09,0,0,0,78.64,37.3Z"/></svg>
   </div>
 </div>
</div>`;
}
