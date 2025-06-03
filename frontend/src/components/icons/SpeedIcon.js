import React from 'react';
import { SvgIcon } from '@mui/material';

const SpeedIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.43z"
        fill="currentColor"
      />
      <path
        d="M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"
        fill="currentColor"
        opacity="0.8"
      />
    </SvgIcon>
  );
};

export default SpeedIcon; 