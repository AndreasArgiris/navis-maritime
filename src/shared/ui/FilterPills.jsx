import { motion } from 'framer-motion';

/**
 * Segmented single-choice filter.
 * options: [{ value, label, count? }]
 */
export default function FilterPills({ options, value, onChange, label, layoutId = 'filter-pill' }) {
  return (
    <div className="filter-pills" role="radiogroup" aria-label={label}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`filter-pills__item ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="filter-pills__indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="filter-pills__label">
              {option.label}
              {option.count != null && <span className="filter-pills__count">{option.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
