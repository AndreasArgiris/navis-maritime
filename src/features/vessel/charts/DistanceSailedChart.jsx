import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from '../../../shared/utils/format';
import { SERIES_COLORS, axisProps, gridProps, tooltipProps } from '../../../shared/charts/chartTheme';

export default function DistanceSailedChart({ data, height = 260 }) {
  const color = SERIES_COLORS[0];
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="distanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} width={48} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
        <Tooltip {...tooltipProps} formatter={(value) => [`${formatNumber(value)} nm`, 'Distance']} />
        <Area
          type="monotone"
          dataKey="nauticalMiles"
          stroke={color}
          strokeWidth={2}
          fill="url(#distanceFill)"
          activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
