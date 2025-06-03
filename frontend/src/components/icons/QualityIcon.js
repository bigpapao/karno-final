import React from 'react';
import { SvgIcon } from '@mui/material';

const QualityIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="currentColor"
      />
      <path
        d="M12 6l1.55 3.13L17 9.69l-2.5 2.44.59 3.44L12 14.23l-3.09 1.34.59-3.44L7 9.69l3.45-.56L12 6z"
        fill="rgba(255,255,255,0.3)"
      />
    </SvgIcon>
  );
};

export default QualityIcon; 