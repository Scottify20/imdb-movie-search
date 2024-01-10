const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ca86b98464msh7ca70580315d7f4p125960jsn4db09f3ab376',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
  },
};

fetch(url, options)
  .then((response) => {
    const list = response.text();
    return JSON.parse(list);
  })
  .then((list) => console.log(list))
  .catch((err) => console.log(err));

// const url = 'https://imdb8.p.rapidapi.com/actors/get-bio?nconst=nm0001667';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ca86b98464msh7ca70580315d7f4p125960jsn4db09f3ab376',
// 		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
