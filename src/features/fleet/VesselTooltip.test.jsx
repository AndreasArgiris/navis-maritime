import { render, screen } from '@testing-library/react';
import VesselTooltip from './VesselTooltip';
import { sampleVessel } from '../../test/fixtures';

const weather = { temperature: 19, weatherCode: 2, windSpeed: 12, windDirection: 90, waveHeight: 1 };

describe('VesselTooltip', () => {
  it('shows the vessel name, location and coordinates', () => {
    render(<VesselTooltip vessel={sampleVessel} weather={weather} />);
    expect(screen.getByText('Atlantic Meridian')).toBeInTheDocument();
    expect(screen.getByText('North Atlantic Ocean')).toBeInTheDocument();
    expect(screen.getByText('38.20° N, 42.50° W')).toBeInTheDocument();
    expect(screen.getByText(/18.6 kn/)).toBeInTheDocument();
  });

  it('shows the weather at the vessel', () => {
    render(<VesselTooltip vessel={sampleVessel} weather={weather} />);
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByText('12 kn E')).toBeInTheDocument();
  });

  it('describes stationary vessels', () => {
    render(<VesselTooltip vessel={{ ...sampleVessel, speed: 0 }} weather={weather} />);
    expect(screen.getByText(/Stationary/)).toBeInTheDocument();
  });
});
