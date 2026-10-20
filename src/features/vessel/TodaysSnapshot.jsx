import { FiAlertTriangle, FiDroplet, FiFileText, FiUsers } from 'react-icons/fi';
import { formatCompactCurrency, formatTonnes, percent } from '../../shared/utils/format';
import Panel from '../../shared/ui/Panel';
import StatCardRow from '../../shared/ui/StatCardRow';

const SNAPSHOT_COLUMNS = { xs: 6, md: 3 };

/** Four headline figures for the vessel: fuel, crew, outstanding invoices and low stock. */
export default function TodaysSnapshot({ vessel, crewStats, invoiceStats, inventoryStats }) {
  return (
    <Panel title="Today's snapshot" subtitle="Key figures for this vessel">
      <StatCardRow
        className=""
        columnSizes={SNAPSHOT_COLUMNS}
        cards={[
          {
            icon: FiDroplet,
            tone: 'navy',
            label: 'Fuel on board',
            value: formatTonnes(vessel.fuelRob),
            hint: `${percent(vessel.fuelRob, vessel.fuelCapacity)}% of capacity`,
          },
          {
            icon: FiUsers,
            tone: 'teal',
            label: 'Crew on board',
            value: crewStats.onboard,
            hint: `${crewStats.contractsEndingSoon} contracts ending soon`,
          },
          {
            icon: FiFileText,
            tone: 'violet',
            label: 'Outstanding invoices',
            value: formatCompactCurrency(invoiceStats.outstanding),
            hint: `${invoiceStats.overdueCount} overdue`,
          },
          {
            icon: FiAlertTriangle,
            tone: 'orange',
            label: 'Low-stock items',
            value: inventoryStats.lowStock,
            hint: `${inventoryStats.outOfStock} out of stock`,
          },
        ]}
      />
    </Panel>
  );
}
