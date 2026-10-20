/**
 * Top-down vessel silhouette, bow pointing up (heading 0°).
 * Shared by the Leaflet pin (HTML string) and the React legend so they always match.
 */
export const SHIP_VIEWBOX = '0 0 20 36';
export const SHIP_HULL = 'M10 1 C14 5 16 10 16 15 V31 Q16 34 13 34 H7 Q4 34 4 31 V15 C4 10 6 5 10 1 Z';
export const SHIP_HATCHES = [
  { x: 7, y: 11, width: 6, height: 3 },
  { x: 7, y: 15.5, width: 6, height: 3 },
  { x: 7, y: 20, width: 6, height: 3 },
];
export const SHIP_BRIDGE = { x: 6, y: 25.5, width: 8, height: 4.5 };

/** SVG markup for use inside a Leaflet divIcon. */
export function shipSvgMarkup(color, { width = 18, height = 32 } = {}) {
  const hatches = SHIP_HATCHES.map(
    (h) => `<rect x="${h.x}" y="${h.y}" width="${h.width}" height="${h.height}" rx="0.8" fill="#ffffff" fill-opacity="0.35"/>`,
  ).join('');
  const b = SHIP_BRIDGE;
  return `<svg viewBox="${SHIP_VIEWBOX}" width="${width}" height="${height}" aria-hidden="true">
    <path d="${SHIP_HULL}" fill="${color}" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"/>
    ${hatches}
    <rect x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" rx="1" fill="#ffffff" fill-opacity="0.9"/>
  </svg>`;
}
