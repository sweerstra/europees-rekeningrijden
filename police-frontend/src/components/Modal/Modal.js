import React from 'react';
import './Modal.css';

const Modal = ({ isOpen = false, onModalClose, className, children }) => {
    const modalOpenClass = isOpen ? '' : 'closed';

    return (
        <div className={className}>
            <div className={`modal ${modalOpenClass}`}>
                <div className="modal-container">
          <span className="modal__close"
                onClick={onModalClose}>&times;</span>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;