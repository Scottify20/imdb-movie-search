import { Trending } from './Trending';

export class TrendingMovies extends Trending {
  private static IsOn = false;

  constructor(isOn: boolean) {
    super();
    TrendingMovies.IsOn = isOn;

    if (TrendingMovies.IsOn) {
      TrendingMovies.render();
    }
  }

  private static render() {
    this.startTimeWindowToggle();
  }

  private static startTimeWindowToggle() {
    const dayRadio = document.getElementById('movies-day-radio');
    const weekRadio = document.getElementById('movies-week-radio');

    dayRadio?.addEventListener('change', (event) => {
      const radio = event.target as HTMLInputElement;

      if (radio.checked) {
        this.TrendingTimeWindow = 'day';
        // show day
      }
    });

    weekRadio?.addEventListener('change', (event) => {
      const radio = event.target as HTMLInputElement;

      if (radio.checked) {
        this.TrendingTimeWindow = 'week';
        // show week
      }
    });
  }

  private static cardTemplate = ``;
}
