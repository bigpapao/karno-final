import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 40, 
  text = 'در حال بارگذاری...', 
  variant = 'default',
  fullScreen = false 
}) => {
  const theme = useTheme();

  const SpinnerIcon = ({ size }) => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 31.416;15.708 15.708;0 31.416"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="0;-15.708;-31.416"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  );

  const CarLoadingIcon = ({ size }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
          fill={theme.palette.primary.main}
        />
      </motion.svg>
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              margin: '0 2px',
            }}
          />
        ))}
      </Box>
    </motion.div>
  );

  const DotsLoader = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
          }}
        />
      ))}
    </Box>
  );

  const renderSpinner = () => {
    switch (variant) {
      case 'car':
        return <CarLoadingIcon size={size} />;
      case 'dots':
        return <DotsLoader />;
      case 'minimal':
        return <CircularProgress size={size} thickness={2} />;
      default:
        return <SpinnerIcon size={size} />;
    }
  };

  const containerSx = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    zIndex: 9999,
  } : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 4,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box sx={containerSx}>
        {renderSpinner()}
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 2,
                fontWeight: 500,
                textAlign: 'center',
                direction: 'rtl',
              }}
            >
              {text}
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

// Inline loader for buttons and small spaces
export const InlineLoader = ({ size = 20 }) => (
  <CircularProgress 
    size={size} 
    thickness={4}
    sx={{ 
      color: 'inherit',
      animation: 'spin 1s linear infinite',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    }}
  />
);

// Page transition loader
export const PageLoader = () => (
  <LoadingSpinner
    variant="car"
    size={60}
    text="در حال بارگذاری صفحه..."
    fullScreen
  />
);

export default LoadingSpinner; 