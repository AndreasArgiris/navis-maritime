import { formatLocalDateTime } from '../../shared/utils/format';

/** Date and local time at a port, e.g. "17 Oct 2026" over "14:30 (UTC-4)". */
export default function PortTime({ value, timeZone, prefix }) {
  if (!value) return '—';
  const { date, time, offset } = formatLocalDateTime(value, timeZone);
  return (
    <time className="port-time" dateTime={new Date(value).toISOString()}>
      <span className="port-time__date">
        {prefix && `${prefix} `}
        {date}
      </span>
      <span className="port-time__time">
        {time} <span className="port-time__offset">({offset})</span>
      </span>
    </time>
  );
}
