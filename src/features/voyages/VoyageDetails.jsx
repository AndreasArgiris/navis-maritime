import { FiArrowRight } from 'react-icons/fi';
import { voyageDurationDays } from './voyagesSlice';
import { formatNumber } from '../../shared/utils/format';
import InfoList from '../../shared/ui/InfoList';
import StatusBadge from '../../shared/ui/StatusBadge';
import PortTime from './PortTime';

export default function VoyageDetails({ voyage }) {
  const inProgress = voyage.status === 'in-progress';
  return (
    <div className="voyage-details">
      <div className="voyage-details__route">
        <span>{voyage.from}</span>
        <FiArrowRight aria-hidden="true" />
        <span>{voyage.to}</span>
      </div>
      <div className="d-flex align-items-center gap-2 mb-3">
        <code>{voyage.voyageNo}</code>
        <StatusBadge status={voyage.status} />
      </div>
      <InfoList
        items={[
          {
            label: `Departed · ${voyage.from} time`,
            value: <PortTime value={voyage.departure} timeZone={voyage.departureTimeZone} />,
          },
          {
            label: `${inProgress ? 'ETA' : 'Arrived'} · ${voyage.to} time`,
            value: <PortTime value={inProgress ? voyage.eta : voyage.arrival} timeZone={voyage.arrivalTimeZone} />,
          },
          {
            label: inProgress ? 'Sailed so far' : 'Distance',
            value: inProgress
              ? `${formatNumber(voyage.distanceNm)} of ${formatNumber(voyage.plannedDistanceNm)} nm`
              : `${formatNumber(voyage.distanceNm)} nm`,
          },
          { label: 'Duration', value: `${voyageDurationDays(voyage).toFixed(1)} days` },
          { label: 'Average speed', value: `${voyage.avgSpeed} kn` },
          { label: 'Condition', value: voyage.condition },
        ]}
      />
    </div>
  );
}
