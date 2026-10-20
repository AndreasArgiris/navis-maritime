import { useSelector } from 'react-redux';
import { useFilters } from '../../shared/hooks/useFilters';
import { filterCargo, selectCargo, selectCargoStats, selectCargoTypes, selectCargoWeightByCommodity } from './cargoSlice';

const INITIAL_FILTERS = { query: '', cargoType: 'all' };

/** The vessel's cargo manifest with stats, cargo types, weight per commodity and filters. */
export function useCargoManifest(vesselId) {
  const allLots = useSelector((state) => selectCargo(state, vesselId));
  const stats = useSelector((state) => selectCargoStats(state, vesselId));
  const cargoTypes = useSelector((state) => selectCargoTypes(state, vesselId));
  const weightByCommodity = useSelector((state) => selectCargoWeightByCommodity(state, vesselId));
  const { filters, setFilter, filtered } = useFilters(allLots, filterCargo, INITIAL_FILTERS);
  return { hasCargo: allLots.length > 0, lots: filtered, stats, cargoTypes, weightByCommodity, filters, setFilter };
}
