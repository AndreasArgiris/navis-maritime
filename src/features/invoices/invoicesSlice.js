import { createSelector, createSlice } from '@reduxjs/toolkit';
import { seedData } from '../../data/seed';

const EMPTY = [];

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: { byVessel: seedData.invoices },
  reducers: {},
});

export default invoicesSlice.reducer;

export function filterInvoices(invoices, { query = '', status = 'all' }) {
  const needle = query.trim().toLowerCase();
  return invoices.filter(
    (invoice) =>
      (status === 'all' || invoice.status === status) &&
      (!needle ||
        invoice.vendor.toLowerCase().includes(needle) ||
        invoice.number.toLowerCase().includes(needle)),
  );
}

export const selectInvoices = (state, vesselId) => state.invoices.byVessel[vesselId] ?? EMPTY;

export const selectInvoiceStats = createSelector([selectInvoices], (invoices) => {
  const sumOf = (list) => list.reduce((sum, invoice) => sum + invoice.amount, 0);
  const unpaid = invoices.filter((invoice) => invoice.status !== 'paid');
  const overdue = invoices.filter((invoice) => invoice.status === 'overdue');
  return {
    count: invoices.length,
    outstanding: sumOf(unpaid),
    openCount: unpaid.length,
    overdueCount: overdue.length,
    overdueAmount: sumOf(overdue),
    paidTotal: sumOf(invoices.filter((invoice) => invoice.status === 'paid')),
    statusCounts: {
      all: invoices.length,
      pending: invoices.filter((invoice) => invoice.status === 'pending').length,
      overdue: overdue.length,
      paid: invoices.length - unpaid.length,
    },
  };
});

export const selectSpendByCategory = createSelector([selectInvoices], (invoices) => {
  const totals = invoices.reduce((acc, invoice) => {
    acc[invoice.category] = (acc[invoice.category] ?? 0) + invoice.amount;
    return acc;
  }, {});
  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
});
