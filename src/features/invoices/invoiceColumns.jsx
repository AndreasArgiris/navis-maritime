import { formatCurrency, formatDate } from '../../shared/utils/format';
import StatusBadge from '../../shared/ui/StatusBadge';

/** DataTable columns for supplier invoices. */
export const invoiceColumns = [
  { key: 'number', header: 'Invoice', sortable: true, render: (invoice) => <span className="fw-medium">{invoice.number}</span> },
  { key: 'vendor', header: 'Vendor', sortable: true },
  { key: 'category', header: 'Category', sortable: true },
  { key: 'issueDate', header: 'Issued', sortable: true, render: (invoice) => formatDate(invoice.issueDate) },
  { key: 'dueDate', header: 'Due', sortable: true, render: (invoice) => formatDate(invoice.dueDate) },
  { key: 'amount', header: 'Amount', sortable: true, align: 'end', render: (invoice) => formatCurrency(invoice.amount) },
  { key: 'status', header: 'Status', sortable: true, render: (invoice) => <StatusBadge status={invoice.status} /> },
];
