import { screen, within } from '@testing-library/react';
import { createTestState } from '../../test/fixtures';
import { forbidNetworkRequests, renderVesselPage, TEST_VESSEL_ID } from '../../test/vesselPages';
import { formatLocalDateTime } from '../../shared/utils/format';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

describe('route history page', () => {
  forbidNetworkRequests();

  it('draws only the selected voyage, and redraws when another is picked', async () => {
    const state = createTestState();
    const voyages = state.voyages.byVessel[TEST_VESSEL_ID];
    const { user } = renderVesselPage('/routes', { preloadedState: state });

    // No totals cards on this page.
    expect(screen.queryByRole('group', { name: /Voyages|Distance sailed|Ports visited|Days at sea/ })).not.toBeInTheDocument();

    const map = screen.getByTestId('map');
    const details = screen.getByRole('region', { name: 'Selected voyage' });
    const drawnPoints = () => within(map).getAllByTestId('route-line').map((line) => Number(line.dataset.points));

    // Latest voyage: one track (Coral Voyager is at anchor, so nothing remaining) and its two ports.
    expect(drawnPoints()).toEqual([voyages[0].path.length]);
    expect(within(map).getAllByTestId('port-marker')).toHaveLength(2);
    expect(within(details).getByText(voyages[0].voyageNo)).toBeInTheDocument();
    expect(within(map).getByText(`Departure: ${voyages[0].from}`)).toBeInTheDocument();
    expect(within(map).getByTestId('marker')).toBeInTheDocument(); // the vessel, on its latest voyage

    const target = voyages[1];
    await user.click(screen.getByRole('button', { name: `Show voyage ${target.voyageNo} on map` }));

    expect(drawnPoints()).toEqual([target.path.length]);
    expect(within(map).getByText(`Departure: ${target.from}`)).toBeInTheDocument();
    expect(within(map).getByText(`Arrival: ${target.to}`)).toBeInTheDocument();
    expect(within(details).getByText(target.voyageNo)).toBeInTheDocument();
    // The vessel itself is only shown on its latest voyage.
    expect(within(map).queryByTestId('marker')).not.toBeInTheDocument();
  });

  it('shows departure and arrival as date plus local port time', () => {
    const state = createTestState();
    const [latest] = state.voyages.byVessel[TEST_VESSEL_ID];
    renderVesselPage('/routes', { preloadedState: state });

    const departed = formatLocalDateTime(latest.departure, latest.departureTimeZone);
    const arrived = formatLocalDateTime(latest.arrival, latest.arrivalTimeZone);

    expect(screen.getByRole('columnheader', { name: 'Departed (local)' })).toBeInTheDocument();
    const row = within(screen.getByRole('table')).getByText(latest.voyageNo).closest('tr');
    expect(row).toHaveTextContent(`${departed.date}${departed.time} (${departed.offset})`);
    expect(row).toHaveTextContent(`${arrived.date}${arrived.time} (${arrived.offset})`);

    const details = screen.getByRole('region', { name: 'Selected voyage' });
    expect(within(details).getByText(`Departed · ${latest.from} time`)).toBeInTheDocument();
    expect(details).toHaveTextContent(`${departed.time} (${departed.offset})`);
  });
});
