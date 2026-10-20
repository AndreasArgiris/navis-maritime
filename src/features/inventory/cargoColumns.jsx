import { FiThermometer } from 'react-icons/fi';
import { formatDate, formatNumber, formatTonnes } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';

/** Dangerous-goods class and carriage temperature, or "General". */
function CargoHandling({ lot }) {
  const isGeneral = !lot.imoClass && lot.temperature == null;
  return (
    <div className="d-flex flex-column align-items-start gap-1">
      {lot.imoClass && (
        <>
          <StatusBadge status="hazardous" />
          <span className="small text-muted">IMO class {lot.imoClass}</span>
        </>
      )}
      {lot.temperature != null && (
        <span className="small text-nowrap">
          <FiThermometer aria-hidden="true" /> {lot.temperature}°C
        </span>
      )}
      {isGeneral && <span className="small text-muted">General</span>}
    </div>
  );
}

/** DataTable columns for the cargo manifest. */
export const cargoColumns = [
  {
    key: 'description',
    header: 'Cargo',
    sortable: true,
    render: (lot) => (
      <div className="cargo-cell">
        <div className="fw-medium">{lot.description}</div>
        <div className="small text-muted">
          {lot.billOfLading} · {lot.shipper}
        </div>
      </div>
    ),
  },
  { key: 'cargoType', header: 'Type', sortable: true },
  {
    key: 'quantity',
    header: 'Quantity',
    sortable: true,
    align: 'end',
    render: (lot) => `${formatNumber(lot.quantity)} ${lot.unit}`,
  },
  { key: 'weightTonnes', header: 'Weight', sortable: true, align: 'end', render: (lot) => formatTonnes(lot.weightTonnes) },
  { key: 'stowage', header: 'Stowage', sortable: true },
  { key: 'handling', header: 'Handling', render: (lot) => <CargoHandling lot={lot} /> },
  { key: 'loadedOn', header: 'Loaded', sortable: true, render: (lot) => formatDate(lot.loadedOn) },
];
