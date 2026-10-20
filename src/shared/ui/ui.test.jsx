import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiUsers } from 'react-icons/fi';
import StatCard from './StatCard';
import StatusBadge from './StatusBadge';
import FilterPills from './FilterPills';
import LevelBar from './LevelBar';
import WeatherSummary from '../../features/weather/WeatherSummary';

describe('StatCard', () => {
  it('shows value, label and hint in a labelled group', () => {
    render(<StatCard icon={FiUsers} label="Crew on board" value={18} hint="2 joining" />);
    const card = screen.getByRole('group', { name: 'Crew on board' });
    expect(card).toHaveTextContent('18');
    expect(card).toHaveTextContent('2 joining');
  });
});

describe('StatusBadge', () => {
  it('renders the label for a known status', () => {
    render(<StatusBadge status="overdue" />);
    expect(screen.getByText('Overdue')).toHaveClass('bg-danger-subtle');
  });

  it('falls back to the raw status', () => {
    render(<StatusBadge status="mystery" />);
    expect(screen.getByText('mystery')).toBeInTheDocument();
  });
});

describe('FilterPills', () => {
  it('marks the selected option and reports changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <FilterPills
        label="Status"
        value="all"
        onChange={onChange}
        options={[
          { value: 'all', label: 'All', count: 3 },
          { value: 'paid', label: 'Paid', count: 1 },
        ]}
      />,
    );
    expect(screen.getByRole('radio', { name: /All/ })).toHaveAttribute('aria-checked', 'true');
    await user.click(screen.getByRole('radio', { name: /Paid/ }));
    expect(onChange).toHaveBeenCalledWith('paid');
  });
});

describe('LevelBar', () => {
  it('clamps the fill to 100%', () => {
    const { container } = render(<LevelBar value={50} max={10} label="Level" />);
    expect(container.querySelector('.level-bar__fill')).toHaveStyle({ width: '100%' });
    expect(screen.getByRole('meter', { name: 'Level' })).toHaveAttribute('aria-valuenow', '50');
  });
});

describe('WeatherSummary', () => {
  it('shows conditions, wind and sea state', () => {
    render(<WeatherSummary weather={{ temperature: 21.6, weatherCode: 61, windSpeed: 17.4, windDirection: 270, waveHeight: 1.8 }} />);
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('Rain')).toBeInTheDocument();
    expect(screen.getByText('17 kn W')).toBeInTheDocument();
    expect(screen.getByText('1.8 m · Moderate')).toBeInTheDocument();
  });

  it('omits waves when there is no wave height', () => {
    render(<WeatherSummary weather={{ temperature: 10, weatherCode: 0, windSpeed: 5, windDirection: 0, waveHeight: null }} />);
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.queryByText('Waves')).not.toBeInTheDocument();
  });

  it('renders nothing without weather', () => {
    const { container } = render(<WeatherSummary weather={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
