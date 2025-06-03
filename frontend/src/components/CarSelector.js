import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carData } from '../utils/carModelsData';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardActionArea,
  CardContent,
  Fade,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const CarSelector = ({ variant = 'compact', onSelectionChange = null }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [savedSelection, setSavedSelection] = useState(null);

  // Load saved selection from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedCarModel');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedSelection(parsed);
        if (onSelectionChange) {
          onSelectionChange(parsed);
        }
      } catch (error) {
        console.error('Error parsing saved car selection:', error);
        localStorage.removeItem('selectedCarModel');
      }
    }
  }, [onSelectionChange]);

  const handleManufacturerSelect = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setActiveStep(1);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    const selection = {
      manufacturer: selectedManufacturer,
      model: model,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('selectedCarModel', JSON.stringify(selection));
    setSavedSelection(selection);
    
    // Call callback if provided
    if (onSelectionChange) {
      onSelectionChange(selection);
    }
    
    // Close modal and redirect to model detail page
    setOpen(false);
    navigate(`/models/${model.id}`);
  };

  const handleReset = () => {
    setSelectedManufacturer(null);
    setSelectedModel(null);
    setActiveStep(0);
    localStorage.removeItem('selectedCarModel');
    setSavedSelection(null);
    if (onSelectionChange) {
      onSelectionChange(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setSelectedManufacturer(null);
    setSelectedModel(null);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      if (activeStep === 1) {
        setSelectedManufacturer(null);
      }
    }
  };

  const steps = ['انتخاب سازنده', 'انتخاب مدل'];

  // Compact view for displaying current selection
  if (variant === 'compact' && savedSelection) {
    return (
      <Paper 
        elevation={2}
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CarIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                خودروی انتخابی شما
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={handleReset}
              sx={{ color: 'white' }}
              title="تغییر خودرو"
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Chip 
              label={savedSelection.manufacturer.name}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                '& .MuiChip-label': { fontWeight: 'bold' }
              }}
            />
            <Typography variant="body2" sx={{ mx: 1 }}>•</Typography>
            <Chip 
              label={savedSelection.model.name}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                '& .MuiChip-label': { fontWeight: 'bold' }
              }}
            />
            <Button
              size="small"
              variant="outlined"
              sx={{ 
                ml: 'auto', 
                borderColor: 'white', 
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onClick={() => navigate(`/models/${savedSelection.model.id}`)}
            >
              مشاهده قطعات
            </Button>
          </Box>
        </Box>
        
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            opacity: 0.1,
            transform: 'rotate(15deg)',
          }}
        >
          <CarIcon sx={{ fontSize: 80 }} />
        </Box>
      </Paper>
    );
  }

  // Main car selector button
  const SelectorButton = () => (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 100%)',
        border: `2px dashed ${theme.palette.primary.main}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[6],
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        }
      }}
      onClick={() => setOpen(true)}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CarIcon 
          sx={{ 
            fontSize: 48, 
            color: theme.palette.primary.main, 
            mb: 2 
          }} 
        />
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main 
          }}
        >
          انتخاب خودروی شما
        </Typography>
        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{ mb: 2 }}
        >
          برای یافتن قطعات مناسب، ابتدا خودروی خود را انتخاب کنید
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          startIcon={<SearchIcon />}
          sx={{ 
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          شروع انتخاب
        </Button>
      </Box>
    </Paper>
  );

  return (
    <>
      {/* Show compact view if selection exists, otherwise show selector button */}
      {savedSelection && variant === 'compact' ? null : <SelectorButton />}
      
      {/* Car Selection Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            minHeight: isMobile ? '100vh' : '500px'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center',
            bgcolor: theme.palette.primary.main,
            color: 'white',
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CarIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              انتخاب خودروی شما
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              left: 8,
              top: 8,
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
          {activeStep > 0 && (
            <IconButton
              onClick={handleBack}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white'
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {/* Steps indicator */}
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Step 0: Manufacturer Selection */}
          {activeStep === 0 && (
            <Fade in timeout={500}>
              <Box>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ textAlign: 'center', mb: 3 }}
                >
                  سازنده خودروی خود را انتخاب کنید
                </Typography>
                <Grid container spacing={3}>
                  {carData.manufacturers.map((manufacturer) => (
                    <Grid item xs={12} sm={6} key={manufacturer.id}>
                      <Card 
                        elevation={2}
                        sx={{ 
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[8]
                          }
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleManufacturerSelect(manufacturer)}
                          sx={{ height: '100%', p: 3 }}
                        >
                          <CardContent sx={{ textAlign: 'center' }}>
                            <Box
                              component="img"
                              src={manufacturer.logo}
                              alt={manufacturer.name}
                              sx={{
                                width: 80,
                                height: 80,
                                objectFit: 'contain',
                                mb: 2,
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <Typography variant="h5" gutterBottom fontWeight="bold">
                              {manufacturer.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {manufacturer.nameEn}
                            </Typography>
                            <Chip 
                              label={`${manufacturer.models.length} مدل`}
                              size="small"
                              color="primary"
                              sx={{ mt: 1 }}
                            />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}

          {/* Step 1: Model Selection */}
          {activeStep === 1 && selectedManufacturer && (
            <Fade in timeout={500}>
              <Box>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ textAlign: 'center', mb: 1 }}
                >
                  مدل {selectedManufacturer.name} خود را انتخاب کنید
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ textAlign: 'center', mb: 3 }}
                >
                  محبوب‌ترین مدل‌ها با نشان ⭐ مشخص شده‌اند
                </Typography>
                
                <Grid container spacing={2}>
                  {selectedManufacturer.models.map((model) => (
                    <Grid item xs={12} sm={6} md={4} key={model.id}>
                      <Card 
                        elevation={1}
                        sx={{ 
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          border: model.popular ? `2px solid ${theme.palette.primary.light}` : '1px solid #e0e0e0',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4],
                            borderColor: theme.palette.primary.main
                          }
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleModelSelect(model)}
                          sx={{ p: 2 }}
                        >
                          <CardContent sx={{ textAlign: 'center', p: '8px !important' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                              <CarIcon 
                                color="primary" 
                                sx={{ mr: 1 }} 
                              />
                              {model.popular && (
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  ⭐
                                </Typography>
                              )}
                            </Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              {model.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {model.nameEn}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">
            لغو
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBack} variant="outlined">
              بازگشت
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarSelector; 