import React, { useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Alert,
  Tooltip,
  Badge,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ShoppingCart as OrderIcon,
  Person as UserIcon,
  Inventory as ProductIcon,
  AttachMoney as RevenueIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Enhanced stats with trends and colors
  const stats = [
    {
      title: 'سفارشات امروز',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: <OrderIcon fontSize="large" />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      description: 'نسبت به دیروز',
    },
    {
      title: 'کاربران جدید',
      value: '15',
      change: '+8%',
      trend: 'up',
      icon: <UserIcon fontSize="large" />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
      description: 'در هفته گذشته',
    },
    {
      title: 'محصولات',
      value: '1,254',
      change: '+5%',
      trend: 'up',
      icon: <ProductIcon fontSize="large" />,
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      description: 'محصولات فعال',
    },
    {
      title: 'درآمد امروز',
      value: '۱,۲۵۰,۰۰۰',
      change: '-3%',
      trend: 'down',
      icon: <RevenueIcon fontSize="large" />,
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
      description: 'تومان',
    },
  ];

  // Enhanced recent orders with more details
  const recentOrders = [
    { 
      id: '#ORD-001', 
      user: 'علی محمدی', 
      date: '۱۴۰۴/۰۵/۰۸', 
      amount: '۳۵۰,۰۰۰', 
      status: 'تکمیل شده',
      statusColor: 'success',
      items: 3,
      priority: 'normal'
    },
    { 
      id: '#ORD-002', 
      user: 'سارا احمدی', 
      date: '۱۴۰۴/۰۵/۰۸', 
      amount: '۴۲۰,۰۰۰', 
      status: 'در حال پردازش',
      statusColor: 'warning',
      items: 2,
      priority: 'high'
    },
    { 
      id: '#ORD-003', 
      user: 'محمد رضایی', 
      date: '۱۴۰۴/۰۵/۰۷', 
      amount: '۱,۱۵۰,۰۰۰', 
      status: 'تکمیل شده',
      statusColor: 'success',
      items: 5,
      priority: 'normal'
    },
    { 
      id: '#ORD-004', 
      user: 'زهرا کریمی', 
      date: '۱۴۰۴/۰۵/۰۷', 
      amount: '۲۸۰,۰۰۰', 
      status: 'در انتظار پرداخت',
      statusColor: 'error',
      items: 1,
      priority: 'high'
    },
    { 
      id: '#ORD-005', 
      user: 'امیر حسینی', 
      date: '۱۴۰۴/۰۵/۰۶', 
      amount: '۵۶۰,۰۰۰', 
      status: 'ارسال شده',
      statusColor: 'info',
      items: 4,
      priority: 'normal'
    },
  ];

  // Enhanced top products with progress bars
  const topProducts = [
    { name: 'فیلتر روغن تویوتا', sales: 87, revenue: '۸,۷۰۰,۰۰۰', progress: 87, stock: 45 },
    { name: 'لنت ترمز بوش', sales: 65, revenue: '۱۳,۰۰۰,۰۰۰', progress: 65, stock: 32 },
    { name: 'روغن موتور شل', sales: 59, revenue: '۱۱,۸۰۰,۰۰۰', progress: 59, stock: 0 },
    { name: 'باتری واریان', sales: 42, revenue: '۱۶,۸۰۰,۰۰۰', progress: 42, stock: 12 },
    { name: 'شمع NGK', sales: 38, revenue: '۳,۸۰۰,۰۰۰', progress: 38, stock: 60 },
  ];

  // Low stock alerts
  const lowStockProducts = [
    { name: 'روغن موتور شل', stock: 0, minStock: 10 },
    { name: 'باتری واریان', stock: 12, minStock: 20 },
    { name: 'سنسور اکسیژن بوش', stock: 7, minStock: 15 },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  return (
    <>
      <AdminHeader />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ direction: 'rtl', fontWeight: 'bold' }}>
              داشبورد مدیریت
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ direction: 'rtl' }}>
              آخرین بروزرسانی: {lastUpdated.toLocaleTimeString('fa-IR')}
            </Typography>
          </Box>
          <Tooltip title="بروزرسانی داده‌ها">
            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Loading Bar */}
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Alert 
            severity="warning" 
            sx={{ mb: 3, direction: 'rtl' }}
            action={
              <Button color="inherit" size="small">
                مشاهده همه
              </Button>
            }
          >
            <Typography variant="body2">
              {lowStockProducts.length} محصول موجودی کم دارند
            </Typography>
          </Alert>
        )}

        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: 160,
                  background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${alpha(stat.color, 0.05)} 100%)`,
                  border: `1px solid ${alpha(stat.color, 0.2)}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', direction: 'rtl' }}>
                    <Box>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: stat.color, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {stat.trend === 'up' ? (
                          <TrendingUpIcon sx={{ color: theme.palette.success.main, fontSize: 16 }} />
                        ) : (
                          <TrendingDownIcon sx={{ color: theme.palette.error.main, fontSize: 16 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: stat.trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
                            fontWeight: 'bold'
                          }}
                        >
                          {stat.change}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                      {stat.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Enhanced Recent Orders */}
          <Grid item xs={12} lg={8}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader 
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: 'rtl' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      سفارشات اخیر
                    </Typography>
                    <Button size="small" endIcon={<ViewIcon />}>
                      مشاهده همه
                    </Button>
                  </Box>
                } 
                sx={{ borderBottom: '1px solid #eee' }}
              />
              <CardContent sx={{ p: 0 }}>
                <List sx={{ width: '100%' }}>
                  {recentOrders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <ListItem 
                        alignItems="flex-start" 
                        sx={{ 
                          px: 3, 
                          py: 2, 
                          direction: 'rtl',
                          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) }
                        }}
                        secondaryAction={
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="مشاهده جزئیات">
                              <IconButton size="small">
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="ویرایش">
                              <IconButton size="small">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Badge 
                            badgeContent={order.priority === 'high' ? '!' : null} 
                            color="error"
                          >
                            <Avatar sx={{ bgcolor: alpha(order.statusColor === 'success' ? theme.palette.success.main : theme.palette.warning.main, 0.2), color: order.statusColor === 'success' ? theme.palette.success.main : theme.palette.warning.main }}>
                              <OrderIcon />
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography component="span" variant="body1" fontWeight="bold">
                                  {order.id}
                                </Typography>
                                <Chip 
                                  label={order.status} 
                                  color={order.statusColor} 
                                  size="small" 
                                  variant="outlined"
                                />
                              </Box>
                              <Typography component="span" variant="body2" color="text.secondary">
                                {order.date}
                              </Typography>
                            </Typography>
                          }
                          secondary={
                            <Typography component="div" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                              <Box>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {order.user}
                                </Typography>
                                <Typography component="span" variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                  • {order.items} آیتم
                                </Typography>
                              </Box>
                              <Typography component="span" variant="body1" fontWeight="bold" color="primary.main">
                                {order.amount} تومان
                              </Typography>
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < recentOrders.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Enhanced Top Products & Alerts */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Top Products */}
              <Grid item xs={12}>
                <Card elevation={2}>
                  <CardHeader 
                    title={
                      <Typography variant="h6" sx={{ direction: 'rtl', fontWeight: 'bold' }}>
                        محصولات پرفروش
                      </Typography>
                    } 
                    sx={{ borderBottom: '1px solid #eee' }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <List sx={{ width: '100%' }}>
                      {topProducts.map((product, index) => (
                        <React.Fragment key={product.name}>
                          <ListItem alignItems="flex-start" sx={{ px: 3, py: 2, direction: 'rtl' }}>
                            <ListItemAvatar>
                              <Avatar sx={{ 
                                bgcolor: product.stock === 0 ? alpha(theme.palette.error.main, 0.2) : alpha(theme.palette.success.main, 0.2), 
                                color: product.stock === 0 ? theme.palette.error.main : theme.palette.success.main 
                              }}>
                                <ProductIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography component="div">
                                  <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                                    {product.name}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      فروش:
                                    </Typography>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={product.progress} 
                                      sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                                    />
                                    <Typography variant="body2" fontWeight="bold">
                                      {product.sales}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="primary.main" fontWeight="bold">
                                      {product.revenue} تومان
                                    </Typography>
                                    <Chip 
                                      label={`موجودی: ${product.stock}`}
                                      size="small"
                                      color={product.stock === 0 ? 'error' : product.stock < 20 ? 'warning' : 'success'}
                                      variant="outlined"
                                    />
                                  </Box>
                                </Typography>
                              }
                            />
                          </ListItem>
                          {index < topProducts.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Low Stock Alerts */}
              <Grid item xs={12}>
                <Card elevation={2} sx={{ border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}` }}>
                  <CardHeader 
                    title={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, direction: 'rtl' }}>
                        <WarningIcon color="warning" />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          هشدار موجودی
                        </Typography>
                      </Box>
                    } 
                    sx={{ borderBottom: '1px solid #eee' }}
                  />
                  <CardContent>
                    {lowStockProducts.map((product, index) => (
                      <Box key={product.name} sx={{ mb: index < lowStockProducts.length - 1 ? 2 : 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, direction: 'rtl' }}>
                          <Typography variant="body2" fontWeight="bold">
                            {product.name}
                          </Typography>
                          <Chip 
                            label={`${product.stock}/${product.minStock}`}
                            size="small"
                            color={product.stock === 0 ? 'error' : 'warning'}
                          />
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(product.stock / product.minStock) * 100} 
                          color={product.stock === 0 ? 'error' : 'warning'}
                          sx={{ height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    ))}
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      color="warning" 
                      sx={{ mt: 2 }}
                      startIcon={<ProductIcon />}
                    >
                      مدیریت موجودی
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
