import { Col, Row } from 'react-bootstrap';
import { FiAnchor, FiNavigation, FiTool, FiTruck } from 'react-icons/fi';
import FilterPills from '../../shared/ui/FilterPills';
import PageHeader from '../../shared/ui/PageHeader';
import Panel from '../../shared/ui/Panel';
import StatCardRow from '../../shared/ui/StatCardRow';
import FleetLegend from './FleetLegend';
import FleetMap from './FleetMap';
import { useFleetOverview } from './useFleetOverview';
import VesselListPanel from './VesselListPanel';

export default function FleetMapPage() {
  const { vessels, stats, statusFilter, statusOptions, changeStatusFilter, openVessel } = useFleetOverview();

  return (
    <>
      <PageHeader title="Fleet Overview" subtitle={`Positions for ${stats.total} vessels`} />

      <StatCardRow
        cards={[
          { icon: FiTruck, tone: 'navy', label: 'Total vessels', value: stats.total },
          { icon: FiNavigation, tone: 'teal', label: 'Underway', value: stats.underway },
          { icon: FiAnchor, tone: 'violet', label: 'In port / at anchor', value: stats.anchored + stats.moored },
          { icon: FiTool, tone: 'orange', label: 'In maintenance', value: stats.maintenance },
        ]}
      />

      <Row className="g-3">
        <Col xl={9}>
          <Panel
            title="World map"
            subtitle="Hover a vessel for position & weather, click to open its dashboard"
            actions={
              <FilterPills
                label="Filter vessels by status"
                options={statusOptions}
                value={statusFilter}
                onChange={changeStatusFilter}
                layoutId="fleet-status-filter"
              />
            }
            bodyClassName="p-0 position-relative"
          >
            <div className="fleet-map-wrapper">
              <FleetMap vessels={vessels} onSelectVessel={openVessel} />
              <FleetLegend />
            </div>
          </Panel>
        </Col>
        <Col xl={3}>
          <Panel title="Vessels" subtitle={`${vessels.length} shown`} bodyClassName="p-0">
            <VesselListPanel vessels={vessels} />
          </Panel>
        </Col>
      </Row>
    </>
  );
}
