export class SearchResultsContainer {
  constructor(isOn: boolean) {
    if (isOn) {
      SearchResultsContainer.startSearchResultsContainerController();
    }
  }

  public static get isShown(): boolean {
    return !this.searchResultsContainer.classList.contains('hidden');
  }

  public static searchResultsContainer = document.getElementById(
    'search-results-container'
  ) as HTMLElement;

  private static navSearchBar = document.getElementById('nav-search-bar') as HTMLInputElement;

  private static searchButton = document.getElementById(
    'nav__search-bar-submit-btn'
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
      this.searchResultsContainer.classList.remove('hidden');
      backButton.classList.remove('hidden');
      this.bodyScrollToggler('lock');
      this.navSearchBar.classList.add('expanded');

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
      this.navSearchBar?.classList.remove('expanded');
      this.navSearchBar?.classList.add('collapsed');

      navItemsIdToHide.forEach((id) => {
        document.getElementById(id)?.classList.remove('nav__items-hidden-on-search-bar-focus');
      });
    });

    // event listener for search button
    this.searchButton.addEventListener('click', () => {
      if (this.navSearchBar.value) {
        this.searchResultsContainer.classList.remove('hidden');
        backButton.classList.remove('hidden');
        this.bodyScrollToggler('lock');
        this.navSearchBar.classList.add('expanded');

        // searchBar.classList.add('expanded');
        navItemsIdToHide.forEach((id) => {
          document.getElementById(id)?.classList.add('nav__items-hidden-on-search-bar-focus');
        });
      }
    });
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
