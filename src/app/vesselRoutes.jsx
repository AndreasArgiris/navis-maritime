import { Route } from 'react-router-dom';
import CrewMemberPage from '../features/crew/CrewMemberPage';
import CrewPage from '../features/crew/CrewPage';
import EnginePage from '../features/engine/EnginePage';
import InventoryPage from '../features/inventory/InventoryPage';
import InvoicesPage from '../features/invoices/InvoicesPage';
import SparePartsPage from '../features/spareParts/SparePartsPage';
import VesselLayout from '../features/vessel/VesselLayout';
import VesselOverviewPage from '../features/vessel/VesselOverviewPage';
import RouteHistoryPage from '../features/voyages/RouteHistoryPage';

/**
 * Every page under /vessels/:vesselId. Shared by the app and by page tests, so the
 * two can never disagree about which section lives at which path.
 */
export const vesselRoute = (
  <Route path="vessels/:vesselId" element={<VesselLayout />}>
    <Route index element={<VesselOverviewPage />} />
    <Route path="inventory" element={<InventoryPage />} />
    <Route path="spare-parts" element={<SparePartsPage />} />
    <Route path="engine" element={<EnginePage />} />
    <Route path="invoices" element={<InvoicesPage />} />
    <Route path="crew" element={<CrewPage />} />
    <Route path="crew/:crewId" element={<CrewMemberPage />} />
    <Route path="routes" element={<RouteHistoryPage />} />
  </Route>
);
