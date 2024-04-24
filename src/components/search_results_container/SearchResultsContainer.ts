export class SearchResultsContainer {
  constructor(isOn: boolean) {
    if (isOn) {
      SearchResultsContainer.startSearchResultsContainerController();
    }
  }

  public static searchResultsContainer = document.getElementById(
    'search-results-container'
  ) as HTMLElement;

  private static startSearchResultsContainerController() {
    const searchBar = document.getElementById('nav-search-bar');
    const backButton = document.getElementById('exit-search-results-container-btn') as HTMLElement;

    const navItemsIdToHide = [
      'nav__hamburger-menu-container',
      'home-logo-btn',
      'favourites-btn',
      'github-src-btn',
    ];

    // focused
    searchBar?.addEventListener('focus', () => {
      backButton;
      this.searchResultsContainer.classList.remove('hidden');
      backButton.classList.remove('hidden');
      this.bodyScrollToggler('lock');

      // searchBar.classList.add('expanded');
      navItemsIdToHide.forEach((id) => {
        document.getElementById(id)?.classList.add('nav__items-hidden-on-search-bar-focus');
      });
    });

    // event listener for back button
    backButton.addEventListener('click', () => {
      this.searchResultsContainer.classList.add('hidden');
      backButton.classList.add('hidden');
      this.bodyScrollToggler('unlock');

      navItemsIdToHide.forEach((id) => {
        document.getElementById(id)?.classList.remove('nav__items-hidden-on-search-bar-focus');
      });
    });

    // // test event listener for blur

    // searchBar?.addEventListener('blur', () => {
    //   searchResultsContainer.classList.add('hidden');

    //   // searchBar.classList.add('shrinked');

    //   navItemsIdToHide.forEach((id) => {
    //     document.getElementById(id)?.classList.remove('nav__items-hidden-on-search-bar-focus');
    //   });
    // });
  }

  private static bodyScrollToggler(mode: string) {
    // mode === lock | unlock
    if (mode === 'lock') {
      document.body.classList.add('scroll-disabled');
    } else if (mode === 'unlock') {
      document.body.classList.remove('scroll-disabled');
    }
  }
}
