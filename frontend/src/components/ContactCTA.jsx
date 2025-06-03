import React from 'react';
import { Box, Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga4';

// Read from env or fallback
const TEL = process.env.REACT_APP_TEL || '+989304314246';
const TELEGRAM = process.env.REACT_APP_TELEGRAM || 'vahid_h_e';
const WHATSAPP = process.env.REACT_APP_WHATSAPP || '+989304314246';
const CART_ENABLED = String(process.env.REACT_APP_CART_ENABLED).toLowerCase() === 'true';

// Helper to get WhatsApp digits only
const getWhatsAppDigits = (phone) => phone.replace(/[^\d]/g, '');

const ContactCTA = ({ showButton = true, buttonLabel = 'Contact us to purchase', ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Analytics event
  const handleClick = (type) => {
    if (window.gtag) {
      window.gtag('event', 'call_click', { method: type });
    } else if (typeof ReactGA.event === 'function') {
      ReactGA.event({ category: 'call_click', action: type });
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        mb: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        boxShadow: 1,
        maxWidth: isMobile ? '100%' : 300,
        width: '100%',
        mx: isMobile ? 0 : 'auto',
      }}
      aria-label="Contact options"
      {...props}
    >
      {showButton && !CART_ENABLED && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mb: 2, fontWeight: 700, fontSize: '1.1rem' }}
          href={`tel:${TEL}`}
          onClick={() => handleClick('phone')}
          aria-label="Contact us to purchase"
        >
          {buttonLabel}
        </Button>
      )}
      <Stack direction="column" spacing={1}>
        <Button
          startIcon={<TelegramIcon />}
          href={`https://t.me/${TELEGRAM}`}
          target="_blank"
          rel="noopener"
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => handleClick('telegram')}
          aria-label="Contact via Telegram"
        >
          Telegram | @{TELEGRAM}
        </Button>
        <Button
          startIcon={<WhatsAppIcon />}
          href={`https://wa.me/${getWhatsAppDigits(WHATSAPP)}`}
          target="_blank"
          rel="noopener"
          variant="outlined"
          color="success"
          fullWidth
          onClick={() => handleClick('whatsapp')}
          aria-label="Contact via WhatsApp"
        >
          WhatsApp | {WHATSAPP}
        </Button>
        <Button
          startIcon={<PhoneIcon />}
          href={`tel:${TEL}`}
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => handleClick('phone')}
          aria-label="Contact via Phone"
        >
          Phone | {TEL}
        </Button>
      </Stack>
    </Box>
  );
};

ContactCTA.propTypes = {
  showButton: PropTypes.bool,
  buttonLabel: PropTypes.string,
};

export default ContactCTA; 