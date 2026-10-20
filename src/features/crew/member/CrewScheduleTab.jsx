import { Col, Row } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import { formatDate } from '../../../shared/utils/format';
import Panel from '../../../shared/ui/Panel';
import DataTable from '../../../shared/ui/DataTable';
import StatusBadge from '../../../shared/ui/StatusBadge';

const ticketColumns = [
  {
    key: 'type',
    header: 'Trip',
    sortable: true,
    render: (ticket) => <span className="fw-medium">{ticket.type}</span>,
  },
  {
    key: 'route',
    header: 'Route',
    render: (ticket) => (
      <span className="d-inline-flex align-items-center gap-1 text-nowrap">
        {ticket.from} <FiArrowRight aria-hidden="true" /> {ticket.to}
      </span>
    ),
  },
  {
    key: 'flightNumber',
    header: 'Flight',
    render: (ticket) => (
      <>
        <div>{ticket.flightNumber}</div>
        <div className="small text-muted">{ticket.airline}</div>
      </>
    ),
  },
  { key: 'departure', header: 'Departure', sortable: true, render: (ticket) => formatDate(ticket.departure) },
  { key: 'bookingRef', header: 'Booking ref.', render: (ticket) => <code>{ticket.bookingRef}</code> },
  { key: 'status', header: 'Status', sortable: true, render: (ticket) => <StatusBadge status={ticket.status} /> },
];

export default function CrewScheduleTab({ member }) {
  return (
    <Row className="g-3">
      <Col xl={5}>
        <Panel title="Contract schedule" subtitle="Current and previous assignments">
          <ol className="timeline">
            {member.contracts.map((contract) => (
              <li key={contract.id} className={`timeline__item timeline__item--${contract.status}`}>
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__content">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <span className="fw-medium">{contract.vessel}</span>
                    <StatusBadge status={contract.status} />
                  </div>
                  <div className="small text-muted">
                    {contract.rank} · {formatDate(contract.signOn)} – {formatDate(contract.signOff)}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </Col>
      <Col xl={7}>
        <Panel title="Travel tickets" subtitle="Flights to and from the vessel">
          <DataTable
            columns={ticketColumns}
            rows={member.tickets}
            caption="Travel tickets"
            initialSort={{ key: 'departure', direction: 'desc' }}
          />
        </Panel>
      </Col>
    </Row>
  );
}
