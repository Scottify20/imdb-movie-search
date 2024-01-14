import {
  GeneralTitleSearch,
  movieOrSeriesOrEpisode,
  SearchParamsObj,
} from './src/model/GeneraTitleSearch';

let GeneralSearchParamObj: SearchParamsObj = {
  s: 'Oppenheimer',
  page: '1',
  type: 'movie',
  y: '2023',
};

// const GeneralSearch = async () => {
//   try {
//     const search1 = new GeneralTitleSearch();
//     const result = await search1.search(GeneralSearchParamObj);
//     return result;
//   } catch {
//     console.log('General Search Result Error');
//   }
// };

// GeneralSearch()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log('General Result Error');
//     console.log(err);
//   });
