import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/** Active tab stored in the `?tab=` query string, so tabs are linkable and survive reloads. */
export function useTabParam(allowedTabs, defaultTab = allowedTabs[0]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('tab');
  const tab = allowedTabs.includes(requested) ? requested : defaultTab;

  const setTab = useCallback(
    (next) =>
      setSearchParams(
        (params) => {
          const updated = new URLSearchParams(params);
          if (next === defaultTab) updated.delete('tab');
          else updated.set('tab', next);
          return updated;
        },
        { replace: true },
      ),
    [setSearchParams, defaultTab],
  );

  return [tab, setTab];
}
