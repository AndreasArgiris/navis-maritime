import { motion } from 'framer-motion';

/** White surface card with a title row. Used for every dashboard panel. */
export default function Panel({ title, subtitle, actions, children, className = '', bodyClassName = '' }) {
  return (
    <motion.section
      className={`panel ${className}`}
      aria-label={title}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {(title || actions) && (
        <header className="panel__header">
          <div>
            {title && <h2 className="panel__title">{title}</h2>}
            {subtitle && <p className="panel__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="panel__actions">{actions}</div>}
        </header>
      )}
      <div className={`panel__body ${bodyClassName}`}>{children}</div>
    </motion.section>
  );
}
