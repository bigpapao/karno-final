import React from 'react';
import { SvgIcon } from '@mui/material';

const PartsIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        fill="currentColor"
      />
      <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.7" />
      <path
        d="M14 6l2 2-2 2-2-2z"
        fill="currentColor"
        opacity="0.5"
      />
    </SvgIcon>
  );
};

export default PartsIcon; 