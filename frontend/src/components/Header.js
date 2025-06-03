import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  alpha,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { toggleMobileMenu, toggleSearch } from '../store/slices/uiSlice';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import { toPersianNumber } from '../utils/persianUtils';
import { useDirection } from '../contexts/DirectionContext';

// Floating particles animation component
const FloatingParticles = () => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            filter: 'blur(1px)',
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
};

// Enhanced logo component with animations
const AnimatedLogo = ({ scrollY }) => {
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);
  const logoOpacity = useTransform(scrollY, [0, 50], [1, 0.9]);

  return (
    <motion.div
      style={{
        scale: logoScale,
        opacity: logoOpacity,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        component={RouterLink}
        to="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          gap: 2,
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Avatar
            src="/images/logo/Karno.png"
            alt="کارنو"
            sx={{
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
              },
            }}
          />
        </motion.div>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '0.5px',
            }}
          >
            کارنو
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.7rem',
              fontWeight: 400,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            قطعات خودرو
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

// Enhanced navigation button component
const NavButton = ({ to, children, isActive, onClick }) => (
  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
    <Button
      component={to ? RouterLink : 'button'}
      to={to}
      onClick={onClick}
      sx={{
        color: 'white',
        fontWeight: 600,
        px: 3,
        py: 1,
        borderRadius: 2,
        position: 'relative',
        textTransform: 'none',
        overflow: 'hidden',
        background: isActive
          ? 'rgba(255, 255, 255, 0.15)'
          : 'transparent',
        backdropFilter: isActive ? 'blur(10px)' : 'none',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transition: 'left 0.5s ease',
        },
        '&:hover::before': {
          left: '100%',
        },
      }}
    >
      {children}
    </Button>
  </motion.div>
);

// Enhanced icon button component
const IconBtn = ({ to, children, badge, onClick, tooltip }) => (
  <Tooltip title={tooltip} arrow>
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <IconButton
        component={to ? RouterLink : 'button'}
        to={to}
        onClick={onClick}
        sx={{
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        {badge !== undefined ? (
          <Badge
            badgeContent={badge}
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                background: 'linear-gradient(45deg, #dc004e, #ff1744)',
                boxShadow: '0 2px 8px rgba(220, 0, 78, 0.3)',
                animation: badge > 0 ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.2)' },
                  '100%': { transform: 'scale(1)' },
                },
              },
            }}
          >
            {children}
          </Badge>
        ) : (
          children
        )}
      </IconButton>
    </motion.div>
  </Tooltip>
);

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { quantity: cartQuantity } = useSelector((state) => state.cart);
  const { searchOpen } = useSelector((state) => state.ui);
  const { isRTL } = useDirection();

  const [headerBg, setHeaderBg] = useState(false);
  const { scrollY } = useScroll();

  // Dynamic header background based on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHeaderBg(latest > 100);
    });
    return unsubscribe;
  }, [scrollY]);

  // Icon flip class based on direction
  const iconClass = isRTL ? "flip-horizontal" : "no-flip";

  // Check if current route is active
  const isActiveRoute = (path) => location.pathname === path;

  const headerTransform = useTransform(scrollY, [0, 100], [0, -20]);
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);

  return (
    <>
      <motion.div
        style={{
          y: headerTransform,
          opacity: headerOpacity,
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: headerBg
              ? 'rgba(25, 118, 210, 0.85)'
              : 'linear-gradient(135deg, rgba(25, 118, 210, 0.95) 0%, rgba(100, 181, 246, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'visible',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
              opacity: headerBg ? 0.5 : 1,
              transition: 'opacity 0.3s ease',
            },
          }}
        >
          <FloatingParticles />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, overflow: 'visible' }}>
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: 64, md: 72 },
                py: 1,
              }}
            >
              {isMobile && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconBtn
                    onClick={() => dispatch(toggleMobileMenu())}
                    tooltip="منوی اصلی"
                  >
                    <MenuIcon className={iconClass} />
                  </IconBtn>
                </motion.div>
              )}

              <Box sx={{ flexGrow: { xs: 1, md: 0 }, ml: { xs: 0, md: 3 } }}>
                <AnimatedLogo scrollY={scrollY} />
              </Box>

              {!isMobile ? (
                <>
                  <Box sx={{ flexGrow: 1, mx: 4, maxWidth: 500 }}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <SearchBar />
                    </motion.div>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <NavButton 
                        to="/brands" 
                        isActive={isActiveRoute('/brands')}
                      >
                        برندها
                      </NavButton>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <NavButton 
                        to="/models" 
                        isActive={isActiveRoute('/models')}
                      >
                        مدل‌های خودرو
                      </NavButton>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <NavButton 
                        to="/products" 
                        isActive={isActiveRoute('/products')}
                      >
                        محصولات
                      </NavButton>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <NavButton 
                        to="/contact" 
                        isActive={isActiveRoute('/contact')}
                      >
                        تماس با ما
                      </NavButton>
                    </motion.div>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ ml: 3 }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, type: 'spring' }}
                    >
                      <IconBtn
                        to="/cart"
                        badge={cartQuantity}
                        tooltip={`سبد خرید (${toPersianNumber(cartQuantity)} کالا)`}
                      >
                        <CartIcon className={iconClass} />
                      </IconBtn>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: 'spring' }}
                    >
                      <IconBtn
                        to={isAuthenticated ? '/profile' : '/login'}
                        tooltip={isAuthenticated ? 'پروفایل کاربری' : 'ورود / ثبت نام'}
                      >
                        <PersonIcon className={iconClass} />
                      </IconBtn>
                    </motion.div>
                  </Stack>
                </>
              ) : (
                <Stack direction="row" spacing={1}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <IconBtn
                      onClick={() => dispatch(toggleSearch())}
                      tooltip="جستجو"
                    >
                      {searchOpen ? (
                        <CloseIcon className={iconClass} />
                      ) : (
                        <SearchIcon className={iconClass} />
                      )}
                    </IconBtn>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                  >
                    <IconBtn
                      to="/cart"
                      badge={cartQuantity}
                      tooltip={`سبد خرید (${toPersianNumber(cartQuantity)} کالا)`}
                    >
                      <CartIcon className={iconClass} />
                    </IconBtn>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    {isAuthenticated ? (
                      <IconBtn
                        to="/profile"
                        tooltip="پروفایل کاربری"
                      >
                        <PersonIcon className={iconClass} />
                      </IconBtn>
                    ) : (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          component={RouterLink}
                          to="/login"
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            borderRadius: 2,
                            background: 'linear-gradient(45deg, #dc004e, #ff1744)',
                            boxShadow: '0 4px 15px rgba(220, 0, 78, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #ff1744, #dc004e)',
                              boxShadow: '0 6px 20px rgba(220, 0, 78, 0.4)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          ورود
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </Stack>
              )}
            </Toolbar>

            <AnimatePresence>
              {isMobile && searchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ py: 2 }}>
                    <SearchBar />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </AppBar>
      </motion.div>

      <MobileMenu />
    </>
  );
};

export default Header;
