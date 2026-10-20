import { createSelector, createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const engineSlice = createSlice({
  name: 'engine',
  initialState: { byVessel: seedData.engine },
  reducers: {},
});

export default engineSlice.reducer;

/** 'low' | 'high' | 'normal' against the reading's normal range. */
export function getReadingStatus({ value, min, max }) {
  if (min != null && value < min) return 'low';
  if (max != null && value > max) return 'high';
  return 'normal';
}

export const isAbnormal = (reading) => getReadingStatus(reading) !== 'normal';

/** A main-engine parameter reading by id, e.g. 'me-load'. */
export function findMainEngineReading(engine, readingId) {
  return engine.parameters.flatMap((group) => group.readings).find((reading) => reading.id === readingId);
}

/** Every reading in the engine room, tagged with where it comes from. */
export function flattenEngineReadings(engine) {
  if (!engine) return [];
  return [
    ...engine.parameters.flatMap(({ group, readings }) =>
      readings.map((reading) => ({ ...reading, source: `Main engine · ${group}` })),
    ),
    ...engine.cylinders.flatMap(({ cylinder, readings }) =>
      Object.values(readings).map((reading) => ({ ...reading, source: `Main engine · Cylinder ${cylinder}` })),
    ),
    ...engine.auxEngines
      .filter((aux) => aux.status === 'running')
      .flatMap((aux) => aux.readings.map((reading) => ({ ...reading, source: aux.name }))),
    ...engine.oilAnalysis.flatMap((sample) =>
      sample.readings.map((reading) => ({ ...reading, source: `Oil analysis · ${sample.system}` })),
    ),
    ...engine.tanks.map((reading) => ({ ...reading, source: 'Tank levels' })),
  ];
}

export const selectEngine = (state, vesselId) => state.engine.byVessel[vesselId] ?? null;

export const selectEngineAlerts = createSelector([selectEngine], (engine) =>
  flattenEngineReadings(engine).filter(isAbnormal),
);
