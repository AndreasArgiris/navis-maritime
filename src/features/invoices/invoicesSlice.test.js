import { filterInvoices, selectInvoiceStats, selectSpendByCategory } from './invoicesSlice';

const invoices = [
  { id: 'a', number: 'INV-1', vendor: 'Northstar Bunkers', category: 'Bunkers', amount: 1000, status: 'paid' },
  { id: 'b', number: 'INV-2', vendor: 'Atlas Marine Spares', category: 'Spares', amount: 300, status: 'pending' },
  { id: 'c', number: 'INV-3', vendor: 'Northstar Bunkers', category: 'Bunkers', amount: 500, status: 'overdue' },
];
const state = { byVessel: { v1: invoices } };

describe('invoices slice', () => {
  it('filters by status and vendor / number', () => {
    expect(filterInvoices(invoices, { status: 'overdue' }).map((i) => i.id)).toEqual(['c']);
    expect(filterInvoices(invoices, { query: 'northstar' }).map((i) => i.id)).toEqual(['a', 'c']);
    expect(filterInvoices(invoices, { query: 'inv-2' }).map((i) => i.id)).toEqual(['b']);
  });

  it('computes outstanding and overdue totals', () => {
    const stats = selectInvoiceStats({ invoices: state }, 'v1');
    expect(stats).toMatchObject({
      count: 3,
      outstanding: 800,
      openCount: 2,
      overdueCount: 1,
      overdueAmount: 500,
      paidTotal: 1000,
      statusCounts: { all: 3, pending: 1, overdue: 1, paid: 1 },
    });
  });

  it('groups spend by category, largest first', () => {
    expect(selectSpendByCategory({ invoices: state }, 'v1')).toEqual([
      { category: 'Bunkers', amount: 1500 },
      { category: 'Spares', amount: 300 },
    ]);
  });
});
