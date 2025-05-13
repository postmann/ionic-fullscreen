import { useCallback, useMemo, useState } from "react";

export const useFullscreen = (element: HTMLElement | null | undefined) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestFullscreen = useCallback(async () => {
    try {
      await element?.requestFullscreen();
      setIsFullscreen(true);
    } catch (_) {
        console.error(_);
      setIsFullscreen(false);
    }
  }, [element]);

  const exitFullscreen = useCallback(async () => {
    try {
      await document.exitFullscreen();
      setIsFullscreen(false);
    } catch (_) {
      console.error("Unable to bring element to fullscreen", _);
    }
  }, []);

  const result = useMemo(
    () => ({
      requestFullscreen,
      exitFullscreen,
      isFullscreen,
    }),
    [exitFullscreen, isFullscreen, requestFullscreen],
  );

  if (!element) {
    return {
      requestFullscreen: async (): Promise<void> => {},
      exitFullscreen: async (): Promise<void> => {},
      isFullscreen: false,
    };
  }

  element.onfullscreenchange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
    }
  };

  return result;
};
