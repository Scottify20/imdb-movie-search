import { insertHTMLInsideElementById } from '../../../utils/GlobalUtils';
import { TmdbMovieResult } from '../../../utils/tmdb/TmdbFetchTrending';
import { TmdbMovieGenreIds } from '../../../utils/tmdb/TmdbFetch';

export class Hero {
  private static IsOn = false;
  private static MovieList: TmdbMovieResult[] = [
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
        .replace('[POSTER-ALT]', `${movie.title}'s poster image`)
        .replace('[BACKDROP-PATH]', movie.backdrop_path)
        .replace('[BACKDROP-ALT]', `${movie.title}'s backdrop image`);

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
   <button id="homepage-hero__scroll-left-btn" class="homepage-hero__scroll-button homepage-hero__scroll-left-btn">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7.44">
       <path id="arrow_down_expanded" data-name="arrow down expanded" class="cls-1" d="M6.44,7.44a1,1,0,0,1-.71-.29L.29,1.71A1,1,0,0,1,1.71.29L6.45,5,11.3.29a1,1,0,1,1,1.4,1.42L7.14,7.16A1,1,0,0,1,6.44,7.44Z"/>
     </svg></button>

   <button id="homepage-hero__scroll-right-btn" class="homepage-hero__scroll-button homepage-hero__scroll-right-btn">
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
     src="https://image.tmdb.org/t/p/w154[POSTER-PATH]"
     alt=""
   />
   <h4 class="homepage-hero__title">[TITLE]</h4>
   <p class="homepage-hero__year-and-genre"><span class="homepage-hero__year">[YEAR]<span> • <span class="homepage-hero__genre">[GENRE]</span></p>
   <div class="homepage-hero__play-trailer-btn">
     <img class="play-trailer-button-img-bg" src="https://image.tmdb.org/t/p/w92[POSTER-PATH]" alt="[POSTER-ALT]">
     <p class="play-trailer-txt">Play Trailer</p>
     <svg width="14px" class="play-icon"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.18 93.81"><path d="M78.64,37.3l-62-35.8A11.09,11.09,0,0,0,0,11.1V82.71A11.08,11.08,0,0,0,16.63,92.3l62-35.8A11.09,11.09,0,0,0,78.64,37.3Z"/></g></g></svg>
   </div>
 </div>
</div>`;
}
