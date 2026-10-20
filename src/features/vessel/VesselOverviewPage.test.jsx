import { screen, within } from '@testing-library/react';
import { forbidNetworkRequests, renderVesselPage, TEST_VESSEL_ID } from '../../test/vesselPages';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

describe('vessel overview', () => {
  forbidNetworkRequests();

  it('shows the vessel header and marks the vessel active', () => {
    const { store } = renderVesselPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Coral Voyager' })).toBeInTheDocument();
    expect(store.getState().vessels.activeVesselId).toBe(TEST_VESSEL_ID);
  });

  it('shows snapshot KPIs and the weather at the vessel', () => {
    renderVesselPage();
    expect(screen.getByRole('group', { name: 'Fuel on board' })).toHaveTextContent('610 t');
    expect(screen.getByRole('region', { name: 'Top spare parts' })).toBeInTheDocument();
    const position = screen.getByRole('region', { name: 'Position & weather' });
    expect(within(position).getByText('Wind')).toBeInTheDocument();
  });
});
