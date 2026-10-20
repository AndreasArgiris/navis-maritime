import { Col, Row } from 'react-bootstrap';
import { getDocumentStatus } from '../crewSlice';
import { formatDate } from '../../../shared/utils/format';
import Panel from '../../../shared/ui/Panel';
import InfoList from '../../../shared/ui/InfoList';
import StatusBadge from '../../../shared/ui/StatusBadge';

const listOrNone = (items, none) => (items.length ? items.join(', ') : none);

export default function CrewMedicalTab({ member }) {
  const { medical } = member;
  const examStatus = getDocumentStatus(medical.nextExam);

  return (
    <Row className="g-3">
      <Col lg={6}>
        <Panel title="Medical fitness" subtitle="Seafarer medical certificate">
          <InfoList
            items={[
              { label: 'Fitness', value: <StatusBadge status={medical.fitness} /> },
              { label: 'Certificate', value: <StatusBadge status={examStatus} /> },
              { label: 'Last examination', value: formatDate(medical.lastExam) },
              { label: 'Valid until', value: formatDate(medical.nextExam) },
              { label: 'Examined by', value: medical.examinedBy },
              { label: 'Restrictions', value: listOrNone(medical.restrictions, 'None') },
            ]}
          />
        </Panel>
      </Col>
      <Col lg={6}>
        <Panel title="Health record">
          <InfoList
            items={[
              { label: 'Blood type', value: medical.bloodType },
              { label: 'Height / weight', value: `${medical.heightCm} cm · ${medical.weightKg} kg` },
              { label: 'Allergies', value: listOrNone(medical.allergies, 'None known') },
              { label: 'Medical conditions', value: listOrNone(medical.conditions, 'None reported') },
            ]}
          />
        </Panel>
      </Col>
      <Col xs={12}>
        <Panel title="Vaccinations">
          <table className="table simple-table mb-0">
            <thead>
              <tr>
                <th scope="col">Vaccine</th>
                <th scope="col">Date given</th>
              </tr>
            </thead>
            <tbody>
              {medical.vaccinations.map((vaccination) => (
                <tr key={vaccination.name}>
                  <td className="fw-medium">{vaccination.name}</td>
                  <td>{formatDate(vaccination.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </Col>
    </Row>
  );
}
