import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/** Jumps the surrounding Leaflet map to show `path` whenever `key` changes. */
export function useFitMapToPath(path, key, { padding = [40, 40], maxZoom = 7 } = {}) {
  const map = useMap();
  useEffect(() => {
    if (path?.length) map.fitBounds(path, { padding, maxZoom, animate: false });
    // `key` decides when to refit; the path itself may be a new array on every render.
  }, [map, key]);
}
