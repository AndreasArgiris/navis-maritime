import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { vesselPath } from '../../app/navigation';
import { searchVessels, selectAllVessels } from './vesselsSlice';

const MAX_RESULTS = 6;
/** Lets a click on a result land before blur closes the list. */
const CLOSE_DELAY_MS = 120;

/** New highlighted index after an arrow key, kept within the result list. */
export function moveHighlight(key, index, resultCount) {
  if (key === 'ArrowDown') return Math.min(index + 1, resultCount - 1);
  if (key === 'ArrowUp') return Math.max(index - 1, 0);
  return index;
}

/** State and handlers for the vessel search combobox. */
export function useVesselSearch() {
  const vessels = useSelector(selectAllVessels);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);

  const results = useMemo(
    () => (query.trim() ? searchVessels(vessels, query).slice(0, MAX_RESULTS) : []),
    [vessels, query],
  );
  const showResults = isOpen && query.trim().length > 0;

  const selectVessel = useCallback(
    (vessel) => {
      navigate(vesselPath(vessel.id));
      setQuery('');
      setIsOpen(false);
    },
    [navigate],
  );

  const changeQuery = (value) => {
    setQuery(value);
    setHighlighted(0);
    setIsOpen(true);
  };

  const handleKeyDown = (event) => {
    if (!showResults) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((index) => moveHighlight(event.key, index, results.length));
    } else if (event.key === 'Enter' && results[highlighted]) {
      event.preventDefault();
      selectVessel(results[highlighted]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return {
    query,
    results,
    showResults,
    highlighted,
    setHighlighted,
    selectVessel,
    changeQuery,
    handleKeyDown,
    open: () => setIsOpen(true),
    closeSoon: () => setTimeout(() => setIsOpen(false), CLOSE_DELAY_MS),
  };
}
