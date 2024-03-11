import { anchorToElementById, getGlobalPositionById } from '../../utils/GlobalUtils';

export function mobileSidebarLogic(isOn: boolean) {
  if (isOn) {
    const mobileMenuToggle = document.querySelector(
      '#nav__mobile-menu-cb-toggle'
    ) as HTMLInputElement;
    const mobileMenuContainer = document.querySelector(
      '#nav__mobile-menu-container'
    ) as HTMLElement;
    const mobileMenuBackdrop = document.querySelector('#nav__mobile-menu-backdrop') as HTMLElement;
    const mobileMenu = document.getElementById('nav__mobile-menu');
    const burgerMenuIcon = document.getElementById('nav__hamburger-menu-container');

    function hideMobileMenu() {
      mobileMenuContainer.classList.add('hidden');
      mobileMenuBackdrop.classList.add('hidden');
      mobileMenuContainer.classList.remove('shown');
      mobileMenuBackdrop.classList.remove('shown');
      mobileMenuToggle.checked = false;
    }

    function showMobileMenu() {
      mobileMenuContainer.classList.add('shown');
      mobileMenuBackdrop.classList.add('shown');
      mobileMenuContainer.classList.remove('hidden');
      mobileMenuBackdrop.classList.remove('hidden');
      mobileMenuToggle.checked = true;
    }

    function setNavMenuAsFloatingOrNot() {
      // on first load
      if (window.innerWidth >= 500) {
        mobileMenuContainer.classList.add('floating');
      } else {
        mobileMenuContainer.classList.remove('floating');
      }
      // listen for window resizing
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 500) {
          mobileMenuContainer.classList.remove('side');
          mobileMenuContainer.classList.add('floating');
        } else {
          mobileMenuContainer.classList.remove('floating');
          mobileMenuContainer.classList.add('side');
        }
      });
    }
    setNavMenuAsFloatingOrNot();

    function anchorFloatingNavMenuToBurger() {
      const childElement = document.getElementById('nav__mobile-menu-container') as HTMLElement;
      const parentPositionInitial = getGlobalPositionById('nav__hamburger-menu-container');

      //initial positioning after the toggle is triggered
      if (window.innerWidth >= 500) {
        childElement.style.left = Math.round(parentPositionInitial.x - 30).toString() + 'px';
      }
      window.addEventListener('resize', () => {
        const parentPosition = getGlobalPositionById('nav__hamburger-menu-container');
        if (window.innerWidth >= 500) {
          childElement.style.left = Math.round(parentPosition.x - 30).toString() + 'px';
        }
      });
    }

    // mobile menu toggle with hamburger menu icon
    mobileMenuToggle?.addEventListener('change', (event) => {
      const target = event.target as HTMLElement;
      if (target === mobileMenuToggle && mobileMenuToggle.checked) {
        showMobileMenu();
        anchorFloatingNavMenuToBurger();

        toggleBodyScrolling();
      } else {
        hideMobileMenu();
        toggleBodyScrolling();
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
        toggleBodyScrolling();
      }
    });

    // click mobile menu close button
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.id == 'nav__mobile-menu-close-button') {
        mobileMenuToggle.checked = false;
        hideMobileMenu();
        toggleBodyScrolling();
      }
    });

    // disable scrolling of content below menu when menu is shown
    function toggleBodyScrolling() {
      if (mobileMenuToggle.checked && window.innerHeight < 500) {
        document.body.classList.add('scroll-disabled');
      } else {
        document.body.classList.remove('scroll-disabled');
      }
    }
  }
}
