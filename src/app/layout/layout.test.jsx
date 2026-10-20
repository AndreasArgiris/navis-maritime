import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Sidebar from './Sidebar';
import VesselSearch from '../../features/fleet/VesselSearch';
import Topbar from './Topbar';
import { getTransitionKey } from './AppLayout';

describe('Sidebar', () => {
  it('links to every section of the active vessel', () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByRole('link', { name: 'Fleet Map' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Inventory' })).toHaveAttribute(
      'href',
      '/vessels/atlantic-meridian/inventory',
    );
    expect(screen.getByRole('link', { name: 'Crew' })).toHaveAttribute('href', '/vessels/atlantic-meridian/crew');
  });

  it('highlights the current route', () => {
    renderWithProviders(<Sidebar />, { route: '/vessels/atlantic-meridian/invoices' });
    expect(screen.getByRole('link', { name: 'Invoices' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveClass('active');
  });
});

describe('VesselSearch', () => {
  it('finds vessels and navigates on selection', async () => {
    const { user } = renderWithProviders(<VesselSearch />);
    await user.type(screen.getByRole('combobox', { name: 'Search vessels' }), 'coral');

    const option = screen.getByRole('option', { name: /Coral Voyager/ });
    await user.click(option);

    expect(screen.getByTestId('location')).toHaveTextContent('/vessels/coral-voyager');
  });

  it('supports keyboard selection', async () => {
    const { user } = renderWithProviders(<VesselSearch />);
    await user.type(screen.getByRole('combobox'), 'a{ArrowDown}{Enter}');
    expect(screen.getByTestId('location').textContent).toMatch(/^\/vessels\//);
  });

  it('tells the user when nothing matches', async () => {
    const { user } = renderWithProviders(<VesselSearch />);
    await user.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.getByText('No vessels found')).toBeInTheDocument();
  });
});

describe('Topbar', () => {
  it('hides the title and date on the fleet map', () => {
    renderWithProviders(<Topbar />, { route: '/' });
    expect(screen.queryByText('Fleet Operations')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Search vessels' })).toBeInTheDocument();
  });

  it('shows the title and date on other pages', () => {
    renderWithProviders(<Topbar />, { route: '/vessels/atlantic-meridian' });
    expect(screen.getByText('Fleet Operations')).toBeInTheDocument();
  });
});

describe('getTransitionKey', () => {
  it('groups vessel sub-pages under one key', () => {
    expect(getTransitionKey('/vessels/abc/crew')).toBe('/vessels/abc');
    expect(getTransitionKey('/vessels/abc')).toBe('/vessels/abc');
    expect(getTransitionKey('/')).toBe('/');
  });
});
