import React from 'react';

type NotificationModalProps = {
  message: string;
  onClose: () => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({ message, onClose }) => {
  return (
    <div className="notification-modal">
      <div className="notification-modal__content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default NotificationModal;
