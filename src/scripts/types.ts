export type PlaybackStatus = 'idle' | 'playing' | 'ended';

export type LoadedImage = {
  fileName: string;
  objectUrl: string;
};

export type AppState = {
  playbackStatus: PlaybackStatus;
  loadedImage: LoadedImage | null;
};

export type AppAction =
  | { type: 'image-selected'; image: LoadedImage }
  | { type: 'playback-started' }
  | { type: 'playback-ended' }
  | { type: 'image-cleared' };
