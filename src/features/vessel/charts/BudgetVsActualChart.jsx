import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCompactCurrency, formatCurrency } from '../../../shared/utils/format';
import { SERIES_COLORS, axisProps, gridProps, legendProps, tooltipProps } from '../../../shared/charts/chartTheme';

/** Annual spend per cost category against budget (grouped bars). */
export default function BudgetVsActualChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 4, left: -4, bottom: 0 }} barGap={2} barCategoryGap="24%">
        <CartesianGrid {...gridProps} />
        <XAxis
          dataKey="category"
          {...axisProps}
          interval={0}
          tick={{ ...axisProps.tick, fontSize: 11 }}
          tickFormatter={(name) => (name === 'Maintenance' ? 'Maint.' : name)}
        />
        <YAxis {...axisProps} width={52} tickFormatter={formatCompactCurrency} />
        <Tooltip {...tooltipProps} cursor={{ fill: 'rgba(19,35,91,0.04)' }} formatter={(value) => formatCurrency(value)} />
        <Legend {...legendProps} />
        <Bar dataKey="budget" name="Budget" fill={SERIES_COLORS[1]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="actual" name="Actual" fill={SERIES_COLORS[0]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
