import { useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { createShipIcon } from '../fleet/shipIcon';
import { TILE_ATTRIBUTION, TILE_URL } from '../../shared/map/mapTiles';

/** Small static map centred on one vessel. */
export default function PositionMap({ vessel, zoom = 4 }) {
  const { lat, lng } = vessel.position;
  const icon = useMemo(() => createShipIcon(vessel.status, vessel.heading), [vessel.status, vessel.heading]);

  return (
    <MapContainer
      key={vessel.id}
      className="position-map"
      center={[lat, lng]}
      zoom={zoom}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      attributionControl={false}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <Marker position={[lat, lng]} icon={icon} title={vessel.name} interactive={false} />
    </MapContainer>
  );
}
