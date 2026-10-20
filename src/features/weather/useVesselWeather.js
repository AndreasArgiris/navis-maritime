import { useMemo } from 'react';
import { generateWeather } from '../../data/generators';

/** Generated sea conditions at a vessel's position (stable within the hour). */
export function useVesselWeather(vessel) {
  const { id, position } = vessel;
  return useMemo(() => generateWeather(id, position.lat), [id, position.lat]);
}
