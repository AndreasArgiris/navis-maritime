import { useEffect } from 'react';

const DEFAULT_DURATION_MS = 1200;
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/** Clears the dash styles so later zooms (which change the line's length) can't cut it short. */
function resetDash(path) {
  path.style.transition = '';
  path.style.strokeDasharray = '';
  path.style.strokeDashoffset = '';
}

/**
 * Draws an SVG Leaflet line (ref to a react-leaflet Polyline) from its start whenever
 * `key` changes, using the classic dash-offset technique. Skipped for reduced motion.
 */
export function useLineDrawAnimation(lineRef, key, durationMs = DEFAULT_DURATION_MS) {
  useEffect(() => {
    const path = lineRef.current?.getElement?.();
    if (!path || typeof path.getTotalLength !== 'function' || prefersReducedMotion()) return undefined;

    const length = path.getTotalLength();
    path.style.transition = 'none';
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.getBoundingClientRect(); // commit the start state before transitioning
    path.style.transition = `stroke-dashoffset ${durationMs}ms ease-in-out`;
    path.style.strokeDashoffset = '0';

    const done = setTimeout(() => resetDash(path), durationMs + 50);
    return () => clearTimeout(done);
  }, [lineRef, key, durationMs]);
}
