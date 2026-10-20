import { isAbnormal } from './engineSlice';
import ReadingValue from './ReadingValue';
import { formatRange } from './readingFormat';

/** Parameter / value / normal range table for a list of readings. */
export default function ReadingsTable({ readings, caption }) {
  return (
    <table className="table simple-table readings-table mb-0">
      {caption && <caption className="visually-hidden">{caption}</caption>}
      <thead>
        <tr>
          <th scope="col">Parameter</th>
          <th scope="col" className="text-end">
            Value
          </th>
          <th scope="col" className="text-end">
            Normal range
          </th>
        </tr>
      </thead>
      <tbody>
        {readings.map((reading) => (
          <tr key={reading.id} className={isAbnormal(reading) ? 'is-alert' : undefined}>
            <th scope="row" className={`fw-normal ${isAbnormal(reading) ? 'text-danger fw-medium' : ''}`}>
              {reading.label}
            </th>
            <td className="text-end">
              <ReadingValue reading={reading} />
            </td>
            <td className="text-end text-muted">{formatRange(reading)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
