import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { formatDate, formatNumber } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';

export default function VesselHeader({ vessel }) {
  const facts = [
    { label: 'Route', value: `${vessel.origin} → ${vessel.destination}` },
    { label: 'Speed', value: vessel.speed > 0 ? `${vessel.speed} kn` : 'Stationary' },
    { label: 'ETA', value: vessel.eta ? formatDate(vessel.eta) : '—' },
    { label: 'DWT', value: `${formatNumber(vessel.dwt)} t` },
  ];

  return (
    <div className="vessel-header">
      <Link to="/" className="vessel-header__back">
        <FiArrowLeft aria-hidden="true" /> Fleet map
      </Link>
      <div className="vessel-header__main">
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h1 className="vessel-header__name">{vessel.name}</h1>
            <StatusBadge status={vessel.status} />
          </div>
          <p className="vessel-header__meta">
            {vessel.type} · IMO {vessel.imo} · {vessel.flag} flag · Built {vessel.built}
          </p>
        </div>
        <dl className="vessel-header__facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
