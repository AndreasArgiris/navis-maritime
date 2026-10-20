import { createSelector, createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const initialState = {
  items: seedData.vessels,
  statusFilter: 'all',
  activeVesselId: seedData.vessels[0]?.id ?? null,
};

const vesselsSlice = createSlice({
  name: 'vessels',
  initialState,
  reducers: {
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setActiveVessel(state, action) {
      state.activeVesselId = action.payload;
    },
  },
});

export const { setStatusFilter, setActiveVessel } = vesselsSlice.actions;
export default vesselsSlice.reducer;

/** Case-insensitive match on name, IMO, type or destination. */
export function searchVessels(vessels, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return vessels;
  return vessels.filter((vessel) =>
    [vessel.name, vessel.imo, vessel.type, vessel.destination].some((field) =>
      field?.toLowerCase().includes(needle),
    ),
  );
}

export const selectAllVessels = (state) => state.vessels.items;
export const selectStatusFilter = (state) => state.vessels.statusFilter;
export const selectActiveVesselId = (state) => state.vessels.activeVesselId;
export const selectVesselById = (state, vesselId) =>
  state.vessels.items.find((vessel) => vessel.id === vesselId) ?? null;

export const selectFilteredVessels = createSelector(
  [selectAllVessels, selectStatusFilter],
  (vessels, filter) => (filter === 'all' ? vessels : vessels.filter((vessel) => vessel.status === filter)),
);

export const selectFleetStats = createSelector([selectAllVessels], (vessels) =>
  vessels.reduce(
    (stats, vessel) => {
      stats.total += 1;
      stats[vessel.status] += 1;
      return stats;
    },
    { total: 0, underway: 0, anchored: 0, moored: 0, maintenance: 0 },
  ),
);
