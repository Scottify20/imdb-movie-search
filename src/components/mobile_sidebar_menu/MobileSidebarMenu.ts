import { anchorToElementById, getGlobalPositionById } from '../../utils/GlobalUtils';
import { SearchBarController } from '../header/search_bar/SearchBarController';
import { SearchResultsContainer } from '../search_results_container/SearchResultsContainer';

export function mobileSidebarLogic(isOn: boolean) {
  if (isOn) {
    const mobileMenuToggle = document.querySelector(
      '#nav__mobile-menu-cb-toggle'
    ) as HTMLInputElement;
    const mobileMenuContainer = document.querySelector(
      '#nav__mobile-menu-container'
    ) as HTMLElement;
    const mobileMenuBackdrop = document.querySelector('#nav__mobile-menu-backdrop') as HTMLElement;
    // const mobileMenu = document.getElementById('nav__mobile-menu');
    // const burgerMenuIcon = document.getElementById('nav__hamburger-menu-container');

    function hideMobileMenu() {
      mobileMenuContainer.classList.add('hidden');
      mobileMenuBackdrop.classList.add('hidden');
      mobileMenuContainer.classList.remove('shown');
      mobileMenuBackdrop.classList.remove('shown');
      mobileMenuToggle.checked = false;
      toggleBodyScrolling();
    }

    function showMobileMenu() {
      mobileMenuContainer.classList.add('shown');
      mobileMenuBackdrop.classList.add('shown');
      mobileMenuContainer.classList.remove('hidden');
      mobileMenuBackdrop.classList.remove('hidden');
      mobileMenuToggle.checked = true;
      toggleBodyScrolling();
    }

    (function setNavMenuAsFloatingOrNot() {
      // on first load
      if (window.innerWidth >= 500) {
        mobileMenuContainer.classList.remove('side');
        mobileMenuContainer.classList.add('floating');
      } else {
        mobileMenuContainer.classList.remove('floating');
        mobileMenuContainer.classList.add('side');
      }
      toggleBodyScrolling();

      // listen for window resizing
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 500) {
          mobileMenuContainer.classList.remove('side');
          mobileMenuContainer.classList.add('floating');
        } else {
          mobileMenuContainer.classList.remove('floating');
          mobileMenuContainer.classList.add('side');
        }
        toggleBodyScrolling();
      });
    })();

    function anchorFloatingNavMenuToBurger() {
      const childElement = document.getElementById('nav__mobile-menu-container') as HTMLElement;
      const parentPositionInitial = getGlobalPositionById('nav__hamburger-menu-container');

      //initial positioning after the toggle is triggered
      if (window.innerWidth >= 500) {
        childElement.style.left = Math.round(parentPositionInitial.x - 14).toString() + 'px';
      }
      window.addEventListener('resize', () => {
        const parentPosition = getGlobalPositionById('nav__hamburger-menu-container');
        if (window.innerWidth >= 500) {
          childElement.style.left = Math.round(parentPosition.x - 14).toString() + 'px';
        }
      });
    }

    // mobile menu toggle with hamburger menu icon
    mobileMenuToggle?.addEventListener('change', (event) => {
      const target = event.target as HTMLElement;
      if (target === mobileMenuToggle && mobileMenuToggle.checked) {
        showMobileMenu();
        anchorFloatingNavMenuToBurger();
      } else {
        hideMobileMenu();
      }
    });

    // clicked mobile menu backdrop
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      // check if the element that was clicked is the mobile menu backdrop
      // if it is, the mobile menu will be closed
      if (target === mobileMenuBackdrop) {
        mobileMenuToggle.checked = false;
        hideMobileMenu();
      }
    });

    // click mobile menu close button
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.id == 'nav__mobile-menu-close-button') {
        mobileMenuToggle.checked = false;
        hideMobileMenu();
      }
    });

    // disable scrolling of content below menu when menu is shown
    function toggleBodyScrolling() {
      const titleDetailsContainer =
        document.getElementById('title-details__container') || undefined;
      if (mobileMenuToggle.checked && window.innerWidth < 500) {
        // console.log('body scrolling disabled');
        document.body.classList.add('scroll-disabled');
      } else if (
        !titleDetailsContainer &&
        SearchResultsContainer.searchResultsContainer.classList.contains('hidden')
      ) {
        // console.log('body scrolling enabled');
        document.body.classList.remove('scroll-disabled');
      }
    }
  }
}
