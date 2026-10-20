import L from 'leaflet';
import { VESSEL_STATUSES } from './vesselStatuses';
import { shipSvgMarkup } from './shipGlyph';

const ICON_SIZE = 40;

/** Leaflet divIcon: a vessel silhouette rotated to its heading and tinted by status. */
export function createShipIcon(status, heading = 0) {
  const { color } = VESSEL_STATUSES[status] ?? VESSEL_STATUSES.moored;
  const pulse = status === 'underway' ? '<span class="vessel-marker__pulse"></span>' : '';
  return L.divIcon({
    className: 'vessel-marker',
    html: `${pulse}<span class="vessel-marker__ship" style="transform: rotate(${heading}deg)">${shipSvgMarkup(color)}</span>`,
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [ICON_SIZE / 2, ICON_SIZE / 2],
  });
}
