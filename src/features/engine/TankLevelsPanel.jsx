import Panel from '../../shared/ui/Panel';
import LevelBar from '../../shared/ui/LevelBar';
import { isAbnormal } from './engineSlice';
import ReadingValue from './ReadingValue';

function TankLevel({ tank }) {
  const isLow = isAbnormal(tank);
  return (
    <li>
      <div className="tank-list__row">
        <span className={isLow ? 'text-danger fw-medium' : undefined}>{tank.label}</span>
        <ReadingValue reading={tank} />
      </div>
      <LevelBar value={tank.value} max={100} tone={isLow ? 'danger' : 'navy'} label={`${tank.label} level`} />
      <div className="small text-muted">
        Minimum {tank.min} % · capacity {tank.capacityM3} m³
      </div>
    </li>
  );
}

export default function TankLevelsPanel({ tanks }) {
  return (
    <Panel title="Oil & fuel tank levels">
      <ul className="tank-list">
        {tanks.map((tank) => (
          <TankLevel key={tank.id} tank={tank} />
        ))}
      </ul>
    </Panel>
  );
}
