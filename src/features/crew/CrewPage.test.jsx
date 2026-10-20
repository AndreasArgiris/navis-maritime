import { screen, within } from '@testing-library/react';
import { createTestState } from '../../test/fixtures';
import { forbidNetworkRequests, renderVesselPage, TEST_VESSEL_ID } from '../../test/vesselPages';

vi.mock('react-leaflet', () => import('../../test/mocks/reactLeaflet'));

const firstMember = () => createTestState().crew.byVessel[TEST_VESSEL_ID][0];

describe('crew list', () => {
  forbidNetworkRequests();

  it('filters by department', async () => {
    const { user } = renderVesselPage('/crew');
    await user.click(screen.getByRole('radio', { name: /Catering/ }));
    const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(rows).toHaveLength(3);
    rows.forEach((row) => expect(row).toHaveTextContent('Catering'));
  });

  it('opens a crew member when their row is clicked', async () => {
    const member = firstMember();
    const { user } = renderVesselPage('/crew');
    const row = screen.getByRole('link', { name: member.name }).closest('tr');

    await user.click(within(row).getAllByRole('cell')[1]); // click the rank cell, not the link

    expect(screen.getByTestId('location')).toHaveTextContent(`/vessels/${TEST_VESSEL_ID}/crew/${member.id}`);
    expect(screen.getByRole('heading', { level: 2, name: member.name })).toBeInTheDocument();
  });
});

describe('crew member page', () => {
  forbidNetworkRequests();

  it('shows personal details on the overview tab', () => {
    const member = firstMember();
    renderVesselPage(`/crew/${member.id}`);
    const personal = screen.getByRole('region', { name: 'Personal information' });
    expect(within(personal).getByText(member.gender)).toBeInTheDocument();
    expect(within(personal).getByText(member.hometown)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: member.email }).length).toBeGreaterThan(0);
  });

  it.each([
    ['Schedule & tickets', 'Travel tickets'],
    ['Medical', 'Medical fitness'],
    ['Certificates', 'Certificates & licences'],
    ['Reviews', 'Performance reviews'],
  ])('switches to the %s tab', async (tabName, region) => {
    const { user } = renderVesselPage(`/crew/${firstMember().id}`);
    await user.click(screen.getByRole('tab', { name: new RegExp(tabName) }));
    expect(screen.getByRole('tab', { name: new RegExp(tabName) })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('region', { name: region })).toBeInTheDocument();
  });

  it('opens a tab straight from the URL', () => {
    renderVesselPage(`/crew/${firstMember().id}?tab=medical`);
    expect(screen.getByRole('region', { name: 'Vaccinations' })).toBeInTheDocument();
  });

  it('handles unknown crew members', () => {
    renderVesselPage('/crew/nobody');
    expect(screen.getByText('Crew member not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to crew list' })).toHaveAttribute('href', `/vessels/${TEST_VESSEL_ID}/crew`);
  });
});
