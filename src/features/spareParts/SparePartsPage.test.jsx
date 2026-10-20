import { screen, within } from '@testing-library/react';
import { createTestState } from '../../test/fixtures';
import { forbidNetworkRequests, renderVesselPage, TEST_VESSEL_ID } from '../../test/vesselPages';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

describe('spare parts page', () => {
  forbidNetworkRequests();

  it('finds a part by number in a read-only table', async () => {
    const state = createTestState();
    const part = state.spareParts.byVessel[TEST_VESSEL_ID][0];
    const { user } = renderVesselPage('/spare-parts', { preloadedState: state });

    await user.type(screen.getByRole('searchbox', { name: 'Search spare parts' }), part.partNumber);
    const table = screen.getByRole('table');
    expect(within(table).getByText(part.name)).toBeInTheDocument();
    expect(within(table).queryByRole('button', { name: /Use/ })).not.toBeInTheDocument();
  });
});
