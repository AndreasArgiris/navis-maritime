import FloatingTooltip from '../../shared/ui/FloatingTooltip';
import { useVesselWeather } from '../weather/useVesselWeather';
import VesselTooltip from './VesselTooltip';

/** The vessel tooltip, floating next to the hovered pin. */
export default function VesselHoverCard({ vessel, anchorRect }) {
  const weather = useVesselWeather(vessel);
  return (
    <FloatingTooltip anchorRect={anchorRect} width={300} estimatedHeight={310}>
      <VesselTooltip vessel={vessel} weather={weather} />
    </FloatingTooltip>
  );
}
