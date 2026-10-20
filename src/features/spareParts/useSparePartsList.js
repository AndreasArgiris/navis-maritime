import { useSelector } from 'react-redux';
import { useFilters } from '../../shared/hooks/useFilters';
import {
  filterSpareParts,
  selectSparePartSystems,
  selectSpareParts,
  selectSparePartsStats,
  selectValueBySystem,
} from './sparePartsSlice';

const INITIAL_FILTERS = { query: '', system: 'all' };

/** The vessel's spare parts with stats, systems, value per system and filters. */
export function useSparePartsList(vesselId) {
  const parts = useSelector((state) => selectSpareParts(state, vesselId));
  const systems = useSelector((state) => selectSparePartSystems(state, vesselId));
  const stats = useSelector((state) => selectSparePartsStats(state, vesselId));
  const valueBySystem = useSelector((state) => selectValueBySystem(state, vesselId));
  const { filters, setFilter, filtered } = useFilters(parts, filterSpareParts, INITIAL_FILTERS);
  return { parts: filtered, systems, stats, valueBySystem, filters, setFilter };
}
