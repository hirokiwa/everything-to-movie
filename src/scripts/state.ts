import type { AppAction, AppState } from './types';

const assertNever = (value: never): never => {
  throw new Error(`Unexpected action: ${JSON.stringify(value)}`);
};

export const createInitialState = (): AppState => ({
  playbackStatus: 'idle',
  loadedImage: null,
});

export const reduceState = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'image-selected':
      return {
        playbackStatus: 'playing',
        loadedImage: action.image,
      };
    case 'playback-started':
      return {
        ...state,
        playbackStatus: 'playing',
      };
    case 'playback-ended':
      return {
        ...state,
        playbackStatus: 'ended',
      };
    case 'image-cleared':
      return createInitialState();
  }

  return assertNever(action);
};
