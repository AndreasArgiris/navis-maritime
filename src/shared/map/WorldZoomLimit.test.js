import { minZoomForSize } from './WorldZoomLimit';

describe('minZoomForSize', () => {
  it('returns the zoom where the world exactly fills the map', () => {
    expect(minZoomForSize({ x: 1024, y: 480 })).toBe(2); // 256 × 2² = 1024
    expect(minZoomForSize({ x: 512, y: 300 })).toBe(1);
  });

  it('allows fractional zoom, rounded up so no background shows', () => {
    const zoom = minZoomForSize({ x: 700, y: 480 });
    expect(zoom).toBe(1.46);
    expect(256 * 2 ** zoom).toBeGreaterThanOrEqual(700);
  });

  it('uses the larger side, so a tall map is also covered', () => {
    expect(minZoomForSize({ x: 600, y: 1024 })).toBe(2);
  });
});
