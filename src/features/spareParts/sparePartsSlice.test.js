import {
  filterSpareParts,
  getPartStockStatus,
  selectSparePartsStats,
  selectTopConsumedParts,
  selectValueBySystem,
} from './sparePartsSlice';

const parts = [
  { id: 'p1', partNumber: 'ME-1111', name: 'Injector', system: 'Main Engine', unitCost: 100, onBoard: 2, minRequired: 3, usage12m: 10, lastUsed: '2026-01-01' },
  { id: 'p2', partNumber: 'PU-2222', name: 'Seal kit', system: 'Pumps', unitCost: 50, onBoard: 0, minRequired: 1, usage12m: 20, lastUsed: '2026-01-01' },
  { id: 'p3', partNumber: 'ME-3333', name: 'Gasket', system: 'Main Engine', unitCost: 10, onBoard: 5, minRequired: 1, usage12m: 1, lastUsed: '2026-01-01' },
];
const state = { byVessel: { v1: parts } };
const root = { spareParts: state };

describe('spare parts slice', () => {
  it('filters by system and by name or part number', () => {
    expect(filterSpareParts(parts, { system: 'Pumps' }).map((p) => p.id)).toEqual(['p2']);
    expect(filterSpareParts(parts, { query: 'me-3' }).map((p) => p.id)).toEqual(['p3']);
  });

  it('computes stats and value per system', () => {
    expect(selectSparePartsStats(root, 'v1')).toEqual({
      totalParts: 3,
      unitsOnBoard: 7,
      belowMinimum: 2,
      totalValue: 250,
    });
    expect(selectValueBySystem(root, 'v1')).toEqual([
      { system: 'Main Engine', value: 250 },
      { system: 'Pumps', value: 0 },
    ]);
  });

  it('ranks the most consumed parts', () => {
    expect(selectTopConsumedParts(root, 'v1', 2).map((p) => p.id)).toEqual(['p2', 'p1']);
  });
});

describe('getPartStockStatus', () => {
  it('classifies stock as out, low or ok', () => {
    expect(getPartStockStatus({ onBoard: 0, minRequired: 2 })).toBe('out');
    expect(getPartStockStatus({ onBoard: 1, minRequired: 2 })).toBe('low');
    expect(getPartStockStatus({ onBoard: 2, minRequired: 2 })).toBe('ok');
  });
});
