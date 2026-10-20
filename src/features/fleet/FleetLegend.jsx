import { VESSEL_STATUSES } from './vesselStatuses';
import { SHIP_BRIDGE, SHIP_HULL, SHIP_VIEWBOX } from './shipGlyph';

export function ShipGlyph({ color, width = 9, height = 16 }) {
  return (
    <svg viewBox={SHIP_VIEWBOX} width={width} height={height} aria-hidden="true">
      <path d={SHIP_HULL} fill={color} />
      <rect {...SHIP_BRIDGE} rx="1" fill="#ffffff" fillOpacity="0.9" />
    </svg>
  );
}

export default function FleetLegend() {
  return (
    <ul className="fleet-legend" aria-label="Map legend">
      {Object.entries(VESSEL_STATUSES).map(([key, { label, color }]) => (
        <li key={key}>
          <ShipGlyph color={color} />
          {label}
        </li>
      ))}
    </ul>
  );
}
