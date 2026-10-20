import { useSelector } from 'react-redux';
import { useLocation, useMatch } from 'react-router-dom';
import { selectVesselById } from '../../features/fleet/vesselsSlice';
import NotFoundPage from '../NotFoundPage';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AnimatedOutlet from './AnimatedOutlet';

/** Vessel sub-pages share one transition key so only their inner outlet animates. */
export function getTransitionKey(pathname) {
  const [, root, vesselId] = pathname.split('/');
  return root === 'vessels' && vesselId ? `/vessels/${vesselId}` : pathname;
}

export default function AppLayout() {
  const { pathname } = useLocation();
  const vesselId = useMatch('/vessels/:vesselId/*')?.params.vesselId;
  const isUnknownVessel = useSelector((state) => Boolean(vesselId) && !selectVesselById(state, vesselId));

  // An unknown vessel is a 404: show the standalone page, not the shell around it.
  if (isUnknownVessel) {
    return <NotFoundPage title="Vessel not found" message="This vessel is not part of the fleet register." />;
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="app-content">
          <AnimatedOutlet transitionKey={getTransitionKey(pathname)} />
        </main>
      </div>
    </div>
  );
}
