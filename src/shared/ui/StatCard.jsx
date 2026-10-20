import { motion } from 'framer-motion';

/** Pastel KPI tile: icon, headline value, label and optional hint. */
export default function StatCard({ icon: Icon, label, value, hint, tone = 'navy', index = 0 }) {
  return (
    <motion.div
      role="group"
      aria-label={label}
      className={`stat-card stat-card--${tone}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
    >
      {Icon && (
        <span className="stat-card__icon" aria-hidden="true">
          <Icon />
        </span>
      )}
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
      {hint && <div className="stat-card__hint">{hint}</div>}
    </motion.div>
  );
}
