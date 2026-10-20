import { useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { TILE_ATTRIBUTION, TILE_URL } from '../../shared/map/mapTiles';
import WorldZoomLimit from '../../shared/map/WorldZoomLimit';
import { createShipIcon } from '../fleet/shipIcon';
import { fullRouteOf } from './voyagesSlice';
import VoyageTrack from './VoyageTrack';

// Poles are hard edges. Longitude is generous because date-line tracks are unwrapped past ±180°.
const ROUTE_BOUNDS = [
  [-85, -540],
  [85, 540],
];

/** Map of one voyage: its track, ports and (for the latest voyage) the vessel itself. */
export default function RouteMap({ vessel, voyage, showVessel }) {
  const icon = useMemo(() => createShipIcon(vessel.status, vessel.heading), [vessel.status, vessel.heading]);
  const vesselPosition = voyage.path[voyage.path.length - 1];

  return (
    <MapContainer
      key={vessel.id}
      className="route-map"
      bounds={fullRouteOf(voyage)}
      boundsOptions={{ padding: [40, 40] }}
      maxBounds={ROUTE_BOUNDS}
      maxBoundsViscosity={1}
      zoomSnap={0.25}
      scrollWheelZoom
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <WorldZoomLimit />
      <VoyageTrack voyage={voyage} />
      {showVessel && <Marker position={vesselPosition} icon={icon} title={vessel.name} interactive={false} />}
    </MapContainer>
  );
}
