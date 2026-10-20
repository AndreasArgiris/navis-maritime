import { FiActivity, FiAlertTriangle, FiClock, FiPower } from 'react-icons/fi';
import { formatNumber } from '../../shared/utils/format';
import StatCardRow from '../../shared/ui/StatCardRow';
import ReadingValue from './ReadingValue';

export default function EngineSummaryCards({ mainEngine, isRunning, loadReading, alertCount }) {
  return (
    <StatCardRow
      cards={[
        { icon: FiPower, tone: 'navy', label: 'Main engine', value: isRunning ? 'Running' : 'Stopped', hint: mainEngine.model },
        {
          icon: FiActivity,
          tone: 'teal',
          label: 'Engine load',
          value: <ReadingValue reading={loadReading} />,
          hint: `${formatNumber(mainEngine.ratedPowerKw)} kW rated`,
        },
        {
          icon: FiClock,
          tone: 'violet',
          label: 'Running hours',
          value: formatNumber(mainEngine.runningHours),
          hint: `${formatNumber(mainEngine.hoursSinceOverhaul)} h since overhaul`,
        },
        {
          icon: FiAlertTriangle,
          tone: 'orange',
          label: 'Abnormal readings',
          value: <span className={alertCount ? 'text-danger' : undefined}>{alertCount}</span>,
          hint: alertCount ? 'Shown in red below' : 'All within range',
        },
      ]}
    />
  );
}
