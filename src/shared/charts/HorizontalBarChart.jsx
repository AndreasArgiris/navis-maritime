import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { INK, SERIES_COLORS, axisProps, tooltipProps } from './chartTheme';

/** Single-series ranked bar chart; direct-labels each bar with its value. */
export default function HorizontalBarChart({
  data,
  categoryKey,
  valueKey,
  valueLabel,
  formatValue = (value) => value,
  height,
  color = SERIES_COLORS[0],
}) {
  const chartHeight = height ?? Math.max(160, data.length * 44);
  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 56, left: 0, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid stroke={INK.grid} horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey={categoryKey}
          {...axisProps}
          width={110}
          tick={{ fill: INK.secondary, fontSize: 12 }}
        />
        <Tooltip
          {...tooltipProps}
          cursor={{ fill: 'rgba(19,35,91,0.04)' }}
          formatter={(value) => [formatValue(value), valueLabel]}
        />
        <Bar dataKey={valueKey} fill={color} radius={[0, 4, 4, 0]}>
          <LabelList
            dataKey={valueKey}
            // Custom renderer: the default label wraps to the bar's width, which breaks on short bars.
            content={({ x, y, width, height, value }) => (
              <text x={x + width + 6} y={y + height / 2} dy={4} fill={INK.secondary} fontSize={12}>
                {formatValue(value)}
              </text>
            )}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
