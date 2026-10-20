import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { getReadingStatus } from './engineSlice';
import ReadingValue from './ReadingValue';
import { formatRange } from './readingFormat';

/** Summary of every out-of-range reading, or an all-clear message. */
export default function EngineAlerts({ alerts }) {
  if (alerts.length === 0) {
    return (
      <div className="engine-alerts engine-alerts--ok" role="status">
        <FiCheckCircle aria-hidden="true" /> All engine parameters are within normal range.
      </div>
    );
  }

  return (
    <section className="engine-alerts" aria-label="Engine alerts">
      <div className="engine-alerts__title">
        <FiAlertTriangle aria-hidden="true" /> {alerts.length} reading{alerts.length > 1 ? 's' : ''} outside normal range
      </div>
      <ul className="engine-alerts__list">
        {alerts.map((alert) => (
          <li key={alert.id}>
            <span className="engine-alerts__label">
              {alert.label}
              <span className="engine-alerts__source">{alert.source}</span>
            </span>
            <span className="engine-alerts__value">
              <ReadingValue reading={alert} />
              <span className="engine-alerts__range">
                {getReadingStatus(alert) === 'high' ? 'above' : 'below'} {formatRange(alert)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
