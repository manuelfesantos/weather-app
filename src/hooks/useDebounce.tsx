import { useCallback, useRef } from "react";

export const useDebounce = <Args extends unknown[]>(
  fn: (...args: Args) => void | Promise<void>,
  duration: number,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: Args) => {
      if (!timerRef.current) {
        fn(...args);
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
        }, duration);
      } else {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          fn(...args);
          timerRef.current = null;
        }, duration);
      }
    },
    [fn, duration],
  );
};
