import { createSelector, createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const EMPTY = [];

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { byVessel: seedData.inventory },
  reducers: {},
});

export default inventorySlice.reducer;

export function getStockStatus(item) {
  if (item.quantity === 0) return 'out';
  if (item.quantity < item.minLevel) return 'low';
  return 'ok';
}

export function filterInventory(items, { query = '', category = 'all', lowOnly = false }) {
  const needle = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      (!lowOnly || getStockStatus(item) !== 'ok') &&
      (!needle || item.name.toLowerCase().includes(needle)),
  );
}

export const INVENTORY_GROUPS = { living: 'living', ship: 'ship' };

export const selectInventory = (state, vesselId) => state.inventory.byVessel[vesselId] ?? EMPTY;

/** Items in one group ("living" | "ship"); all items when `group` is omitted. */
export const selectInventoryGroup = createSelector(
  [selectInventory, (_state, _vesselId, group) => group],
  (items, group) => (group ? items.filter((item) => item.group === group) : items),
);

export const selectInventoryCategories = createSelector([selectInventoryGroup], (items) =>
  [...new Set(items.map((item) => item.category))].sort(),
);

export const selectInventoryStats = createSelector([selectInventoryGroup], (items) => {
  const belowMinimum = items.filter((item) => getStockStatus(item) !== 'ok');
  return {
    totalItems: items.length,
    lowStock: belowMinimum.length,
    outOfStock: belowMinimum.filter((item) => item.quantity === 0).length,
    categories: new Set(items.map((item) => item.category)).size,
  };
});
