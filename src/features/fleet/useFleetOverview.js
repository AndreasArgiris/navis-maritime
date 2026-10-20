import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { vesselPath } from '../../app/navigation';
import { selectFilteredVessels, selectFleetStats, selectStatusFilter, setStatusFilter } from './vesselsSlice';
import { VESSEL_STATUSES } from './vesselStatuses';

/** Filter pills: "All" plus one per vessel status, each with its count. */
export function buildStatusFilterOptions(stats) {
  return [
    { value: 'all', label: 'All', count: stats.total },
    ...Object.entries(VESSEL_STATUSES).map(([value, { label }]) => ({ value, label, count: stats[value] })),
  ];
}

/** Vessels shown on the fleet map, fleet stats, the status filter and vessel navigation. */
export function useFleetOverview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vessels = useSelector(selectFilteredVessels);
  const stats = useSelector(selectFleetStats);
  const statusFilter = useSelector(selectStatusFilter);

  const statusOptions = useMemo(() => buildStatusFilterOptions(stats), [stats]);
  const changeStatusFilter = useCallback((status) => dispatch(setStatusFilter(status)), [dispatch]);
  const openVessel = useCallback((vesselId) => navigate(vesselPath(vesselId)), [navigate]);

  return { vessels, stats, statusFilter, statusOptions, changeStatusFilter, openVessel };
}
