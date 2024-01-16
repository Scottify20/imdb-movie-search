export function animateSearchBtn() {
  const searchBox = document.querySelector(
    '#nav-search-bar'
  ) as HTMLInputElement;

  const searchBtn = document.querySelector(
    '#nav__search-bar-submit-btn'
  ) as HTMLInputElement;

  const searchIcon = document.querySelector(
    '#nav__search-bar-search-icon'
  ) as HTMLElement;

  searchBtn.addEventListener('click', () => {
    if (searchBox.value.length > 0) {
      searchIcon.classList.add('Search-button-clicked');
      setTimeout(() => {
        searchIcon.classList.remove('Search-button-clicked');
      }, 200);
    }
  });
}
