import { Form } from 'react-bootstrap';
import { FiAlertTriangle, FiGrid, FiPackage, FiSlash } from 'react-icons/fi';
import Panel from '../../shared/ui/Panel';
import DataTable from '../../shared/ui/DataTable';
import SearchInput from '../../shared/ui/SearchInput';
import SelectFilter from '../../shared/ui/SelectFilter';
import StatCardRow from '../../shared/ui/StatCardRow';
import { storesColumns } from './storesColumns';
import { useStoresList } from './useStoresList';

/** Stock table for one inventory group (living supplies or ship stores). */
export default function StoresPanel({ vessel, group, title, subtitle, itemLabel = 'Stock lines' }) {
  const { items, categories, stats, filters, setFilter } = useStoresList(vessel.id, group);

  return (
    <>
      <StatCardRow
        cards={[
          { icon: FiPackage, tone: 'navy', label: itemLabel, value: stats.totalItems },
          { icon: FiGrid, tone: 'teal', label: 'Categories', value: stats.categories },
          { icon: FiAlertTriangle, tone: 'orange', label: 'Below minimum', value: stats.lowStock },
          { icon: FiSlash, tone: 'violet', label: 'Out of stock', value: stats.outOfStock },
        ]}
      />

      <Panel
        title={title}
        subtitle={subtitle}
        actions={
          <div className="toolbar">
            <SearchInput
              value={filters.query}
              onChange={(value) => setFilter('query', value)}
              label={`Search ${title.toLowerCase()}`}
              placeholder="Search items…"
            />
            <SelectFilter
              label="Filter by category"
              allLabel="All categories"
              options={categories}
              value={filters.category}
              onChange={(value) => setFilter('category', value)}
            />
            <Form.Check
              type="switch"
              id={`low-stock-only-${group}`}
              label="Below minimum only"
              checked={filters.lowOnly}
              onChange={(event) => setFilter('lowOnly', event.target.checked)}
            />
          </div>
        }
      >
        <DataTable columns={storesColumns} rows={items} caption={title} />
      </Panel>
    </>
  );
}
