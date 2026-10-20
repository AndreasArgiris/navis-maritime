import { formatNumber } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';
import ReadingsTable from './ReadingsTable';

export default function AuxEngineCard({ engine }) {
  const isRunning = engine.status === 'running';
  return (
    <article className="aux-engine">
      <header className="aux-engine__header">
        <div>
          <div className="fw-medium">{engine.name}</div>
          <div className="small text-muted">
            {formatNumber(engine.ratedKw)} kW · {formatNumber(engine.runningHours)} h
          </div>
        </div>
        <StatusBadge status={engine.status} />
      </header>
      {isRunning ? (
        <ReadingsTable readings={engine.readings} caption={`${engine.name} readings`} />
      ) : (
        <p className="aux-engine__idle">
          {engine.status === 'maintenance' ? 'Under maintenance. No live readings.' : 'On standby. Starts automatically on demand.'}
        </p>
      )}
    </article>
  );
}
