import { describeSeaState, describeWeatherCode, toCompass } from './weatherConditions';
import WeatherIcon from './WeatherIcon';

/** Sea conditions: { temperature, weatherCode, windSpeed, windDirection, waveHeight }. */
export default function WeatherSummary({ weather, compact = false }) {
  if (!weather) return null;

  const { temperature, weatherCode, windSpeed, windDirection, waveHeight } = weather;
  const { label, icon } = describeWeatherCode(weatherCode);
  const seaState = describeSeaState(waveHeight);

  return (
    <div className={`weather-summary ${compact ? 'weather-summary--compact' : ''}`}>
      <div className="weather-summary__main">
        <WeatherIcon icon={icon} size={compact ? 30 : 44} className="weather-summary__icon" />
        <div>
          <div className="weather-summary__temp">{Math.round(temperature)}°C</div>
          <div className="weather-summary__label">{label}</div>
        </div>
      </div>
      <dl className="weather-summary__facts">
        <div>
          <dt>Wind</dt>
          <dd>
            {Math.round(windSpeed)} kn {toCompass(windDirection)}
          </dd>
        </div>
        {waveHeight != null && (
          <div>
            <dt>Waves</dt>
            <dd>
              {waveHeight.toFixed(1)} m · {seaState}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
