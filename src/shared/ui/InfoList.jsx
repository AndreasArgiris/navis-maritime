/** Label / value grid. items: [{ label, value }] — empty values render as an em dash. */
export default function InfoList({ items, columns = 2 }) {
  return (
    <dl className={`info-list info-list--cols-${columns}`}>
      {items.map(({ label, value }) => (
        <div key={label} className="info-list__item">
          <dt>{label}</dt>
          <dd>{value === null || value === undefined || value === '' ? '—' : value}</dd>
        </div>
      ))}
    </dl>
  );
}
