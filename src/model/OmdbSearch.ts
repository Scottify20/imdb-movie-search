interface OmdbResponse {
  Response: string;
  Error?: string;
}

export abstract class OmdbSearch<T extends OmdbResponse> {
  abstract parseData(): void;
  abstract get requestUrl(): string;

  public isOkay: boolean = false;
  private apiKey = 'cbb2cfa7';
  protected data: T = {} as T;
  protected baseUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  async search(): Promise<void> {
    try {
      const res = await fetch(this.requestUrl);
      const data: T = await res.json();
      if (data.Response === 'True') {
        console.log('Success');
        this.isOkay = true;
      } else if (
        data.Response === 'False' &&
        data.Error === 'Movie not found!'
      ) {
        console.log('Error 404, Not Found');
        this.isOkay = false;
      }
      // save date to data property
      this.data = data;
      this.parseData();
    } catch {
      console.log('Rejected Error catched');
    }
  }
}

// .then((res) => {
//   return res.json();
// })
// .then((data: T) => {
//   if (data.Response === 'True') {
//     console.log('Success');
//     this.isOkay = true;
//   } else if (
//     data.Response === 'False' &&
//     data.Error === 'Movie not found!'
//   ) {
//     console.log('Error 404, Not Found');
//     this.isOkay = false;
//   }
//   // save date to data property
//   this.data = data;
//   this.parseData();
// })
// .catch((err) => {
//   console.log(err);
// });
