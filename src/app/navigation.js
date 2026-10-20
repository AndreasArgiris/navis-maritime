import { FiActivity, FiCompass, FiFileText, FiGrid, FiMap, FiPackage, FiTool, FiUsers } from 'react-icons/fi';

export const FLEET_NAV_ITEM = { to: '/', label: 'Fleet Map', icon: FiMap };

export const VESSEL_SECTIONS = [
  { path: '', label: 'Dashboard', icon: FiGrid },
  { path: 'inventory', label: 'Inventory', icon: FiPackage },
  { path: 'spare-parts', label: 'Spare Parts', icon: FiTool },
  { path: 'engine', label: 'Engine', icon: FiActivity },
  { path: 'invoices', label: 'Invoices', icon: FiFileText },
  { path: 'crew', label: 'Crew', icon: FiUsers },
  { path: 'routes', label: 'Route History', icon: FiCompass },
];

export const vesselPath = (vesselId, section = '') =>
  `/vessels/${vesselId}${section ? `/${section}` : ''}`;

export const crewMemberPath = (vesselId, crewId) => vesselPath(vesselId, `crew/${crewId}`);
