import { TitleDetailsRenderer } from '../title_details/TitleDetailsRenderer';

const bodyScrollLock = require('body-scroll-lock-upgrade');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

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
    const backButton = document.getElementById('exit-search-results-container-btn') as HTMLElement;

    // event listener for back button
    backButton.addEventListener('click', () => {
      this.searchResultsContainer.classList.remove('shown');
      this.searchResultsContainer.classList.add('hidden');
      this.bodyScrollToggler('unlock');

      enableBodyScroll(this.searchResultsContainer);
    });

    // event listener for search button
    this.searchButton.addEventListener('click', () => {
      this.searchResultsContainer.classList.remove('hidden');
      this.searchResultsContainer.classList.add('shown');
      const searchBox = document.getElementById('nav-search-bar') as HTMLInputElement;
      searchBox.focus();
      this.bodyScrollToggler('lock');
      disableBodyScroll(this.searchResultsContainer);
    });
  }

  private static bodyScrollToggler(mode: string) {
    // mode === lock | unlock
    if (mode === 'lock') {
      disableBodyScroll(this.searchResultsContainer);
      document.body.classList.add('scroll-disabled');
    } else if (mode === 'unlock') {
      enableBodyScroll(this.searchResultsContainer);
      document.body.classList.remove('scroll-disabled');
    }
  }
}
