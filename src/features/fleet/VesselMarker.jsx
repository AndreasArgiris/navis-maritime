import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import { createShipIcon } from './shipIcon';

/**
 * One vessel pin. Hover reports the pin's screen rectangle so the tooltip can be
 * rendered outside the map (see FleetMap).
 */
export default function VesselMarker({ vessel, onSelect, onHover, onLeave }) {
  const { lat, lng } = vessel.position;

  const icon = useMemo(() => createShipIcon(vessel.status, vessel.heading), [vessel.status, vessel.heading]);

  const eventHandlers = useMemo(
    () => ({
      mouseover: (event) => onHover(vessel.id, event.target.getElement().getBoundingClientRect()),
      mouseout: () => onLeave(vessel.id),
      click: () => onSelect(vessel.id),
    }),
    [onSelect, onHover, onLeave, vessel.id],
  );

  return <Marker position={[lat, lng]} icon={icon} eventHandlers={eventHandlers} title={vessel.name} keyboard />;
}
