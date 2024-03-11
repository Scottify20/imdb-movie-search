export class TitleDetailsSkeletonLoader {
  public static show() {
    document.body.insertAdjacentHTML('afterbegin', this.templateSkeleton);
    document.body.classList.add('scroll-disabled');
  }

  public static close() {
    const skeletonContainer = document.getElementById('skeleton__container');
    const skeleton = document.getElementById('skeleton');
    const skeletonBackdrop = document.getElementById('skeleton__backdrop');

    skeleton?.classList.add('closed');
    skeletonBackdrop?.classList.add('closed');
    skeleton?.classList.remove('shown');
    skeletonBackdrop?.classList.remove('shown');
    setTimeout(() => {
      // console.log('removing skeleton');
      skeletonContainer?.remove();
      skeletonBackdrop?.remove();
    }, 250);
  }

  public static fadeOut() {
    const skeletonContainer = document.getElementById('skeleton__container');
    const skeleton = document.getElementById('skeleton');
    const skeletonBackdrop = document.getElementById('skeleton__backdrop');

    skeleton?.classList.add('fade-out');
    skeletonBackdrop?.classList.add('fade-out');
    skeleton?.classList.remove('shown');
    skeletonBackdrop?.classList.remove('shown');
    setTimeout(() => {
      // console.log('removing skeleton');
      skeletonContainer?.remove();
      skeletonBackdrop?.remove();
    }, 250);
  }

  private static templateSkeleton = /* html */ `
  <div id="skeleton__backdrop" class="skeleton__backdrop shown"></div>
  <div id="skeleton__container" class="skeleton__container shown">
  <div id="skeleton" class="skeleton shown">
    <div class="skeleton__hero skeleton__section-container">
      <div class="skeleton__title-and-close-btn-container">
        <h2  class="skeleton__title skeleton-covered">Lorem ipsum dolor 
        </h2>
      </div>
      <div class="skeleton__metadata-container">
      <p class="title-data skeleton-covered title-data--title-type text-dot-separated">2009</p>
      <p class="skeleton-dot-separator dot-separator metadata">•</p>
      <p class="title-data skeleton-covered title-data--year text-dot-separated">2009</p>
      <p class="skeleton-dot-separator dot-separator metadata">•</p>
      <p class="title-data skeleton-covered title-data--rating text-dot-separated">2009</p>
      <p class="skeleton-dot-separator dot-separator metadata">•</p>
      <p class="title-data skeleton-covered title-data--runtime text-dot-separated">2009</p>
      </div>
      <div class="skeleton__poster skeleton-covered .skeleton__poster--not-available"></div>
      <div  class="genre-container">
        <div class="genre skeleton-covered skeleton--genre">Loresum.
        </div>
        <div class="genre skeleton-covered skeleton--genre">Lorem.</div>
        <div class="genre skeleton-covered skeleton--genre">Lorempsum.</div>
      </div>
      <p  class="skeleton__plot skeleton-covered">Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for a millennia.</p>
    </div>
  
    <div class="skeleton__section-container skeleton__section--ratings">
    <h3 class="skeleton__section-title skeleton-covered skeleton-loa">Ratings</h3>
    <div class="skeleton__ratings-container">
    
  <div class="skeleton__rating-container skeleton__rating--imdb">
      <div class="skeleton__rating__logo skeleton-covered"></div>
      <p class="skeleton__rating__rating imdb-score">8.4</p>
  </div>

    <div class="skeleton__rating-container skeleton__rating--rotten-tomatoes">
    <div class="skeleton__rating__logo skeleton-covered"></div>
      <p class="skeleton__rating__rating rt-score">93%</p>
    </div>
  <div class="skeleton__rating-container skeleton__rating--metacritic">
  <div class="skeleton__rating__logo skeleton-covered"></div>
      <p class="skeleton__rating__rating metacritic-score">88</p>
  </div></div>
</div>
  
    <div class="skeleton__section-container skeleton__section--top-cast">
      <h3 class="skeleton__section-title skeleton-covered">Top Cast</h3>
      <div class="skeleton__cast-container">
        <div class="skeleton__actor-container">
        <svg class="skeleton__actor-photo skeleton-covered" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.24 101.24"><circle class="cls-1" cx="50.62" cy="50.62" r="50.62"/></svg>
          <p class="skeleton__actor-name skeleton--actor-name  skeleton-covered"> sit amet consectetur </p>
        </div>
        <div class="skeleton__actor-container">
        <svg class="skeleton__actor-photo skeleton-covered" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.24 101.24"><circle class="cls-1" cx="50.62" cy="50.62" r="50.62"/></svg>
          <p class="skeleton__actor-name skeleton--actor-name skeleton-covered"> sit amet consect </p>
        </div>
        <div class="skeleton__actor-container">
        <svg class="skeleton__actor-photo skeleton-covered" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.24 101.24"><circle class="cls-1" cx="50.62" cy="50.62" r="50.62"/></svg>
          <p class="skeleton__actor-name skeleton--actor-name skeleton-covered">Actor Name consectetur </p>
        </div>
      </div>
    </div>
  
    <div class="skeleton__section-container skeleton__section--directors">
      <h3 class="skeleton__section-title skeleton-covered"><span class="director-or-directors">Director</span></h3>
      <div class="skeleton__section--directors-container skeleton__section-container--dot-separated">
        <p class="title_details__director text-dot-separated skeleton--director-name">Christopher Nolan</p>
        <p class="skeleton-dot-separator dot-separator sections">•</p>
        <p class="title_details__director text-dot-separated skeleton--director-name">Christopher Ndw</p>
        <p class="skeleton-dot-separator dot-separator sections">•</p>
        <p class="title_details__director text-dot-separated skeleton--director-name">fewfewfedde</p>
      </div>
    </div>
  
    <div class="skeleton__section-container skeleton__section--writers">
      <h3 class="skeleton__section-title skeleton-covered">Writers</h3>
      <div class="skeleton__section--writers-container skeleton__section-container--dot-separated">
        <p class="title_details__writer text-dot-separated skeleton--writer-name" >Lorem ipsum dolor sit.
        </p>
        <p class="skeleton-dot-separator dot-separator sections">•</p>
        <p class="title_details__writer text-dot-separated skeleton--writer-name" >Lorem, ipsum.</p>
        <p class="skeleton-dot-separator dot-separator sections">•</p>
        <p class="title_details__writer text-dot-separated skeleton--writer-name" >Lorem, ipsum dolor.</p>
      </div>
    </div>
  
    <div class="skeleton__section-container skeleton__section--awards">
      <h3 class="skeleton__section-title skeleton-covered">Awards</h3>
      <p class="skeleton__awards">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, ad. Praesentium eaque dignissimos a sunt.</p>
    </div>
  
    </div>
  </div>
  </div>`;
}
