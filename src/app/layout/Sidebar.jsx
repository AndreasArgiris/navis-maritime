import { FiX } from 'react-icons/fi';
import { FLEET_NAV_ITEM, VESSEL_SECTIONS, vesselPath } from '../navigation';
import Logo from './Logo';
import SidebarLink from './SidebarLink';
import { useSidebar } from './useSidebar';

function VesselLinks({ vessel, onNavigate }) {
  return (
    <>
      <div className="sidebar__section-label">
        <span>Vessel</span>
        <span className="sidebar__vessel-name" title={vessel.name}>
          {vessel.name}
        </span>
      </div>
      {VESSEL_SECTIONS.map((section) => (
        <SidebarLink
          key={section.label}
          to={vesselPath(vessel.id, section.path)}
          label={section.label}
          icon={section.icon}
          end={section.path === ''}
          onNavigate={onNavigate}
        />
      ))}
    </>
  );
}

export default function Sidebar() {
  const { isOpen, activeVessel, close } = useSidebar();

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="sidebar__brand">
          <Logo />
          <button type="button" className="btn btn-link sidebar__close d-lg-none" onClick={close} aria-label="Close navigation">
            <FiX />
          </button>
        </div>

        <nav className="sidebar__nav">
          <SidebarLink {...FLEET_NAV_ITEM} end onNavigate={close} />
          {activeVessel && <VesselLinks vessel={activeVessel} onNavigate={close} />}
        </nav>

        <div className="sidebar__promo">
          <div className="sidebar__promo-title">Fleet Operations</div>
          <p>Hover any pin on the map for live position and sea conditions.</p>
        </div>
      </aside>
      {isOpen && <div className="sidebar__backdrop d-lg-none" onClick={close} aria-hidden="true" />}
    </>
  );
}
