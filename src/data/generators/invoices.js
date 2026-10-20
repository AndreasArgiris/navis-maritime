import { addDays, toIsoDate } from '../../shared/utils/dates';
import { rngFor } from '../rng';

const INVOICE_CATEGORIES = {
  Bunkers: { vendors: ['Northstar Bunkers', 'BlueWave Fuel Supply'], range: [120000, 450000] },
  'Port fees': { vendors: ['Harborline Port Services', 'Meridian Port Agency'], range: [5000, 40000] },
  Spares: { vendors: ['Atlas Marine Spares', 'Keel & Co. Engineering'], range: [2000, 60000] },
  Provisions: { vendors: ['Galley Provisions Ltd.', 'FreshSea Ship Chandlers'], range: [3000, 20000] },
  Crew: { vendors: ['Seafarer Crewing Group', 'Anchor Crew Management'], range: [20000, 90000] },
  Repairs: { vendors: ['Drydock Partners', 'Tidewater Repairs'], range: [10000, 150000] },
};
const PAYMENT_TERMS_DAYS = 30;

/** Past-due invoices are mostly paid (some overdue); open ones are mostly still pending. */
function invoiceStatus(rng, isPastDue) {
  if (isPastDue) return rng.chance(0.85) ? 'paid' : 'overdue';
  return rng.chance(0.3) ? 'paid' : 'pending';
}

function generateInvoice(rng, { vesselId, index, category, referenceDate }) {
  const { vendors, range } = INVOICE_CATEGORIES[category];
  const issueDate = addDays(referenceDate, -rng.int(0, 180));
  const dueDate = addDays(issueDate, PAYMENT_TERMS_DAYS);
  const status = invoiceStatus(rng, dueDate < referenceDate);
  return {
    id: `${vesselId}-inv-${String(index + 1).padStart(3, '0')}`,
    number: `INV-${issueDate.getFullYear()}-${rng.int(10000, 99999)}`,
    vendor: rng.pick(vendors),
    category,
    amount: Math.round(rng.int(range[0], range[1]) / 10) * 10,
    currency: 'USD',
    issueDate: toIsoDate(issueDate),
    dueDate: toIsoDate(dueDate),
    status,
  };
}

/** Supplier invoices from the last six months, newest first. */
export function generateInvoices(vesselId, referenceDate, count = 24) {
  const rng = rngFor(vesselId, 'invoices');
  const categories = Object.keys(INVOICE_CATEGORIES);
  return Array.from({ length: count }, (_, index) =>
    generateInvoice(rng, { vesselId, index, category: rng.pick(categories), referenceDate }),
  ).sort((a, b) => b.issueDate.localeCompare(a.issueDate));
}
