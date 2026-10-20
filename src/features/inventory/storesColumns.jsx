import { formatDate, formatNumber } from '../../shared/utils/format';
import LevelBar from '../../shared/ui/LevelBar';
import StatusBadge from '../../shared/ui/StatusBadge';
import { getStockStatus } from './inventorySlice';

function StockLevel({ item }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <LevelBar
        value={item.quantity}
        max={item.minLevel * 2}
        tone={getStockStatus(item) === 'ok' ? 'navy' : 'danger'}
        label={`${item.name} stock level`}
      />
      <span className="small text-muted text-nowrap">min {formatNumber(item.minLevel)}</span>
    </div>
  );
}

/** DataTable columns for living supplies and ship stores. */
export const storesColumns = [
  {
    key: 'name',
    header: 'Item',
    sortable: true,
    render: (item) => (
      <>
        <div className="fw-medium">{item.name}</div>
        <div className="small text-muted">{item.location}</div>
      </>
    ),
  },
  { key: 'category', header: 'Category', sortable: true },
  {
    key: 'quantity',
    header: 'On hand',
    sortable: true,
    align: 'end',
    render: (item) => `${formatNumber(item.quantity)} ${item.unit}`,
  },
  { key: 'level', header: 'Level vs minimum', render: (item) => <StockLevel item={item} /> },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: getStockStatus,
    render: (item) => <StatusBadge status={getStockStatus(item)} />,
  },
  { key: 'lastUpdated', header: 'Updated', sortable: true, render: (item) => formatDate(item.lastUpdated) },
];
