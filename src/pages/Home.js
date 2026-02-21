import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, Stack } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Navbar />
      {/* Hero Section */}
      <Box sx={{ pt: 15, pb: 8, textAlign: 'center', background: 'radial-gradient(circle at top right, #f0f4ff, #ffffff)' }}>
        <Container>
          <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#1e293b' }}>
            Online Medication & <br/><span style={{ color: '#0062ff' }}>Prescription Tracker</span>
          </Typography>
          <Typography sx={{ color: '#64748b', mb: 4, maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
            The bridge between doctors and patients. Managing health records has never been this seamless.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/register')} sx={{ px: 4, py: 1.5, fontWeight: 700 }}>
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container sx={{ mb: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', height: '100%' }}>
              <Typography variant="h4" gutterBottom>For Doctors</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Streamline your clinic with our cloud-based portal. Issue digital prescriptions and track patient adherence.
              </Typography>
              <Button onClick={() => navigate('/register')} variant="outlined">Join as Doctor</Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', height: '100%' }}>
              <Typography variant="h4" gutterBottom>For Patients</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Take control of your health journey. Connect with certified doctors and get smart reminders.
              </Typography>
              <Button onClick={() => navigate('/register')} variant="outlined">Join as Patient</Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;