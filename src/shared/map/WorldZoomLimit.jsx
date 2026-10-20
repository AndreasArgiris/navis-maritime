import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const TILE_SIZE = 256;

/**
 * Exact zoom at which the world (256 × 2^zoom px square) just fills a map of this
 * size: fully zoomed out you see the whole world edge to edge, with no empty
 * space around it. Fractional, so maps need a fractional `zoomSnap`. Rounded
 * up to 0.01 so no sliver of background shows.
 */
export function minZoomForSize({ x, y }) {
  return Math.max(0, Math.ceil(Math.log2(Math.max(x, y) / TILE_SIZE) * 100) / 100);
}

/** Keeps the map's minimum zoom in step with its size (recomputed on resize). */
export default function WorldZoomLimit() {
  const map = useMap();

  useEffect(() => {
    const apply = () => {
      const minZoom = minZoomForSize(map.getSize());
      map.setMinZoom(minZoom);
      if (map.getZoom() < minZoom) map.setZoom(minZoom);
    };
    apply();
    map.on('resize', apply);
    return () => {
      map.off('resize', apply);
    };
  }, [map]);

  return null;
}
