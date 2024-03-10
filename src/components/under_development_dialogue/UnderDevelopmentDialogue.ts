import { SvgStrings } from '../../assets/svg-strings/SvgStrings';

export class UnderDevelopmentDialogue {
  private static IsOn = false;

  constructor(isOn: boolean) {
    UnderDevelopmentDialogue.IsOn = isOn;
    UnderDevelopmentDialogue.initiatialize();
  }

  static initiatialize() {
    if (this.doNotShowDialogAgainOrInThisSessionIsTrue()) {
      return;
    }

    if (this.IsOn) {
      this.renderDialogAndBackdrop();
      this.cbAndProceedButtonListener();
    }
  }

  static renderDialogAndBackdrop() {
    document.body.classList.add('scroll-disabled');
    document.body.insertAdjacentHTML('afterbegin', this.dialogBackdropTemplate);
    document.body.insertAdjacentHTML('afterbegin', this.dialogTemplate);
  }

  static cbAndProceedButtonListener() {
    // console.log('listerner started');
    const proceedButton = document.getElementById('under-development__okay-button');
    proceedButton?.addEventListener('click', () => {
      // console.log('clicked');
      this.setDoNotShowDialogInSessionTrue();
      this.hideDialogAndBackdrop();
    });

    const doNotShowCB = document.getElementById('under-development__do-not-show-again-cb');
    doNotShowCB?.addEventListener('change', (event) => {
      const cb = event.target as HTMLInputElement;
      if (cb.checked === true) {
        this.setDoNotShowDialogToTrue();
      } else {
        this.reverseSetDoNotShowDialogToTrue();
      }
    });
  }

  static hideDialogAndBackdrop() {
    document.body.classList.remove('scroll-disabled');
    const dialogContainer = document.getElementById('under-development__container');
    const backdrop = document.getElementById('under-development__backdrop');

    dialogContainer?.remove();
    backdrop?.remove();
  }

  static doNotShowDialogAgainOrInThisSessionIsTrue(): boolean | undefined {
    let doNotShowDialogObjLocal: { doNotShowAgain: boolean } | undefined;
    let doNotShowDialogObjSession: { doNotShow: boolean } | undefined;

    try {
      doNotShowDialogObjLocal =
        JSON.parse(localStorage.getItem('doNotShowDialog') as string) || undefined;
    } catch {}

    try {
      doNotShowDialogObjSession = JSON.parse(
        sessionStorage.getItem('doNotShowDialogInThisSession') as string
      );
    } catch {}

    if (
      doNotShowDialogObjLocal?.doNotShowAgain === true ||
      doNotShowDialogObjSession?.doNotShow === true
    ) {
      return true;
    } else {
      return false;
    }
  }

  static setDoNotShowDialogInSessionTrue() {
    const doNotShowDialogObjSession = { doNotShow: true };
    sessionStorage.setItem(
      'doNotShowDialogInThisSession',
      JSON.stringify(doNotShowDialogObjSession)
    );
  }

  static setDoNotShowDialogToTrue() {
    const doNotShowDialogObjLocal = { doNotShowAgain: true };
    localStorage.setItem('doNotShowDialog', JSON.stringify(doNotShowDialogObjLocal));
  }

  static reverseSetDoNotShowDialogToTrue() {
    localStorage.removeItem('doNotShowDialog');
  }

  static dialogBackdropTemplate: string = `<div class="under_development__backdrop"></div>`;

  static dialogTemplate: string = /*html*/ `
  <div id="under-development__container" class="under-development__container">
    <div id="under-development__dialog" class="under-development__dialog">

      ${SvgStrings.warningBandTop}

      <h2 class="under-development__title">Website is Under Development</h2>
      <p class="under-development__description"><span class="nowrap">Not all of the features are enabled yet.</span><span class="nowrap"> And some of them might not work as expected.</span></p>
      <label class="under-development__do-not-show-again-label"><input type="checkbox" name="under-development__do-not-show-again-cb" id="under-development__do-not-show-again-cb" class="under-development__do-not-show-again-cb"> Do not show again</label>
      <button id="under-development__okay-button" class="under-development__okay-button">Proceed</button>

      ${SvgStrings.warningBandBottom}     

    </div>
    </div>
    <div id="under-development__backdrop" class="under-development__backdrop">
  </div>`;
}
