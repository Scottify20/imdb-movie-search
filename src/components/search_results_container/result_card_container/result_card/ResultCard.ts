// import { OmdbTitleDetailsFetch } from '../../../../utils/omdb/OmdbTitleDetailsFetch';

export function resultCardLogic(isOn: boolean) {
  const cardGroupElementParent = document.querySelector('#card-group');

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
}
