import { motion } from 'framer-motion';

/**
 * Underlined tab strip.
 * tabs: [{ value, label, icon?, count? }]
 */
export default function TabNav({ tabs, value, onChange, label, layoutId = 'tab-underline', idPrefix = 'tab' }) {
  return (
    <div className="tab-nav" role="tablist" aria-label={label}>
      {tabs.map(({ value: tabValue, label: tabLabel, icon: Icon, count }) => {
        const isActive = tabValue === value;
        return (
          <button
            key={tabValue}
            id={`${idPrefix}-${tabValue}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel-${tabValue}`}
            className={`tab-nav__item ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(tabValue)}
          >
            {Icon && <Icon aria-hidden="true" />}
            {tabLabel}
            {count != null && <span className="tab-nav__count">{count}</span>}
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="tab-nav__underline"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Wraps one tab's content with the matching ARIA wiring. */
export function TabPanel({ value, idPrefix = 'tab', children }) {
  return (
    <div role="tabpanel" id={`${idPrefix}-panel-${value}`} aria-labelledby={`${idPrefix}-${value}`}>
      {children}
    </div>
  );
}
