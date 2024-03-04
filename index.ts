import { animateSearchBtn } from './src/utils/animations';
import ButtonsDisabler from './src/utils/ButtonsDisabler';
import { OmdbSearchLogic } from './src/omdb/OmdbSearchBarController';
import { navBarAutoHide } from './src/components/header/Header';
import { mobileSidebarLogic } from './src/components/mobile_sidebar_menu/MobileSidebarMenu';
import { inject } from '@vercel/analytics';
import { resultCardLogic } from './src/components/result_card_container/result_card/ResultCard';
import { titleDetails } from './src/components/title_details/TitleDetails';

inject(); // enable vercel analytics
OmdbSearchLogic(true); //enables the search feature
mobileSidebarLogic(true); // sidebar javascript for interactivity
navBarAutoHide(true); // auto hiding and showing of navigation bar (header)
ButtonsDisabler(true); // Disable the Buttons that are listed on the ButtonsDisabler class
resultCardLogic(true); // checkbox menu toggling on other cards
animateSearchBtn(); // search button animation

titleDetails(true); // viewing of title details
