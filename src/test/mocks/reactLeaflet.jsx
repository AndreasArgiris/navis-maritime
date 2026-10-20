import { forwardRef } from 'react';

/**
 * Lightweight stand-in for react-leaflet: Leaflet needs real layout/canvas APIs
 * that jsdom does not provide. Markers render as buttons wired to the same
 * event handlers so hover/click behaviour stays testable.
 */
export const MapContainer = ({ children, className }) => (
  <div data-testid="map" className={className}>
    {children}
  </div>
);

export const TileLayer = () => null;

// Mimics a Leaflet event: `event.target.getElement()` returns the marker's DOM node.
const leafletEvent = (domEvent) => {
  const element = domEvent.currentTarget;
  return { target: { getElement: () => element } };
};

export const Marker = ({ title, eventHandlers = {}, children }) => (
  <div data-testid="marker">
    <button
      type="button"
      onMouseEnter={(e) => eventHandlers.mouseover?.(leafletEvent(e))}
      onMouseLeave={(e) => eventHandlers.mouseout?.(leafletEvent(e))}
      onClick={(e) => eventHandlers.click?.(leafletEvent(e))}
    >
      {title}
    </button>
    {children}
  </div>
);

export const Tooltip = ({ children }) => <div role="tooltip">{children}</div>;

export const useMapEvents = () => null;

export const Polyline = forwardRef(({ positions, pathOptions = {}, eventHandlers = {} }, ref) => (
  <div
    ref={ref}
    data-testid="route-line"
    data-selected={pathOptions.weight > 3 ? 'true' : 'false'}
    data-points={positions.length}
    onClick={eventHandlers.click}
  />
));

export const CircleMarker = ({ children }) => <div data-testid="port-marker">{children}</div>;

export const useMap = () => ({
  fitBounds: () => {},
  getSize: () => ({ x: 1000, y: 480 }),
  getZoom: () => 2,
  setZoom: () => {},
  setMinZoom: () => {},
  on: () => {},
  off: () => {},
});
