import { animateSearchBtn } from './src/view/animations/animations';

import {
  GeneralTitleSearch,
  SearchParamsObj,
  GeneralResultParsedTypes,
} from './src/model/GeneraTitleSearch';
import { ViewGeneralResults } from './src/view/ViewGeneralResults';

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
//---------------------------------------------------

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
      const view = new ViewGeneralResults(cardGroupElementParent, resultCopy);
      view.renderResult();
    }
  } else {
    previousGeneralSearchParamObj = { ...GeneralSearchParamObj };
    GeneralTitleSearch.search(GeneralSearchParamObj)
      .then((result) => {
        console.log(result);
        resultCopy = JSON.parse(JSON.stringify(result));
        if (cardGroupElementParent) {
          const view = new ViewGeneralResults(cardGroupElementParent, result);
          view.renderResult();
        } else {
          console.log('Selected card parent does not exist');
        }
      })
      .catch(() => {
        console.log('Error on search');
      });
  }
}

// ----------------Search Bar----------------
const searchBarForm = document.querySelector(
  '.nav__search-bar-container'
) as HTMLFormElement;

const searchBar = document.querySelector('#nav-search-bar') as HTMLInputElement;

const searchButton = document.querySelector(
  '#nav__search-bar-search-icon'
) as HTMLInputElement;

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
