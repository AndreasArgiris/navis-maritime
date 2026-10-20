import { Link } from 'react-router-dom';
import { FiUserX } from 'react-icons/fi';
import EmptyState from '../../../shared/ui/EmptyState';

export default function CrewMemberNotFound({ vesselName, crewListPath }) {
  return (
    <div className="panel">
      <EmptyState icon={FiUserX} title="Crew member not found" message={`No such crew member on ${vesselName}.`}>
        <Link to={crewListPath} className="btn btn-primary mt-2">
          Back to crew list
        </Link>
      </EmptyState>
    </div>
  );
}
