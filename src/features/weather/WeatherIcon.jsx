import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiSprinkle,
  WiThunderstorm,
} from 'react-icons/wi';

const ICONS = {
  clear: WiDaySunny,
  partly: WiDayCloudy,
  cloudy: WiCloudy,
  fog: WiFog,
  drizzle: WiSprinkle,
  rain: WiRain,
  snow: WiSnow,
  storm: WiThunderstorm,
};

export default function WeatherIcon({ icon, className, size = 32 }) {
  const Icon = ICONS[icon] ?? WiCloudy;
  return <Icon className={className} size={size} aria-hidden="true" />;
}
