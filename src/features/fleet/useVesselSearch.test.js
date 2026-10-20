import { moveHighlight } from './useVesselSearch';

describe('moveHighlight', () => {
  it('moves within the result list and stops at the ends', () => {
    expect(moveHighlight('ArrowDown', 0, 3)).toBe(1);
    expect(moveHighlight('ArrowDown', 2, 3)).toBe(2);
    expect(moveHighlight('ArrowUp', 1, 3)).toBe(0);
    expect(moveHighlight('ArrowUp', 0, 3)).toBe(0);
    expect(moveHighlight('Tab', 1, 3)).toBe(1);
  });
});
