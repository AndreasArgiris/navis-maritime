import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { VESSEL_SECTIONS, vesselPath } from '../../app/navigation';

/** Section tabs under the vessel header (mirrors the sidebar on small screens). */
export default function VesselTabs({ vesselId }) {
  return (
    <nav className="vessel-tabs" aria-label="Vessel sections">
      {VESSEL_SECTIONS.map(({ path, label, icon: Icon }) => (
        <NavLink key={label} to={vesselPath(vesselId, path)} end={path === ''} className="vessel-tabs__item">
          {({ isActive }) => (
            <>
              <Icon aria-hidden="true" />
              {label}
              {isActive && <motion.span layoutId="vessel-tab-underline" className="vessel-tabs__underline" />}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
