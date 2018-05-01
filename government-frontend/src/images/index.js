import React from 'react';

export const AddIcon = ({ onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus" color="#384047">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const RemoveIcon = ({ onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x" color="#384047">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const EditIcon = ({ onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit" color="#384047">
    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
  </svg>
);
