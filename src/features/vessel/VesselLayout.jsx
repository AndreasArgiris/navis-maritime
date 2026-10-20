import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveVessel } from '../fleet/vesselsSlice';
import { useCurrentVessel } from './useCurrentVessel';
import AnimatedOutlet from '../../app/layout/AnimatedOutlet';
import VesselHeader from './VesselHeader';
import VesselTabs from './VesselTabs';

/** Shell for every /vessels/:vesselId/* page. */
export default function VesselLayout() {
  const dispatch = useDispatch();
  const vessel = useCurrentVessel();

  useEffect(() => {
    if (vessel) dispatch(setActiveVessel(vessel.id));
  }, [dispatch, vessel]);

  // Unknown vessels never get here: AppLayout shows the standalone 404 instead.
  if (!vessel) return null;

  return (
    <>
      <VesselHeader vessel={vessel} />
      <VesselTabs vesselId={vessel.id} />
      <AnimatedOutlet />
    </>
  );
}
