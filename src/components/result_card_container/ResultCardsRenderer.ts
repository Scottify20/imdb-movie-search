import { GeneralResultParsedTypes } from '../../omdb/OmdbGeneralSearch';
import { TitleDetailsRenderer } from '../title_details/TitleDetailsRenderer';

export class ViewGeneralResults {
  constructor(public parentElement: Element, public generalResult: GeneralResultParsedTypes) {}

  static renderResults(parentElement: Element, result: GeneralResultParsedTypes) {
    return new ViewGeneralResults(parentElement, result).processRender();
  }

  processRender(): void {
    if (this.generalResult?.pageNumber) {
      const parent = this.parentElement;
      const page = this.generalResult?.pageNumber as number;

      if (page <= 1) {
        parent.innerHTML = '';
      }
      parent.append(this.bindResults().content);
    }
  }

  static addViewTitleButtonListeners() {
    document.addEventListener('click', (event) => {
      const target = event.target as Element;

      if (target.classList.contains('view-details-btn')) {
        TitleDetailsRenderer.viewTitle(target.id);
      }
    });
  }

  static addViewTitleViaTitleClickListener() {
    document.addEventListener('click', (event) => {
      const target = event.target as Element;

      if (target.classList.contains('card__title-text')) {
        TitleDetailsRenderer.viewTitle(target.id);
      }
    });
  }

  bindResults(): HTMLTemplateElement {
    const result = this.generalResult;

    let templateElement = document.createElement('template');
    if (result) {
      // No more results
      // No results found
      if (result.Error === 'No more results found!') {
        templateElement.innerHTML = this.templateLastPageWarning;
      } else if (result.Error === 'Movie not found!') {
        templateElement.innerHTML = this.templateNoResults;
      }
      // If too many results found
      else if (result.Error === 'Too many results.') {
        templateElement.innerHTML = this.templateTooManyResultsError;
      }
      // If results found
      else if (result.Search && result.Search[0] != undefined) {
        templateElement = this.bindTemplateCardResultsSuccess(templateElement);
      }
      // If there are other errors sent by Omdb API //Fallback
      else if (result.Error !== 'No Error') {
        templateElement.innerHTML = this.templateFallbacktoServerMessageError;
      }
    } else {
      // if this.generalResult is undefined (fetch error)
      templateElement.innerHTML = this.templateFetchCodeError;
      console.log('Fetch code Error');
    }
    return templateElement;
  }

  yearArraytoString(yearArray: number[]): string {
    let yearString = yearArray.join(' - ');
    return yearString;
  }

  bindTemplateCardResultsSuccess(templateElement: HTMLTemplateElement): HTMLTemplateElement {
    const cardTemplateElement = templateElement;

    this.generalResult?.Search?.forEach((film) => {
      // if poster url is N/A, it will not be appended and not rendered
      if (film.Poster === 'N/A') {
        /* do nothing */
      } else {
        const cardTemplate = document.createElement('template');
        cardTemplate.innerHTML = this.templateCardResultsSuccess;

        const filmCardParent = cardTemplate.content.querySelector('article.card');
        const filmTitle = cardTemplate.content.querySelector('.card__title-text');
        const filmYear = cardTemplate.content.querySelector('.card__tag-year-text');
        const filmType = cardTemplate.content.querySelector('.card__tag-media-type-text');
        const filmPoster = cardTemplate.content.querySelector('.card__thumb') as HTMLImageElement;
        const openImdbBtn = cardTemplate.content.querySelector('.visit-imdb-btn');
        const viewTitleButton = cardTemplate.content.querySelector('.view-details-btn');
        const linksMenuCBToggle = cardTemplate.content.querySelector('.toggle-links-for-no-hover');

        if (filmCardParent && filmTitle && filmYear && filmType) {
          filmCardParent.setAttribute('id', `card-${film.imdbID}`);
          filmTitle.textContent = film.Title;
          filmYear.textContent = this.yearArraytoString(film.Year);
          filmType.textContent = film.Type;
        }

        if (film.Poster) {
          filmPoster?.setAttribute(
            'onerror',
            `this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';`
          );
          filmPoster?.setAttribute('src', film.Poster);
          filmPoster?.setAttribute('parent-card-id', `card-${film.imdbID}`);
        }

        // if there was an error in getting the image
        // the parent element will be set to "display: none" using the ".card.image-error" selector
        filmPoster.addEventListener('error', (event) => {
          const target = event.target as HTMLImageElement;
          const parentId = target.getAttribute('parent-card-id') as string;
          const parentElement = document.getElementById(parentId);
          parentElement?.classList.add('image-error');
        });

        openImdbBtn?.setAttribute(
          'onclick',
          `window.open(
            'https://imdb.com/title/${film.imdbID}/',
            '_blank'
            );`
        );

        // set unique ids for checkboxes for toggling links
        if (linksMenuCBToggle) {
          linksMenuCBToggle.setAttribute('id', `cb-menu-toggle-${film.imdbID}`);
        }

        // set id of view title button to imdb id
        viewTitleButton?.setAttribute('id', film.imdbID);
        // set id of title to imdb id
        filmTitle?.setAttribute('id', film.imdbID);

        cardTemplateElement.content.append(cardTemplate.content);
      }
    });
    return cardTemplateElement;
  }

