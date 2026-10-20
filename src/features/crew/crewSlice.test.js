import {
  averageRating,
  filterCrew,
  getDocumentStatus,
  selectCrewByDepartment,
  selectCrewMember,
  selectCrewStats,
} from './crewSlice';

const inDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const crew = [
  { id: 'c1', name: 'Marco Santos', rank: 'Master', department: 'Deck', nationality: 'Philippines', signOff: inDays(10), status: 'onboard' },
  { id: 'c2', name: 'Jonas Hansen', rank: 'Chief Engineer', department: 'Engine', nationality: 'Norway', signOff: inDays(90), status: 'onboard' },
  { id: 'c3', name: 'Ravi Kumar', rank: 'Chief Cook', department: 'Catering', nationality: 'India', signOff: inDays(5), status: 'on-leave' },
  { id: 'c4', name: 'Anna Nowak', rank: 'Deck Cadet', department: 'Deck', nationality: 'Poland', signOff: inDays(200), status: 'joining' },
];
const state = { byVessel: { v1: crew } };

describe('crew slice', () => {
  it('filters by department and name / rank', () => {
    expect(filterCrew(crew, { department: 'Deck' }).map((m) => m.id)).toEqual(['c1', 'c4']);
    expect(filterCrew(crew, { query: 'engineer' }).map((m) => m.id)).toEqual(['c2']);
  });

  it('only counts contracts ending soon for crew on board', () => {
    expect(selectCrewStats({ crew: state }, 'v1')).toEqual({
      total: 4,
      onboard: 2,
      onLeave: 1,
      joining: 1,
      contractsEndingSoon: 1,
    });
  });

  it('finds a single crew member', () => {
    expect(selectCrewMember({ crew: state }, 'v1', 'c2').name).toBe('Jonas Hansen');
    expect(selectCrewMember({ crew: state }, 'v1', 'zzz')).toBeNull();
  });

  it('classifies document expiry', () => {
    const today = new Date('2026-06-15T12:00:00');
    expect(getDocumentStatus('2026-06-14', today)).toBe('expired');
    expect(getDocumentStatus('2026-08-01', today)).toBe('expiring');
    expect(getDocumentStatus('2027-06-15', today)).toBe('valid');
  });

  it('averages review ratings', () => {
    expect(averageRating([{ rating: 4 }, { rating: 4.5 }, { rating: 3 }])).toBe(3.8);
    expect(averageRating([])).toBeNull();
  });

  it('groups crew by department in a fixed order', () => {
    expect(selectCrewByDepartment({ crew: state }, 'v1')).toEqual([
      { department: 'Deck', count: 2 },
      { department: 'Engine', count: 1 },
      { department: 'Catering', count: 1 },
    ]);
  });
});
