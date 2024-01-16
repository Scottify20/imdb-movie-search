import { GeneralResultParsedTypes } from '../model/GeneraTitleSearch';

export class ViewGeneralResults {
  constructor(
    public parentElement: Element,
    public generalResult: GeneralResultParsedTypes
  ) {}

  static renderResult(
    parentElement: Element,
    result: GeneralResultParsedTypes
  ) {
    return new ViewGeneralResults(parentElement, result).processRender();
  }

  processRender(): void {
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.bindResults().content);
  }

  yearArraytoString(yearArray: number[]): string {
    let yearString = yearArray.join(' - ');
    return yearString;
  }

  bindResults(): HTMLTemplateElement {
    let templateElement = document.createElement('template');
    if (this.generalResult) {
      if (this.generalResult.Error === 'Movie not found!') {
        templateElement.innerHTML = this.templateNoResults;
      }
      if (this.generalResult.Search) {
        templateElement = this.bindTemplateCardResultsSuccess(templateElement);
      } else if (this.generalResult.Error !== 'No Error') {
        templateElement.innerHTML = this.templateFallbacktoServerMessageError;
      }
    } else {
      // if this.generalResult is undefined (fetch error)
      templateElement.innerHTML = this.templateFetchCodeError;
      console.log('Fetch code Error');
    }
    return templateElement;
  }

  bindTemplateCardResultsSuccess(
    templateElement: HTMLTemplateElement
  ): HTMLTemplateElement {
    const cardTemplateElement = templateElement;

    this.generalResult?.Search?.forEach((film) => {
      const cardTemplate = document.createElement('template');
      cardTemplate.innerHTML = this.templateCardResultsSuccess;

      const filmCardParent = cardTemplate.content.querySelector('article.card');
      const filmTitle = cardTemplate.content.querySelector('.card__title-text');
      const filmYear = cardTemplate.content.querySelector(
        '.card__tag-year-text'
      );
      const filmType = cardTemplate.content.querySelector(
        '.card__tag-media-type-text'
      );
      const filmPoster = cardTemplate.content.querySelector('.card__thumb');
      const openImdbBtn = cardTemplate.content.querySelector('.visit-imdb-btn');
      const linksMenuCBToggle = cardTemplate.content.querySelector(
        '.toggle-links-for-no-hover'
      );

      if (filmCardParent && filmTitle && filmYear && filmType) {
        filmCardParent.setAttribute('id', `card-${film.imdbID}`);
        filmTitle.textContent = film.Title;
        filmYear.textContent = this.yearArraytoString(film.Year);
        filmType.textContent = film.Type;
      }

      if (film.Poster) {
        filmPoster?.setAttribute(
          'onerror',
          `this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'`
        );

        filmPoster?.setAttribute('src', film.Poster);
      }

      openImdbBtn?.setAttribute(
        'onclick',
        `window.open(
          'https://imdb.com/title/${film.imdbID}/',
          '_blank'
          );`
      );

      if (linksMenuCBToggle) {
        linksMenuCBToggle.setAttribute('id', `cb-menu-toggle-${film.imdbID}`);
      }

      cardTemplateElement.content.append(cardTemplate.content);
    });
    return cardTemplateElement;
  }

  templateFallbacktoServerMessageError: string = `
  <div class="error-fetching-general-results">
  <h2>Error Fetching Data from OMDB Api</h2>
  <p>Error Message from the Server: ${this.generalResult!.Error}<p>
  <div>`;

  templateFetchCodeError: string = `
  <h1>A Fetch API error has occurred</h1>
  <p>Please notify the author: 'Scottify20'about this error</p>`;

  templateNoResults: string = `
  <p class="no-results-found-general">No results found for: ${this.generalResult?.searchQuery}</p>`;

  templateCardResultsSuccess: string = `
  <article class="card" tabindex="0">
  <div class="card__thumb-and-links-container cursor--pointer">
    <input
      type="radio"
      name="card-links-toggle"
      class="toggle-links-for-no-hover"
    />
    <div class="card__link-buttons-container">
      <button id="" class="view-content-btn cursor--pointer">
        View Details
      </button>
      <button id="" class="visit-imdb-btn cursor--pointer">
        Go to
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
        class="card__title-text medium-text cursor--pointer hover--underline"
        >Film Title</span
      >
    </h2>

    <div class="card__tags-container">
      <div class="card__tag-year card__tag cursor--pointer">
        <p class="card__tag-text card__tag-year-text">Year</p>
      </div>
      <div class="card__tag-media-type card__tag cursor--pointer">
        <p class="card__tag-text card__tag-media-type-text">Type</p>
      </div>
    </div>
  </div>
</article>`;
}