  templateLastPageWarning: string = /*html*/ `
  <div class="no-more-results search-error-container error-fetching-general-results">
    <h2 class="search-error-title">That's all for:</h2>
    <p class="search-error-desc"> ${this.generalResult?.searchQuery}<p>
  </div>
  `;

  templateFallbacktoServerMessageError: string = /*html*/ `
  <div class="search-error-container error-fetching-general-results">
    <h2 class="search-error-title">Failed to fetch data</h2>
    <p class="search-error-desc"> ${this.generalResult!.Error}<p>
  </div>`;

  templateTooManyResultsError: string = /*html*/ `
  <div class="search-error-container error-too-many-results">
    <h2 class="search-error-title">Too many results.</h2>
    <p class="search-error-desc">Please be more specific.<p>
  </div>`;

  templateFetchCodeError: string = /*html*/ `
  <div class="search-error-container error-fetch-code-error">
    <h2 class="search-error-title">A Fetch API error has occurred.</h2>
    <p class="search-error-desc">Please notify: 'Scottify20'about this error.</p>
  </div>`;

  templateNoResults: string = /*html*/ `
  <div class="search-error-container error-no-results">
    <h2 class="search-error-title">No results found for:</h2>
    <p class="search-error-desc">${this.generalResult?.searchQuery}</p>
  </div>`;

  templateCardResultsSuccess: string = /*html*/ `
  <article class="card search-result-card" tabindex="0">
  <div class="card__thumb-and-links-container cursor--pointer">
    <input
      type="checkbox"
      name="card-links-toggle"
      class="toggle-links-for-no-hover"
    />
    <div class="card__link-buttons-container">
      <button id="" class="view-details-btn cursor--pointer">
        View Details
      </button>
      <button id="" class="visit-imdb-btn cursor--pointer">
        View in
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
          alt="imdb-logo"
          class="imdb-logo"
          height="20px"
        />
      </button>
    </div>
    <img
      alt="movie thumbnail"
      class="card__thumb"
      width="100px"
    />
  </div>

  <div class="card__details-container">
    <h2 class="card__title">
      <span
        class="card__title-text medium-text cursor--pointer hover--underline .active--underline"
        >Film Title</span
      >
    </h2>

    <div class="card__tags-container">
      <div class="card__tag-year card__tag">
        <p class="card__tag-text card__tag-year-text">Year</p>
      </div>
      <div class="card__tag-media-type card__tag">
        <p class="card__tag-text card__tag-media-type-text">Type</p>
      </div>
    </div>
  </div>
</article>`;
}
