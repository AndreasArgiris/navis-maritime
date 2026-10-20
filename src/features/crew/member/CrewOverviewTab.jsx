import { Col, Row } from 'react-bootstrap';
import { getDocumentStatus } from '../crewSlice';
import { ageFrom } from '../../../shared/utils/dates';
import { formatDate } from '../../../shared/utils/format';
import Panel from '../../../shared/ui/Panel';
import InfoList from '../../../shared/ui/InfoList';
import StatusBadge from '../../../shared/ui/StatusBadge';

function DocumentValue({ document }) {
  return (
    <span className="d-inline-flex flex-wrap align-items-center gap-2">
      <span>
        {document.number} · expires {formatDate(document.expires)}
      </span>
      <StatusBadge status={getDocumentStatus(document.expires)} />
    </span>
  );
}

export default function CrewOverviewTab({ member }) {
  return (
    <Row className="g-3">
      <Col lg={6}>
        <Panel title="Personal information">
          <InfoList
            items={[
              { label: 'Full name', value: member.name },
              { label: 'Gender', value: member.gender },
              { label: 'Date of birth', value: formatDate(member.dateOfBirth) },
              { label: 'Age', value: `${ageFrom(member.dateOfBirth)} years` },
              { label: 'Nationality', value: member.nationality },
              { label: 'Home town', value: member.hometown },
              { label: 'Languages', value: member.languages.join(', ') },
            ]}
          />
        </Panel>
      </Col>
      <Col lg={6}>
        <Panel title="Contact">
          <InfoList
            columns={1}
            items={[
              { label: 'Email', value: <a href={`mailto:${member.email}`}>{member.email}</a> },
              { label: 'Phone', value: member.phone },
              {
                label: 'Emergency contact',
                value: `${member.emergencyContact.name} (${member.emergencyContact.relation}) · ${member.emergencyContact.phone}`,
              },
            ]}
          />
        </Panel>
      </Col>
      <Col lg={6}>
        <Panel title="Employment">
          <InfoList
            items={[
              { label: 'Rank', value: member.rank },
              { label: 'Department', value: member.department },
              { label: 'Experience', value: `${member.yearsAtSea} years at sea` },
              { label: 'Status', value: <StatusBadge status={member.status} /> },
              { label: 'Sign-on', value: formatDate(member.signOn) },
              { label: 'Contract end', value: formatDate(member.signOff) },
            ]}
          />
        </Panel>
      </Col>
      <Col lg={6}>
        <Panel title="Travel documents">
          <InfoList
            columns={1}
            items={[
              { label: 'Passport', value: <DocumentValue document={member.passport} /> },
              { label: "Seaman's book", value: <DocumentValue document={member.seamansBook} /> },
            ]}
          />
        </Panel>
      </Col>
    </Row>
  );
}
