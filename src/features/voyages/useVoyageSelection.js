import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectVoyages } from './voyagesSlice';

/** The vessel's voyages (newest first) and which one is drawn on the map. Starts on the latest. */
export function useVoyageSelection(vesselId) {
  const voyages = useSelector((state) => selectVoyages(state, vesselId));
  const [selectedId, setSelectedId] = useState(voyages[0]?.id ?? null);
  const selected = voyages.find((voyage) => voyage.id === selectedId) ?? voyages[0] ?? null;

  const selectVoyage = useCallback((voyage) => setSelectedId(voyage.id), []);

  return {
    voyages,
    selected,
    isLatestSelected: Boolean(selected) && selected.id === voyages[0].id,
    selectVoyage,
  };
}
