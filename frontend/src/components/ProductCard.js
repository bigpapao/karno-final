import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Rating,
  Chip,
  IconButton,
  Tooltip,
  Skeleton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Build as BuildIcon,
  Settings as SettingsIcon,
  ElectricalServices as ElectricalServicesIcon,
  BatteryChargingFull as BatteryChargingFullIcon,
  AcUnit as AcUnitIcon,
  Opacity as OilIcon, // Using a drop icon as a substitute for oil
  Brightness1 as BrakesIcon, // Using a circle icon as a substitute for brakes
  RadioButtonChecked as TireIcon, // Using a circle icon as a substitute for tires
  Lightbulb as LightbulbIcon,
  DirectionsCar as DirectionsCarIcon,
  Phone as PhoneIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { addToCart } from '../store/slices/cartSlice';
import { toPersianCurrency, toPersianNumber } from '../utils/persianUtils';
import { getProductImageUrl } from '../utils/imageUtils';
import { useNavigate } from 'react-router-dom';

// Default placeholder image for products
const placeholderImage = '/images/products/placeholder.jpg';

// Helper function to get category icon based on category name
const getCategoryIcon = (category) => {
  switch(category) {
    case 'Engine':
    case 'موتور':
      return <SettingsIcon fontSize="small" className="no-flip" />;
    case 'Electrical':
    case 'برقی':
      return <ElectricalServicesIcon fontSize="small" className="no-flip" />;
    case 'Battery':
    case 'باتری':
      return <BatteryChargingFullIcon fontSize="small" className="no-flip" />;
    case 'AC':
    case 'تهویه':
    case 'Air Conditioning':
      return <AcUnitIcon fontSize="small" className="no-flip" />;
    case 'Oil':
    case 'روغن':
      return <OilIcon fontSize="small" className="no-flip" />;
    case 'Brakes':
    case 'ترمز':
      return <BrakesIcon fontSize="small" className="no-flip" />;
    case 'Tires':
    case 'لاستیک':
      return <TireIcon fontSize="small" className="no-flip" />;
    case 'Lights':
    case 'چراغ':
    case 'روشنایی':
      return <LightbulbIcon fontSize="small" className="no-flip" />;
    case 'Suspension':
    case 'تعلیق':
      return <DirectionsCarIcon fontSize="small" className="no-flip" />;
    default:
      return <BuildIcon fontSize="small" className="no-flip" />;
  }
};

// Helper function to get category image based on category name
const getCategoryImage = (category) => {
  switch(category) {
    case 'Engine':
    case 'موتور':
      return '/images/categories/engine.jpg';
    case 'Electrical':
    case 'برقی':
      return '/images/categories/electrical.jpg';
    case 'Battery':
    case 'باتری':
      return '/images/categories/battery.jpg';
    case 'AC':
    case 'تهویه':
    case 'Air Conditioning':
      return '/images/categories/ac.jpg';
    case 'Oil':
    case 'روغن':
      return '/images/categories/oil.jpg';
    case 'Brakes':
    case 'ترمز':
      return '/images/categories/brakes.jpg';
    case 'Tires':
    case 'لاستیک':
      return '/images/categories/tires.jpg';
    case 'Lights':
    case 'چراغ':
    case 'روشنایی':
      return '/images/categories/lights.jpg';
    case 'Suspension':
    case 'تعلیق':
      return '/images/categories/suspension.jpg';
    default:
      return '/images/categories/parts.jpg';
  }
};

const CART_ENABLED = String(process.env.REACT_APP_CART_ENABLED).toLowerCase() === 'true';

const ProductCard = ({ product, index = 0, variant = 'grid' }) => {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const contactRoute = process.env.REACT_APP_CONTACT_ROUTE || '/contact-us';

  // Determine layout based on variant
  const isListView = variant === 'list';

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleViewProduct = () => {
    navigate(`/products/${product._id}`);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderRadius: 4,
          boxShadow: theme.shadows[2],
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: theme.shadows[8],
          },
          direction: 'rtl',
          maxWidth: isListView ? '100%' : 345,
          m: 'auto',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
          display: isListView ? 'flex' : 'block',
          flexDirection: isListView ? 'row' : 'column',
          height: isListView ? 200 : 'auto',
        }}
      >
        {/* Image Container with Overlay */}
        <Box 
          sx={{ 
            position: 'relative', 
            overflow: 'hidden',
            borderRadius: isListView ? '16px 0 0 16px' : '16px 16px 0 0',
            width: isListView ? 250 : '100%',
            minWidth: isListView ? 250 : 'auto',
            height: isListView ? '100%' : 'auto',
          }}
        >
          {imageLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                aspectRatio: '4/3',
                borderRadius: 2,
              }}
              animation="wave"
            />
          )}
          
          <motion.div
            variants={imageVariants}
            animate={isHovered ? "hover" : ""}
          >
            <CardMedia
              component="img"
              image={imageError ? placeholderImage : getProductImageUrl(product)}
              alt={product?.images?.[0]?.alt || product.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sx={{
                aspectRatio: isListView ? '4/3' : '4/3',
                objectFit: 'cover',
                display: imageLoading ? 'none' : 'block',
                transition: 'transform 0.3s ease',
                width: '100%',
                height: isListView ? '100%' : 'auto',
              }}
            />
          </motion.div>

          {/* Overlay with Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <IconButton
                onClick={handleViewProduct}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <ViewIcon />
              </IconButton>
            </motion.div>
          </motion.div>

          {/* Favorite Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered || favorite ? 1 : 0.8, 
              opacity: isHovered || favorite ? 1 : 0 
            }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
            }}
          >
            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {favorite ? (
                <FavoriteIcon sx={{ color: '#e91e63' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: '#666' }} />
              )}
            </IconButton>
          </motion.div>

          {/* Category Badge */}
          {product.category && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
              }}
            >
              <Chip
                icon={getCategoryIcon(product.category?.name || product.category)}
                label={product.category?.name || product.category}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  fontWeight: 500,
                  '& .MuiChip-icon': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </motion.div>
          )}
        </Box>

        <CardContent sx={{ p: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Typography
              variant="h6"
              sx={{ 
                fontFamily: 'IRANSans, Vazir, sans-serif', 
                fontWeight: 600,
                mb: 2,
                fontSize: '1.1rem',
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {product.brand && (
                <Chip 
                  label={product.brand?.name || product.brand} 
                  size="small" 
                  variant="outlined"
                  sx={{ 
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }} 
                />
              )}
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Typography
              variant="h5"
              sx={{ 
                fontWeight: 700, 
                color: theme.palette.primary.main,
                mb: 3,
                fontSize: '1.25rem',
              }}
            >
              {toPersianCurrency(product.price)}
            </Typography>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<PhoneIcon />}
              onClick={() => navigate(contactRoute)}
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 600,
                fontSize: '0.95rem',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                boxShadow: `0 3px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              برای خرید تماس بگیرید
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ENV: REACT_APP_CONTACT_ROUTE sets the contact page route
// Responsive: 3 columns lg, 2 md, 1 sm/xs; gap 24px between cards
export default ProductCard;