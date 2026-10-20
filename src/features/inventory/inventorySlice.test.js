import {
  filterInventory,
  getStockStatus,
  selectInventoryCategories,
  selectInventoryGroup,
  selectInventoryStats,
} from './inventorySlice';

const items = [
  { id: 'i1', name: 'Rice', category: 'Provisions', quantity: 10, minLevel: 20, unit: 'bags', lastUpdated: '2026-01-01' },
  { id: 'i2', name: 'Grease', category: 'Lubricants', quantity: 0, minLevel: 5, unit: 'kg', lastUpdated: '2026-01-01' },
  { id: 'i3', name: 'Towels', category: 'Cabin stores', quantity: 80, minLevel: 60, unit: 'pcs', lastUpdated: '2026-01-01' },
];
const state = { byVessel: { v1: items } };

describe('inventory slice', () => {
  it('derives stock status', () => {
    expect(items.map(getStockStatus)).toEqual(['low', 'out', 'ok']);
  });

  it('filters by query, category and low stock', () => {
    expect(filterInventory(items, { query: 'ric' }).map((i) => i.id)).toEqual(['i1']);
    expect(filterInventory(items, { category: 'Lubricants' }).map((i) => i.id)).toEqual(['i2']);
    expect(filterInventory(items, { lowOnly: true }).map((i) => i.id)).toEqual(['i1', 'i2']);
  });

  it('selects and summarises one group at a time', () => {
    const grouped = {
      inventory: {
        byVessel: { v1: [{ ...items[0], group: 'living' }, { ...items[1], group: 'ship' }, { ...items[2], group: 'ship' }] },
      },
    };
    expect(selectInventoryGroup(grouped, 'v1', 'ship').map((i) => i.id)).toEqual(['i2', 'i3']);
    expect(selectInventoryGroup(grouped, 'v1')).toHaveLength(3);
    expect(selectInventoryStats(grouped, 'v1', 'living')).toMatchObject({ totalItems: 1, lowStock: 1 });
    expect(selectInventoryCategories(grouped, 'v1', 'ship')).toEqual(['Cabin stores', 'Lubricants']);
  });

  it('computes stats', () => {
    expect(selectInventoryStats({ inventory: state }, 'v1')).toEqual({
      totalItems: 3,
      lowStock: 2,
      outOfStock: 1,
      categories: 3,
    });
  });
});
