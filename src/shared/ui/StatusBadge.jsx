import { STATUS_BADGES } from './statusBadges';

export default function StatusBadge({ status }) {
  const config = STATUS_BADGES[status] ?? { label: status, variant: 'secondary', icon: null };
  const Icon = config.icon;
  return (
    <span
      className={`status-badge badge rounded-pill text-${config.variant}-emphasis bg-${config.variant}-subtle border border-${config.variant}-subtle`}
    >
      {Icon && <Icon aria-hidden="true" className="me-1" />}
      {config.label}
    </span>
  );
}
