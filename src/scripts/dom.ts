import { fileInputAcceptValue } from './constants';
import { imageIconMarkup, playIconMarkup, uploadIconMarkup } from './icons';
import type { AppState } from './types';

const createUploadControl = (labelText: string): string => `
  <label class="button button--primary uploader" aria-label="${labelText}">
    ${uploadIconMarkup}
    <span class="button__label">${labelText}</span>
    <input class="uploader__input" type="file" accept="${fileInputAcceptValue}" />
  </label>
`;

const createHomeMarkup = (): string => `
  <main class="layout layout--home">
    <section class="panel panel--home" aria-labelledby="app-title" aria-describedby="app-description">
      <hgroup class="panel__heading">
        <h1 id="app-title" class="panel__title">Everything To Movie</h1>
        <p id="app-description" class="panel__description">One image. Eight seconds.</p>
      </hgroup>
      <div class="panel__actions">
        ${createUploadControl('画像を選択')}
      </div>
    </section>
  </main>
`;

const createPlayerMarkup = (state: AppState): string => `
  <main class="layout layout--player">
    <section class="player" aria-label="cinematic preview">
      <div class="player__viewport">
        <img
          class="player__image ${state.playbackStatus === 'playing' ? 'player__image--playing' : 'player__image--ended'}"
          src="${state.loadedImage?.objectUrl ?? ''}"
          alt=""
        />
        <div class="player__overlay player__overlay--top" aria-hidden="true"></div>
        <div class="player__overlay player__overlay--bottom" aria-hidden="true"></div>
        <div class="player__vignette" aria-hidden="true"></div>
        <div class="player__fade ${state.playbackStatus === 'playing' ? 'player__fade--playing' : 'player__fade--ended'}" aria-hidden="true"></div>
      </div>
      <div class="player__controls">
        <button class="button button--secondary js-replay" type="button">
          ${playIconMarkup}
          <span class="button__label">再生</span>
        </button>
        <label class="button button--secondary uploader" aria-label="別画像を選択">
          ${imageIconMarkup}
          <span class="button__label">別画像</span>
          <input class="uploader__input" type="file" accept="${fileInputAcceptValue}" />
        </label>
      </div>
    </section>
  </main>
`;

export const renderApplication = (container: HTMLElement, state: AppState): void => {
  container.innerHTML = state.loadedImage === null ? createHomeMarkup() : createPlayerMarkup(state);
};

export const getFileInput = (container: HTMLElement): HTMLInputElement | null =>
  container.querySelector<HTMLInputElement>('.uploader__input');

export const getReplayButton = (container: HTMLElement): HTMLButtonElement | null =>
  container.querySelector<HTMLButtonElement>('.js-replay');
