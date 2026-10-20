import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { crewMemberPath } from '../../app/navigation';
import { useFilters } from '../../shared/hooks/useFilters';
import { buildCrewColumns } from './crewColumns';
import { filterCrew, selectCrew, selectCrewByDepartment, selectCrewStats } from './crewSlice';

const INITIAL_FILTERS = { query: '', department: 'all' };

/** The vessel's crew with stats, department breakdown, filters, table columns and profile navigation. */
export function useCrewList(vesselId) {
  const navigate = useNavigate();
  const crew = useSelector((state) => selectCrew(state, vesselId));
  const stats = useSelector((state) => selectCrewStats(state, vesselId));
  const byDepartment = useSelector((state) => selectCrewByDepartment(state, vesselId));
  const { filters, setFilter, filtered } = useFilters(crew, filterCrew, INITIAL_FILTERS);

  const departmentOptions = useMemo(
    () => [
      { value: 'all', label: 'All', count: crew.length },
      ...byDepartment.map(({ department, count }) => ({ value: department, label: department, count })),
    ],
    [crew.length, byDepartment],
  );
  const columns = useMemo(() => buildCrewColumns(vesselId), [vesselId]);
  const openMember = useCallback((member) => navigate(crewMemberPath(vesselId, member.id)), [navigate, vesselId]);

  return { crew: filtered, stats, byDepartment, departmentOptions, columns, openMember, filters, setFilter };
}
