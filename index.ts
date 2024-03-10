import { animateSearchBtn } from './src/utils/animations';
import ButtonsDisabler from './src/utils/ButtonsDisabler';
// import { OmdbSearchLogic } from './src/components/header/search_bar/SearchBarController';
import { navBarAutoHide } from './src/components/header/Header';
import { mobileSidebarLogic } from './src/components/mobile_sidebar_menu/MobileSidebarMenu';
import { inject } from '@vercel/analytics';
import { resultCardLogic } from './src/components/result_card_container/result_card/ResultCard';
import { UnderDevelopmentDialogue } from './src/components/under_development_dialogue/UnderDevelopmentDialogue';
import { TitleDetailsRenderer } from './src/components/title_details/TitleDetailsRenderer';
import { SearchBarController } from './src/components/header/search_bar/SearchBarController';
import { TitleDetailsSkeletonLoader } from './src/components/title_details/skeleton_loader/TitleDetailsSkeletonLoader';

inject(); // enable vercel analytics
// OmdbSearchLogic(true); //enables the search feature
mobileSidebarLogic(true); // sidebar javascript for interactivity
navBarAutoHide(true); // auto hiding and showing of navigation bar (header)
ButtonsDisabler(true); // Disable the Buttons that are listed on the ButtonsDisabler class
resultCardLogic(true); // checkbox menu toggling on other cards
animateSearchBtn(); // search button animation

new SearchBarController(true);
new UnderDevelopmentDialogue(true);
new TitleDetailsRenderer(true);

// TitleDetailsSkeletonLoader.show();

// setTimeout(() => {
//   TitleDetailsSkeletonLoader.close();
//   console.log('closed');
// }, 5000);

// setTimeout(() => {
//   TitleDetailsSkeletonLoader.fadeOut();
//   console.log('fadeout');
// }, 5000);
