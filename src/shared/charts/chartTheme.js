/**
 * Categorical series colors, assigned in this fixed order (never cycled).
 * Validated for lightness band, CVD separation and 3:1 contrast on white.
 */
export const SERIES_COLORS = ['#2F4FB5', '#0F9480', '#D9702A', '#8E5BD9'];

export const INK = {
  primary: '#0B0B0F',
  secondary: '#4B5262',
  muted: '#8A90A0',
  grid: '#EEF0F5',
};

export const axisProps = {
  axisLine: false,
  tickLine: false,
  tick: { fill: INK.muted, fontSize: 12 },
};

export const gridProps = {
  stroke: INK.grid,
  vertical: false,
};

export const tooltipProps = {
  contentStyle: {
    borderRadius: 12,
    border: '1px solid #E4E7EF',
    boxShadow: '0 8px 24px rgba(19, 35, 91, 0.12)',
    fontSize: 13,
    color: INK.primary,
  },
  labelStyle: { color: INK.primary, fontWeight: 600, marginBottom: 4 },
  itemStyle: { color: INK.secondary, padding: 0 },
};

export const legendProps = {
  iconType: 'circle',
  iconSize: 8,
  wrapperStyle: { fontSize: 12, color: INK.secondary, paddingTop: 8 },
};
