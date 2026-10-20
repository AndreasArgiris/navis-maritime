import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from './layout/Logo';

/** Full-page 404, shown on its own without the app shell (no sidebar, top bar or search). */
export default function NotFoundPage({
  title = 'Page not found',
  message = 'The page you are looking for does not exist.',
}) {
  return (
    <main className="not-found">
      <motion.div
        className="not-found__card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Logo />
        <h1 className="not-found__title">{title}</h1>
        <p className="not-found__message">{message}</p>
        <Link to="/" className="btn btn-primary">
          <FiArrowLeft aria-hidden="true" className="me-2" />
          Back to fleet map
        </Link>
      </motion.div>
    </main>
  );
}
