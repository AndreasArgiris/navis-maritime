import { Col, Row } from 'react-bootstrap';
import { FiAlertTriangle, FiBox, FiThermometer } from 'react-icons/fi';
import { GiWeight } from 'react-icons/gi';
import { formatTonnes, percent } from '../../shared/utils/format';
import Panel from '../../shared/ui/Panel';
import DataTable from '../../shared/ui/DataTable';
import SearchInput from '../../shared/ui/SearchInput';
import SelectFilter from '../../shared/ui/SelectFilter';
import StatCardRow from '../../shared/ui/StatCardRow';
import HorizontalBarChart from '../../shared/charts/HorizontalBarChart';
import { cargoColumns } from './cargoColumns';
import NoCargoOnBoard from './NoCargoOnBoard';
import { useCargoManifest } from './useCargoManifest';

/** Commercial cargo currently on board. */
export default function CargoPanel({ vessel }) {
  const { hasCargo, lots, stats, cargoTypes, weightByCommodity, filters, setFilter } = useCargoManifest(vessel.id);

  if (!hasCargo) return <NoCargoOnBoard vessel={vessel} />;

  return (
    <>
      <StatCardRow
        cards={[
          { icon: FiBox, tone: 'navy', label: 'Cargo lots', value: stats.lots },
          {
            icon: GiWeight,
            tone: 'teal',
            label: 'Cargo weight',
            value: formatTonnes(stats.totalWeight),
            hint: `${percent(stats.totalWeight, vessel.dwt)}% of deadweight`,
          },
          { icon: FiAlertTriangle, tone: 'orange', label: 'Dangerous goods', value: stats.hazardousLots },
          { icon: FiThermometer, tone: 'violet', label: 'Temperature controlled', value: stats.temperatureControlled },
        ]}
      />

      <Row className="g-3">
        <Col xl={8}>
          <Panel
            title="Cargo manifest"
            subtitle={`Loaded at ${vessel.origin} · discharging at ${vessel.destination}`}
            actions={
              <div className="toolbar">
                <SearchInput
                  value={filters.query}
                  onChange={(value) => setFilter('query', value)}
                  label="Search cargo"
                  placeholder="Cargo, B/L or shipper…"
                />
                <SelectFilter
                  label="Filter by cargo type"
                  allLabel="All cargo types"
                  options={cargoTypes}
                  value={filters.cargoType}
                  onChange={(value) => setFilter('cargoType', value)}
                />
              </div>
            }
          >
            <DataTable columns={cargoColumns} rows={lots} caption="Cargo manifest" />
          </Panel>
        </Col>
        <Col xl={4}>
          <Panel title="Weight by commodity" subtitle="Tonnes on board">
            <HorizontalBarChart
              data={weightByCommodity}
              categoryKey="commodity"
              valueKey="weight"
              valueLabel="Weight"
              formatValue={formatTonnes}
            />
          </Panel>
        </Col>
      </Row>
    </>
  );
}
