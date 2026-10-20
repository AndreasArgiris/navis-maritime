const EARTH_RADIUS_NM = 3440.065;
const toRad = (deg) => (deg * Math.PI) / 180;

/** Great-circle distance between two [lat, lng] points, in nautical miles. */
export function distanceNm([lat1, lng1], [lat2, lng2]) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_NM * Math.asin(Math.sqrt(a));
}

export function pathDistanceNm(path) {
  let total = 0;
  for (let i = 1; i < path.length; i += 1) total += distanceNm(path[i - 1], path[i]);
  return total;
}

/**
 * Shifts longitudes by ±360 so consecutive points never jump more than 180°.
 * Lets Leaflet draw routes across the date line instead of across the whole map.
 */
export function unwrapLongitudes(path) {
  if (path.length === 0) return path;
  const result = [path[0]];
  for (let i = 1; i < path.length; i += 1) {
    const [lat, lng] = path[i];
    const prevLng = result[i - 1][1];
    let adjusted = lng;
    while (adjusted - prevLng > 180) adjusted -= 360;
    while (adjusted - prevLng < -180) adjusted += 360;
    result.push([lat, adjusted]);
  }
  return result;
}

/** Squared planar distance from point p to segment a–b (good enough for picking the nearest leg segment). */
function segmentDistanceSq([py, px], [ay, ax], [by, bx]) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSq = dx * dx + dy * dy;
  const t = lengthSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSq));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return (px - cx) ** 2 + (py - cy) ** 2;
}

/** The part of `path` already sailed by a vessel at `position`: waypoints up to its segment, then the position. */
export function truncatePathAt(path, position) {
  let best = 0;
  let bestDistance = Infinity;
  for (let i = 0; i < path.length - 1; i += 1) {
    const d = segmentDistanceSq(position, path[i], path[i + 1]);
    if (d < bestDistance) {
      bestDistance = d;
      best = i;
    }
  }
  return [...path.slice(0, best + 1), position];
}
