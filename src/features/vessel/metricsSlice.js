import { createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const EMPTY_METRICS = { fuel: [], costs: [], distance: [], budget: [] };

const metricsSlice = createSlice({
  name: 'metrics',
  initialState: { byVessel: seedData.metrics },
  reducers: {},
});

export default metricsSlice.reducer;

export const selectMetrics = (state, vesselId) => state.metrics.byVessel[vesselId] ?? EMPTY_METRICS;
