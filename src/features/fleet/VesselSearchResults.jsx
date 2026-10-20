import { AnimatePresence, motion } from 'framer-motion';
import StatusBadge from '../../shared/ui/StatusBadge';

/** The listbox under the vessel search input. */
export default function VesselSearchResults({ id, visible, results, highlighted, onHighlight, onSelect }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.ul
          id={id}
          role="listbox"
          className="vessel-search__results"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          {results.length === 0 && <li className="vessel-search__empty">No vessels found</li>}
          {results.map((vessel, index) => (
            <li
              key={vessel.id}
              role="option"
              aria-selected={index === highlighted}
              className={`vessel-search__option ${index === highlighted ? 'is-highlighted' : ''}`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onSelect(vessel)}
              onMouseEnter={() => onHighlight(index)}
            >
              <span>
                <span className="vessel-search__name">{vessel.name}</span>
                <span className="vessel-search__meta">
                  {vessel.type} · IMO {vessel.imo}
                </span>
              </span>
              <StatusBadge status={vessel.status} />
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
