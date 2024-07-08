import { SvgStrings } from '../../assets/svg-strings/SvgStrings';

export class Snackbar {
  constructor(messageTitle: string, messageDescription: string, timeoutInMS: number = 8000) {
    this.show(messageTitle, timeoutInMS, messageDescription);
  }

  private insertSnackbarsContainer(): HTMLElement {
    if (!document.getElementById('snackbars-container')) {
      document.body.insertAdjacentHTML('beforeend', this.templateSnackBarsContainer);
    }

    const snackbarsContainer = document.getElementById('snackbars-container') as HTMLDialogElement;
    snackbarsContainer.show();
    return document.getElementById('snackbars-subcontainer') as HTMLElement;
  }

  private show(messageTitle: string, timeoutInMS: number, messageDescription: string) {
    const idNumber = (Math.random() * 1000000).toFixed().toString();

    let bindedTemplate = String(this.templateSnackbar);
    bindedTemplate = bindedTemplate
      .replace('[ID-NUMBER]', idNumber)
      .replace('[TITLE]', messageTitle);
    if (messageDescription !== '') {
      bindedTemplate = bindedTemplate.replace('[DESC]', messageDescription);
    } else {
      bindedTemplate = bindedTemplate.replace('<p class="snackbar__description">[DESC]</p>', '');
    }

    const snackbarsContainer = this.insertSnackbarsContainer();
    snackbarsContainer.insertAdjacentHTML('afterbegin', bindedTemplate);
    this.hideSnackBarAfterTimeout(timeoutInMS, idNumber);
  }

  private hideSnackBarAfterTimeout(timeoutInMS: number, idNumber: string) {
    const id = `snackbar-${idNumber}`;
    const snackbar = document.getElementById(id) as HTMLDialogElement;
    snackbar.show();
    snackbar?.classList.add('shown');

    this.closeButtonListener(id);

    setTimeout(() => {
      snackbar?.classList.remove('shown');
      snackbar?.classList.add('hidden');
    }, timeoutInMS - 500);

    setTimeout(() => {
      snackbar?.remove();
    }, timeoutInMS);
  }

  private closeButtonListener(snackbarId: string) {
    const snackbar = document.getElementById(snackbarId);
    const closeButton = snackbar?.querySelector('.snackbar__close-btn');

    closeButton?.addEventListener('click', () => {
      snackbar?.classList.remove('shown');
      snackbar?.classList.add('hidden');

      setTimeout(() => {
        snackbar?.remove();
      }, 500);
    });
  }

  private templateSnackbar = /*html*/ `
  <dialog class="snackbar" id="snackbar-[ID-NUMBER]">
    <h4 class="snackbar__title" >[TITLE]</h4>
    <div class=snackbar__close-btn>${SvgStrings.closeIconThin}</div>
    <p class="snackbar__description">[DESC]</p>
  </dialog>
  `;

  private templateSnackBarsContainer = /*html*/ `
  <dialog class="snackbars-container" id="snackbars-container">
    <div class="snackbars-subcontainer" id="snackbars-subcontainer"></div>
  </dialog>
  `;
}
