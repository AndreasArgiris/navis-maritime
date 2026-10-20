import { filterCargo, selectCargoStats, selectCargoTypes, selectCargoWeightByCommodity } from './cargoSlice';

const lots = [
  { id: 'a', description: 'Wheat', cargoType: 'Dry bulk', billOfLading: 'BL-1', shipper: 'GreenField Agro', weightTonnes: 1000, imoClass: null, temperature: null },
  { id: 'b', description: 'Thermal coal', cargoType: 'Dry bulk', billOfLading: 'BL-2', shipper: 'Orion Trading Co.', weightTonnes: 3000, imoClass: '4.2', temperature: null },
  { id: 'c', description: 'Wheat', cargoType: 'Dry bulk', billOfLading: 'BL-3', shipper: 'GreenField Agro', weightTonnes: 500, imoClass: null, temperature: null },
  { id: 'd', description: 'Frozen lamb', cargoType: 'Refrigerated', billOfLading: 'BL-4', shipper: 'Coastal Foods Group', weightTonnes: 200, imoClass: null, temperature: -20 },
];
const state = { cargo: { byVessel: { v1: lots } } };

describe('cargo slice', () => {
  it('filters by type and by description, B/L or shipper', () => {
    expect(filterCargo(lots, { cargoType: 'Refrigerated' }).map((l) => l.id)).toEqual(['d']);
    expect(filterCargo(lots, { query: 'bl-2' }).map((l) => l.id)).toEqual(['b']);
    expect(filterCargo(lots, { query: 'greenfield' }).map((l) => l.id)).toEqual(['a', 'c']);
  });

  it('computes manifest stats', () => {
    expect(selectCargoStats(state, 'v1')).toEqual({
      lots: 4,
      totalWeight: 4700,
      hazardousLots: 1,
      temperatureControlled: 1,
    });
  });

  it('lists cargo types and weight per commodity', () => {
    expect(selectCargoTypes(state, 'v1')).toEqual(['Dry bulk', 'Refrigerated']);
    expect(selectCargoWeightByCommodity(state, 'v1')).toEqual([
      { commodity: 'Thermal coal', weight: 3000 },
      { commodity: 'Wheat', weight: 1500 },
      { commodity: 'Frozen lamb', weight: 200 },
    ]);
  });

  it('returns an empty manifest for unknown vessels', () => {
    expect(selectCargoStats(state, 'nope').lots).toBe(0);
  });
});
