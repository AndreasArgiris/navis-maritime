import { formatDate } from '../../shared/utils/format';
import Panel from '../../shared/ui/Panel';
import ReadingsTable from './ReadingsTable';

export default function OilAnalysisPanel({ samples }) {
  return (
    <Panel title="Lube oil analysis" subtitle="Latest laboratory results">
      <div className="oil-samples">
        {samples.map((sample) => (
          <div key={sample.id} className="oil-sample">
            <div className="oil-sample__header">
              <span className="fw-medium">{sample.system}</span>
              <span className="small text-muted">
                Sampled {formatDate(sample.sampledOn)} · {sample.lab}
              </span>
            </div>
            <ReadingsTable readings={sample.readings} caption={`${sample.system} analysis`} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
