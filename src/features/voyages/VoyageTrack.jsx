import { useRef } from 'react';
import { CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import { useFitMapToPath } from '../../shared/map/useFitMapToPath';
import { useLineDrawAnimation } from '../../shared/map/useLineDrawAnimation';
import { fullRouteOf, remainingRouteOf, voyagePortsOf } from './voyagesSlice';

const COLORS = {
  track: '#2F4FB5',
  planned: '#0F9480',
  port: '#093274',
};

/** One voyage on the map: the route sailed (drawn in on selection), what's left, and both ports. */
export default function VoyageTrack({ voyage }) {
  const lineRef = useRef(null);
  // Fit first, then draw: effects run in this order, and the draw measures the fitted line.
  useFitMapToPath(fullRouteOf(voyage), voyage.id);
  useLineDrawAnimation(lineRef, voyage.id);

  const remaining = remainingRouteOf(voyage);

  return (
    <>
      {remaining && (
        <Polyline positions={remaining} pathOptions={{ color: COLORS.planned, weight: 2, dashArray: '6 8', opacity: 0.9 }} />
      )}
      <Polyline ref={lineRef} positions={voyage.path} pathOptions={{ color: COLORS.track, weight: 4, lineCap: 'round' }} />
      {voyagePortsOf(voyage).map((port) => (
        <CircleMarker
          key={port.role}
          center={port.position}
          radius={6}
          pathOptions={{ color: COLORS.port, weight: 2, fillColor: '#ffffff', fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -6]} permanent>
            {port.role}: {port.name}
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}
