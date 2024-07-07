// const bodyScrollLock = require('body-scroll-lock-upgrade');
// const disableBodyScroll = bodyScrollLock.disableBodyScroll;
// const enableBodyScroll = bodyScrollLock.enableBodyScroll;

export class TitleDetailsSkeletonLoader {
  public static show() {
    document.body.insertAdjacentHTML('afterbegin', this.templateSkeleton);

    document.body.classList.add('scroll-disabled');

    const skeletonContainer = document.getElementById('skeleton__container') as HTMLDialogElement;

    skeletonContainer.showModal();

    document.body.style.overflow = 'hidden';
  }

  public static showSkeletonForFadeout() {
    document.body.insertAdjacentHTML('afterbegin', this.templateSkeletonForFadeout);

    const skeletonContainerForFadeout = document.getElementById(
      'skeleton__container--fadeout'
    ) as HTMLDialogElement;
    skeletonContainerForFadeout.showModal();

    const skeleton = document.getElementById('skeleton');
    skeleton?.remove();
  }

  public static fadeOut() {
    const skeletonContainer = document.getElementById('skeleton__container');

    const skeletonContainerForFadeout = document.getElementById('skeleton__container--fadeout');

    const skeletonForFadeout = document.getElementById('skeleton--fadeout');

    const skeletonBackdrop = document.getElementById('skeleton__backdrop');

    skeletonForFadeout?.classList.add('fade-out');
    skeletonBackdrop?.classList.add('fade-out');
    skeletonForFadeout?.classList.remove('shown');
    skeletonBackdrop?.classList.remove('shown');
    setTimeout(() => {
      skeletonContainer?.remove();
      skeletonContainerForFadeout?.remove();
      skeletonBackdrop?.remove();
    }, 250);
  }

  private static templateSkeleton = /* html */ `
  <div id="skeleton__backdrop" class="skeleton__backdrop shown"></div>
  <dialog id="skeleton__container" class="skeleton__container shown">
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
      <div class="skeleton__action-buttons-container">
      <div class="skeleton__play-trailer-btn skeleton-action-btn hover--darken active skeleton-covered">
      <svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 80.81"><path d="M18.43,94.9A8.45,8.45,0,0,1,10,86.46V13.54a8.43,8.43,0,0,1,12.64-7.3L85.79,42.7h0a8.43,8.43,0,0,1,0,14.6L22.64,93.76A8.43,8.43,0,0,1,18.43,94.9Zm0-84.26A3,3,0,0,0,17,11a2.85,2.85,0,0,0-1.44,2.5V86.46A2.89,2.89,0,0,0,19.87,89L83,52.5a2.89,2.89,0,0,0,0-5L19.87,11A2.88,2.88,0,0,0,18.44,10.64Z" transform="translate(-10 -5.1) scale(0.9)"/></svg>
          <p class="dot-separator">Play Trailer</p>
      </div>
      <div class="skeleton__add-to-fav-btn skeleton-action-btn hover--darken skeleton-covered">
          <svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.25 98.25">
              <path d="M95.49,46.36H53.64V4.51a3.64,3.64,0,0,0-7.28,0V46.36H4.51a3.64,3.64,0,0,0,0,7.28H46.36V95.49a3.64,3.64,0,0,0,7.28,0V53.64H95.49a3.64,3.64,0,0,0,0-7.28Z" transform="translate(-0.88 -0.88)"/>
          </svg>
          <p class="dot-separator">Add to List</p>
      </div>
      <div class="skeleton__play-trailer-btn skeleton-action-btn hover--darken skeleton-covered">
        <svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.98 98.02">
            <path d="M33.06,99a9.17,9.17,0,0,1-4.39-1.19c-4.87-2.75-5.43-7.25-5.43-10.39V76H10.46A9.46,9.46,0,0,1,1,66.52V10.45A9.46,9.46,0,0,1,10.46,1H89.54A9.46,9.46,0,0,1,99,10.45V66.52A9.46,9.46,0,0,1,89.54,76H60.22C46.41,91.25,37.37,99,33.35,99h-.29ZM10.46,7.66a2.79,2.79,0,0,0-2.79,2.79V66.52a2.79,2.79,0,0,0,2.79,2.79H26.57a3.33,3.33,0,0,1,3.33,3.33V87.43c0,2.9.69,3.82,2.05,4.6a2.79,2.79,0,0,0,1.22.31c2.77-.78,14.18-12,23.09-21.92a3.32,3.32,0,0,1,2.48-1.11h30.8a2.79,2.79,0,0,0,2.79-2.79V10.45a2.79,2.79,0,0,0-2.79-2.79ZM76.78,30.57a3.33,3.33,0,0,0-3.33-3.33H26.56a3.33,3.33,0,1,0,0,6.66H73.45A3.33,3.33,0,0,0,76.78,30.57Zm0,16.43a3.33,3.33,0,0,0-3.33-3.33H26.56a3.33,3.33,0,0,0,0,6.66H73.45A3.33,3.33,0,0,0,76.78,47Z" transform="translate(-1.01 -0.99)"/>
        </svg>
        <p class="dot-separator">Comment</p>
      </div>
    </div>
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
  </div>
  </div>
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
  </dialog>`;

