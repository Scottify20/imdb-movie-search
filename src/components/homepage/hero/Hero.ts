export class Hero {
  private static IsOn = false;

  constructor(isOn: boolean) {
    Hero.IsOn = isOn;

    if (Hero.IsOn) {
      Hero.render();
    }
  }

  private static heroPage: number = 0; // 0 to 4 hero cards/pages
  private static pageIndicators: HTMLElement[] = Array.from(
    document.querySelectorAll('.homepage-hero__indicator')
  );

  private static heroCards: HTMLElement[] = Array.from(
    document.querySelectorAll('.homepage-hero-hero')
  );

  private static render() {
    this.startScrollButtonsController();
    this.startPageIndicatorObserver();
  }

  // private static setPageIndicator() {
  //   this.pageIndicators.forEach((indicator) => {
  //     indicator.classList.remove('active');
  //   });
  //   this.pageIndicators[this.heroPage].classList.add('active');
  // }

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

    this.heroCards.forEach(
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
}
