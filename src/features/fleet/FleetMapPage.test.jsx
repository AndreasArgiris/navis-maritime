import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import FleetMapPage from './FleetMapPage';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

describe('FleetMapPage', () => {
  // The app uses local data only: any network request is a bug.
  let fetchSpy;
  beforeEach(() => {
    fetchSpy = vi.fn(() => Promise.reject(new Error('unexpected network request')));
    vi.stubGlobal('fetch', fetchSpy);
  });
  afterEach(() => {
    expect(fetchSpy).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('shows fleet stats and one marker per vessel', () => {
    renderWithProviders(<FleetMapPage />);
    expect(screen.getByRole('group', { name: 'Total vessels' })).toHaveTextContent('3');
    expect(screen.getByRole('group', { name: 'In maintenance' })).toHaveTextContent('1');
    expect(screen.getAllByTestId('marker')).toHaveLength(3);
  });

  it('shows a tooltip with weather on hover, rendered outside the map', async () => {
    const { user } = renderWithProviders(<FleetMapPage />);
    const map = screen.getByTestId('map');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await user.hover(within(map).getByRole('button', { name: 'Coral Voyager' }));

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.parentElement).toBe(document.body); // portalled, so the map can't clip it
    expect(within(tooltip).getByText('Singapore Strait')).toBeInTheDocument();
    expect(within(tooltip).getByText('Wind')).toBeInTheDocument(); // weather shown straight away
  });

  it('hides the tooltip when the pointer leaves the pin', async () => {
    const { user } = renderWithProviders(<FleetMapPage />);
    const pin = within(screen.getByTestId('map')).getByRole('button', { name: 'Coral Voyager' });

    await user.hover(pin);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.unhover(pin);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('navigates to the vessel page when a pin is clicked', async () => {
    const { user } = renderWithProviders(<FleetMapPage />);
    await user.click(within(screen.getByTestId('map')).getByRole('button', { name: 'Baltic Pioneer' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/vessels/baltic-pioneer');
  });

  it('filters markers and list by status', async () => {
    const { user } = renderWithProviders(<FleetMapPage />);
    await user.click(screen.getByRole('radio', { name: /Anchored/ }));

    expect(screen.getAllByTestId('marker')).toHaveLength(1);
    expect(screen.getByRole('link', { name: /Coral Voyager/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Atlantic Meridian/ })).not.toBeInTheDocument();
  });
});
