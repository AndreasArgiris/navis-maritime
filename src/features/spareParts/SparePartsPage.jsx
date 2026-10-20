import { Col, Row } from 'react-bootstrap';
import { FiAlertTriangle, FiBox, FiDollarSign, FiTool } from 'react-icons/fi';
import { useCurrentVessel } from '../vessel/useCurrentVessel';
import { formatCompactCurrency } from '../../shared/utils/format';
import Panel from '../../shared/ui/Panel';
import DataTable from '../../shared/ui/DataTable';
import SearchInput from '../../shared/ui/SearchInput';
import SelectFilter from '../../shared/ui/SelectFilter';
import StatCardRow from '../../shared/ui/StatCardRow';
import HorizontalBarChart from '../../shared/charts/HorizontalBarChart';
import { sparePartsColumns } from './sparePartsColumns';
import { useSparePartsList } from './useSparePartsList';

export default function SparePartsPage() {
  const vessel = useCurrentVessel();
  const { parts, systems, stats, valueBySystem, filters, setFilter } = useSparePartsList(vessel.id);

  return (
    <>
      <StatCardRow
        cards={[
          { icon: FiTool, tone: 'navy', label: 'Part types', value: stats.totalParts },
          { icon: FiBox, tone: 'teal', label: 'Units on board', value: stats.unitsOnBoard },
          { icon: FiAlertTriangle, tone: 'orange', label: 'Below minimum', value: stats.belowMinimum },
          { icon: FiDollarSign, tone: 'violet', label: 'Stock value', value: formatCompactCurrency(stats.totalValue) },
        ]}
      />

      <Row className="g-3">
        <Col xl={8}>
          <Panel
            title="Spare parts"
            subtitle="Critical spares register"
            actions={
              <div className="toolbar">
                <SearchInput
                  value={filters.query}
                  onChange={(value) => setFilter('query', value)}
                  label="Search spare parts"
                  placeholder="Name or part no…"
                />
                <SelectFilter
                  label="Filter by system"
                  allLabel="All systems"
                  options={systems}
                  value={filters.system}
                  onChange={(value) => setFilter('system', value)}
                />
              </div>
            }
          >
            <DataTable columns={sparePartsColumns} rows={parts} caption="Spare parts" />
          </Panel>
        </Col>
        <Col xl={4}>
          <Panel title="Stock value by system" subtitle="Units on board × unit cost">
            <HorizontalBarChart
              data={valueBySystem}
              categoryKey="system"
              valueKey="value"
              valueLabel="Value"
              formatValue={formatCompactCurrency}
            />
          </Panel>
        </Col>
      </Row>
    </>
  );
}
