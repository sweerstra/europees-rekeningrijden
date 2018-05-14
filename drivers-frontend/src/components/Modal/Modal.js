import React from 'react';
import './Modal.css';

const Modal = ({ isOpen = false, children }) => {
  const modalOpenClass = isOpen ? '' : 'closed';

  return (
    <div>
      <div className={`modal ${modalOpenClass}`}>
        <div className="modal-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
