import { daysUntil, formatDate } from '../../shared/utils/format';
import { CONTRACT_WARNING_DAYS } from './crewSlice';

/** Contract end date plus "in N days", highlighted when an on-board contract ends soon. */
export default function ContractEnd({ member }) {
  const days = daysUntil(member.signOff);
  const endsSoon = member.status === 'onboard' && days <= CONTRACT_WARNING_DAYS;
  return (
    <>
      <div>{formatDate(member.signOff)}</div>
      <div className={`small ${endsSoon ? 'text-danger fw-medium' : 'text-muted'}`}>
        {days >= 0 ? `in ${days} days` : `${Math.abs(days)} days ago`}
      </div>
    </>
  );
}
