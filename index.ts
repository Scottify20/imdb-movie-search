import { animateSearchBtn } from './src/utils/animations';
import ButtonsDisabler from './src/utils/ButtonsDisabler';
import { OmdbSearchLogic } from './src/components/header/search_bar/OmdbSearchLogic';
import { navBarAutoHide } from './src/components/header/Header';
import { mobileSidebarLogic } from './src/components/mobile_sidebar_menu/MobileSidebarMenu';
import { inject } from '@vercel/analytics';

inject(); // vercel analytics
OmdbSearchLogic(true); //enables the search feature
mobileSidebarLogic(true); // sidebar javascript logic for interactivity
navBarAutoHide(true); // auto hiding and showing of navigation bar (header)
ButtonsDisabler(true); // Disable the Buttons that are listed on the ButtonsDisabler class
animateSearchBtn(); // search button animation
