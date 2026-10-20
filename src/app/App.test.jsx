import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import App from './App';

vi.mock('react-leaflet', () => import('../test/mocks/reactLeaflet'));

/** The 404 stands alone: logo, message and a way back. Nothing from the app shell. */
function expectStandaloneNotFound(title) {
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Navis Fleet home' })).toBeInTheDocument(); // the logo
  expect(screen.getByRole('link', { name: 'Back to fleet map' })).toHaveAttribute('href', '/');

  expect(screen.queryByRole('complementary', { name: 'Main navigation' })).not.toBeInTheDocument();
  expect(screen.queryByRole('combobox', { name: 'Search vessels' })).not.toBeInTheDocument();
  expect(screen.queryByText('Fleet Manager')).not.toBeInTheDocument();
}

describe('App routing', () => {
  it('shows the standalone 404 for unknown pages', () => {
    renderWithProviders(<App />, { route: '/no-such-page' });
    expectStandaloneNotFound('Page not found');
  });

  it('shows the standalone 404 for unknown vessels', () => {
    renderWithProviders(<App />, { route: '/vessels/ghost-ship/crew' });
    expectStandaloneNotFound('Vessel not found');
  });

  it('keeps the app shell on real pages', () => {
    renderWithProviders(<App />, { route: '/vessels/coral-voyager/crew' });
    expect(screen.getByRole('complementary', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Search vessels' })).toBeInTheDocument();
  });

  it('takes you back to the fleet map', async () => {
    const { user } = renderWithProviders(<App />, { route: '/no-such-page' });
    await user.click(screen.getByRole('link', { name: 'Back to fleet map' }));
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/);
    expect(screen.getByRole('heading', { level: 1, name: 'Fleet Overview' })).toBeInTheDocument();
  });
});
