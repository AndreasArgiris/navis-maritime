import { formatNumber } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';
import PortTime from './PortTime';
import { voyageDurationDays } from './voyagesSlice';

function ArrivalTime({ voyage }) {
  if (voyage.arrival) return <PortTime value={voyage.arrival} timeZone={voyage.arrivalTimeZone} />;
  return (
    <span className="text-muted">
      <PortTime value={voyage.eta} timeZone={voyage.arrivalTimeZone} prefix="ETA" />
    </span>
  );
}

/** DataTable columns for the voyage log. The voyage number is a button that draws it on the map. */
export function buildVoyageColumns(onSelectVoyage) {
  return [
    {
      key: 'voyageNo',
      header: 'Voyage',
      sortable: true,
      render: (voyage) => (
        <button
          type="button"
          className="link-button"
          onClick={() => onSelectVoyage(voyage)}
          aria-label={`Show voyage ${voyage.voyageNo} on map`}
        >
          <code>{voyage.voyageNo}</code>
        </button>
      ),
    },
    {
      key: 'route',
      header: 'Route',
      render: (voyage) => (
        <span className="text-nowrap">
          {voyage.from} → {voyage.to}
        </span>
      ),
    },
    {
      key: 'departure',
      header: 'Departed (local)',
      sortable: true,
      render: (voyage) => <PortTime value={voyage.departure} timeZone={voyage.departureTimeZone} />,
    },
    { key: 'arrival', header: 'Arrived (local)', sortable: true, render: (voyage) => <ArrivalTime voyage={voyage} /> },
    {
      key: 'distanceNm',
      header: 'Distance',
      sortable: true,
      align: 'end',
      render: (voyage) => `${formatNumber(voyage.distanceNm)} nm`,
    },
    {
      key: 'duration',
      header: 'Days',
      sortable: true,
      align: 'end',
      sortValue: (voyage) => voyageDurationDays(voyage),
      render: (voyage) => voyageDurationDays(voyage).toFixed(1),
    },
    { key: 'avgSpeed', header: 'Avg speed', sortable: true, align: 'end', render: (voyage) => `${voyage.avgSpeed} kn` },
    { key: 'condition', header: 'Condition', sortable: true },
    { key: 'status', header: 'Status', render: (voyage) => <StatusBadge status={voyage.status} /> },
  ];
}
