import { screen, within } from '@testing-library/react';
import { createTestState } from '../../test/fixtures';
import { forbidNetworkRequests, renderVesselPage, TEST_VESSEL_ID } from '../../test/vesselPages';
import { selectEngineAlerts } from './engineSlice';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

describe('engine page', () => {
  forbidNetworkRequests();

  it('lists every abnormal reading and shows it in red', () => {
    const state = createTestState();
    const alertCount = selectEngineAlerts(state, TEST_VESSEL_ID).length;
    renderVesselPage('/engine', { preloadedState: state });

    const alerts = screen.getByRole('region', { name: 'Engine alerts' });
    expect(within(alerts).getAllByRole('listitem')).toHaveLength(alertCount);
    expect(screen.getByRole('group', { name: 'Abnormal readings' })).toHaveTextContent(String(alertCount));

    const flagged = screen.getAllByText(/above normal range|below normal range/);
    expect(flagged.length).toBeGreaterThanOrEqual(alertCount);
    flagged.forEach((hint) => expect(hint.closest('.reading')).toHaveClass('reading--alert'));
  });

  it('explains that a stopped engine shows its last readings', () => {
    renderVesselPage('/engine'); // Coral Voyager is at anchor
    expect(screen.getByText(/Main engine stopped/)).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Cylinders' })).toBeInTheDocument();
  });
});
