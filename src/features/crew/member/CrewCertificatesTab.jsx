import { getDocumentStatus } from '../crewSlice';
import { daysUntil, formatDate } from '../../../shared/utils/format';
import Panel from '../../../shared/ui/Panel';
import DataTable from '../../../shared/ui/DataTable';
import StatusBadge from '../../../shared/ui/StatusBadge';

const STATUS_ORDER = { expired: 0, expiring: 1, valid: 2 };

const columns = [
  { key: 'name', header: 'Certificate', sortable: true, render: (certificate) => <span className="fw-medium">{certificate.name}</span> },
  { key: 'number', header: 'Number', render: (certificate) => <code>{certificate.number}</code> },
  { key: 'issuedBy', header: 'Issued by' },
  { key: 'issued', header: 'Issued', sortable: true, render: (certificate) => formatDate(certificate.issued) },
  {
    key: 'expires',
    header: 'Expires',
    sortable: true,
    render: (certificate) => {
      const days = daysUntil(certificate.expires);
      return (
        <>
          <div>{formatDate(certificate.expires)}</div>
          <div className="small text-muted">{days >= 0 ? `in ${days} days` : `${Math.abs(days)} days ago`}</div>
        </>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (certificate) => STATUS_ORDER[getDocumentStatus(certificate.expires)],
    render: (certificate) => <StatusBadge status={getDocumentStatus(certificate.expires)} />,
  },
];

export default function CrewCertificatesTab({ member }) {
  return (
    <Panel title="Certificates & licences" subtitle="STCW and flag-state certificates">
      <DataTable
        columns={columns}
        rows={member.certificates}
        caption="Certificates"
        initialSort={{ key: 'status', direction: 'asc' }}
      />
    </Panel>
  );
}
