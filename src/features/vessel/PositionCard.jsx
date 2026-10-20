import { useVesselWeather } from '../weather/useVesselWeather';
import { formatCoordinates } from '../../shared/utils/format';
import PositionMap from './PositionMap';
import WeatherSummary from '../weather/WeatherSummary';

/** Mini map of the vessel's last position plus current sea conditions. */
export default function PositionCard({ vessel }) {
  const weather = useVesselWeather(vessel);

  return (
    <div className="position-card">
      <PositionMap vessel={vessel} />
      <div className="position-card__location">
        <span className="fw-medium">{vessel.locationName}</span>
        <span className="text-muted small">{formatCoordinates(vessel.position)}</span>
      </div>
      <WeatherSummary weather={weather} />
    </div>
  );
}
