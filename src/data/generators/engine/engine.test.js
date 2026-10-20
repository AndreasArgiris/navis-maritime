import { vessels } from '../../vessels';
import { generateEngine } from './engine';
import { flattenEngineReadings, isAbnormal } from '../../../features/engine/engineSlice';
import { TEST_DATE } from '../../../test/fixtures';

const vesselById = (id) => vessels.find((v) => v.id === id);

describe('engine generator', () => {
  it.each(vessels.map((v) => [v.id]))('gives %s at least one abnormal reading', (id) => {
    const engine = generateEngine(vesselById(id), TEST_DATE);
    expect(flattenEngineReadings(engine).filter(isAbnormal).length).toBeGreaterThanOrEqual(1);
  });

  it('sizes the engine to the vessel and marks stationary engines stopped', () => {
    const vlcc = generateEngine(vesselById('arabian-star'), TEST_DATE);
    expect(vlcc.cylinders).toHaveLength(7);
    expect(vlcc.mainEngine.status).toBe('running');

    const anchored = generateEngine(vesselById('coral-voyager'), TEST_DATE);
    expect(anchored.mainEngine.status).toBe('stopped');
  });

  it('never flags a tank as too full', () => {
    vessels.forEach((vessel) => {
      generateEngine(vessel, TEST_DATE).tanks.forEach((tank) => expect(tank.max).toBeNull());
    });
  });
});
