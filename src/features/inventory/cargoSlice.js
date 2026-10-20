import { createSelector, createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const EMPTY = [];

const cargoSlice = createSlice({
  name: 'cargo',
  initialState: { byVessel: seedData.cargo },
  reducers: {},
});

export default cargoSlice.reducer;

export function filterCargo(lots, { query = '', cargoType = 'all' }) {
  const needle = query.trim().toLowerCase();
  return lots.filter(
    (lot) =>
      (cargoType === 'all' || lot.cargoType === cargoType) &&
      (!needle ||
        lot.description.toLowerCase().includes(needle) ||
        lot.billOfLading.toLowerCase().includes(needle) ||
        lot.shipper.toLowerCase().includes(needle)),
  );
}

export const selectCargo = (state, vesselId) => state.cargo.byVessel[vesselId] ?? EMPTY;

export const selectCargoTypes = createSelector([selectCargo], (lots) =>
  [...new Set(lots.map((lot) => lot.cargoType))].sort(),
);

export const selectCargoStats = createSelector([selectCargo], (lots) => ({
  lots: lots.length,
  totalWeight: lots.reduce((sum, lot) => sum + lot.weightTonnes, 0),
  hazardousLots: lots.filter((lot) => lot.imoClass).length,
  temperatureControlled: lots.filter((lot) => lot.temperature != null).length,
}));

export const selectCargoWeightByCommodity = createSelector([selectCargo], (lots) => {
  const totals = lots.reduce((acc, lot) => {
    acc[lot.description] = (acc[lot.description] ?? 0) + lot.weightTonnes;
    return acc;
  }, {});
  return Object.entries(totals)
    .map(([commodity, weight]) => ({ commodity, weight }))
    .sort((a, b) => b.weight - a.weight);
});
