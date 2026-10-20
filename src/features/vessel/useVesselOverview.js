import { useSelector } from 'react-redux';
import { selectCrewByDepartment, selectCrewStats } from '../crew/crewSlice';
import { selectInventoryStats } from '../inventory/inventorySlice';
import { selectInvoiceStats } from '../invoices/invoicesSlice';
import { selectTopConsumedParts } from '../spareParts/sparePartsSlice';
import { selectMetrics } from './metricsSlice';

const TOP_PARTS_COUNT = 5;

export const totalDistanceNm = (distanceRows) => distanceRows.reduce((sum, row) => sum + row.nauticalMiles, 0);

/** Everything the vessel dashboard shows, gathered from each feature's selectors. */
export function useVesselOverview(vesselId) {
  const metrics = useSelector((state) => selectMetrics(state, vesselId));
  const inventoryStats = useSelector((state) => selectInventoryStats(state, vesselId));
  const invoiceStats = useSelector((state) => selectInvoiceStats(state, vesselId));
  const crewStats = useSelector((state) => selectCrewStats(state, vesselId));
  const crewByDepartment = useSelector((state) => selectCrewByDepartment(state, vesselId));
  const topParts = useSelector((state) => selectTopConsumedParts(state, vesselId, TOP_PARTS_COUNT));

  return {
    metrics,
    inventoryStats,
    invoiceStats,
    crewStats,
    crewByDepartment,
    topParts,
    totalDistance: totalDistanceNm(metrics.distance),
  };
}
