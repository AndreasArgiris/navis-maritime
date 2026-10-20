import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { toggleSidebar } from './uiSlice';
import VesselSearch from '../../features/fleet/VesselSearch';

const todayLabel = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date());

export default function Topbar() {
  const dispatch = useDispatch();
  // The Fleet Map has its own page header, so the title and date only show on other pages.
  const showTitle = useLocation().pathname !== '/';
  return (
    <header className="topbar">
      <button
        type="button"
        className="btn topbar__menu d-lg-none"
        onClick={() => dispatch(toggleSidebar())}
        aria-label="Open navigation"
      >
        <FiMenu />
      </button>

      {showTitle && (
        <div className="topbar__title d-none d-md-flex">
          <span className="topbar__heading">Fleet Operations</span>
          <span className="topbar__date">{todayLabel}</span>
        </div>
      )}

      <VesselSearch />

      <div className="topbar__actions">
        <div className="topbar__user">
          <span className="topbar__avatar" aria-hidden="true">
            FM
          </span>
          <span className="d-none d-xl-flex flex-column">
            <span className="topbar__user-name">Fleet Manager</span>
            <span className="topbar__user-role">Operations</span>
          </span>
        </div>
      </div>
    </header>
  );
}
