import { FiMapPin, FiNavigation } from 'react-icons/fi';
import { formatCoordinates } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';
import WeatherSummary from '../weather/WeatherSummary';

/** Hover card for a vessel pin: identity, position and current weather. */
export default function VesselTooltip({ vessel, weather }) {
  return (
    <div className="vessel-tooltip__card">
      <div className="vessel-tooltip__header">
        <div>
          <div className="vessel-tooltip__name">{vessel.name}</div>
          <div className="vessel-tooltip__type">
            {vessel.type} · IMO {vessel.imo}
          </div>
        </div>
        <StatusBadge status={vessel.status} />
      </div>

      <div className="vessel-tooltip__row">
        <FiMapPin aria-hidden="true" />
        <span>
          {vessel.locationName}
          <span className="vessel-tooltip__coords">{formatCoordinates(vessel.position)}</span>
        </span>
      </div>
      <div className="vessel-tooltip__row">
        <FiNavigation aria-hidden="true" />
        <span>
          {vessel.speed > 0 ? `${vessel.speed} kn · ${vessel.heading}°` : 'Stationary'} → {vessel.destination}
        </span>
      </div>

      <WeatherSummary weather={weather} compact />

      <div className="vessel-tooltip__cta">Click the pin to open the vessel dashboard</div>
    </div>
  );
}
