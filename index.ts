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
import { Hero } from './src/components/homepage/hero/Hero';
import { TrendingMovies } from './src/components/homepage/trending/TrendingMovies';
import { FetchTrendingTitles } from './src/utils/proxy_api/FetchTrendingtTitles';

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
new Hero(true);
new TrendingMovies(true);

// FetchTrendingTitles.fetchTrending('movies', 'day');

// const tmdbTrend = new TmdbFetchTrending();
// tmdbTrend.fetchTrendingActors('day');
// tmdbTrend.fetchTrendingMovies('day');
// tmdbTrend.fetchTrendingSeries('day');
