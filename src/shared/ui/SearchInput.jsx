import { useId } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput({ value, onChange, label = 'Search', placeholder = 'Search…', className = '' }) {
  const id = useId();
  return (
    <div className={`search-input ${className}`}>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <FiSearch className="search-input__icon" aria-hidden="true" />
      <input
        id={id}
        type="search"
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