  private static templateSkeletonForFadeout = /* html */ `
  <dialog id="skeleton__container--fadeout" class="skeleton__container shown">
  <div id="skeleton--fadeout" class="skeleton">
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
      <div class="skeleton__action-buttons-container">
      <div class=" skeleton-action-btn hover--darken active skeleton-covered">
      <svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 80.81"><path d="M18.43,94.9A8.45,8.45,0,0,1,10,86.46V13.54a8.43,8.43,0,0,1,12.64-7.3L85.79,42.7h0a8.43,8.43,0,0,1,0,14.6L22.64,93.76A8.43,8.43,0,0,1,18.43,94.9Zm0-84.26A3,3,0,0,0,17,11a2.85,2.85,0,0,0-1.44,2.5V86.46A2.89,2.89,0,0,0,19.87,89L83,52.5a2.89,2.89,0,0,0,0-5L19.87,11A2.88,2.88,0,0,0,18.44,10.64Z" transform="translate(-10 -5.1) scale(0.9)"/></svg>
          <p class="dot-separator">Play Trailer</p>
      </div>
      <div class="skeleton-action-btn hover--darken skeleton-covered">
          <svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.25 98.25">
              <path d="M95.49,46.36H53.64V4.51a3.64,3.64,0,0,0-7.28,0V46.36H4.51a3.64,3.64,0,0,0,0,7.28H46.36V95.49a3.64,3.64,0,0,0,7.28,0V53.64H95.49a3.64,3.64,0,0,0,0-7.28Z" transform="translate(-0.88 -0.88)"/>
          </svg>
          <p class="dot-separator">Add to List</p>
      </div>
      <div class="skeleton-action-btn hover--darken skeleton-covered">
        <svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.98 98.02">
            <path d="M33.06,99a9.17,9.17,0,0,1-4.39-1.19c-4.87-2.75-5.43-7.25-5.43-10.39V76H10.46A9.46,9.46,0,0,1,1,66.52V10.45A9.46,9.46,0,0,1,10.46,1H89.54A9.46,9.46,0,0,1,99,10.45V66.52A9.46,9.46,0,0,1,89.54,76H60.22C46.41,91.25,37.37,99,33.35,99h-.29ZM10.46,7.66a2.79,2.79,0,0,0-2.79,2.79V66.52a2.79,2.79,0,0,0,2.79,2.79H26.57a3.33,3.33,0,0,1,3.33,3.33V87.43c0,2.9.69,3.82,2.05,4.6a2.79,2.79,0,0,0,1.22.31c2.77-.78,14.18-12,23.09-21.92a3.32,3.32,0,0,1,2.48-1.11h30.8a2.79,2.79,0,0,0,2.79-2.79V10.45a2.79,2.79,0,0,0-2.79-2.79ZM76.78,30.57a3.33,3.33,0,0,0-3.33-3.33H26.56a3.33,3.33,0,1,0,0,6.66H73.45A3.33,3.33,0,0,0,76.78,30.57Zm0,16.43a3.33,3.33,0,0,0-3.33-3.33H26.56a3.33,3.33,0,0,0,0,6.66H73.45A3.33,3.33,0,0,0,76.78,47Z" transform="translate(-1.01 -0.99)"/>
        </svg>
        <p class="dot-separator">Comment</p>
      </div>
    </div>
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
  </dialog>`;
}
