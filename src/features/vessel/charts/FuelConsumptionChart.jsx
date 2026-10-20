import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from '../../../shared/utils/format';
import { SERIES_COLORS, axisProps, gridProps, legendProps, tooltipProps } from '../../../shared/charts/chartTheme';

/** Monthly fuel burn: actual vs voyage plan, in tonnes. */
export default function FuelConsumptionChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} width={48} tickFormatter={(value) => `${value}t`} />
        <Tooltip {...tooltipProps} formatter={(value) => `${formatNumber(value)} t`} />
        <Legend {...legendProps} />
        <Line
          type="monotone"
          dataKey="actual"
          name="Actual"
          stroke={SERIES_COLORS[0]}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="planned"
          name="Planned"
          stroke={SERIES_COLORS[1]}
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
          activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
