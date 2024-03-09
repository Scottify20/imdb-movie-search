import { GeneralResultParsedTypes, GeneralTitleSearch } from '../../omdb/OmdbGeneralSearch';
import { SearchBarController } from '../header/search_bar/SearchBarController';
import { TitleDetailsRenderer } from '../title_details/TitleDetailsRenderer';

export class ResultCardsRenderer {
  private static _parentElement: Element;
  private static _generalResult: GeneralResultParsedTypes;

  static renderResults(parentElement: Element, result: GeneralResultParsedTypes) {
    this._parentElement = parentElement;
    this._generalResult = result;
    this.processRender();
  }

  private static processRender(): void {
    if (this._generalResult?.pageNumber) {
      const parent = this._parentElement;
      const page = this._generalResult?.pageNumber as number;
      if (page <= 1) {
        parent.innerHTML = '';
        window.scrollTo(0, 0);
      }

      parent.append(this.bindResults().content);
      if (this._generalResult.Error === "Can't connect to server.") {
        this.retrySearchButtonListener();
      }
    }
  }

  private static bindResults(): HTMLTemplateElement {
    const result = this._generalResult;

    let templateElement = document.createElement('template');
    if (result) {
      // No more results
      if (result.Error === 'No more results found!') {
        templateElement.innerHTML = this.templateLastPageWarning;
      }
      // No results found
      else if (result.Error === 'Movie not found!') {
        templateElement.innerHTML = this.templateNoResults;
      }
      // If too many results found
      else if (result.Error === 'Too many results.') {
        templateElement.innerHTML = this.templateTooManyResultsError;
      }
      // if can't connect to server
      else if (result.Error === "Can't connect to server.") {
        templateElement.innerHTML = this.templateCantConnectToServer;
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

  private static yearArraytoString(yearArray: number[]): string {
    let yearString = yearArray.join(' - ');
    return yearString;
  }

  private static bindTemplateCardResultsSuccess(
    templateElement: HTMLTemplateElement
  ): HTMLTemplateElement {
    const cardTemplateElement = templateElement;

    this._generalResult?.Search?.forEach((film) => {
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
        const filmPoster = cardTemplate.content.querySelector('.card__poster') as HTMLImageElement;

        if (filmCardParent && filmTitle && filmYear && filmType) {
          filmCardParent.setAttribute('id', `card-${film.imdbID}`);
          filmTitle.textContent = film.Title;
          filmTitle.addEventListener('click', (event) => {
            const target = event.target as Element;
            TitleDetailsRenderer.viewTitle(target.id);
          });
          filmYear.textContent = this.yearArraytoString(film.Year);
          filmType.textContent = film.Type;
        }

        if (film.Poster) {
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

        // for viewing the title details the imdb id is sent to TitleDetailsRenderer.viewTitle()
        filmPoster.addEventListener('click', (event) => {
          TitleDetailsRenderer.viewTitle(film.imdbID);
        });

        // set id of title to imdb id
        filmTitle?.setAttribute('id', film.imdbID);

        cardTemplateElement.content.append(cardTemplate.content);
      }
    });
    return cardTemplateElement;
  }

  private static retrySearchButtonListener() {
    const retryButton = document.getElementById('retry-search-button') as Element;
    const errorMessage = document.getElementById('cant-connect-to-server-container') as Element;
    retryButton.addEventListener('click', () => {
      errorMessage.remove();
      SearchBarController.searchAndRender();
    });
  }

  private static get templateCantConnectToServer(): string {
    return /*html*/ `
    <div class="search-error-container" id="cant-connect-to-server-container">
    <h2 class="search-error-title">Failed to fetch data</h2>
    <p class="search-error-desc"> ${this._generalResult?.Error}</p>
    <button id="retry-search-button" class="retry-search-button">Retry</button>
  </div>`;
  }

  private static get templateLastPageWarning(): string {
    return /*html*/ `
    <div class="no-more-results search-error-container error-fetching-general-results">
      <h2 class="search-error-title">That's all for:</h2>
      <p class="search-error-desc"> ${this._generalResult?.searchQuery}</p>
    </div>
    `;
  }

  private static get templateFallbacktoServerMessageError(): string {
    return /*html*/ `
  <div class="search-error-container error-fetching-general-results">
    <h2 class="search-error-title">Failed to fetch data</h2>
    <p class="search-error-desc"> ${this._generalResult?.Error}</p>
  </div>`;
  }

  private static get templateTooManyResultsError(): string {
    return /*html*/ `
  <div class="search-error-container error-too-many-results">
    <h2 class="search-error-title">Too many results.</h2>
    <p class="search-error-desc">Please be more specific.</p>
  </div>`;
  }

  private static get templateFetchCodeError(): string {
    return /*html*/ `
  <div class="search-error-container error-fetch-code-error">
    <h2 class="search-error-title">A Fetch API error has occurred.</h2>
    <p class="search-error-desc">Please notify: 'Scottify20' about this error.</p>
  </div>`;
  }

  private static get templateNoResults(): string {
    return /*html*/ `
  <div class="search-error-container error-no-results">
    <h2 class="search-error-title">No results found for:</h2>
    <p class="search-error-desc">${this._generalResult?.searchQuery}</p>
  </div>`;
  }

  private static get templateCardResultsSuccess(): string {
    return /*html*/ `
  <article class="card search-result-card" tabindex="0">
  <div class="card__poster-container cursor--pointer">
    <img
      alt="movie poster"
      class="card__poster"
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
}
