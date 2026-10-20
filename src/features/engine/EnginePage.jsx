import { Col, Row } from 'react-bootstrap';
import { useCurrentVessel } from '../vessel/useCurrentVessel';
import { formatDate } from '../../shared/utils/format';
import EmptyState from '../../shared/ui/EmptyState';
import AuxEnginesSection from './AuxEnginesSection';
import CylindersSection from './CylindersSection';
import EngineAlerts from './EngineAlerts';
import EngineSummaryCards from './EngineSummaryCards';
import MainEngineParameters from './MainEngineParameters';
import OilAnalysisPanel from './OilAnalysisPanel';
import TankLevelsPanel from './TankLevelsPanel';
import { useEngineOverview } from './useEngineOverview';

export default function EnginePage() {
  const vessel = useCurrentVessel();
  const { engine, alerts, isRunning, loadReading } = useEngineOverview(vessel.id);

  if (!engine) {
    return (
      <div className="panel">
        <EmptyState title="No engine data" message="This vessel is not reporting engine data." />
      </div>
    );
  }

  return (
    <>
      <EngineSummaryCards
        mainEngine={engine.mainEngine}
        isRunning={isRunning}
        loadReading={loadReading}
        alertCount={alerts.length}
      />
      {!isRunning && (
        <p className="engine-note">
          Main engine stopped. Showing the last readings, recorded at sea on {formatDate(engine.mainEngine.lastRun)}.
        </p>
      )}
      <div className="mb-3">
        <EngineAlerts alerts={alerts} />
      </div>

      <h2 className="section-title">Main engine</h2>
      <MainEngineParameters parameters={engine.parameters} />
      <CylindersSection cylinders={engine.cylinders} />

      <h2 className="section-title">Auxiliary engines</h2>
      <AuxEnginesSection auxEngines={engine.auxEngines} />

      <h2 className="section-title">Oils & tanks</h2>
      <Row className="g-3">
        <Col xl={8}>
          <OilAnalysisPanel samples={engine.oilAnalysis} />
        </Col>
        <Col xl={4}>
          <TankLevelsPanel tanks={engine.tanks} />
        </Col>
      </Row>
    </>
  );
}
