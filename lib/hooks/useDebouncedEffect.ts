import { useEffect, useRef } from "react";

const DEFAULT_DELAY_MS = 400;

/**
 * Runs `callback` after `delayMs` when `deps` change.
 * Skips the first run (mount) so URL/hydration is not overwritten.
 */
export function useDebouncedEffect(
  callback: () => void,
  deps: React.DependencyList,
  delayMs = DEFAULT_DELAY_MS,
) {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const id = window.setTimeout(callback, delayMs);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls deps
  }, deps);
}
