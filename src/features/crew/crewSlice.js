import { createSelector, createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';
import { daysUntil } from '../../shared/utils/format';

const EMPTY = [];
export const DEPARTMENTS = ['Deck', 'Engine', 'Catering'];
export const CONTRACT_WARNING_DAYS = 30;

const crewSlice = createSlice({
  name: 'crew',
  initialState: { byVessel: seedData.crew },
  reducers: {},
});

export default crewSlice.reducer;

export function filterCrew(crew, { query = '', department = 'all' }) {
  const needle = query.trim().toLowerCase();
  return crew.filter(
    (member) =>
      (department === 'all' || member.department === department) &&
      (!needle ||
        member.name.toLowerCase().includes(needle) ||
        member.rank.toLowerCase().includes(needle)),
  );
}

export const CERTIFICATE_WARNING_DAYS = 90;

/** valid | expiring (within 90 days) | expired */
export function getDocumentStatus(expires, today = new Date()) {
  const days = daysUntil(expires, today);
  if (days < 0) return 'expired';
  if (days <= CERTIFICATE_WARNING_DAYS) return 'expiring';
  return 'valid';
}

export function averageRating(reviews) {
  if (!reviews.length) return null;
  return Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10;
}

export const selectCrew = (state, vesselId) => state.crew.byVessel[vesselId] ?? EMPTY;

export const selectCrewMember = (state, vesselId, crewId) =>
  selectCrew(state, vesselId).find((member) => member.id === crewId) ?? null;

export const selectCrewStats = createSelector([selectCrew], (crew) => {
  const onboard = crew.filter((member) => member.status === 'onboard');
  return {
    total: crew.length,
    onboard: onboard.length,
    onLeave: crew.filter((member) => member.status === 'on-leave').length,
    joining: crew.filter((member) => member.status === 'joining').length,
    contractsEndingSoon: onboard.filter(
      (member) => daysUntil(member.signOff) <= CONTRACT_WARNING_DAYS,
    ).length,
  };
});

export const selectCrewByDepartment = createSelector([selectCrew], (crew) =>
  DEPARTMENTS.map((department) => ({
    department,
    count: crew.filter((member) => member.department === department).length,
  })),
);
