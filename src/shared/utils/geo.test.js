import { distanceNm, pathDistanceNm, truncatePathAt, unwrapLongitudes } from './geo';

describe('geo utils', () => {
  it('measures great-circle distance in nautical miles', () => {
    // One degree of latitude is ~60 nm.
    expect(distanceNm([0, 0], [1, 0])).toBeCloseTo(60, 0);
    expect(pathDistanceNm([[0, 0], [1, 0], [2, 0]])).toBeCloseTo(120, 0);
  });

  it('unwraps longitudes across the date line', () => {
    expect(unwrapLongitudes([[30, -170], [31, 170], [33, 150]])).toEqual([[30, -170], [31, -190], [33, -210]]);
    expect(unwrapLongitudes([[0, 10], [0, 20]])).toEqual([[0, 10], [0, 20]]);
  });

  it('cuts a path at the vessel position', () => {
    const path = [[0, 0], [0, 10], [0, 20], [0, 30]];
    expect(truncatePathAt(path, [0.2, 15])).toEqual([[0, 0], [0, 10], [0.2, 15]]);
    expect(truncatePathAt(path, [0, 2])).toEqual([[0, 0], [0, 2]]);
  });
});
