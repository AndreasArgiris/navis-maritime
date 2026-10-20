import { fullRouteOf, remainingRouteOf, voyagePortsOf } from './voyagesSlice';

const atSea = {
  status: 'in-progress',
  from: 'New York',
  to: 'Rotterdam',
  arrival: null,
  path: [[0, 0], [0, 10], [0.2, 15]], // sailed: start, first waypoint, current position
  plannedPath: [[0, 0], [0, 10], [0, 20], [0, 30]],
};
const arrived = { status: 'completed', from: 'Rotterdam', to: 'New York', arrival: '2026-10-01', path: [[0, 30], [0, 0]] };

describe('voyage geometry', () => {
  it('uses the planned route while at sea, the sailed route otherwise', () => {
    expect(fullRouteOf(atSea)).toBe(atSea.plannedPath);
    expect(fullRouteOf(arrived)).toBe(arrived.path);
  });

  it('draws the remaining route from the vessel through unreached waypoints', () => {
    expect(remainingRouteOf(atSea)).toEqual([[0.2, 15], [0, 20], [0, 30]]);
    expect(remainingRouteOf(arrived)).toBeNull();
  });

  it('labels the end port as destination until the voyage has arrived', () => {
    expect(voyagePortsOf(atSea).map((p) => `${p.role}: ${p.name}`)).toEqual(['Departure: New York', 'Destination: Rotterdam']);
    expect(voyagePortsOf(arrived)[1]).toEqual({ role: 'Arrival', name: 'New York', position: [0, 0] });
  });
});
