import { Link } from 'react-router-dom';
import { crewMemberPath } from '../../app/navigation';
import { formatDate, getInitials } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';
import ContractEnd from './ContractEnd';
import { DEPARTMENTS } from './crewSlice';

/** DataTable columns for a vessel's crew list. Names link to each member's profile. */
export function buildCrewColumns(vesselId) {
  return [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (member) => (
        <div className="d-flex align-items-center gap-2">
          <span className="avatar" aria-hidden="true">
            {getInitials(member.name)}
          </span>
          <Link to={crewMemberPath(vesselId, member.id)} className="crew-link">
            {member.name}
          </Link>
        </div>
      ),
    },
    { key: 'rank', header: 'Rank', sortable: true },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      sortValue: (member) => DEPARTMENTS.indexOf(member.department),
    },
    { key: 'nationality', header: 'Nationality', sortable: true },
    { key: 'signOn', header: 'Sign-on', sortable: true, render: (member) => formatDate(member.signOn) },
    { key: 'signOff', header: 'Contract end', sortable: true, render: (member) => <ContractEnd member={member} /> },
    { key: 'status', header: 'Status', sortable: true, render: (member) => <StatusBadge status={member.status} /> },
  ];
}
