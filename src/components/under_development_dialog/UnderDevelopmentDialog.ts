export class UnderDevelopmentDialog {
  private static IsOn = false;

  constructor(isOn: boolean) {
    UnderDevelopmentDialog.IsOn = isOn;
    UnderDevelopmentDialog.initiatialize();
  }

  static initiatialize() {
    if (UnderDevelopmentDialog.doNotShowDialogIsTrue()) {
      return;
    }

    if (UnderDevelopmentDialog.IsOn) {
      UnderDevelopmentDialog.renderDialogAndBackdrop();
      UnderDevelopmentDialog.cbAndProceedButtonListener();
    }
  }

  static renderDialogAndBackdrop() {
    document.body.classList.add('scroll-disabled');
    document.body.insertAdjacentHTML('afterbegin', UnderDevelopmentDialog.dialogBackdropTemplate);
    document.body.insertAdjacentHTML('afterbegin', UnderDevelopmentDialog.dialogTemplate);
  }

  static cbAndProceedButtonListener() {
    const proceedButton = document.getElementById('under-development__okay-button');
    proceedButton?.addEventListener('click', () => {
      UnderDevelopmentDialog.hideDialogAndBackdrop();
    });

    const doNotShowCB = document.getElementById('under-development__do-not-show-again-cb');
    doNotShowCB?.addEventListener('change', (event) => {
      const cb = event.target as HTMLInputElement;
      if (cb.checked === true) {
        UnderDevelopmentDialog.setDoNotShowDialogToTrue();
      } else {
        UnderDevelopmentDialog.reverseSetDoNotShowDialogToTrue();
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

  static doNotShowDialogIsTrue(): boolean | undefined {
    try {
      const doNotShowDialogObj = JSON.parse(localStorage.getItem('doNotShowDialog') as string);
      if (doNotShowDialogObj.doNotShowAgain === true) {
        return true;
      } else if (doNotShowDialogObj == undefined) {
        return false;
      }
    } catch {}
  }

  static setDoNotShowDialogToTrue() {
    const doNotShowDialogObj = { doNotShowAgain: true };
    localStorage.setItem('doNotShowDialog', JSON.stringify(doNotShowDialogObj));
  }

  static reverseSetDoNotShowDialogToTrue() {
    localStorage.removeItem('doNotShowDialog');
  }

  static dialogBackdropTemplate: string = `<div class="under_development__backdrop"></div>`;

  static dialogTemplate: string = `
  <div id="under-development__container" class="under-development__container">
    <div id="under-development__dialog" class="under-development__dialog">

            <svg class="warning-band warning-band--top" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="300 35 3600 170"><defs><style>.cls-1{fill:none;}.cls-2{fill:#0f0f0f;}.cls-3{clip-path:url(#clip-path);}.cls-4{clip-path:url(#clip-path-2);}.cls-5{fill:#d19620;}</style><clipPath id="clip-path" transform="translate(272.29 35.04)"><rect id="clip" class="cls-1" width="3644.11" height="206"/></clipPath><clipPath id="clip-path-2" transform="translate(272.29 35.04)"><rect class="cls-1" x="0.57" y="-35.04" width="3652.67" height="242.71"/></clipPath></defs><g id="Layer_2" data-name="Layer 2"><g id="band-top"><rect id="band-bg" class="cls-2" x="273.59" y="35.04" width="3642.81" height="206"/><g id="strips"><g class="cls-3"><g class="cls-4"><g id="_Grid_Repeat_" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="-129.34" y="-80.9" width="45.58" height="423.19" transform="translate(333.5 148.66) rotate(45)"/></g><g id="_Grid_Repeat_2" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="-4.95" y="-80.9" width="45.58" height="423.19" transform="translate(369.93 60.7) rotate(45)"/></g><g id="_Grid_Repeat_3" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="119.45" y="-80.9" width="45.58" height="423.19" transform="translate(406.37 -27.26) rotate(45)"/></g><g id="_Grid_Repeat_4" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="243.85" y="-80.9" width="45.58" height="423.19" transform="translate(442.8 -115.22) rotate(45)"/></g><g id="_Grid_Repeat_5" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="368.24" y="-80.9" width="45.58" height="423.19" transform="translate(479.24 -203.18) rotate(45)"/></g><g id="_Grid_Repeat_6" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="492.64" y="-80.9" width="45.58" height="423.19" transform="translate(515.67 -291.15) rotate(45)"/></g><g id="_Grid_Repeat_7" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="617.04" y="-80.9" width="45.58" height="423.19" transform="translate(552.11 -379.11) rotate(45)"/></g><g id="_Grid_Repeat_8" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="741.43" y="-80.9" width="45.58" height="423.19" transform="translate(588.54 -467.07) rotate(45)"/></g><g id="_Grid_Repeat_9" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="865.83" y="-80.9" width="45.58" height="423.19" transform="translate(624.98 -555.03) rotate(45)"/></g><g id="_Grid_Repeat_10" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="990.23" y="-80.9" width="45.58" height="423.19" transform="translate(661.41 -642.99) rotate(45)"/></g><g id="_Grid_Repeat_11" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1114.62" y="-80.9" width="45.58" height="423.19" transform="translate(697.85 -730.96) rotate(45)"/></g><g id="_Grid_Repeat_12" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1239.02" y="-80.9" width="45.58" height="423.19" transform="translate(734.28 -818.92) rotate(45)"/></g><g id="_Grid_Repeat_13" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1363.42" y="-80.9" width="45.58" height="423.19" transform="translate(770.72 -906.88) rotate(45)"/></g><g id="_Grid_Repeat_14" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1487.81" y="-80.9" width="45.58" height="423.19" transform="translate(807.15 -994.84) rotate(45)"/></g><g id="_Grid_Repeat_15" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1612.21" y="-80.9" width="45.58" height="423.19" transform="translate(843.59 -1082.8) rotate(45)"/></g><g id="_Grid_Repeat_16" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1736.61" y="-80.9" width="45.58" height="423.19" transform="translate(880.02 -1170.76) rotate(45)"/></g><g id="_Grid_Repeat_17" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1861" y="-80.9" width="45.58" height="423.19" transform="translate(916.46 -1258.73) rotate(45)"/></g><g id="_Grid_Repeat_18" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1985.4" y="-80.9" width="45.58" height="423.19" transform="translate(952.89 -1346.69) rotate(45)"/></g><g id="_Grid_Repeat_19" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2109.8" y="-80.9" width="45.58" height="423.19" transform="translate(989.33 -1434.65) rotate(45)"/></g><g id="_Grid_Repeat_20" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2234.19" y="-80.9" width="45.58" height="423.19" transform="translate(1025.76 -1522.61) rotate(45)"/></g><g id="_Grid_Repeat_21" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2358.59" y="-80.9" width="45.58" height="423.19" transform="translate(1062.2 -1610.57) rotate(45)"/></g><g id="_Grid_Repeat_22" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2482.99" y="-80.9" width="45.58" height="423.19" transform="translate(1098.63 -1698.53) rotate(45)"/></g><g id="_Grid_Repeat_23" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2607.38" y="-80.9" width="45.58" height="423.19" transform="translate(1135.07 -1786.5) rotate(45)"/></g><g id="_Grid_Repeat_24" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2731.78" y="-80.9" width="45.58" height="423.19" transform="translate(1171.5 -1874.46) rotate(45)"/></g><g id="_Grid_Repeat_25" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2856.18" y="-80.9" width="45.58" height="423.19" transform="translate(1207.94 -1962.42) rotate(45)"/></g><g id="_Grid_Repeat_26" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2980.57" y="-80.9" width="45.58" height="423.19" transform="translate(1244.37 -2050.38) rotate(45)"/></g><g id="_Grid_Repeat_27" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3104.97" y="-80.9" width="45.58" height="423.19" transform="translate(1280.8 -2138.34) rotate(45)"/></g><g id="_Grid_Repeat_28" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3229.37" y="-80.9" width="45.58" height="423.19" transform="translate(1317.24 -2226.3) rotate(45)"/></g><g id="_Grid_Repeat_29" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3353.76" y="-80.9" width="45.58" height="423.19" transform="translate(1353.67 -2314.27) rotate(45)"/></g><g id="_Grid_Repeat_30" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3478.16" y="-80.9" width="45.58" height="423.19" transform="translate(1390.11 -2402.23) rotate(45)"/></g><g id="_Grid_Repeat_31" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3602.56" y="-80.9" width="45.58" height="423.19" transform="translate(1426.54 -2490.19) rotate(45)"/></g></g></g></g></g></g></svg>

      <h2 class="under-development__title">Website is Under Development</h2>
      <p class="under-development__description"><span class="nowrap">Not all of the features are included yet.</span><span class="nowrap"> And some of them might not work as expected.</span></p>
      <label class="under-development__do-not-show-again-label"><input type="checkbox" name="under-development__do-not-show-again-cb" id="under-development__do-not-show-again-cb" class="under-development__do-not-show-again-cb"> Do not show again</label>
      <button id="under-development__okay-button" class="under-development__okay-button">Proceed</button>

            <svg class="warning-band warning-band--bottom" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="300 35 3600 170"><defs><style>.cls-1{fill:none;}.cls-2{fill:#0f0f0f;}.cls-3{clip-path:url(#clip-path);}.cls-4{clip-path:url(#clip-path-2);}.cls-5{fill:#d19620;}</style><clipPath id="clip-path" transform="translate(272.29 35.04)"><rect id="clip" class="cls-1" width="3644.11" height="206"/></clipPath><clipPath id="clip-path-2" transform="translate(272.29 35.04)"><rect class="cls-1" x="0.57" y="-35.04" width="3652.67" height="242.71"/></clipPath></defs><g id="Layer_2" data-name="Layer 2"><g id="band-top"><rect id="band-bg" class="cls-2" x="273.59" y="35.04" width="3642.81" height="206"/><g id="strips"><g class="cls-3"><g class="cls-4"><g id="_Grid_Repeat_" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="-129.34" y="-80.9" width="45.58" height="423.19" transform="translate(333.5 148.66) rotate(45)"/></g><g id="_Grid_Repeat_2" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="-4.95" y="-80.9" width="45.58" height="423.19" transform="translate(369.93 60.7) rotate(45)"/></g><g id="_Grid_Repeat_3" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="119.45" y="-80.9" width="45.58" height="423.19" transform="translate(406.37 -27.26) rotate(45)"/></g><g id="_Grid_Repeat_4" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="243.85" y="-80.9" width="45.58" height="423.19" transform="translate(442.8 -115.22) rotate(45)"/></g><g id="_Grid_Repeat_5" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="368.24" y="-80.9" width="45.58" height="423.19" transform="translate(479.24 -203.18) rotate(45)"/></g><g id="_Grid_Repeat_6" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="492.64" y="-80.9" width="45.58" height="423.19" transform="translate(515.67 -291.15) rotate(45)"/></g><g id="_Grid_Repeat_7" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="617.04" y="-80.9" width="45.58" height="423.19" transform="translate(552.11 -379.11) rotate(45)"/></g><g id="_Grid_Repeat_8" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="741.43" y="-80.9" width="45.58" height="423.19" transform="translate(588.54 -467.07) rotate(45)"/></g><g id="_Grid_Repeat_9" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="865.83" y="-80.9" width="45.58" height="423.19" transform="translate(624.98 -555.03) rotate(45)"/></g><g id="_Grid_Repeat_10" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="990.23" y="-80.9" width="45.58" height="423.19" transform="translate(661.41 -642.99) rotate(45)"/></g><g id="_Grid_Repeat_11" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1114.62" y="-80.9" width="45.58" height="423.19" transform="translate(697.85 -730.96) rotate(45)"/></g><g id="_Grid_Repeat_12" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1239.02" y="-80.9" width="45.58" height="423.19" transform="translate(734.28 -818.92) rotate(45)"/></g><g id="_Grid_Repeat_13" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1363.42" y="-80.9" width="45.58" height="423.19" transform="translate(770.72 -906.88) rotate(45)"/></g><g id="_Grid_Repeat_14" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1487.81" y="-80.9" width="45.58" height="423.19" transform="translate(807.15 -994.84) rotate(45)"/></g><g id="_Grid_Repeat_15" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1612.21" y="-80.9" width="45.58" height="423.19" transform="translate(843.59 -1082.8) rotate(45)"/></g><g id="_Grid_Repeat_16" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1736.61" y="-80.9" width="45.58" height="423.19" transform="translate(880.02 -1170.76) rotate(45)"/></g><g id="_Grid_Repeat_17" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1861" y="-80.9" width="45.58" height="423.19" transform="translate(916.46 -1258.73) rotate(45)"/></g><g id="_Grid_Repeat_18" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="1985.4" y="-80.9" width="45.58" height="423.19" transform="translate(952.89 -1346.69) rotate(45)"/></g><g id="_Grid_Repeat_19" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2109.8" y="-80.9" width="45.58" height="423.19" transform="translate(989.33 -1434.65) rotate(45)"/></g><g id="_Grid_Repeat_20" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2234.19" y="-80.9" width="45.58" height="423.19" transform="translate(1025.76 -1522.61) rotate(45)"/></g><g id="_Grid_Repeat_21" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2358.59" y="-80.9" width="45.58" height="423.19" transform="translate(1062.2 -1610.57) rotate(45)"/></g><g id="_Grid_Repeat_22" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2482.99" y="-80.9" width="45.58" height="423.19" transform="translate(1098.63 -1698.53) rotate(45)"/></g><g id="_Grid_Repeat_23" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2607.38" y="-80.9" width="45.58" height="423.19" transform="translate(1135.07 -1786.5) rotate(45)"/></g><g id="_Grid_Repeat_24" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2731.78" y="-80.9" width="45.58" height="423.19" transform="translate(1171.5 -1874.46) rotate(45)"/></g><g id="_Grid_Repeat_25" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2856.18" y="-80.9" width="45.58" height="423.19" transform="translate(1207.94 -1962.42) rotate(45)"/></g><g id="_Grid_Repeat_26" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="2980.57" y="-80.9" width="45.58" height="423.19" transform="translate(1244.37 -2050.38) rotate(45)"/></g><g id="_Grid_Repeat_27" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3104.97" y="-80.9" width="45.58" height="423.19" transform="translate(1280.8 -2138.34) rotate(45)"/></g><g id="_Grid_Repeat_28" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3229.37" y="-80.9" width="45.58" height="423.19" transform="translate(1317.24 -2226.3) rotate(45)"/></g><g id="_Grid_Repeat_29" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3353.76" y="-80.9" width="45.58" height="423.19" transform="translate(1353.67 -2314.27) rotate(45)"/></g><g id="_Grid_Repeat_30" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3478.16" y="-80.9" width="45.58" height="423.19" transform="translate(1390.11 -2402.23) rotate(45)"/></g><g id="_Grid_Repeat_31" data-name="&lt;Grid Repeat&gt;"><rect class="cls-5" x="3602.56" y="-80.9" width="45.58" height="423.19" transform="translate(1426.54 -2490.19) rotate(45)"/></g></g></g></g></g></g></svg>

    </div>
    </div>
    <div id="under-development__backdrop" class="under-development__backdrop">
  </div>`;
}
