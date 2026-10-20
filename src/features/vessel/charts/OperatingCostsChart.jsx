import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCompactCurrency, formatCurrency } from '../../../shared/utils/format';
import { SERIES_COLORS, axisProps, gridProps, legendProps, tooltipProps } from '../../../shared/charts/chartTheme';

const SERIES = [
  { key: 'fuel', name: 'Fuel' },
  { key: 'crew', name: 'Crew' },
  { key: 'maintenance', name: 'Maintenance' },
  { key: 'port', name: 'Port' },
];

/** Stacked monthly operating expenditure. */
export default function OperatingCostsChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -4, bottom: 0 }} barCategoryGap="28%">
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} width={56} tickFormatter={formatCompactCurrency} />
        <Tooltip {...tooltipProps} cursor={{ fill: 'rgba(19,35,91,0.04)' }} formatter={(value) => formatCurrency(value)} />
        <Legend {...legendProps} />
        {SERIES.map((series, index) => (
          <Bar
            key={series.key}
            dataKey={series.key}
            name={series.name}
            stackId="costs"
            fill={SERIES_COLORS[index]}
            stroke="#fff"
            strokeWidth={1}
            radius={index === SERIES.length - 1 ? [4, 4, 0, 0] : 0}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
