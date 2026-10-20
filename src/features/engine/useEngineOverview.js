import { useSelector } from 'react-redux';
import { findMainEngineReading, selectEngine, selectEngineAlerts } from './engineSlice';

/** Engine data for a vessel plus what the page summary needs: alerts, running state and load. */
export function useEngineOverview(vesselId) {
  const engine = useSelector((state) => selectEngine(state, vesselId));
  const alerts = useSelector((state) => selectEngineAlerts(state, vesselId));
  if (!engine) return { engine: null, alerts };
  return {
    engine,
    alerts,
    isRunning: engine.mainEngine.status === 'running',
    loadReading: findMainEngineReading(engine, 'me-load'),
  };
}
