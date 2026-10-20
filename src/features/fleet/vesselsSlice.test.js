import { setupStore } from '../../app/store';
import { createTestState } from '../../test/fixtures';
import {
  searchVessels,
  selectFilteredVessels,
  selectFleetStats,
  selectVesselById,
  setActiveVessel,
  setStatusFilter,
} from './vesselsSlice';

describe('vessels slice', () => {
  const makeStore = () => setupStore(createTestState());

  it('counts vessels by status', () => {
    const stats = selectFleetStats(makeStore().getState());
    expect(stats).toEqual({ total: 3, underway: 1, anchored: 1, moored: 0, maintenance: 1 });
  });

  it('filters vessels by status', () => {
    const store = makeStore();
    store.dispatch(setStatusFilter('maintenance'));
    expect(selectFilteredVessels(store.getState()).map((v) => v.id)).toEqual(['baltic-pioneer']);

    store.dispatch(setStatusFilter('all'));
    expect(selectFilteredVessels(store.getState())).toHaveLength(3);
  });

  it('tracks the active vessel', () => {
    const store = makeStore();
    store.dispatch(setActiveVessel('coral-voyager'));
    expect(store.getState().vessels.activeVesselId).toBe('coral-voyager');
  });

  it('looks up vessels by id', () => {
    const state = makeStore().getState();
    expect(selectVesselById(state, 'coral-voyager').name).toBe('Coral Voyager');
    expect(selectVesselById(state, 'nope')).toBeNull();
  });

  it('searches by name, IMO and type', () => {
    const { items } = createTestState().vessels;
    expect(searchVessels(items, 'coral').map((v) => v.id)).toEqual(['coral-voyager']);
    expect(searchVessels(items, '9784512').map((v) => v.id)).toEqual(['atlantic-meridian']);
    expect(searchVessels(items, 'general cargo').map((v) => v.id)).toEqual(['baltic-pioneer']);
    expect(searchVessels(items, '   ')).toHaveLength(3);
  });
});
