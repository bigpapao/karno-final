import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Typography,
  Avatar,
  Stack,
  useTheme,
  alpha,
  Chip,
  Button,
} from '@mui/material';
import {
  Home,
  DirectionsCar,
  Build,
  ShoppingCart,
  Person,
  Article,
  Info,
  ContactSupport,
  Close as CloseIcon,
  Settings,
  ExitToApp,
  FavoriteBorder,
  Receipt,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleMobileMenu } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';

// Animation variants
const drawerVariants = {
  hidden: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    x: 20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

// Enhanced menu item component
const MenuItem = ({ item, isActive, onClick }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ListItem
        button
        component={RouterLink}
        to={item.path}
        onClick={onClick}
        sx={{
          borderRadius: 2,
          mx: 1,
          mb: 1,
          background: isActive 
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`
            : 'transparent',
          backdropFilter: isActive ? 'blur(10px)' : 'none',
          border: isActive ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}` : '1px solid transparent',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            transform: 'translateX(-4px)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
            minWidth: 40,
            transition: 'color 0.3s ease',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.text}
          primaryTypographyProps={{
            fontWeight: isActive ? 600 : 400,
            color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
          }}
        />
        {item.badge && (
          <Chip
            label={item.badge}
            size="small"
            color="secondary"
            sx={{
              height: 20,
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          />
        )}
      </ListItem>
    </motion.div>
  );
};

const MobileMenu = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const { mobileMenuOpen } = useSelector((state) => state.ui);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { quantity: cartQuantity } = useSelector((state) => state.cart);

  const handleClose = () => {
    dispatch(toggleMobileMenu());
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const isActiveRoute = (path) => location.pathname === path;

  const menuItems = [
    { text: 'صفحه اصلی', icon: <Home className="no-flip" />, path: '/' },
    { text: 'برندها', icon: <DirectionsCar className="no-flip" />, path: '/brands' },
    { text: 'مدل‌های خودرو', icon: <DirectionsCar className="no-flip" />, path: '/models' },
    { text: 'محصولات', icon: <Build className="no-flip" />, path: '/products' },
    { text: 'سبد خرید', icon: <ShoppingCart className="no-flip" />, path: '/cart', badge: cartQuantity > 0 ? cartQuantity : null },
    { text: 'تماس با ما', icon: <ContactSupport className="no-flip" />, path: '/contact' },
  ];

  const accountItems = isAuthenticated
    ? [
        { text: 'پروفایل', icon: <Person className="no-flip" />, path: '/profile' },
        { text: 'سفارشات', icon: <Receipt className="no-flip" />, path: '/orders' },
        { text: 'لیست علاقه‌مندی', icon: <FavoriteBorder className="no-flip" />, path: '/wishlist' },
      ]
    : [
        { text: 'ورود', icon: <Person className="no-flip" />, path: '/login' },
        { text: 'ثبت نام', icon: <Person className="no-flip" />, path: '/register' },
      ];

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 320,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
              backdropFilter: 'blur(20px)',
              borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
          }}
          BackdropProps={{
            sx: {
              backdropFilter: 'blur(8px)',
              backgroundColor: alpha(theme.palette.common.black, 0.3),
            },
          }}
        >
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ height: '100%' }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
                },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Avatar
                        src="/images/logo/Karno.png"
                        alt="کارنو"
                        sx={{
                          width: 48,
                          height: 48,
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      />
                    </motion.div>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        کارنو
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        قطعات خودرو
                      </Typography>
                    </Box>
                  </Stack>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                      <CloseIcon className="no-flip" />
                    </IconButton>
                  </motion.div>
                </Stack>
              </motion.div>
            </Box>

            {/* User Profile Section */}
            {isAuthenticated && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        src={user?.avatar}
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: theme.palette.primary.main,
                          border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                      >
                        {user?.name?.charAt(0) || 'ک'}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {user?.name || 'کاربر عزیز'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          خوش آمدید!
                        </Typography>
                      </Box>
                      <Chip
                        label="عضو"
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    </Stack>
                  </Box>
                </motion.div>
                <Divider />
              </>
            )}

            {/* Main Menu */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <List sx={{ py: 2 }}>
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    item={item}
                    isActive={isActiveRoute(item.path)}
                    onClick={handleClose}
                  />
                ))}
              </List>
            </motion.div>

            <Divider sx={{ mx: 2 }} />

            {/* Account Section */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <List sx={{ py: 2 }}>
                {accountItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    item={item}
                    isActive={isActiveRoute(item.path)}
                    onClick={handleClose}
                  />
                ))}
              </List>
            </motion.div>

            {/* Logout Button for Authenticated Users */}
            {isAuthenticated && (
              <>
                <Divider sx={{ mx: 2 }} />
                <Box sx={{ p: 2 }}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      startIcon={<ExitToApp />}
                      onClick={handleLogout}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderColor: alpha(theme.palette.error.main, 0.3),
                        color: theme.palette.error.main,
                        backgroundColor: alpha(theme.palette.error.main, 0.05),
                        '&:hover': {
                          borderColor: theme.palette.error.main,
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      خروج از حساب
                    </Button>
                  </motion.div>
                </Box>
              </>
            )}

            {/* Footer */}
            <Box
              sx={{
                mt: 'auto',
                p: 3,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                background: alpha(theme.palette.background.default, 0.5),
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                  sx={{ display: 'block', mb: 1 }}
                >
                  نسخه 1.0.0
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                  sx={{ display: 'block' }}
                >
                  © 2024 کارنو - تمامی حقوق محفوظ است
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        </Drawer>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
