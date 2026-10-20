import { FiBox } from 'react-icons/fi';
import EmptyState from '../../shared/ui/EmptyState';

export default function NoCargoOnBoard({ vessel }) {
  const message =
    vessel.status === 'maintenance'
      ? `${vessel.name} is in maintenance and not carrying cargo.`
      : 'This vessel is sailing in ballast.';
  return (
    <div className="panel">
      <EmptyState icon={FiBox} title="No cargo on board" message={message} />
    </div>
  );
}
