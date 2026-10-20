import { screen, within } from '@testing-library/react';
import { forbidNetworkRequests, renderVesselPage } from '../../test/vesselPages';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

describe('inventory page', () => {
  forbidNetworkRequests();

  it('opens on the cargo manifest for the vessel', () => {
    renderVesselPage('/inventory');
    expect(screen.getByRole('tab', { name: /Cargo/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('region', { name: 'Cargo manifest' })).toBeInTheDocument();
    // Coral Voyager is a product tanker: every lot is liquid bulk
    const typeCells = within(screen.getByRole('table'))
      .getAllByRole('row')
      .slice(1)
      .map((row) => within(row).getAllByRole('cell')[1].textContent);
    expect(new Set(typeCells)).toEqual(new Set(['Liquid bulk']));
  });

  it('shows an empty cargo state for a vessel in maintenance', () => {
    renderVesselPage('/inventory', { vesselId: 'baltic-pioneer' });
    expect(screen.getByText('No cargo on board')).toBeInTheDocument();
  });

  it('switches to living supplies', async () => {
    const { user } = renderVesselPage('/inventory');
    await user.click(screen.getByRole('tab', { name: /Living supplies/ }));
    expect(screen.getByRole('region', { name: 'Living supplies' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Cargo manifest' })).not.toBeInTheDocument();
  });

  it('living supplies: search narrows a read-only table', async () => {
    const { user } = renderVesselPage('/inventory?tab=living');

    await user.type(screen.getByRole('searchbox', { name: 'Search living supplies' }), 'coffee');
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(2); // header + 1
    expect(within(table).getByText('Coffee beans')).toBeInTheDocument();
    // Read-only: the only buttons in the table are the sortable column headers.
    within(table).queryAllByRole('button').forEach((button) => expect(button).toHaveClass('data-table__sort'));
  });

  it('living supplies: low-stock switch only shows items below minimum', async () => {
    const { user } = renderVesselPage('/inventory?tab=living');
    await user.click(screen.getByRole('checkbox', { name: 'Below minimum only' }));
    const badges = within(screen.getByRole('table')).getAllByText(/Low stock|Out of stock|In stock/);
    expect(badges.every((badge) => badge.textContent !== 'In stock')).toBe(true);
  });

  it('ship stores tab lists only ship stores', async () => {
    const { user } = renderVesselPage('/inventory');
    await user.click(screen.getByRole('tab', { name: /Ship stores/ }));

    expect(screen.getByRole('region', { name: 'Ship stores' })).toBeInTheDocument();
    const categoryFilter = screen.getByRole('combobox', { name: 'Filter by category' });
    const options = within(categoryFilter).getAllByRole('option').map((o) => o.textContent);
    expect(options).toEqual(['All categories', 'Chemicals', 'Deck stores', 'Lubricants', 'Safety', 'Workshop']);

    await user.type(screen.getByRole('searchbox', { name: 'Search ship stores' }), 'grease');
    expect(within(screen.getByRole('table')).getByText('Grease EP2')).toBeInTheDocument();
  });
});
