import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { isAbnormal } from './engineSlice';
import { INK, SERIES_COLORS, axisProps, gridProps, tooltipProps } from '../../shared/charts/chartTheme';

const ALERT_COLOR = '#C62828';

/** Exhaust gas temperature per cylinder with the upper limit marked; out-of-range bars are red. */
export default function ExhaustTempChart({ cylinders, height = 240 }) {
  const data = cylinders.map(({ cylinder, readings }) => ({
    name: `#${cylinder}`,
    value: readings.exhaustTemp.value,
    alert: isAbnormal(readings.exhaustTemp),
  }));
  const { min, max } = cylinders[0].readings.exhaustTemp;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 64, left: -12, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...axisProps} />
        <YAxis {...axisProps} domain={[250, (dataMax) => Math.max(dataMax, max) + 30]} width={48} tickFormatter={(value) => `${Math.round(value)}°`} />
        <Tooltip {...tooltipProps} cursor={{ fill: 'rgba(19,35,91,0.04)' }} formatter={(value) => [`${value} °C`, 'Exhaust temp']} />
        <ReferenceLine y={max} stroke={ALERT_COLOR} strokeDasharray="4 4" label={{ value: `Max ${max}°`, position: 'right', fill: INK.secondary, fontSize: 11 }} />
        <ReferenceLine y={min} stroke={INK.muted} strokeDasharray="4 4" label={{ value: `Min ${min}°`, position: 'right', fill: INK.secondary, fontSize: 11 }} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.alert ? ALERT_COLOR : SERIES_COLORS[0]} />
          ))}
          <LabelList dataKey="value" position="top" fill={INK.secondary} fontSize={11} formatter={(value) => `${value}°`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
