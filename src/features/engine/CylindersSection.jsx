import { Col, Row } from 'react-bootstrap';
import Panel from '../../shared/ui/Panel';
import CylinderTable from './CylinderTable';
import ExhaustTempChart from './ExhaustTempChart';

export default function CylindersSection({ cylinders }) {
  return (
    <Row className="g-3 mb-3">
      <Col xl={7}>
        <Panel title="Cylinders" subtitle="Exhaust temperature, compression and peak pressure">
          <CylinderTable cylinders={cylinders} />
        </Panel>
      </Col>
      <Col xl={5}>
        <Panel title="Exhaust temperature by cylinder" subtitle="°C, with normal limits">
          <ExhaustTempChart cylinders={cylinders} />
        </Panel>
      </Col>
    </Row>
  );
}
