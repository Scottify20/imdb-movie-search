import { GeneralResultParsedTypes, SearchParamsObj, GeneralTitleSearch } from './OmdbGeneralSearch';

import { ViewGeneralResults } from '../components/result_card_container/ResultCardsRenderer';

export function OmdbSearchLogic(isOn: boolean) {
  if (isOn) {
    //---fetching and rendering omdb search results----
    const cardGroupElementParent = document.querySelector('#card-group');

    let generalSearchParamsObj: SearchParamsObj = {
      s: '',
      page: '1',
      type: '',
      y: '',
    };

    let previousGeneralSearchParamsObj: SearchParamsObj = {
      s: 'none',
      page: 'none',
      type: '',
      y: 'none',
    };

    let isSearching = false;
    function setIsSearching(setBoolean: boolean) {
      isSearching = setBoolean;
    }

    function checkSameObjectValues(object1: Object, object2: Object): boolean {
      const obj1Vals = Object.values(object1);
      const obj2Vals = Object.values(object2);
      if (obj1Vals.join('') === obj2Vals.join('')) {
        return true;
      }
      return false;
    }

    const loading = document.querySelector('div#loading');
    let resultCopy: GeneralResultParsedTypes;

    function searchAndRenderGeneral(): void {
      loading?.classList.add('visible');
      // checking if search query did not change
      if (checkSameObjectValues(previousGeneralSearchParamsObj, generalSearchParamsObj)) {
        if (cardGroupElementParent) {
          console.log('Reloading previous query');
          ViewGeneralResults.renderResults(cardGroupElementParent, resultCopy);
          // ViewGeneralResults.handleCardImageError();
          loading?.classList.remove('visible');
        }
      } else {
        // scroll back to top and clear results when searchQuery is changed
        if (generalSearchParamsObj.s !== previousGeneralSearchParamsObj.s) {
          if (cardGroupElementParent) {
            setIsSearching(true);
            cardGroupElementParent.innerHTML = '';
          }
          generalSearchParamsObj.page = '1';
          window.scroll({ top: 0, left: 0 });
        }

        previousGeneralSearchParamsObj = { ...generalSearchParamsObj };

        // check if last page----------------------
        if (resultCopy?.totalResults && cardGroupElementParent) {
          const totalRes = resultCopy.totalResults;
          const page = parseInt(generalSearchParamsObj.page);
          if (page > Math.ceil(totalRes / 10)) {
            const noMoreResults: GeneralResultParsedTypes = {
              Response: 'False',
              Error: 'No more results found!',
              pageNumber: page,
              searchQuery: generalSearchParamsObj.s,
            };

            ViewGeneralResults.renderResults(cardGroupElementParent, noMoreResults);
            // ViewGeneralResults.handleCardImageError();
            setIsSearching(false);
            loading?.classList.remove('visible');
            return;
          }
        }

        //---------------------------------------
        GeneralTitleSearch.search(generalSearchParamsObj)
          .then((result) => {
            // console.log(result);
            resultCopy = JSON.parse(JSON.stringify(result));
            if (cardGroupElementParent) {
              if (result && (!result.Error || result.Error === 'No Error')) {
                setIsSearching(true);
              } else {
                setIsSearching(false);
              }
              ViewGeneralResults.renderResults(cardGroupElementParent, result);
              // ViewGeneralResults.handleCardImageError();
              footerObserver.observe(footer);

              loading?.classList.remove('visible');
            } else {
              console.log('Selected card parent does not exist');
            }
          })
          .catch(() => {
            console.log('Error on search');
          });
      }
    }

    function seeMoreResults() {
      const maxPage = 5;

      let currentPage = parseInt(previousGeneralSearchParamsObj.page);
      currentPage += 1;
      generalSearchParamsObj.page = currentPage.toString();

      if (parseInt(previousGeneralSearchParamsObj.page) > maxPage) {
        console.log('max page reached');
        footerObserver.unobserve(footer);
      } else {
        searchAndRenderGeneral();
      }
    }

    //--------Intersection Observer for infinite scrolling of cards--------

    const footer = document.querySelector('#footer') as Element;

    const footerObserver = new IntersectionObserver(
      (entries) => {
        const footerEntry = entries[0];
        if (footerEntry.isIntersecting && isSearching) {
          // console.log('yes');
          footerObserver.unobserve(footer);
          seeMoreResults();
        } else {
          // console.log('no');
        }
      },
      { rootMargin: '700px' }
    );

    // ---Search Bar submit and typing actions--------
    const searchBarFormContainer = document.querySelector(
      '.nav__search-bar-container'
    ) as HTMLFormElement;
    const searchBar = document.querySelector('#nav-search-bar') as HTMLInputElement;

    searchBarFormContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      if (searchBar.value.length >= 3) {
        generalSearchParamsObj.s = searchBar.value;
        searchAndRenderGeneral();
      } else {
        console.log('Search query must be at least 3 characters');
      }
    });
  }
}
