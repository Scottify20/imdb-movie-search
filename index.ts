import { animateSearchBtn } from './src/components/ts/animations/animations';
import {
  GeneralTitleSearch,
  SearchParamsObj,
  GeneralResultParsedTypes,
} from './src/omdb/model/GeneraTitleSearch';
import { ViewGeneralResults } from './src/omdb/view/ViewGeneralResults';

// search button animation
animateSearchBtn();

// mobile sidebar menu toggle
const mobileMenuToggle = document.querySelector(
  '#nav__mobile-menu-sidebar-cb-toggle'
) as HTMLInputElement;

const mobileMenu = document.querySelector('#nav__mobile-menu');
const mobileMenuContainer = document.querySelector('#nav__mobile-menu-container');

mobileMenuToggle?.addEventListener('change', (event) => {
  const toggle = event.target as HTMLInputElement;
  if (toggle.checked) {
    mobileMenuContainer?.classList.add('shown');
  } else {
    mobileMenuContainer?.classList.remove('shown');
  }
});

// click outside of mobile menu bar toggle

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  if (!mobileMenu?.contains(target) && target.id !== 'nav__mobile-menu-sidebar-cb-toggle') {
    mobileMenuToggle.checked = false;
    mobileMenuContainer?.classList.remove('shown');
  }
});

// click mobile menu close button

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.id == 'nav__mobile-menu-close-button') {
    mobileMenuToggle.checked = false;
    mobileMenuContainer?.classList.remove('shown');
  }
});

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
      console.log('yes');
      footerObserver.unobserve(footer);
      seeMoreResults();
    } else {
      console.log('no');
    }
  },
  { rootMargin: '700px' }
);
//--------Intersection Observer for infinite scrolling of cards--------

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

//--Header-navbar hide on scroll down and show on scroll up---
const body = document.body;
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    body.classList.remove('scroll-up');
  }
  if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-up');
    body.classList.add('scroll-down');
  }
  if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-down');
    body.classList.add('scroll-up');
  }

  if (currentScroll) lastScroll = currentScroll;
});

// Unchecking checkbox linkstoggle on other cards when a checkbox linkstoggle is checked
(function checkBoxLinksToggled() {
  cardGroupElementParent?.addEventListener('change', (event) => {
    const clickedELement = event.target as HTMLInputElement;

    if (
      clickedELement.type === 'checkbox' &&
      clickedELement.className === 'toggle-links-for-no-hover'
    ) {
      const checkBoxes = Array.from(
        cardGroupElementParent.querySelectorAll('.toggle-links-for-no-hover')
      ) as HTMLInputElement[];

      for (const cb of checkBoxes) {
        if (cb.id !== clickedELement.id) {
          cb.checked = false;
        }
      }
    }
  });
})();
