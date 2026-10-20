import { useCallback } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { TILE_ATTRIBUTION, TILE_URL } from '../../shared/map/mapTiles';
import WorldZoomLimit from '../../shared/map/WorldZoomLimit';
import { useMarkerHover } from './useMarkerHover';
import VesselHoverCard from './VesselHoverCard';
import VesselMarker from './VesselMarker';

const WORLD_BOUNDS = [
  [-85, -220],
  [85, 220],
];

/** Hides the tooltip when the map moves, since the pin's screen position changes. */
function HideOnMapMove({ onMove }) {
  useMapEvents({ movestart: onMove, zoomstart: onMove });
  return null;
}

/** World map with one interactive pin per vessel. */
export default function FleetMap({ vessels, onSelectVessel, children }) {
  const { hovered, showHover, hideHover, clearHover } = useMarkerHover();
  const selectVessel = useCallback(
    (vesselId) => {
      clearHover();
      onSelectVessel(vesselId);
    },
    [clearHover, onSelectVessel],
  );
  const hoveredVessel = hovered && vessels.find((vessel) => vessel.id === hovered.vesselId);

  return (
    <>
      <MapContainer
        className="fleet-map"
        center={[20, 10]}
        zoom={2}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1}
        zoomSnap={0.25}
        worldCopyJump
        scrollWheelZoom
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        <WorldZoomLimit />
        <HideOnMapMove onMove={clearHover} />
        {vessels.map((vessel) => (
          <VesselMarker key={vessel.id} vessel={vessel} onSelect={selectVessel} onHover={showHover} onLeave={hideHover} />
        ))}
        {children}
      </MapContainer>
      {hoveredVessel && <VesselHoverCard vessel={hoveredVessel} anchorRect={hovered.rect} />}
    </>
  );
}
