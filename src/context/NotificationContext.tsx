import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type NotificationType = 'success' | 'error' | 'info';

type Notification = {
  id: number;
  title?: string;
  message: string;
  type?: NotificationType;
};

type NotificationContextType = {
  notify: (n: Omit<Notification, 'id'>) => void;
  clear: () => void;
  notification: Notification | null;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (!notification) return;

    const timeout = setTimeout(() => setNotification(null), 4500);
    return () => clearTimeout(timeout);
  }, [notification]);

  const notify = (n: Omit<Notification, 'id'>) => {
    setNotification({ ...n, id: Date.now() });
  };

  const clear = () => setNotification(null);

  const value = useMemo(
    () => ({ notify, clear, notification }),
    [notification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};

export const NotificationBanner: React.FC = () => {
  const ctx = useContext(NotificationContext);

  if (!ctx || !ctx.notification) return null;

  const { notification, clear } = ctx;

  const headerClass =
    notification.type === 'success'
      ? 'bg-success text-white'
      : notification.type === 'error'
        ? 'bg-danger text-white'
        : 'bg-info text-white';

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1080 }}
    >
      <div
        className="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className={`toast-header ${headerClass}`}>
          {notification.title ? (
            <strong className="me-auto">{notification.title}</strong>
          ) : (
            <strong className="me-auto">Notification</strong>
          )}
          <small className="text-muted">now</small>
          <button
            type="button"
            className="btn-close btn-close-white ms-2 mb-1"
            aria-label="Close"
            onClick={clear}
          ></button>
        </div>
        <div className="toast-body">{notification.message}</div>
      </div>
    </div>
  );
};
