import { screen, within } from '@testing-library/react';
import { createTestState } from '../../test/fixtures';
import { forbidNetworkRequests, renderVesselPage, TEST_VESSEL_ID } from '../../test/vesselPages';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

describe('invoices page', () => {
  forbidNetworkRequests();

  it('filters by status in a read-only table', async () => {
    const state = createTestState();
    const paidCount = state.invoices.byVessel[TEST_VESSEL_ID].filter((invoice) => invoice.status === 'paid').length;
    const { user } = renderVesselPage('/invoices', { preloadedState: state });

    await user.click(screen.getByRole('radio', { name: /Paid/ }));
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row').slice(1);
    expect(rows).toHaveLength(Math.min(paidCount, 10)); // first page
    rows.forEach((row) => expect(row).toHaveTextContent('Paid'));
    expect(within(table).queryByRole('button', { name: /paid/i })).not.toBeInTheDocument();
  });
});
