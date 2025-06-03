import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Search as SearchIcon } from '@mui/icons-material';
import CustomCarIcon from './icons/CarIcon';
import SpeedIcon from './icons/SpeedIcon';
import PartsIcon from './icons/PartsIcon';
import QualityIcon from './icons/QualityIcon';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Enhanced car brand data with modern styling
  const carBrands = [
    { 
      name: 'سایپا', 
      color: '#e53935', 
      slug: 'saipa',
      icon: CustomCarIcon,
      gradient: 'linear-gradient(135deg, #e53935 0%, #f44336 100%)'
    },
    { 
      name: 'ایران خودرو', 
      color: '#1976d2', 
      slug: 'irankhodro',
      icon: CustomCarIcon,
      gradient: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)'
    },
    { 
      name: 'ام وی ام', 
      color: '#43a047', 
      slug: 'mvm',
      icon: CustomCarIcon,
      gradient: 'linear-gradient(135deg, #43a047 0%, #4caf50 100%)'
    },
    { 
      name: 'بهمن موتور', 
      color: '#7b1fa2', 
      slug: 'bahmanmotor',
      icon: CustomCarIcon,
      gradient: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)'
    },
  ];

  // Feature highlights with icons
  const features = [
    { icon: SpeedIcon, text: 'ارسال سریع', color: '#ff9800' },
    { icon: QualityIcon, text: 'کیفیت تضمینی', color: '#4caf50' },
    { icon: PartsIcon, text: 'قطعات اصل', color: '#2196f3' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      ref={ref}
      className="hero-section"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        color: 'white',
        pt: { xs: 8, md: 10 },
        pb: { xs: 10, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
          zIndex: 1,
        },
      }}
    >
      {/* Animated background elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 1,
        }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 1,
          animationDelay: '3s',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    direction: 'rtl',
                    background: 'linear-gradient(45deg, #ffffff 30%, rgba(255,255,255,0.8) 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  مرجع تخصصی قطعات خودروهای ایرانی
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    opacity: 0.9,
                    fontWeight: 400,
                    direction: 'rtl',
                  }}
                >
                  قطعات اصل و با کیفیت برای انواع خودروهای داخلی
                </Typography>
              </motion.div>

              {/* Features highlight */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <feature.icon sx={{ fontSize: 20, color: feature.color }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {feature.text}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm="auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/products')}
                        fullWidth={isMobile}
                        startIcon={<SearchIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          textTransform: 'none',
                          borderRadius: 3,
                          backgroundColor: 'white',
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        جستجوی قطعات
                      </Button>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/brands')}
                        fullWidth={isMobile}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          textTransform: 'none',
                          borderRadius: 3,
                          borderColor: 'white',
                          borderWidth: 2,
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 2,
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        مشاهده برندها
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              <motion.div
                variants={itemVariants}
                style={{ width: '100%', maxWidth: 500 }}
              >
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gap: 3,
                  width: '100%',
                }}>
                  {carBrands.map((brand, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        perspective: 1000,
                      }}
                    >
                      <Paper
                        elevation={8}
                        onClick={() => navigate(`/brands/${brand.slug}`)}
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          height: 150,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          background: brand.gradient,
                          color: 'white',
                          position: 'relative',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                            zIndex: 1,
                          },
                        }}
                      >
                        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <brand.icon 
                              sx={{ 
                                fontSize: 48, 
                                mb: 1,
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                              }} 
                            />
                          </motion.div>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                              direction: 'rtl',
                            }}
                          >
                            {brand.name}
                          </Typography>
                        </Box>
                      </Paper>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;
