import React from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const phone = '09304314246';
const telegramId = 'vahid_h_e';
const whatsapp = '09304314246';

const ContactUs = () => (
  <Container maxWidth="sm" sx={{ direction: 'rtl', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
      برای خرید و استعلام قیمت لطفا تماس بگیرید.
    </Typography>
    <Paper elevation={4} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 400, textAlign: 'center', bgcolor: 'primary.lighter' }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<PhoneIcon />}
          href={`tel:${phone}`}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2, fontWeight: 600, fontSize: '1.1rem', borderRadius: 2 }}
        >
          {phone}
        </Button>
        <Button
          startIcon={<TelegramIcon />}
          href={`https://t.me/${telegramId}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mb: 2, fontWeight: 600, fontSize: '1.1rem', borderRadius: 2 }}
        >
          @{telegramId}
        </Button>
        <Button
          startIcon={<WhatsAppIcon />}
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          color="success"
          fullWidth
          sx={{ fontWeight: 600, fontSize: '1.1rem', borderRadius: 2 }}
        >
          {whatsapp}
        </Button>
      </Box>
    </Paper>
  </Container>
);

export default ContactUs; 