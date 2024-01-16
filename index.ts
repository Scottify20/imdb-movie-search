import { animateSearchBtn } from './src/view/animations/animations';

import {
  GeneralTitleSearch,
  SearchParamsObj,
  GeneralResultParsedTypes,
} from './src/model/GeneraTitleSearch';
import { ViewGeneralResults } from './src/view/ViewGeneralResults';

//---------fetching and viewing omdb search results-----------------
const cardGroupElementParent = document.querySelector('#card-group');
let GeneralSearchParamObj: SearchParamsObj = {
  s: '',
  page: '',
  type: '',
  y: '',
};

let previousGeneralSearchParamObj: SearchParamsObj = {
  s: 'none',
  page: 'none',
  type: '',
  y: 'none',
};

function checkSameObjectValues(object1: Object, object2: Object): boolean {
  const obj1Vals = Object.values(object1);
  const obj2Vals = Object.values(object2);
  if (obj1Vals.join('') === obj2Vals.join('')) {
    return true;
  } else {
    return false;
  }
}

let resultCopy: GeneralResultParsedTypes;

function searchAndRenderGeneral(): void {
  if (
    checkSameObjectValues(previousGeneralSearchParamObj, GeneralSearchParamObj)
  ) {
    if (cardGroupElementParent) {
      console.log('Reloading previous query');
      ViewGeneralResults.renderResult(cardGroupElementParent, resultCopy);
    }
  } else {
    previousGeneralSearchParamObj = { ...GeneralSearchParamObj };
    GeneralTitleSearch.search(GeneralSearchParamObj)
      .then((result) => {
        console.log(result);
        resultCopy = JSON.parse(JSON.stringify(result));
        if (cardGroupElementParent) {
          ViewGeneralResults.renderResult(cardGroupElementParent, result);
        } else {
          console.log('Selected card parent does not exist');
        }
      })
      .catch(() => {
        console.log('Error on search');
      });
  }
}

// -------------Search Bar submit and typing actions----------------
const searchBarForm = document.querySelector(
  '.nav__search-bar-container'
) as HTMLFormElement;

const searchBar = document.querySelector('#nav-search-bar') as HTMLInputElement;

const searchButton = document.querySelector(
  '#nav__search-bar-submit-btn'
) as HTMLInputElement;

searchButton.style.pointerEvents = 'none';

searchBar.addEventListener('mouseenter', () => {
  if (searchBar.value.length >= 3) {
    searchButton.style.pointerEvents = 'auto';
  } else {
    searchButton.style.pointerEvents = 'none';
  }
});

searchBarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (searchBar.value.length >= 3) {
    GeneralSearchParamObj.s = searchBar.value;
    searchAndRenderGeneral();
  } else {
    console.log('Search query must be at least 3 characters');
  }
});

animateSearchBtn();

//---- Header-navbar hide on scroll down and show on scroll up-------
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
