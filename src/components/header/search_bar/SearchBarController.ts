import {
  GeneralResultParsedTypes,
  GeneralTitleSearch,
  OmdbSearchTitleTypes,
} from '../../../utils/omdb/OmdbGeneralSearch';

import { ResultCardsRenderer } from '../../search_results_container/result_card_container/ResultCardsRenderer';
import { Snackbar } from '../../snackbar/SnackBar';

export class SearchBarController {
  constructor(isOn: boolean) {
    if (isOn) {
      SearchBarController.startSearchBar();
    }
  }
  private static cardGroupElement = document.getElementById('card-group') as Element;

  private static startSearchBar() {
    const searchBarFormContainer = document.querySelector(
      '.nav__search-bar-container'
    ) as HTMLFormElement;

    const searchBar = document.querySelector('#nav-search-bar') as HTMLInputElement;

    searchBarFormContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      if (searchBar.value === GeneralTitleSearch.titleName) {
        return;
      }

      GeneralTitleSearch.isNoMorePages = false;
      if (searchBar.value.length >= 3) {
        GeneralTitleSearch.titleName = searchBar.value;
        this.searchAndRender();
      } else {
        console.log('Search query must be at least 3 characters');
      }
    });
  }

  public static async searchAndRender() {
    if (GeneralTitleSearch.isNoMorePages) {
      Observer.unobserve();
      const noMorePagesResult: GeneralResultParsedTypes = {
        Response: 'True',
        Error: 'No more results found!',
        pageNumber: 10000,
        searchQuery: GeneralTitleSearch.titleName,
      };
      ResultCardsRenderer.renderResults(this.cardGroupElement, noMorePagesResult);
      return;
    }

    if (!GeneralTitleSearch.isRepeatedTitleQuery) {
      GeneralTitleSearch.page = 1;
      this.cardGroupElement.innerHTML = '';
    }

    const searchBox = document.getElementById('nav-search-bar') as HTMLInputElement;
    // unfocus the search bar
    searchBox.blur();

    LoadingAnimation.show();
    const searchResult = await GeneralTitleSearch.search();
    ResultCardsRenderer.renderResults(this.cardGroupElement, searchResult);
    Observer.observe();
    LoadingAnimation.hide();
  }

  static seeMoreResults() {
    if (GeneralTitleSearch.isMaxPageReached) {
      // console.log('max page reached');
      new Snackbar(
        'Max Page Reached',
        'Search results are limited to avoid hitting the OMDB API request limit'
      );
      Observer.unobserve();
      return;
    }
    GeneralTitleSearch.page += 1;
    this.searchAndRender();
  }
}

// Footer Observer // semi-Infinite scrolling
class Observer {
  private static elementToObserve = document.querySelector('.intesection-observee') as Element;

  static footerObserver = new IntersectionObserver(
    (entries) => {
      const footerEntry = entries[0];
      if (footerEntry.isIntersecting && GeneralTitleSearch.resultCopy?.Error === 'No Error') {
        // console.log('intersecting');
        this.footerObserver.unobserve(this.elementToObserve);
        SearchBarController.seeMoreResults();
      } else {
        // console.log('not intersecting');
      }
    },
    { rootMargin: '1000px' }
  );

  public static observe() {
    this.footerObserver.observe(this.elementToObserve);
  }
  public static unobserve() {
    this.footerObserver.unobserve(this.elementToObserve);
  }
}

// Searchbar Filtering
class SearchFilter {
  public static setPage(pageNumber: number) {
    GeneralTitleSearch.page = pageNumber;
  }
  public static setType(type: OmdbSearchTitleTypes) {
    GeneralTitleSearch.type = type;
  }
  public static setYear(year: string) {
    GeneralTitleSearch.year = year;
  }
}

// Loading Animation
class LoadingAnimation {
  private static loader = document.querySelector('div#loading');

  public static show() {
    this.loader?.classList.add('visible');
  }
  public static hide() {
    this.loader?.classList.remove('visible');
  }
}
