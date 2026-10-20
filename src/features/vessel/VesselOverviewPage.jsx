import { Col, Row } from 'react-bootstrap';
import { formatNumber } from '../../shared/utils/format';
import Panel from '../../shared/ui/Panel';
import HorizontalBarChart from '../../shared/charts/HorizontalBarChart';
import TopSparePartsTable from '../spareParts/TopSparePartsTable';
import BudgetVsActualChart from './charts/BudgetVsActualChart';
import DistanceSailedChart from './charts/DistanceSailedChart';
import FuelConsumptionChart from './charts/FuelConsumptionChart';
import OperatingCostsChart from './charts/OperatingCostsChart';
import PositionCard from './PositionCard';
import TodaysSnapshot from './TodaysSnapshot';
import { useCurrentVessel } from './useCurrentVessel';
import { useVesselOverview } from './useVesselOverview';

export default function VesselOverviewPage() {
  const vessel = useCurrentVessel();
  const { metrics, inventoryStats, invoiceStats, crewStats, crewByDepartment, topParts, totalDistance } =
    useVesselOverview(vessel.id);

  return (
    <>
      <Row className="g-3 mb-3">
        <Col xl={7}>
          <TodaysSnapshot vessel={vessel} crewStats={crewStats} invoiceStats={invoiceStats} inventoryStats={inventoryStats} />
        </Col>
        <Col xl={5}>
          <Panel title="Fuel consumption" subtitle="Tonnes per month, last 12 months">
            <FuelConsumptionChart data={metrics.fuel} height={220} />
          </Panel>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col xl={5}>
          <Panel title="Operating costs" subtitle="Monthly spend by category">
            <OperatingCostsChart data={metrics.costs} />
          </Panel>
        </Col>
        <Col xl={4}>
          <Panel title="Distance sailed" subtitle={`${formatNumber(totalDistance)} nm in 12 months`}>
            <DistanceSailedChart data={metrics.distance} />
          </Panel>
        </Col>
        <Col xl={3}>
          <Panel title="Budget vs actual" subtitle="Year to date">
            <BudgetVsActualChart data={metrics.budget} />
          </Panel>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xl={6}>
          <Panel title="Top spare parts" subtitle="Most consumed in the last 12 months">
            <TopSparePartsTable parts={topParts} />
          </Panel>
        </Col>
        <Col md={6} xl={3}>
          <Panel title="Crew by department" subtitle={`${crewStats.total} people assigned`}>
            <HorizontalBarChart data={crewByDepartment} categoryKey="department" valueKey="count" valueLabel="Crew" />
          </Panel>
        </Col>
        <Col md={6} xl={3}>
          <Panel title="Position & weather">
            <PositionCard vessel={vessel} />
          </Panel>
        </Col>
      </Row>
    </>
  );
}
