import { ageFrom } from '../../shared/utils/dates';
import {
  generateCargo,
  generateCrew,
  generateInventory,
  generateInvoices,
  generateMetrics,
  generateSpareParts,
  generateWeather,
} from '.';
import { TEST_DATE } from '../../test/fixtures';

describe('mock data generators', () => {
  it('are deterministic for the same vessel and date', () => {
    expect(generateInventory('a', TEST_DATE)).toEqual(generateInventory('a', TEST_DATE));
    expect(generateCrew('a', TEST_DATE)).toEqual(generateCrew('a', TEST_DATE));
  });

  it('produce different data for different vessels', () => {
    expect(generateSpareParts('a', TEST_DATE)).not.toEqual(generateSpareParts('b', TEST_DATE));
  });

  it('gives every record a unique id', () => {
    const ids = generateInvoices('a', TEST_DATE).map((invoice) => invoice.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('marks only past-due unpaid invoices as overdue', () => {
    const today = TEST_DATE.toISOString().slice(0, 10);
    generateInvoices('a', TEST_DATE, 60).forEach((invoice) => {
      if (invoice.status === 'overdue') expect(invoice.dueDate < today).toBe(true);
      if (invoice.status === 'pending') expect(invoice.dueDate >= today).toBe(true);
    });
  });

  it('builds 12 months of metrics', () => {
    const metrics = generateMetrics('a', TEST_DATE);
    expect(metrics.fuel).toHaveLength(12);
    expect(metrics.costs).toHaveLength(12);
    expect(metrics.fuel.at(-1).month).toBe('Jun');
    expect(metrics.budget.map((row) => row.category)).toEqual(['Fuel', 'Crew', 'Maintenance', 'Port']);
  });

  it('splits inventory into living supplies and ship stores', () => {
    const items = generateInventory('a', TEST_DATE);
    const categoriesOf = (group) =>
      [...new Set(items.filter((item) => item.group === group).map((item) => item.category))].sort();

    expect(categoriesOf('living')).toEqual(['Cabin & hygiene', 'Fresh water', 'Galley', 'Medical', 'Provisions']);
    expect(categoriesOf('ship')).toEqual(['Chemicals', 'Deck stores', 'Lubricants', 'Safety', 'Workshop']);
    expect(items.every((item) => ['living', 'ship'].includes(item.group))).toBe(true);
  });

  it('builds a full crew profile', () => {
    const member = generateCrew('a', TEST_DATE, 'Test Vessel')[0];
    expect(member.rank).toBe('Master');
    expect(member.email).toMatch(/^[a-z]+\.[a-z]+@crew\.navis\.example$/);
    expect(['Male', 'Female']).toContain(member.gender);
    expect(ageFrom(member.dateOfBirth, TEST_DATE)).toBeGreaterThanOrEqual(42);
    expect(member.contracts[0]).toMatchObject({ vessel: 'Test Vessel', signOn: member.signOn });
    expect(member.contracts.slice(1).every((c) => c.status === 'completed')).toBe(true);
    expect(member.reviews).toHaveLength(member.contracts.length - 1);
    expect(member.tickets.map((t) => t.type)).toEqual(['Sign-on', 'Sign-off', 'Sign-off', 'Sign-on']);
    expect(member.certificates.map((c) => c.name)).toContain('Certificate of Competency');
    expect(member.medical.vaccinations.length).toBeGreaterThan(0);
  });

  it('matches cargo to the vessel type', () => {
    const base = { origin: 'A', destination: 'B', status: 'underway' };
    const tanker = generateCargo({ ...base, id: 't', type: 'Product Tanker' }, TEST_DATE);
    expect(tanker.length).toBeGreaterThan(0);
    expect(tanker.every((lot) => lot.cargoType === 'Liquid bulk' && lot.unit === 'm³')).toBe(true);

    const lng = generateCargo({ ...base, id: 'l', type: 'LNG Carrier' }, TEST_DATE);
    expect(lng.every((lot) => lot.temperature === -162)).toBe(true);
    expect(lng[0]).toMatchObject({ loadPort: 'A', dischargePort: 'B' });
  });

  it('gives vessels in maintenance no cargo', () => {
    expect(generateCargo({ id: 'm', type: 'General Cargo', status: 'maintenance' }, TEST_DATE)).toEqual([]);
  });

  it('estimates plausible weather', () => {
    const weather = generateWeather('a', 10, TEST_DATE);
    expect(weather.windDirection).toBeGreaterThanOrEqual(0);
    expect(weather.windDirection).toBeLessThan(360);
    expect(weather.temperature).toBeGreaterThan(15);
  });
});
