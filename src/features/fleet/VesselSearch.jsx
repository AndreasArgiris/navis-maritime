import { useId } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useVesselSearch } from './useVesselSearch';
import VesselSearchResults from './VesselSearchResults';

/** Topbar combobox: find a vessel by name / IMO / type and jump to it. */
export default function VesselSearch() {
  const listId = useId();
  const search = useVesselSearch();

  return (
    <div className="vessel-search">
      <FiSearch className="vessel-search__icon" aria-hidden="true" />
      <input
        type="search"
        role="combobox"
        aria-label="Search vessels"
        aria-expanded={search.showResults}
        aria-controls={listId}
        aria-autocomplete="list"
        className="form-control"
        placeholder="Search vessels by name, IMO or type…"
        value={search.query}
        onChange={(event) => search.changeQuery(event.target.value)}
        onFocus={search.open}
        onBlur={search.closeSoon}
        onKeyDown={search.handleKeyDown}
      />
      <VesselSearchResults
        id={listId}
        visible={search.showResults}
        results={search.results}
        highlighted={search.highlighted}
        onHighlight={search.setHighlighted}
        onSelect={search.selectVessel}
      />
    </div>
  );
}
