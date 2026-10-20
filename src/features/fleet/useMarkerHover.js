import { useCallback, useState } from 'react';
import { useDismissOnScrollOrResize } from '../../shared/hooks/useDismissOnScrollOrResize';

/**
 * Which vessel pin is hovered, and where it is on screen.
 * The hover clears on scroll / resize, since the saved screen position would be stale.
 */
export function useMarkerHover() {
  const [hovered, setHovered] = useState(null); // { vesselId, rect }

  const showHover = useCallback((vesselId, rect) => setHovered({ vesselId, rect }), []);
  // Only clear if the pointer left the pin that is currently shown.
  const hideHover = useCallback(
    (vesselId) => setHovered((current) => (current?.vesselId === vesselId ? null : current)),
    [],
  );
  const clearHover = useCallback(() => setHovered(null), []);

  useDismissOnScrollOrResize(Boolean(hovered), clearHover);

  return { hovered, showHover, hideHover, clearHover };
}
