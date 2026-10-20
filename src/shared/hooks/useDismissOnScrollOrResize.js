import { useEffect } from 'react';

/**
 * While `active`, calls `onDismiss` when the page scrolls or resizes, for overlays
 * positioned from a screen rectangle that would otherwise drift out of place.
 */
export function useDismissOnScrollOrResize(active, onDismiss) {
  useEffect(() => {
    if (!active) return undefined;
    window.addEventListener('scroll', onDismiss, { passive: true, capture: true });
    window.addEventListener('resize', onDismiss);
    return () => {
      window.removeEventListener('scroll', onDismiss, { capture: true });
      window.removeEventListener('resize', onDismiss);
    };
  }, [active, onDismiss]);
}
