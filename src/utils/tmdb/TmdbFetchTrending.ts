import { TmdbFetch, tmdbTimeWindowTypes } from './TmdbFetch';

export class TmdbFetchTrending extends TmdbFetch {
  public async fetchTrendingMovies(timeWindow: tmdbTimeWindowTypes, page: number = 1) {
    const fetchInstance = new TmdbFetchTrending();
    fetchInstance.setFrom('trending');
    fetchInstance.setTitleType('movie');
    fetchInstance.setTimeWindow(timeWindow);
    fetchInstance.setPage(page);
    const result = await fetchInstance.fetchTmdb();
  }

  public async fetchTrendingSeries(timeWindow: tmdbTimeWindowTypes, page: number = 1) {
    const fetchInstance = new TmdbFetchTrending();
    fetchInstance.setFrom('trending');
    fetchInstance.setTitleType('tv');
    fetchInstance.setTimeWindow(timeWindow);
    fetchInstance.setPage(page);
    const result = await fetchInstance.fetchTmdb();
  }

  public async fetchTrendingActors(timeWindow: tmdbTimeWindowTypes, page: number = 1) {
    const fetchInstance = new TmdbFetchTrending();
    fetchInstance.setFrom('trending');
    fetchInstance.setTitleType('person');
    fetchInstance.setTimeWindow(timeWindow);
    fetchInstance.setPage(page);
    const result = await fetchInstance.fetchTmdb();
  }
}
