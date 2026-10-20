import { Form } from 'react-bootstrap';

/** "All …" dropdown filter. options: string[] */
export default function SelectFilter({ label, value, onChange, options, allLabel }) {
  return (
    <Form.Select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="toolbar__select">
      <option value="all">{allLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}
