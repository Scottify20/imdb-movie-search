export class SearchButtonController {
  constructor(isOn: boolean) {
    if (isOn) {
      SearchButtonController.startSearchButtonListener();
    }
  }

  private static startSearchButtonListener() {
    const searchButton = document.getElementById('search-btn') as HTMLInputElement;

    searchButton.addEventListener('click', () => {});
  }
}
