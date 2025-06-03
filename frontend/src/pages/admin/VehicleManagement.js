import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Alert,
  Snackbar,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DirectionsCar as CarIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as ExportIcon
} from '@mui/icons-material';
import { vehicleService } from '../../services/vehicle.service';
import { productService } from '../../services/product.service';

const VehicleManagement = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicleStats, setVehicleStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  // Dialog states
  const [manufacturerDialog, setManufacturerDialog] = useState({ open: false, data: null, mode: 'create' });
  const [modelDialog, setModelDialog] = useState({ open: false, data: null, mode: 'create' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', id: '', name: '' });
  
  // Pagination and filtering
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterManufacturer, setFilterManufacturer] = useState('');

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [manufacturersRes, modelsRes, statsRes] = await Promise.all([
        vehicleService.getManufacturers(),
        vehicleService.getAllModels(),
        vehicleService.getVehicleStats()
      ]);
      
      setManufacturers(manufacturersRes.manufacturers || []);
      setModels(modelsRes.models || []);
      setVehicleStats(statsRes);
      setError(null);
    } catch (err) {
      console.error('Error loading vehicle data:', err);
      setError('خطا در بارگذاری اطلاعات خودروها');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Manufacturer operations
  const handleCreateManufacturer = () => {
    setManufacturerDialog({ open: true, data: null, mode: 'create' });
  };

  const handleEditManufacturer = (manufacturer) => {
    setManufacturerDialog({ open: true, data: manufacturer, mode: 'edit' });
  };

  const handleDeleteManufacturer = (manufacturer) => {
    setDeleteDialog({
      open: true,
      type: 'manufacturer',
      id: manufacturer._id,
      name: manufacturer.name
    });
  };

  const handleSaveManufacturer = async (formData) => {
    try {
      if (manufacturerDialog.mode === 'create') {
        await vehicleService.createManufacturer(formData);
        showSnackbar('تولیدکننده با موفقیت ایجاد شد', 'success');
      } else {
        await vehicleService.updateManufacturer(manufacturerDialog.data._id, formData);
        showSnackbar('تولیدکننده با موفقیت به‌روزرسانی شد', 'success');
      }
      setManufacturerDialog({ open: false, data: null, mode: 'create' });
      loadData();
    } catch (err) {
      console.error('Error saving manufacturer:', err);
      showSnackbar('خطا در ذخیره تولیدکننده', 'error');
    }
  };

  // Model operations
  const handleCreateModel = () => {
    setModelDialog({ open: true, data: null, mode: 'create' });
  };

  const handleEditModel = (model) => {
    setModelDialog({ open: true, data: model, mode: 'edit' });
  };

  const handleDeleteModel = (model) => {
    setDeleteDialog({
      open: true,
      type: 'model',
      id: model._id,
      name: model.name
    });
  };

  const handleSaveModel = async (formData) => {
    try {
      if (modelDialog.mode === 'create') {
        await vehicleService.createModel(formData);
        showSnackbar('مدل با موفقیت ایجاد شد', 'success');
      } else {
        await vehicleService.updateModel(modelDialog.data._id, formData);
        showSnackbar('مدل با موفقیت به‌روزرسانی شد', 'success');
      }
      setModelDialog({ open: false, data: null, mode: 'create' });
      loadData();
    } catch (err) {
      console.error('Error saving model:', err);
      showSnackbar('خطا در ذخیره مدل', 'error');
    }
  };

  // Delete confirmation
  const handleConfirmDelete = async () => {
    try {
      if (deleteDialog.type === 'manufacturer') {
        await vehicleService.deleteManufacturer(deleteDialog.id);
        showSnackbar('تولیدکننده با موفقیت حذف شد', 'success');
      } else {
        await vehicleService.deleteModel(deleteDialog.id);
        showSnackbar('مدل با موفقیت حذف شد', 'success');
      }
      setDeleteDialog({ open: false, type: '', id: '', name: '' });
      loadData();
    } catch (err) {
      console.error('Error deleting:', err);
      showSnackbar('خطا در حذف', 'error');
    }
  };

  // Filter data
  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.nameEn?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesManufacturer = filterManufacturer ? model.manufacturer._id === filterManufacturer : true;
    return matchesSearch && matchesManufacturer;
  });

  const paginatedModels = filteredModels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          در حال بارگذاری...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button onClick={loadData} variant="contained">
          تلاش مجدد
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, direction: 'rtl' }}>
        مدیریت خودروها
      </Typography>

      {/* Vehicle Statistics */}
      {vehicleStats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Typography variant="h4" color="primary">
                  {vehicleStats.totalManufacturers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  تولیدکننده
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 2 }}>
                  <CarIcon />
                </Avatar>
                <Typography variant="h4" color="secondary">
                  {vehicleStats.totalModels}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  مدل خودرو
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2 }}>
                  <SettingsIcon />
                </Avatar>
                <Typography variant="h4" color="success.main">
                  {vehicleStats.popularModels}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  مدل محبوب
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 2 }}>
                  <ViewIcon />
                </Avatar>
                <Typography variant="h4" color="warning.main">
                  {manufacturers.reduce((sum, m) => sum + (m.productsCount || 0), 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  محصول سازگار
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{ direction: 'rtl' }}
        >
          <Tab label="تولیدکنندگان" />
          <Tab label="مدل‌های خودرو" />
        </Tabs>
      </Paper>

      {/* Manufacturers Tab */}
      {currentTab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, direction: 'rtl' }}>
            <Typography variant="h5">
              مدیریت تولیدکنندگان
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateManufacturer}
            >
              افزودن تولیدکننده
            </Button>
          </Box>

          <Grid container spacing={3}>
            {manufacturers.map((manufacturer) => (
              <Grid item xs={12} sm={6} md={4} key={manufacturer._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={manufacturer.logo}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      >
                        <BusinessIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{manufacturer.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {manufacturer.slug}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={`${manufacturer.modelsCount} مدل`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`${manufacturer.productsCount} محصول`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                      onClick={() => handleEditManufacturer(manufacturer)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteManufacturer(manufacturer)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Models Tab */}
      {currentTab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, direction: 'rtl' }}>
            <Typography variant="h5">
              مدیریت مدل‌های خودرو
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateModel}
            >
              افزودن مدل
            </Button>
          </Box>

          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="جستجو در مدل‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>فیلتر تولیدکننده</InputLabel>
                  <Select
                    value={filterManufacturer}
                    label="فیلتر تولیدکننده"
                    onChange={(e) => setFilterManufacturer(e.target.value)}
                  >
                    <MenuItem value="">همه تولیدکنندگان</MenuItem>
                    {manufacturers.map((manufacturer) => (
                      <MenuItem key={manufacturer._id} value={manufacturer._id}>
                        {manufacturer.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() => {
                    setSearchTerm('');
                    setFilterManufacturer('');
                  }}
                  fullWidth
                >
                  پاک کردن فیلترها
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Models Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>تصویر</TableCell>
                  <TableCell>نام مدل</TableCell>
                  <TableCell>تولیدکننده</TableCell>
                  <TableCell>سال تولید</TableCell>
                  <TableCell>موتور</TableCell>
                  <TableCell>محبوبیت</TableCell>
                  <TableCell>تعداد محصولات</TableCell>
                  <TableCell>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedModels.map((model) => (
                  <TableRow key={model._id}>
                    <TableCell>
                      <Avatar
                        src={model.image}
                        sx={{ width: 40, height: 40 }}
                      >
                        <CarIcon />
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{model.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {model.nameEn}
                      </Typography>
                    </TableCell>
                    <TableCell>{model.manufacturer.name}</TableCell>
                    <TableCell>{model.year}</TableCell>
                    <TableCell>{model.engine}</TableCell>
                    <TableCell>
                      <Chip
                        label={model.popular ? 'محبوب' : 'عادی'}
                        size="small"
                        color={model.popular ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{model.productsCount || 0}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEditModel(model)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteModel(model)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredModels.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
              labelRowsPerPage="تعداد ردیف در صفحه:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} از ${count}`}
            />
          </TableContainer>
        </Box>
      )}

      {/* Manufacturer Dialog */}
      <ManufacturerDialog
        open={manufacturerDialog.open}
        data={manufacturerDialog.data}
        mode={manufacturerDialog.mode}
        onClose={() => setManufacturerDialog({ open: false, data: null, mode: 'create' })}
        onSave={handleSaveManufacturer}
      />

      {/* Model Dialog */}
      <ModelDialog
        open={modelDialog.open}
        data={modelDialog.data}
        mode={modelDialog.mode}
        manufacturers={manufacturers}
        onClose={() => setModelDialog({ open: false, data: null, mode: 'create' })}
        onSave={handleSaveModel}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}>
        <DialogTitle>تأیید حذف</DialogTitle>
        <DialogContent>
          <Typography>
            آیا مطمئن هستید که می‌خواهید {deleteDialog.type === 'manufacturer' ? 'تولیدکننده' : 'مدل'} 
            "{deleteDialog.name}" را حذف کنید؟
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}>
            انصراف
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// Manufacturer Dialog Component
const ManufacturerDialog = ({ open, data, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: ''
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        logo: data.logo || ''
      });
    } else {
      setFormData({ name: '', slug: '', logo: '' });
    }
  }, [data, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {mode === 'create' ? 'افزودن تولیدکننده جدید' : 'ویرایش تولیدکننده'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="نام تولیدکننده"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="شناسه URL"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                required
                helperText="برای استفاده در آدرس صفحات"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="آدرس لوگو"
                value={formData.logo}
                onChange={(e) => handleChange('logo', e.target.value)}
                helperText="آدرس تصویر لوگوی تولیدکننده"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>انصراف</Button>
          <Button type="submit" variant="contained">
            {mode === 'create' ? 'افزودن' : 'به‌روزرسانی'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Model Dialog Component
const ModelDialog = ({ open, data, mode, manufacturers, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    slug: '',
    manufacturer: '',
    year: '',
    engine: '',
    category: '',
    popular: false,
    image: ''
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        nameEn: data.nameEn || '',
        slug: data.slug || '',
        manufacturer: data.manufacturer?._id || '',
        year: data.year || '',
        engine: data.engine || '',
        category: data.category || '',
        popular: data.popular || false,
        image: data.image || ''
      });
    } else {
      setFormData({
        name: '',
        nameEn: '',
        slug: '',
        manufacturer: '',
        year: '',
        engine: '',
        category: '',
        popular: false,
        image: ''
      });
    }
  }, [data, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
        .replace(/\s+/g, '_');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {mode === 'create' ? 'افزودن مدل جدید' : 'ویرایش مدل'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام مدل (فارسی)"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام مدل (انگلیسی)"
                value={formData.nameEn}
                onChange={(e) => handleChange('nameEn', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="شناسه URL"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>تولیدکننده</InputLabel>
                <Select
                  value={formData.manufacturer}
                  label="تولیدکننده"
                  onChange={(e) => handleChange('manufacturer', e.target.value)}
                >
                  {manufacturers.map((manufacturer) => (
                    <MenuItem key={manufacturer._id} value={manufacturer._id}>
                      {manufacturer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="سال تولید"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                placeholder="مثال: 1390-1400"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="موتور"
                value={formData.engine}
                onChange={(e) => handleChange('engine', e.target.value)}
                placeholder="مثال: 1.6 لیتر"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>دسته‌بندی</InputLabel>
                <Select
                  value={formData.category}
                  label="دسته‌بندی"
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  <MenuItem value="هاچبک">هاچبک</MenuItem>
                  <MenuItem value="سدان">سدان</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="کراس‌اوور">کراس‌اوور</MenuItem>
                  <MenuItem value="وانت">وانت</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>محبوبیت</InputLabel>
                <Select
                  value={formData.popular}
                  label="محبوبیت"
                  onChange={(e) => handleChange('popular', e.target.value)}
                >
                  <MenuItem value={false}>عادی</MenuItem>
                  <MenuItem value={true}>محبوب</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="آدرس تصویر"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                helperText="آدرس تصویر مدل خودرو"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>انصراف</Button>
          <Button type="submit" variant="contained">
            {mode === 'create' ? 'افزودن' : 'به‌روزرسانی'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VehicleManagement; 