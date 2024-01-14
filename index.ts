import { GeneralTitleSearch } from './src/model/GeneraTitleSearch';

const s1 = new GeneralTitleSearch('Game');
s1.setParamFilter('type', 'series');
// console.log('totalResults', s1.totalResults);
// s1.setParamFilter('y', '2023');

setTimeout(() => {
  console.log('Results', s1.searchResults);
}, 1000);
