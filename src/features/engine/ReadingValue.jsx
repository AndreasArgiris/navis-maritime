import { FiAlertTriangle } from 'react-icons/fi';
import { getReadingStatus } from './engineSlice';
import { formatRange, formatReadingNumber } from './readingFormat';

/** A reading's value; red with a warning icon when outside its normal range. */
export default function ReadingValue({ reading, showUnit = true }) {
  const status = getReadingStatus(reading);
  const isAlert = status !== 'normal';
  return (
    <span className={`reading ${isAlert ? 'reading--alert' : ''}`} title={isAlert ? `Normal: ${formatRange(reading)}` : undefined}>
      {isAlert && <FiAlertTriangle aria-hidden="true" className="reading__icon" />}
      {formatReadingNumber(reading.value, reading.decimals)}
      {showUnit && reading.unit ? ` ${reading.unit}` : ''}
      {isAlert && <span className="visually-hidden"> ({status === 'high' ? 'above' : 'below'} normal range)</span>}
    </span>
  );
}
