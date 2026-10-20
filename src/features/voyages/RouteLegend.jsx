/** Map key for the drawn voyage; the remaining route only exists while the voyage is in progress. */
export default function RouteLegend({ showRemaining }) {
  return (
    <ul className="fleet-legend" aria-label="Route legend">
      <li>
        <span className="route-swatch route-swatch--selected" /> Route sailed
      </li>
      {showRemaining && (
        <li>
          <span className="route-swatch route-swatch--planned" /> Remaining route
        </li>
      )}
    </ul>
  );
}
