import { Snackbar } from '../components/snackbar/SnackBar';
import {
  TrendingFetchErrorMessage,
  TrendingFetchSucessMessage,
  UpdateTrendingTitles,
} from './proxy_api/UpdateTrendingTitles';

async function UpdateTitles() {
  try {
    new Snackbar('Updating Titles...', '');
    const message: TrendingFetchSucessMessage | TrendingFetchErrorMessage =
      await UpdateTrendingTitles.update();

    if (message.statusCode === 200) {
      const messageCopy = message as TrendingFetchSucessMessage;

      const messageDescription = `MD:${messageCopy.results[0]['movies/day']},  MW:${messageCopy.results[1]['movies/week']},  SD:${messageCopy.results[2]['series/day']},  SW:${messageCopy.results[3]['series/week']}`;

      new Snackbar('Titles Update Success', messageDescription);
    } else {
      new Snackbar('Titles Update Failed', '');
    }
  } catch {
    return;
  }
}

export default async function TrendingFetchListener(isOn: boolean) {
  if (!isOn) {
    return;
  }

  const logo = document.getElementById('home-logo-btn');

  // for devices with mouse
  let holdTimer: ReturnType<typeof setTimeout>;

  logo?.addEventListener('mousedown', (e) => {
    e.preventDefault();

    clearTimeout(holdTimer);

    holdTimer = setTimeout(async function () {
      UpdateTitles();
    }, 1000);
  });

  // for touchscreens
  function detectTouchHold(element: HTMLElement, options: TouchHoldOptions) {
    const { duration = 500, callback, onTap } = options; // Add onTap callback
    let timer: NodeJS.Timeout | null = null;
    let isTouchHeld = false;

    element.addEventListener('touchstart', () => {
      timer = setTimeout(() => {
        isTouchHeld = true;
        callback(); // Execute hold callback
        timer = null;
      }, duration);
    });

    element.addEventListener('touchend', () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
        if (!isTouchHeld && onTap) {
          // Check if it was a tap
          onTap(); // Execute tap callback
        }
      }
      // isTouchHeld = false; // Reset for the next touch
    });
  }

  if (logo) {
    detectTouchHold(logo, {
      duration: 1000,
      callback: () => UpdateTitles(), // For holds
      onTap: () => (window.location.href = '/'), // For taps
    });
  }
}

interface TouchHoldOptions {
  duration?: number;
  callback: () => void; // For holds
  onTap?: () => void; // For taps (optional)
}
