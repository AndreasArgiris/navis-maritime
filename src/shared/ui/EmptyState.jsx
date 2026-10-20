import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ title = 'Nothing here yet', message, icon: Icon = FiInbox, children }) {
  return (
    <div className="empty-state">
      <Icon className="empty-state__icon" aria-hidden="true" />
      <p className="empty-state__title">{title}</p>
      {message && <p className="empty-state__message">{message}</p>}
      {children}
    </div>
  );
}
