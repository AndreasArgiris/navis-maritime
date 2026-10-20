import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectVesselById } from '../fleet/vesselsSlice';

/** The vessel matching the `:vesselId` route param, or null. */
export function useCurrentVessel() {
  const { vesselId } = useParams();
  return useSelector((state) => selectVesselById(state, vesselId));
}
