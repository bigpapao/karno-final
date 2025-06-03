import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  DirectionsCar,
  Build,
  LocalShipping,
  CheckCircle,
  Store,
  Support,
  Payment,
} from '@mui/icons-material';
import SEO from '../components/SEO';
import { generateLocalBusinessSchema } from '../utils/structuredData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const telegramId = process.env.REACT_APP_TELEGRAM || 'vahid_h_e';
  const whatsappNumber = process.env.REACT_APP_WHATSAPP || '989304314246';

  const contactInfo = [
    {
      icon: <Phone />,
      title: 'تلفن',
      details: ['021-12345678', '0912-3456789'],
    },
    {
      icon: <Email />,
      title: 'ایمیل',
      details: ['info@karno.ir', 'support@karno.ir'],
    },
    {
      icon: <LocationOn />,
      title: 'آدرس',
      details: ['تهران، خیابان آزادی، پلاک 123', 'کد پستی: 1234567890'],
    },
    {
      icon: <AccessTime />,
      title: 'ساعات کاری',
      details: ['شنبه تا چهارشنبه: 9 صبح تا 6 عصر', 'پنجشنبه: 9 صبح تا 1 بعد از ظهر'],
    },
    {
      icon: <Support />,
      title: 'پشتیبانی',
      details: ['پشتیبانی آنلاین: 24 ساعته', 'پاسخگویی تلفنی: در ساعات کاری'],
    },
    {
      icon: <img src="/images/telegram.svg" alt="Telegram" style={{width:20}} />,
      title: 'تلگرام',
      details: [<a href={`https://t.me/${telegramId}`} target="_blank" rel="noopener noreferrer">@{telegramId}</a>],
    },
    {
      icon: <img src="/images/whatsapp.svg" alt="WhatsApp" style={{width:20}} />,
      title: 'واتس‌اپ',
      details: [<a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">{whatsappNumber}</a>],
    },
  ];
  
  const services = [
    {
      icon: <DirectionsCar />,
      title: 'قطعات اصلی خودرو',
      description: 'ارائه قطعات اصلی و کمیاب برای انواع خودروهای ایرانی و خارجی با ضمانت اصالت کالا',
    },
    {
      icon: <Build />,
      title: 'قطعات یدکی با کیفیت',
      description: 'تامین قطعات یدکی با کیفیت برای برندهای مختلف خودرو از جمله سایپا، ایران خودرو، ام وی ام و بهمن موتور',
    },
    {
      icon: <LocalShipping />,
      title: 'ارسال سریع',
      description: 'ارسال سریع و مطمئن به سراسر کشور از طریق پست و تیپاکس با امکان رهگیری مرسوله',
    },
    {
      icon: <Payment />,
      title: 'پرداخت امن',
      description: 'پرداخت امن و آسان از طریق درگاه زرین پال با قابلیت پرداخت اقساطی برای خریدهای عمده',
    },
    {
      icon: <Store />,
      title: 'پیش‌فروش خودرو',
      description: 'خدمات پیش‌فروش انواع خودرو با شرایط ویژه و تضمین قیمت و تحویل به موقع',
    },
  ];

  // Create schema for Local Business
  const localBusinessSchema = generateLocalBusinessSchema();
  
  return (
    <>
      <SEO
        title="تماس با ما | کارنو - فروشگاه اینترنتی قطعات خودرو"
        description="تماس با کارنو، فروشگاه اینترنتی قطعات خودرو و لوازم یدکی. راه‌های ارتباطی، ساعات کاری و آدرس فروشگاه"
        canonical="https://karno.ir/contact"
        openGraph={{
          type: 'website',
          title: 'تماس با ما | کارنو - فروشگاه اینترنتی قطعات خودرو',
          description: 'تماس با کارنو، فروشگاه اینترنتی قطعات خودرو و لوازم یدکی. راه‌های ارتباطی، ساعات کاری و آدرس فروشگاه',
          url: 'https://karno.ir/contact',
          image: 'https://karno.ir/images/contact-og.jpg',
        }}
        schema={localBusinessSchema}
      />
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ direction: 'rtl', fontWeight: 700 }}>
            برای خرید و استعلام قیمت لطفا تماس بگیرید.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, minWidth: 320, maxWidth: 400, bgcolor: 'primary.lighter', textAlign: 'center' }}>
              {contactInfo.map((info) => (
                <Box key={info.title} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    {info.icon}
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>{info.title}</Typography>
                  </Box>
                  {info.details.map((detail, idx) => (
                    <Typography key={idx} variant="body1" color="text.primary" sx={{ fontSize: '1.1rem', fontWeight: 500, mb: 0.5 }}>
                      {detail}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Paper>
          </Box>
          
          {/* About Us Section */}
          <Box sx={{ mb: 6, textAlign: 'right', direction: 'rtl' }}>
            <Typography variant="body1" paragraph>
              فروشگاه اینترنتی کارنو با هدف تامین قطعات اصلی و کمیاب خودرو برای مشتریان راه‌اندازی شده است. ما با همکاری مستقیم با تولیدکنندگان معتبر داخلی و خارجی، قطعات با کیفیت و اصل را با قیمت مناسب به دست مشتریان می‌رسانیم.
            </Typography>
            <Typography variant="body1" paragraph>
              تیم متخصص ما متشکل از کارشناسان با تجربه در صنعت خودرو است که می‌توانند بهترین راهنمایی را برای انتخاب قطعات مناسب خودروی شما ارائه دهند. همچنین، خدمات پیش‌فروش خودرو با شرایط ویژه از دیگر خدمات ما می‌باشد.
            </Typography>
          </Box>
          
          {/* Tabs for different sections */}
          <Box sx={{ width: '100%', mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="تماس با ما" />
              <Tab label="خدمات ما" />
              <Tab label="سوالات متداول" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      direction: 'rtl', 
                      fontWeight: 700, 
                      color: 'primary.main',
                      textAlign: 'center',
                      mb: 4 
                    }}
                  >
                    راه‌های ارتباط با ما
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {contactInfo.map((info, index) => (
                      <Paper
                        key={info.title}
                        elevation={3}
                        sx={{
                          p: 3,
                          mb: 3,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-8px) scale(1.02)',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                          },
                          cursor: 'pointer',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              mr: 2,
                              p: 1.5,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: 48,
                              minHeight: 48,
                            }}
                          >
                            {info.icon}
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700,
                              fontSize: '1.2rem'
                            }}
                          >
                            {info.title}
                          </Typography>
                        </Box>
                        <Box sx={{ pr: 7 }}>
                          {info.details.map((detail, detailIndex) => (
                            <Typography
                              key={detailIndex}
                              variant="body1"
                              sx={{
                                mb: 0.5,
                                fontSize: '1rem',
                                fontWeight: 500,
                                direction: 'rtl',
                              }}
                            >
                              {detail}
                            </Typography>
                          ))}
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                  
                  {/* Enhanced Map */}
                  <Box sx={{ mt: 4, borderRadius: 3, overflow: 'hidden' }}>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        direction: 'rtl',
                        fontWeight: 700,
                        color: 'primary.main',
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      📍 موقعیت ما روی نقشه
                    </Typography>
                    <Paper 
                      elevation={4} 
                      sx={{ 
                        p: 4, 
                        height: 250, 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                        color: 'white',
                        borderRadius: 3,
                      }}
                    >
                      <LocationOn sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                        نقشه تعاملی گوگل
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                        برای مشاهده مسیر دقیق کلیک کنید
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={4}
                  sx={{ 
                    p: 4, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    border: '1px solid rgba(0,0,0,0.08)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        mr: 2,
                      }}
                    >
                      <Email />
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        direction: 'rtl', 
                        fontWeight: 700,
                        color: 'primary.main'
                      }}
                    >
                      فرم تماس با ما
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      direction: 'rtl',
                      mb: 4,
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  >
                    لطفاً فرم زیر را تکمیل کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند.
                  </Typography>
                  
                  {submitted && (
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 4, 
                        direction: 'rtl',
                        borderRadius: 2,
                        '& .MuiAlert-message': {
                          fontSize: '1.1rem'
                        }
                      }}
                    >
                      🎉 با تشکر از پیام شما! کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="👤 نام و نام خانوادگی"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{ 
                            sx: { 
                              direction: 'rtl',
                              borderRadius: 2,
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            } 
                          }}
                          InputLabelProps={{
                            sx: {
                              direction: 'rtl',
                              transformOrigin: 'top right',
                              fontSize: '1rem',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="📧 ایمیل"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{ 
                            sx: { 
                              direction: 'ltr',
                              borderRadius: 2,
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            } 
                          }}
                          InputLabelProps={{
                            sx: {
                              direction: 'rtl',
                              transformOrigin: 'top right',
                              fontSize: '1rem',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="📱 شماره تماس"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{ 
                            sx: { 
                              direction: 'ltr',
                              borderRadius: 2,
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            } 
                          }}
                          InputLabelProps={{
                            sx: {
                              direction: 'rtl',
                              transformOrigin: 'top right',
                              fontSize: '1rem',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="📝 موضوع"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{ 
                            sx: { 
                              direction: 'rtl',
                              borderRadius: 2,
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            } 
                          }}
                          InputLabelProps={{
                            sx: {
                              direction: 'rtl',
                              transformOrigin: 'top right',
                              fontSize: '1rem',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          multiline
                          rows={5}
                          label="💬 پیام شما"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{ 
                            sx: { 
                              direction: 'rtl',
                              borderRadius: 2,
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            } 
                          }}
                          InputLabelProps={{
                            sx: {
                              direction: 'rtl',
                              transformOrigin: 'top right',
                              fontSize: '1rem',
                            }
                          }}
                          placeholder="لطفاً پیام خود را بنویسید. در صورت استعلام قیمت، مدل خودرو و قطعه مورد نظر را ذکر کنید."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          startIcon={<Email />}
                          sx={{ 
                            py: 2,
                            borderRadius: 2,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                            }
                          }}
                        >
                          📨 ارسال پیام
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  
                  <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(102, 126, 234, 0.1)', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ direction: 'rtl', textAlign: 'center', color: 'text.secondary' }}>
                      🔒 اطلاعات شما کاملاً محفوظ و امن است و تنها برای ارتباط با شما استفاده می‌شود.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {/* Services Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ direction: 'rtl', mb: 4 }}>
                خدمات فروشگاه کارنو
              </Typography>
              
              <Grid container spacing={3}>
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.title}>
                    <Card sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 4,
                      },
                    }}>
                      <Box sx={{ 
                        p: 2, 
                        display: 'flex', 
                        justifyContent: 'center',
                        bgcolor: 'primary.light',
                        color: 'white'
                      }}>
                        {service.icon}
                      </Box>
                      <CardContent sx={{ flexGrow: 1, textAlign: 'right' }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 6, p: 4, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'right' }}>
                <Typography variant="h6" gutterBottom>
                  چرا کارنو را انتخاب کنید؟
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="تضمین اصالت کالا و گارانتی قطعات" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="قیمت‌های رقابتی و مناسب" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="ارسال سریع به سراسر کشور" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="پشتیبانی 24 ساعته آنلاین" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="امکان مرجوعی کالا در صورت عدم تطابق با مشخصات" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}
          
          {/* FAQ Tab */}
          {tabValue === 2 && (
            <Box sx={{ textAlign: 'right', direction: 'rtl' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                سوالات متداول
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  چگونه می‌توانم سفارش خود را پیگیری کنم؟
                </Typography>
                <Typography variant="body1" paragraph>
                  پس از ثبت سفارش، کد رهگیری از طریق پیامک برای شما ارسال می‌شود. با استفاده از این کد می‌توانید در بخش "پیگیری سفارش" در سایت یا از طریق تماس با پشتیبانی، وضعیت سفارش خود را پیگیری نمایید.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  آیا امکان مرجوع کردن کالا وجود دارد؟
                </Typography>
                <Typography variant="body1" paragraph>
                  بله، در صورتی که کالای دریافتی با مشخصات ذکر شده در سایت مطابقت نداشته باشد یا دارای نقص فنی باشد، تا 7 روز پس از دریافت می‌توانید کالا را مرجوع نمایید. برای این کار کافیست با پشتیبانی تماس بگیرید.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  هزینه ارسال چقدر است؟
                </Typography>
                <Typography variant="body1" paragraph>
                  هزینه ارسال بر اساس وزن کالا، مسافت و روش ارسال متغیر است. برای سفارش‌های بالای 500 هزار تومان، ارسال به صورت رایگان انجام می‌شود. هزینه دقیق ارسال در زمان نهایی کردن سبد خرید محاسبه و نمایش داده می‌شود.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  چگونه می‌توانم از اصل بودن قطعات اطمینان حاصل کنم؟
                </Typography>
                <Typography variant="body1" paragraph>
                  تمامی قطعات عرضه شده در فروشگاه کارنو دارای گارانتی اصالت کالا هستند. همچنین برای قطعات اصلی، کد شناسایی و هولوگرام اصالت روی بسته‌بندی درج شده است که می‌توانید از طریق سایت شرکت سازنده آن را استعلام نمایید.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  شرایط پیش‌فروش خودرو چگونه است؟
                </Typography>
                <Typography variant="body1" paragraph>
                  برای اطلاع از شرایط پیش‌فروش خودرو، می‌توانید به بخش "پیش‌فروش خودرو" در سایت مراجعه کنید یا با شماره تلفن پشتیبانی تماس بگیرید. شرایط پیش‌فروش شامل مبلغ پیش پرداخت، زمان تحویل، نحوه پرداخت اقساط و سایر جزئیات در آن بخش قابل مشاهده است.
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Contact;
