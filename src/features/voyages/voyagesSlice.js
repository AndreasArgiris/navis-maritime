import { createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const EMPTY = [];
const DAY_MS = 24 * 60 * 60 * 1000;

const voyagesSlice = createSlice({
  name: 'voyages',
  initialState: { byVessel: seedData.voyages },
  reducers: {},
});

export default voyagesSlice.reducer;

/** Days between departure and arrival (or `now` for a voyage still in progress). */
export function voyageDurationDays(voyage, now = new Date()) {
  const end = voyage.arrival ? new Date(voyage.arrival) : now;
  return (end - new Date(voyage.departure)) / DAY_MS;
}

/** The whole planned route for a voyage still at sea, otherwise the route sailed. */
export const fullRouteOf = (voyage) => voyage.plannedPath ?? voyage.path;

/** Still at sea: from the vessel's position through the waypoints it hasn't reached yet. Otherwise null. */
export function remainingRouteOf(voyage) {
  if (voyage.status !== 'in-progress') return null;
  return [voyage.path[voyage.path.length - 1], ...voyage.plannedPath.slice(voyage.path.length - 1)];
}

/** Departure and arrival (or destination) markers for a voyage. */
export function voyagePortsOf(voyage) {
  const route = fullRouteOf(voyage);
  return [
    { role: 'Departure', name: voyage.from, position: route[0] },
    { role: voyage.arrival ? 'Arrival' : 'Destination', name: voyage.to, position: route[route.length - 1] },
  ];
}

export const selectVoyages = (state, vesselId) => state.voyages.byVessel[vesselId] ?? EMPTY;

