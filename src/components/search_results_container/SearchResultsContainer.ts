export class SearchResultsContainer {
  constructor(isOn: boolean) {
    if (isOn) {
      SearchResultsContainer.startSearchResultsContainerController();
    }
  }

  public static get isShown(): boolean {
    return this.searchResultsContainer.classList.contains('shown');
  }

  public static searchResultsContainer = document.getElementById(
    'search-results-container'
  ) as HTMLElement;

  private static navSearchBar = document.getElementById('nav-search-bar') as HTMLInputElement;

  private static searchButton = document.getElementById('search-btn') as HTMLElement;

  private static startSearchResultsContainerController() {
    const searchBar = document.getElementById('nav-search-bar');
    const backButton = document.getElementById('exit-search-results-container-btn') as HTMLElement;

    // event listener for back button
    backButton.addEventListener('click', () => {
      this.searchResultsContainer.classList.remove('shown');
      this.searchResultsContainer.classList.add('hidden');
      this.bodyScrollToggler('unlock');
    });

    // event listener for search button
    this.searchButton.addEventListener('click', () => {
      this.bodyScrollToggler('lock');
      this.searchResultsContainer.classList.remove('hidden');
      this.searchResultsContainer.classList.add('shown');
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
