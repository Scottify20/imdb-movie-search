# OMDB Titles Browser (Beta)

A web app to browse information about Movies, TV Series, and more in the [OMDB API](https://www.omdbapi.com/ "OMDB API's Website") and [TMDB API's](https://developer.themoviedb.org/docs/getting-started 'TMDB API Section') Dataset.

### Notes:
- Due to the limitations of the OMDB API, I am gradually replacing it with the TMDB API.

- As of March 13, 2024, to protect my TMDB API keys and tokens, I implemented an Express.js proxy server. This server acts as a middleman, fetching data from the APIs and relaying it to this web app.

This project is tested with BrowserStack.
  
## Live Preview

[OMDB Titles Browser](https://omdb-titles-browser.vercel.app/ 'OMDB Titles Browser: Live Preview')

## Features

#### In Development

- Built with Typescript and Sass
- Search and filter through titles (movies, tv series, etc.) in the OMDB Database
- View the titles' detailed info
- See trending movies and TV series on the homepage. 
- Add titles to your Favourites

#### Planned
- Rebuilt with Angular and Sass
- User login and data storage system with Firebase Authentication and Firestore
- Create custom lists
- Keep track of the movies, series, and episodes you have watched.

#### (View the Issues and Milestones section for more)

## Tools and Resources Used

- [OMDB API](https://www.omdbapi.com/ "OMDB API's Website")
- [TMDB API](https://developer.themoviedb.org/docs/getting-started)
- HTML
- Sass
- Typescript
- Fetch API
- Parcel v2
- Visual Studio Code
- Nodes.js and npm
- Express JS
- Vercel along with Vercel KV Database
- Adobe Illustrator (For UI prototyping and creating custom icons. I should probably start using Figma/Adobe XD)

## Assets and Prototyping Files
- The SVG and  Adobe Illustrator files can be accessed inside [this Google Drive Folder](https://drive.google.com/drive/folders/1-Fbwd9o2TkgyCTO9tmkua9vQNFdGJ375?usp=sharing)
