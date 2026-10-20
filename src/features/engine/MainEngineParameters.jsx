import { Col, Row } from 'react-bootstrap';
import Panel from '../../shared/ui/Panel';
import { isAbnormal } from './engineSlice';
import ReadingsTable from './ReadingsTable';

/** One panel per parameter group (fuel oil, lubrication…); groups with a fault are tagged "Check". */
export default function MainEngineParameters({ parameters }) {
  return (
    <Row className="g-3 mb-3">
      {parameters.map(({ group, readings }) => (
        <Col key={group} md={6} xl={4}>
          <Panel title={group} actions={readings.some(isAbnormal) ? <span className="badge-alert">Check</span> : null}>
            <ReadingsTable readings={readings} caption={`${group} readings`} />
          </Panel>
        </Col>
      ))}
    </Row>
  );
}
