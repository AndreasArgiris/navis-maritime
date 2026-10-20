import { Col, Row } from 'react-bootstrap';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';
import { useCurrentVessel } from '../vessel/useCurrentVessel';
import { formatCompactCurrency } from '../../shared/utils/format';
import Panel from '../../shared/ui/Panel';
import DataTable from '../../shared/ui/DataTable';
import FilterPills from '../../shared/ui/FilterPills';
import SearchInput from '../../shared/ui/SearchInput';
import StatCardRow from '../../shared/ui/StatCardRow';
import HorizontalBarChart from '../../shared/charts/HorizontalBarChart';
import { invoiceColumns } from './invoiceColumns';
import { useInvoiceList } from './useInvoiceList';

const NEWEST_FIRST = { key: 'issueDate', direction: 'desc' };

export default function InvoicesPage() {
  const vessel = useCurrentVessel();
  const { invoices, stats, spendByCategory, statusOptions, filters, setFilter } = useInvoiceList(vessel.id);

  return (
    <>
      <StatCardRow
        cards={[
          { icon: FiFileText, tone: 'navy', label: 'Invoices (6 mo)', value: stats.count },
          {
            icon: FiClock,
            tone: 'violet',
            label: 'Outstanding',
            value: formatCompactCurrency(stats.outstanding),
            hint: `${stats.openCount} open`,
          },
          {
            icon: FiAlertTriangle,
            tone: 'orange',
            label: 'Overdue',
            value: formatCompactCurrency(stats.overdueAmount),
            hint: `${stats.overdueCount} invoices`,
          },
          { icon: FiCheckCircle, tone: 'teal', label: 'Paid', value: formatCompactCurrency(stats.paidTotal) },
        ]}
      />

      <Row className="g-3">
        <Col xl={8}>
          <Panel
            title="Invoices"
            subtitle="Supplier invoices for this vessel"
            actions={
              <div className="toolbar">
                <FilterPills
                  label="Filter invoices by status"
                  options={statusOptions}
                  value={filters.status}
                  onChange={(value) => setFilter('status', value)}
                  layoutId="invoice-status-filter"
                />
                <SearchInput
                  value={filters.query}
                  onChange={(value) => setFilter('query', value)}
                  label="Search invoices"
                  placeholder="Vendor or number…"
                />
              </div>
            }
          >
            <DataTable columns={invoiceColumns} rows={invoices} caption="Invoices" initialSort={NEWEST_FIRST} />
          </Panel>
        </Col>
        <Col xl={4}>
          <Panel title="Spend by category" subtitle="Last 6 months">
            <HorizontalBarChart
              data={spendByCategory}
              categoryKey="category"
              valueKey="amount"
              valueLabel="Spend"
              formatValue={formatCompactCurrency}
            />
          </Panel>
        </Col>
      </Row>
    </>
  );
}
