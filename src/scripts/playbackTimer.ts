export const createPlaybackTimer = (durationMilliseconds: number) => {
  const timerState: { timeoutIdentifier: number | null } = {
    timeoutIdentifier: null,
  };

  const clear = (): void => {
    if (timerState.timeoutIdentifier !== null) {
      window.clearTimeout(timerState.timeoutIdentifier);
      timerState.timeoutIdentifier = null;
    }
  };

  const schedule = (onComplete: () => void): void => {
    clear();
    timerState.timeoutIdentifier = window.setTimeout(() => {
      timerState.timeoutIdentifier = null;
      onComplete();
    }, durationMilliseconds);
  };

  return {
    clear,
    schedule,
  };
};
