import { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FiCompass } from 'react-icons/fi';
import { useCurrentVessel } from '../vessel/useCurrentVessel';
import DataTable from '../../shared/ui/DataTable';
import EmptyState from '../../shared/ui/EmptyState';
import Panel from '../../shared/ui/Panel';
import RouteLegend from './RouteLegend';
import RouteMap from './RouteMap';
import { useVoyageSelection } from './useVoyageSelection';
import { buildVoyageColumns } from './voyageColumns';
import VoyageDetails from './VoyageDetails';

export default function RouteHistoryPage() {
  const vessel = useCurrentVessel();
  const { voyages, selected, isLatestSelected, selectVoyage } = useVoyageSelection(vessel.id);
  const columns = useMemo(() => buildVoyageColumns(selectVoyage), [selectVoyage]);

  if (!selected) {
    return (
      <div className="panel">
        <EmptyState icon={FiCompass} title="No route history" message="No voyages recorded in the last 12 months." />
      </div>
    );
  }

  return (
    <>
      <Row className="g-3 mb-3">
        <Col xl={8}>
          <Panel
            title="Route map"
            subtitle={`${selected.voyageNo}: ${selected.from} → ${selected.to}. Pick a voyage below to draw it.`}
            bodyClassName="p-0"
          >
            <div className="route-map-wrapper">
              <RouteMap vessel={vessel} voyage={selected} showVessel={isLatestSelected} />
              <RouteLegend showRemaining={selected.status === 'in-progress'} />
            </div>
          </Panel>
        </Col>
        <Col xl={4}>
          <Panel title="Selected voyage">
            <VoyageDetails voyage={selected} />
          </Panel>
        </Col>
      </Row>

      <Panel title="Voyage log" subtitle="Last 12 months, newest first">
        <DataTable
          columns={columns}
          rows={voyages}
          caption="Voyage log"
          onRowClick={selectVoyage}
          rowClassName={(voyage) => (voyage.id === selected.id ? 'is-selected' : undefined)}
        />
      </Panel>
    </>
  );
}
