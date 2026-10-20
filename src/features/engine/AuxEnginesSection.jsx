import { Col, Row } from 'react-bootstrap';
import AuxEngineCard from './AuxEngineCard';

export default function AuxEnginesSection({ auxEngines }) {
  return (
    <Row className="g-3 mb-3">
      {auxEngines.map((auxEngine) => (
        <Col key={auxEngine.id} lg={4}>
          <div className="panel">
            <AuxEngineCard engine={auxEngine} />
          </div>
        </Col>
      ))}
    </Row>
  );
}
