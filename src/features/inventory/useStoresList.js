import { useSelector } from 'react-redux';
import { useFilters } from '../../shared/hooks/useFilters';
import {
  filterInventory,
  selectInventoryCategories,
  selectInventoryGroup,
  selectInventoryStats,
} from './inventorySlice';

const INITIAL_FILTERS = { query: '', category: 'all', lowOnly: false };

/** Items, stats, categories and filters for one inventory group ("living" | "ship"). */
export function useStoresList(vesselId, group) {
  const items = useSelector((state) => selectInventoryGroup(state, vesselId, group));
  const categories = useSelector((state) => selectInventoryCategories(state, vesselId, group));
  const stats = useSelector((state) => selectInventoryStats(state, vesselId, group));
  const { filters, setFilter, filtered } = useFilters(items, filterInventory, INITIAL_FILTERS);
  return { items: filtered, categories, stats, filters, setFilter };
}
