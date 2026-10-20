import { useSelector } from 'react-redux';
import { useFilters } from '../../shared/hooks/useFilters';
import { filterInvoices, selectInvoiceStats, selectInvoices, selectSpendByCategory } from './invoicesSlice';

const INITIAL_FILTERS = { query: '', status: 'all' };
const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'paid', label: 'Paid' },
];

/** The vessel's invoices with stats, spend per category, status filter options and filters. */
export function useInvoiceList(vesselId) {
  const invoices = useSelector((state) => selectInvoices(state, vesselId));
  const stats = useSelector((state) => selectInvoiceStats(state, vesselId));
  const spendByCategory = useSelector((state) => selectSpendByCategory(state, vesselId));
  const { filters, setFilter, filtered } = useFilters(invoices, filterInvoices, INITIAL_FILTERS);
  const statusOptions = STATUS_FILTERS.map((option) => ({ ...option, count: stats.statusCounts[option.value] }));
  return { invoices: filtered, stats, spendByCategory, statusOptions, filters, setFilter };
}
