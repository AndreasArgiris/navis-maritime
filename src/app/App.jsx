import { Route, Routes } from 'react-router-dom';
import FleetMapPage from '../features/fleet/FleetMapPage';
import AppLayout from './layout/AppLayout';
import NotFoundPage from './NotFoundPage';
import { vesselRoute } from './vesselRoutes';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<FleetMapPage />} />
        {vesselRoute}
      </Route>
      {/* Outside the app shell: the 404 page stands alone, without sidebar or top bar. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
