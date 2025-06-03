import React, { useState } from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Chip,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  DirectionsCar as CarIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

const VehicleCompatibilityManager = ({
  compatibleVehicles = [],
  manufacturers = [],
  vehicleModels = [],
  onChange
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  
  // Filter models based on selected manufacturer
  const filteredModels = vehicleModels.filter(model => 
    !selectedManufacturer || model.manufacturer._id === selectedManufacturer
  );

  // Generate year options (last 30 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleAddVehicle = () => {
    if (!selectedModel) return;

    const newVehicle = {
      make: selectedModel.manufacturer.name,
      model: selectedModel.name,
      year: selectedYear || 'همه سال‌ها',
      modelId: selectedModel._id,
      manufacturerId: selectedModel.manufacturer._id
    };

    // Check if vehicle already exists
    const exists = compatibleVehicles.some(vehicle => 
      vehicle.modelId === newVehicle.modelId && 
      vehicle.year === newVehicle.year
    );

    if (exists) {
      return; // Don't add duplicate
    }

    const updatedVehicles = [...compatibleVehicles, newVehicle];
    onChange(updatedVehicles);

    // Reset form
    setSelectedManufacturer('');
    setSelectedModel(null);
    setSelectedYear('');
  };

  const handleRemoveVehicle = (index) => {
    const updatedVehicles = compatibleVehicles.filter((_, i) => i !== index);
    onChange(updatedVehicles);
  };

  const handleQuickAdd = (manufacturer) => {
    // Add all models for a manufacturer
    const manufacturerModels = vehicleModels.filter(model => 
      model.manufacturer._id === manufacturer._id
    );

    const newVehicles = manufacturerModels.map(model => ({
      make: model.manufacturer.name,
      model: model.name,
      year: 'همه سال‌ها',
      modelId: model._id,
      manufacturerId: model.manufacturer._id
    }));

    // Filter out duplicates
    const existingKeys = new Set(
      compatibleVehicles.map(v => `${v.modelId}-${v.year}`)
    );
    
    const uniqueNewVehicles = newVehicles.filter(v => 
      !existingKeys.has(`${v.modelId}-${v.year}`)
    );

    if (uniqueNewVehicles.length > 0) {
      const updatedVehicles = [...compatibleVehicles, ...uniqueNewVehicles];
      onChange(updatedVehicles);
    }
  };

  const groupedVehicles = compatibleVehicles.reduce((groups, vehicle) => {
    const key = vehicle.make;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(vehicle);
    return groups;
  }, {});

  return (
    <Box>
      {/* Add Vehicle Form */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>تولیدکننده</InputLabel>
            <Select
              value={selectedManufacturer}
              label="تولیدکننده"
              disabled={!manufacturers || manufacturers.length === 0}
              onChange={(e) => {
                setSelectedManufacturer(e.target.value);
                setSelectedModel(null); // Reset model when manufacturer changes
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: 250,
                  },
                },
              }}
            >
              {manufacturers && manufacturers.length > 0 ? (
                manufacturers.map((manufacturer) => (
                  <MenuItem key={manufacturer._id} value={manufacturer._id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BusinessIcon sx={{ mr: 1, fontSize: 16 }} />
                      {manufacturer.name}
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  هیچ تولیدکننده‌ای یافت نشد
                </MenuItem>
              )}
            </Select>
            {(!manufacturers || manufacturers.length === 0) && (
              <Box sx={{ mt: 0.5, fontSize: '0.75rem', color: 'text.secondary' }}>
                در حال بارگذاری تولیدکنندگان...
              </Box>
            )}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Autocomplete
            size="small"
            options={filteredModels}
            getOptionLabel={(option) => option.name}
            value={selectedModel}
            onChange={(event, newValue) => setSelectedModel(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="مدل خودرو" fullWidth />
            )}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <Box component="li" key={key} {...otherProps}>
                  <CarIcon sx={{ mr: 1, fontSize: 16 }} />
                  <Box>
                    <Typography variant="body2">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.manufacturer.name} • {option.year}
                    </Typography>
                  </Box>
                </Box>
              );
            }}
            disabled={!selectedManufacturer}
          />
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>سال تولید</InputLabel>
            <Select
              value={selectedYear}
              label="سال تولید"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <MenuItem value="">همه سال‌ها</MenuItem>
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddVehicle}
            disabled={!selectedModel}
            fullWidth
          >
            افزودن
          </Button>
        </Grid>
      </Grid>

      {/* Quick Add Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          افزودن سریع همه مدل‌های یک تولیدکننده:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {manufacturers.map((manufacturer) => (
            <Button
              key={manufacturer._id}
              variant="outlined"
              size="small"
              startIcon={<BusinessIcon />}
              onClick={() => handleQuickAdd(manufacturer)}
            >
              {manufacturer.name}
            </Button>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Compatible Vehicles List */}
      <Typography variant="subtitle1" gutterBottom>
        خودروهای سازگار ({compatibleVehicles.length})
      </Typography>
      
      {compatibleVehicles.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          هنوز هیچ خودرویی برای این محصول انتخاب نشده است.
          <br />
          لطفاً خودروهای سازگار با این محصول را مشخص کنید.
        </Alert>
      ) : (
        <Box>
          {Object.entries(groupedVehicles).map(([manufacturer, vehicles]) => (
            <Paper key={manufacturer} elevation={0} sx={{ mb: 2, p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <BusinessIcon sx={{ mr: 1, fontSize: 16 }} />
                {manufacturer} ({vehicles.length} مدل)
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {vehicles.map((vehicle, index) => (
                  <Chip
                    key={`${vehicle.modelId}-${vehicle.year}-${index}`}
                    label={`${vehicle.model} ${vehicle.year !== 'همه سال‌ها' ? `(${vehicle.year})` : ''}`}
                    onDelete={() => {
                      const globalIndex = compatibleVehicles.findIndex(v => 
                        v.modelId === vehicle.modelId && v.year === vehicle.year
                      );
                      handleRemoveVehicle(globalIndex);
                    }}
                    color="primary"
                    variant="outlined"
                    icon={<CarIcon />}
                  />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {compatibleVehicles.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            این محصول با {compatibleVehicles.length} مدل خودرو سازگار است
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onChange([])}
          >
            حذف همه
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VehicleCompatibilityManager; 