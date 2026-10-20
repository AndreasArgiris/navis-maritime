import { motion } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';
import { averageRating } from '../crewSlice';
import { formatDate } from '../../../shared/utils/format';
import Panel from '../../../shared/ui/Panel';
import EmptyState from '../../../shared/ui/EmptyState';
import LevelBar from '../../../shared/ui/LevelBar';
import RatingStars from '../../../shared/ui/RatingStars';

const SCORE_LABELS = {
  competence: 'Competence',
  teamwork: 'Teamwork',
  safety: 'Safety',
  reliability: 'Reliability',
};

export default function CrewReviewsTab({ member }) {
  const { reviews } = member;
  if (reviews.length === 0) {
    return (
      <div className="panel">
        <EmptyState icon={FiMessageSquare} title="No reviews yet" message="Appraisals appear after a completed contract." />
      </div>
    );
  }

  const average = averageRating(reviews);
  const sorted = [...reviews].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Panel
      title="Performance reviews"
      subtitle={`${reviews.length} appraisal${reviews.length > 1 ? 's' : ''}`}
      actions={
        <div className="review-average">
          <span className="review-average__value">{average.toFixed(1)}</span>
          <RatingStars value={Math.round(average * 2) / 2} />
        </div>
      }
    >
      <div className="review-list">
        {sorted.map((review, index) => (
          <motion.article
            key={review.id}
            className="review-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <header className="review-card__header">
              <div>
                <div className="fw-medium">{review.vessel}</div>
                <div className="small text-muted">
                  {review.reviewer} · {formatDate(review.date)}
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <RatingStars value={review.rating} />
                <span className="fw-medium">{review.rating.toFixed(1)}</span>
              </div>
            </header>
            <p className="review-card__comment">“{review.comment}”</p>
            <dl className="review-card__scores">
              {Object.entries(review.scores).map(([key, score]) => (
                <div key={key}>
                  <dt>{SCORE_LABELS[key]}</dt>
                  <dd>
                    <LevelBar value={score} max={5} label={`${SCORE_LABELS[key]} score`} />
                    <span>{score}/5</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.article>
        ))}
      </div>
    </Panel>
  );
}
