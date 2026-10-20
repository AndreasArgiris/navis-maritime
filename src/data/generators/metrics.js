import { rngFor } from '../rng';

const FUEL_PRICE_PER_TONNE = 650;
const MONTHS = 12;

/** Short month names for the last 12 months, oldest first: ['Nov', 'Dec', …, 'Oct']. */
export function lastTwelveMonthLabels(referenceDate) {
  return Array.from({ length: MONTHS }, (_, i) => {
    const date = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - (MONTHS - 1 - i), 1);
    return date.toLocaleString('en-US', { month: 'short' });
  });
}

/** Planned burn follows a gentle seasonal curve; actual is within ±12 % of plan. */
function fuelSeries(rng, months, baseFuel) {
  return months.map((month, i) => {
    const planned = Math.round(baseFuel * (1 + 0.08 * Math.sin((i / MONTHS) * Math.PI * 2)));
    return { month, planned, actual: Math.round(planned * rng.float(0.88, 1.12, 2)) };
  });
}

function costSeries(rng, fuel) {
  return fuel.map(({ month, actual }) => ({
    month,
    fuel: actual * FUEL_PRICE_PER_TONNE,
    crew: rng.int(140, 220) * 1000,
    maintenance: rng.int(30, 160) * 1000,
    port: rng.int(20, 90) * 1000,
  }));
}

function distanceSeries(rng, months) {
  return months.map((month) => ({ month, nauticalMiles: rng.int(4500, 9000) }));
}

/** Year totals per cost category. */
export function totalCostsByCategory(costs) {
  return costs.reduce(
    (totals, row) => {
      totals.Fuel += row.fuel;
      totals.Crew += row.crew;
      totals.Maintenance += row.maintenance;
      totals.Port += row.port;
      return totals;
    },
    { Fuel: 0, Crew: 0, Maintenance: 0, Port: 0 },
  );
}

/** A budget within ±10 % of each category's actual spend, rounded to $1,000. */
function budgetVsActual(rng, totals) {
  return Object.entries(totals).map(([category, actual]) => ({
    category,
    actual,
    budget: Math.round((actual * rng.float(0.9, 1.1, 2)) / 1000) * 1000,
  }));
}

/** Monthly fuel, costs and distance for the last 12 months, plus budget vs actual. */
export function generateMetrics(vesselId, referenceDate) {
  const rng = rngFor(vesselId, 'metrics');
  const baseFuel = rng.int(600, 1400);
  const months = lastTwelveMonthLabels(referenceDate);

  const fuel = fuelSeries(rng, months, baseFuel);
  const costs = costSeries(rng, fuel);
  const distance = distanceSeries(rng, months);
  const budget = budgetVsActual(rng, totalCostsByCategory(costs));

  return { fuel, costs, distance, budget };
}
