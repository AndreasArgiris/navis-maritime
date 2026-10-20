import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveVesselId, selectVesselById } from '../../features/fleet/vesselsSlice';
import { closeSidebar, selectSidebarOpen } from './uiSlice';

/** Whether the (mobile) sidebar is open, the vessel its links point at, and a way to close it. */
export function useSidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSidebarOpen);
  const activeVessel = useSelector((state) => selectVesselById(state, selectActiveVesselId(state)));
  const close = useCallback(() => dispatch(closeSidebar()), [dispatch]);
  return { isOpen, activeVessel, close };
}
