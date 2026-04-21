import { playbackDurationMilliseconds } from './constants';
import { getFileInput, getReplayButton, renderApplication } from './dom';
import { readSelectedImage } from './fileSelection';
import { createPlaybackTimer } from './playbackTimer';
import { createInitialState, reduceState } from './state';
import type { AppState, LoadedImage } from './types';

const createApplicationStore = (initialState: AppState) => {
  const storeState: { currentState: AppState } = {
    currentState: initialState,
  };

  const getState = (): AppState => storeState.currentState;

  const setState = (nextState: AppState): AppState => {
    storeState.currentState = nextState;
    return storeState.currentState;
  };

  return {
    getState,
    setState,
  };
};

const revokeImageObjectUrl = (loadedImage: LoadedImage | null): void => {
  if (loadedImage !== null) {
    URL.revokeObjectURL(loadedImage.objectUrl);
  }
};

const bindFileSelection = (
  container: HTMLElement,
  onImageSelected: (image: LoadedImage) => void,
): void => {
  const fileInput = getFileInput(container);

  if (fileInput === null) {
    return;
  }

  fileInput.addEventListener('change', () => {
    const image = readSelectedImage(fileInput.files);

    if (image !== null) {
      onImageSelected(image);
    }
  });
};

const bindReplay = (container: HTMLElement, onReplay: () => void): void => {
  const replayButton = getReplayButton(container);

  if (replayButton === null) {
    return;
  }

  replayButton.addEventListener('click', onReplay);
};

export const createApplication = (container: HTMLElement | null): void => {
  if (container === null) {
    return;
  }

  const store = createApplicationStore(createInitialState());
  const playbackTimer = createPlaybackTimer(playbackDurationMilliseconds);

  const render = (): void => {
    renderApplication(container, store.getState());

    bindFileSelection(container, (image) => {
      const previousImage = store.getState().loadedImage;
      revokeImageObjectUrl(previousImage);
      store.setState(reduceState(store.getState(), { type: 'image-selected', image }));
      render();
      playbackTimer.schedule(() => {
        store.setState(reduceState(store.getState(), { type: 'playback-ended' }));
        render();
      });
    });

    bindReplay(container, () => {
      store.setState(reduceState(store.getState(), { type: 'playback-started' }));
      render();
      playbackTimer.schedule(() => {
        store.setState(reduceState(store.getState(), { type: 'playback-ended' }));
        render();
      });
    });
  };

  render();
};
