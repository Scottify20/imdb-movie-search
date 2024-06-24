import { TmdbFetch, tmdbTitleTypes, TmdbProxyApiResponse, TmdbFetchParams } from './TmdbFetch';

export class TmdbFetchVideos extends TmdbFetch {
  protected fetchParams: TmdbFetchParams = {
    path: {
      type: 'movie',
      tmdbId: 0,
      props: 'videos',
    },

    query: {
      language: 'en-US',
    },
  };

  public static async fetchVideos(
    tmdbId: number,
    type: tmdbTitleTypes,
    language: string = 'en-US'
  ): Promise<TmdbFetchVideoProps[]> {
    const fetchInstance = new TmdbFetchVideos();

    fetchInstance.setTitleType(type);
    fetchInstance.setTmdbId(tmdbId);
    fetchInstance.setLanguage(language);
    const result: TmdbProxyApiResponse<TmdbFetchVideoProps> = await fetchInstance.fetchTmdb();

    return result.results;
  }

  public static async fetchYoutubeTrailerPriorityKey(
    tmdbId: number,
    type: tmdbTitleTypes,
    language: string = 'en-US'
  ): Promise<string | undefined> {
    const fetchInstance = new TmdbFetchVideos();

    fetchInstance.setTitleType(type);
    fetchInstance.setTmdbId(tmdbId);
    fetchInstance.setLanguage(language);
    const result: TmdbProxyApiResponse<TmdbFetchVideoProps> = await fetchInstance.fetchTmdb();

    let key: string | undefined = undefined;
    let videoFound = false;

    // console.log(result, 'looking for keys');

    try {
      const filtered = result.results.filter(
        (video) =>
          video.official &&
          video.site == 'YouTube' &&
          /(International|Official) (Trailer|Teaser)/i.test(video.name) &&
          !/dubbing/i.test(video.name)
      );
      // console.log('filtered', filtered);
      // console.log('using filtered key', filtered[0].name);
      return filtered[0].key;
    } catch {
      result.results.forEach((video) => {
        if (videoFound) {
          return;
        } else if (video.site == 'YouTube' && (video.type == 'Trailer' || video.type == 'Teaser')) {
          // console.log('youtube trailer exists');
          key = video.key;
          videoFound = true;
        } else if (video.site == 'YouTube') {
          // console.log('youtube video exists');
          key = video.key;
          videoFound = true;
        } else {
          key = undefined;
        }
      });
    }

    // console.log(key);
    return key;
  }
}

export interface TmdbFetchVideoProps {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}
