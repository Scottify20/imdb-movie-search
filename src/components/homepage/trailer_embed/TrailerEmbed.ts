export class TrailerEmbed {
  private static IsOn = false;

  constructor(isOn: boolean) {
    TrailerEmbed.IsOn = isOn;
    // TrailerEmbed.render();
  }

  public static render(trailerKey: string) {
    if (TrailerEmbed.IsOn) {
      document.body.classList.add('scroll-disabled');

      let bindedTemplate = String(this.templateTrailerEmbed);
      bindedTemplate = bindedTemplate.replace('[VIDEO-KEY]', trailerKey);

      document.body.insertAdjacentHTML('afterbegin', bindedTemplate);

      this.embedCloseButtonListener();
      // this.backdropClickToCloseListener();
      this.escapeButtonToCloseListener();
    }
  }

  private static close() {
    document.body.classList.remove('scroll-disabled');

    const embedWindow = document.getElementById('youtube-trailer-embed-container');

    if (embedWindow) {
      embedWindow.remove();
    }
  }

  private static backdropClickToCloseListener() {
    const backdrop = document.getElementById('youtube-trailer-embed-backdrop') as HTMLElement;
    backdrop.addEventListener('click', () => {
      this.close();
    });
  }

  private static embedCloseButtonListener() {
    const closeButton = document.getElementById('trailer-embed-close-button');
    closeButton?.addEventListener('click', () => {
      setTimeout(() => {
        this.close();
      }, 100);
    });
  }

  private static escapeButtonToCloseListener() {
    const container = document.getElementById('youtube-trailer-embed-container');
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && container) {
        // console.log('escape pressed');
        this.close();
      }
    });
  }

  private static templateTrailerEmbed = /*html*/ `
  <div class="youtube-trailer-embed-container" id="youtube-trailer-embed-container">
  <button class="trailer-embed-close-button btn-click-animation-and-cursor" id="trailer-embed-close-button">
    <svg class="x-icon" viewBox="0 0 847 1058.8" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M423.4,407.4l274.2-274.2c80.9-80.9,202.8,42,121.9,122.9L546.4,529.3l273.2,274.2
c80.9,80.9-41,202.8-121.9,121.9L423.4,652.2L150.3,925.4c-80.9,80.9-203.8-41-122.9-121.9l274.2-274.2L27.3,256.1
c-80.9-80.9,42-203.8,122.9-122.9L423.4,407.4z"
      />
    </svg>
  </button>
  <div class="youtube-trailer-embed-backdrop" id="youtube-trailer-embed-backdrop"></div>
  <iframe
    class="youtube-trailer-embed"
    src="https://www.youtube.com/embed/[VIDEO-KEY]?autoplay=1"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>
    `;
}
