import { vessels } from '../vessels';
import { generateVoyages, voyageNumberPrefix } from './voyages';
import { TEST_DATE } from '../../test/fixtures';

const vesselById = (id) => vessels.find((v) => v.id === id);

describe('voyage generator', () => {
  it.each(vessels.map((v) => [v.id]))('builds a continuous 12-month history for %s', (id) => {
    const voyages = generateVoyages(vesselById(id), TEST_DATE);
    expect(voyages.length).toBeGreaterThan(1);

    const yearAgo = new Date(TEST_DATE);
    yearAgo.setDate(yearAgo.getDate() - 365);
    voyages.forEach((voyage, i) => {
      expect(new Date(voyage.departure) >= yearAgo).toBe(true);
      // Each voyage starts where the previous (older) one ended.
      if (i < voyages.length - 1) expect(voyage.from).toBe(voyages[i + 1].to);
      // No point-to-point jump wider than 180° (date line handled).
      voyage.path.slice(1).forEach(([, lng], j) => expect(Math.abs(lng - voyage.path[j][1])).toBeLessThan(180));
    });
  });

  it('gives every voyage a valid time zone for both ports', () => {
    vessels.forEach((vessel) => {
      generateVoyages(vessel, TEST_DATE).forEach((voyage) => {
        [voyage.departureTimeZone, voyage.arrivalTimeZone].forEach((timeZone) => {
          expect(timeZone).toBeTruthy();
          expect(() => new Intl.DateTimeFormat('en-GB', { timeZone })).not.toThrow();
        });
      });
    });
  });

  it('marks the current voyage in progress for a vessel underway', () => {
    const vessel = vesselById('atlantic-meridian');
    const [current, previous] = generateVoyages(vessel, TEST_DATE);
    expect(current).toMatchObject({ status: 'in-progress', from: 'New York', to: 'Rotterdam', arrival: null });
    expect(current.path.at(-1)).toEqual([vessel.position.lat, vessel.position.lng]);
    expect(current.distanceNm).toBeLessThan(current.plannedDistanceNm);
    expect(previous).toMatchObject({ status: 'completed', from: 'Rotterdam', to: 'New York' });
  });

  it('treats a vessel at anchor as having arrived', () => {
    const [latest] = generateVoyages(vesselById('coral-voyager'), TEST_DATE);
    expect(latest).toMatchObject({ status: 'completed', to: 'Singapore Eastern Anchorage' });
    expect(new Date(latest.arrival) < TEST_DATE).toBe(true);
  });
});

describe('voyageNumberPrefix', () => {
  it('uses the initials of the vessel name', () => {
    expect(voyageNumberPrefix('Atlantic Meridian')).toBe('AM');
    expect(voyageNumberPrefix('mediterranean pearl')).toBe('MP');
  });
});
