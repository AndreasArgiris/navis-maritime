import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { vesselPath } from '../../app/navigation';
import StatusBadge from '../../shared/ui/StatusBadge';
import EmptyState from '../../shared/ui/EmptyState';

/** Accessible list alternative to the map pins. */
export default function VesselListPanel({ vessels }) {
  if (vessels.length === 0) {
    return <EmptyState title="No vessels" message="No vessels match the selected status." />;
  }

  return (
    <ul className="vessel-list">
      {vessels.map((vessel, index) => (
        <motion.li
          key={vessel.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03 }}
        >
          <Link to={vesselPath(vessel.id)} className="vessel-list__item">
            <div className="vessel-list__text">
              <span className="vessel-list__name">{vessel.name}</span>
              <span className="vessel-list__meta">
                {vessel.type} · {vessel.locationName}
              </span>
              <StatusBadge status={vessel.status} />
            </div>
            <FiChevronRight aria-hidden="true" className="vessel-list__chevron" />
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
