import LevelBar from '../../shared/ui/LevelBar';

/** Ranked list of most-consumed spare parts over the last 12 months. */
export default function TopSparePartsTable({ parts }) {
  const maxUsage = Math.max(1, ...parts.map((part) => part.usage12m));
  return (
    <table className="table top-parts mb-0">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Part</th>
          <th scope="col" className="w-40">
            Consumption
          </th>
          <th scope="col" className="text-end">
            Units / 12 mo
          </th>
        </tr>
      </thead>
      <tbody>
        {parts.map((part, index) => (
          <tr key={part.id}>
            <td className="text-muted">{String(index + 1).padStart(2, '0')}</td>
            <td>
              <div className="fw-medium">{part.name}</div>
              <div className="small text-muted">{part.system}</div>
            </td>
            <td>
              <LevelBar value={part.usage12m} max={maxUsage} label={`${part.name} consumption`} />
            </td>
            <td className="text-end">
              <span className="usage-chip">{part.usage12m}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
