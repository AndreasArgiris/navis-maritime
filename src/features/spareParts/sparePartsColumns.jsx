import { formatCurrency, formatDate } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';
import { getPartStockStatus } from './sparePartsSlice';

/** Worst first when sorting by status. */
const STATUS_SORT_ORDER = { out: 0, low: 1, ok: 2 };

/** DataTable columns for the spare parts register. */
export const sparePartsColumns = [
  { key: 'partNumber', header: 'Part no.', sortable: true, render: (part) => <code>{part.partNumber}</code> },
  {
    key: 'name',
    header: 'Part',
    sortable: true,
    render: (part) => (
      <>
        <div className="fw-medium">{part.name}</div>
        <div className="small text-muted">{part.maker}</div>
      </>
    ),
  },
  { key: 'system', header: 'System', sortable: true },
  {
    key: 'onBoard',
    header: 'On board / min',
    sortable: true,
    align: 'end',
    render: (part) => `${part.onBoard} / ${part.minRequired}`,
  },
  { key: 'unitCost', header: 'Unit cost', sortable: true, align: 'end', render: (part) => formatCurrency(part.unitCost) },
  { key: 'lastUsed', header: 'Last used', sortable: true, render: (part) => formatDate(part.lastUsed) },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (part) => STATUS_SORT_ORDER[getPartStockStatus(part)],
    render: (part) => <StatusBadge status={getPartStockStatus(part)} />,
  },
];
