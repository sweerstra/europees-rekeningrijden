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

export const UserIcon = ({onClick}) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user" color="#384047">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export const PasswordIcon = ({onClick}) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-lock" color="#384047">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export const EmailIcon = ({onClick}) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-at-sign" color="#384047">
    <circle cx="12" cy="12" r="4"/>
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
  </svg>
);
