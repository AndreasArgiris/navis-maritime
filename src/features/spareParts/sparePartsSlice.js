import { createSelector, createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const EMPTY = [];

const sparePartsSlice = createSlice({
  name: 'spareParts',
  initialState: { byVessel: seedData.spareParts },
  reducers: {},
});

export default sparePartsSlice.reducer;

export const isBelowMinimum = (part) => part.onBoard < part.minRequired;

/** 'out' | 'low' | 'ok', matching the stock badges used for inventory. */
export function getPartStockStatus(part) {
  if (part.onBoard === 0) return 'out';
  return isBelowMinimum(part) ? 'low' : 'ok';
}

export function filterSpareParts(parts, { query = '', system = 'all' }) {
  const needle = query.trim().toLowerCase();
  return parts.filter(
    (part) =>
      (system === 'all' || part.system === system) &&
      (!needle ||
        part.name.toLowerCase().includes(needle) ||
        part.partNumber.toLowerCase().includes(needle)),
  );
}

export const selectSpareParts = (state, vesselId) => state.spareParts.byVessel[vesselId] ?? EMPTY;

export const selectSparePartSystems = createSelector([selectSpareParts], (parts) =>
  [...new Set(parts.map((part) => part.system))].sort(),
);

export const selectSparePartsStats = createSelector([selectSpareParts], (parts) => ({
  totalParts: parts.length,
  unitsOnBoard: parts.reduce((sum, part) => sum + part.onBoard, 0),
  belowMinimum: parts.filter(isBelowMinimum).length,
  totalValue: parts.reduce((sum, part) => sum + part.onBoard * part.unitCost, 0),
}));

export const selectTopConsumedParts = createSelector(
  [selectSpareParts, (_state, _vesselId, limit = 5) => limit],
  (parts, limit) => [...parts].sort((a, b) => b.usage12m - a.usage12m).slice(0, limit),
);

export const selectValueBySystem = createSelector([selectSpareParts], (parts) => {
  const totals = parts.reduce((acc, part) => {
    acc[part.system] = (acc[part.system] ?? 0) + part.onBoard * part.unitCost;
    return acc;
  }, {});
  return Object.entries(totals)
    .map(([system, value]) => ({ system, value }))
    .sort((a, b) => b.value - a.value);
});
