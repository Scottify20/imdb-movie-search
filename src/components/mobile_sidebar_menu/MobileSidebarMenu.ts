export function mobileSidebarLogic(isOn: boolean) {
  if (isOn) {
    const mobileMenuToggle = document.querySelector(
      '#nav__mobile-menu-cb-toggle'
    ) as HTMLInputElement;
    // const mobileMenu = document.querySelector('#nav__mobile-menu');
    const mobileMenuContainer = document.querySelector('#nav__mobile-menu-container');
    const mobileMenuBackdrop = document.querySelector('#nav__mobile-menu-backdrop');

    // mobile menu toggle with hamburger menu icon
    mobileMenuToggle?.addEventListener('change', (event) => {
      const target = event.target as HTMLElement;
      if (target === mobileMenuToggle && mobileMenuToggle.checked) {
        mobileMenuContainer?.classList.add('shown');
        toggleBodyScrolling();
      } else {
        mobileMenuContainer?.classList.remove('shown');
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
        mobileMenuContainer?.classList.remove('shown');
        toggleBodyScrolling();
      }
    });

    // click mobile menu close button
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.id == 'nav__mobile-menu-close-button') {
        mobileMenuToggle.checked = false;
        mobileMenuContainer?.classList.remove('shown');
        toggleBodyScrolling();
      }
    });

    // disable scrolling of content below menu when menu is shown
    function toggleBodyScrolling() {
      if (mobileMenuToggle.checked) {
        document.body.classList.add('scroll-disabled');
        console.log('added');
      } else {
        console.log('removed');
        document.body.classList.remove('scroll-disabled');
      }
    }
  }
}
