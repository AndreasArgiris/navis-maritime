import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

/** A navigation link with the animated navy highlight behind the active one. */
export default function SidebarLink({ to, label, icon: Icon, end, onNavigate }) {
  return (
    <NavLink to={to} end={end} className="sidebar__link" onClick={onNavigate}>
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="sidebar-active"
              className="sidebar__link-bg"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <Icon className="sidebar__link-icon" aria-hidden="true" />
          <span className="sidebar__link-label">{label}</span>
        </>
      )}
    </NavLink>
  );
}
