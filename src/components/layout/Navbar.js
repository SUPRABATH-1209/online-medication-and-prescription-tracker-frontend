import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e2e8f0' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: '8% !important' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <HealthAndSafetyIcon sx={{ fontSize: 32 }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>MediCare</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate('/login')} sx={{ fontWeight: 700, color: '#1e293b' }}>Login</Button>
          <Button onClick={() => navigate('/register')} variant="contained" sx={{ fontWeight: 700, borderRadius: 2 }}>Sign Up Free</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;