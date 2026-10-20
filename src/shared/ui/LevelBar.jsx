/** Thin horizontal meter. `value` and `max` are raw numbers; tone picks the fill color. */
export default function LevelBar({ value, max, tone = 'navy', label }) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const pct = Math.round(ratio * 100);
  return (
    <div
      className="level-bar"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className={`level-bar__fill level-bar__fill--${tone}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
