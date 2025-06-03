import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  ImageList,
  ImageListItem,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  ZoomIn,
  Close,
} from '@mui/icons-material';
import { getProductImageUrls, getProductImageUrl } from '../utils/imageUtils';

/**
 * ProductImageGallery - A reusable component for displaying product images
 * @param {Object} product - Product object with images (optional if images is provided)
 * @param {Array} images - Array of image objects/URLs (alternative to product.images)
 * @param {number} maxImages - Maximum number of images to display (default: 4)
 * @param {boolean} clickable - Whether images are clickable to view larger (default: true)
 */
const ProductImageGallery = ({ 
  product, 
  images,
  maxImages = 4, 
  clickable = true,
  cols = 2,
  gap = 8 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Handle both product object and direct images array
  let imageUrls = [];
  let productName = 'محصول';

  if (product) {
    imageUrls = getProductImageUrls(product);
    productName = product.name || 'محصول';
  } else if (images && Array.isArray(images)) {
    // Handle images array directly
    imageUrls = images.map(image => {
      if (typeof image === 'string') {
        return image;
      } else if (image && image.url) {
        return image.url;
      }
      return '/images/products/placeholder.jpg';
    });
    productName = 'محصول'; // Default name when only images are provided
  } else {
    // Fallback to placeholder
    imageUrls = ['/images/products/placeholder.jpg'];
  }

  // Ensure we always have at least one image
  if (!imageUrls || imageUrls.length === 0) {
    imageUrls = ['/images/products/placeholder.jpg'];
  }

  const displayImages = imageUrls.slice(0, maxImages);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (index) => {
    if (clickable) {
      setSelectedImage(index);
    }
  };

  const toggleZoom = () => {
    setZoomOpen(!zoomOpen);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Main Image */}
      <Paper 
        elevation={2} 
        sx={{ 
          mb: 2, 
          overflow: 'hidden',
          borderRadius: 2 
        }}
      >
        <img
          src={displayImages[selectedImage] || '/images/products/placeholder.jpg'}
          alt={`${productName} - تصویر ${selectedImage + 1}`}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </Paper>

      {/* Thumbnail Images */}
      {displayImages.length > 1 && (
        <ImageList 
          cols={Math.min(cols, displayImages.length)} 
          gap={gap}
          sx={{ width: '100%', height: 80 }}
        >
          {displayImages.map((imageUrl, index) => (
            <ImageListItem 
              key={index}
              sx={{
                cursor: clickable ? 'pointer' : 'default',
                border: selectedImage === index ? '2px solid #1976d2' : '2px solid transparent',
                borderRadius: 1,
                overflow: 'hidden',
                '&:hover': clickable ? {
                  opacity: 0.8,
                  transform: 'scale(0.98)'
                } : {}
              }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={imageUrl}
                alt={`${productName} - تصویر کوچک ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* Zoom Dialog */}
      <Dialog
        open={zoomOpen}
        onClose={toggleZoom}
        maxWidth="xl"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'background.default',
          },
        }}
      >
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          <IconButton
            onClick={toggleZoom}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            <Close />
          </IconButton>
          <Box
            component="img"
            src={displayImages[selectedImage] || '/images/products/placeholder.jpg'}
            alt={`${productName} - تصویر ${selectedImage + 1}`}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductImageGallery;
