import { Routes } from 'react-router-dom';
import { vesselRoute } from '../app/vesselRoutes';
import { renderWithProviders } from './utils';

/** Coral Voyager: a product tanker at anchor, used by most page tests. */
export const TEST_VESSEL_ID = 'coral-voyager';

/** Renders a vessel page (without the app shell), e.g. renderVesselPage('/crew'). */
export function renderVesselPage(section = '', { vesselId = TEST_VESSEL_ID, ...options } = {}) {
  return renderWithProviders(<Routes>{vesselRoute}</Routes>, { route: `/vessels/${vesselId}${section}`, ...options });
}

/** The app uses local data only: fails the test if anything calls fetch. */
export function forbidNetworkRequests() {
  let fetchSpy;
  beforeEach(() => {
    fetchSpy = vi.fn(() => Promise.reject(new Error('unexpected network request')));
    vi.stubGlobal('fetch', fetchSpy);
  });
  afterEach(() => {
    expect(fetchSpy).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
}
