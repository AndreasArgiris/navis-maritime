import { isAbnormal } from './engineSlice';
import ReadingValue from './ReadingValue';
import { formatRange } from './readingFormat';

const COLUMNS = [
  { key: 'exhaustTemp', label: 'Exhaust temp' },
  { key: 'pComp', label: 'Pcomp' },
  { key: 'pMax', label: 'Pmax' },
  { key: 'coolingOut', label: 'Cooling outlet' },
];

/** One row per cylinder; any out-of-range cell is red. */
export default function CylinderTable({ cylinders }) {
  const limits = cylinders[0]?.readings ?? {};
  return (
    <table className="table simple-table readings-table mb-0">
      <caption className="visually-hidden">Cylinder readings</caption>
      <thead>
        <tr>
          <th scope="col">Cylinder</th>
          {COLUMNS.map((column) => (
            <th key={column.key} scope="col" className="text-end">
              {column.label}
              {limits[column.key] && <div className="readings-table__limit">{formatRange(limits[column.key])}</div>}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cylinders.map(({ cylinder, readings }) => {
          const hasAlert = Object.values(readings).some(isAbnormal);
          return (
            <tr key={cylinder} className={hasAlert ? 'is-alert' : undefined}>
              <th scope="row" className={hasAlert ? 'text-danger' : undefined}>
                #{cylinder}
              </th>
              {COLUMNS.map((column) => (
                <td key={column.key} className="text-end">
                  <ReadingValue reading={readings[column.key]} />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
