import React from 'react';
import './Modal.css';

const Modal = ({ isOpen = false, onModalClose, children }) => {
    const modalOpenClass = isOpen ? '' : 'closed';

    return (
        <div>
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