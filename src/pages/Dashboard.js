import React from 'react';
// Replace your existing import at the top of Dashboard.js with this:
import { Grid, Paper, Typography, Box, Card, CardContent, Button, Divider } from '@mui/material';
import { Receipt, Medication, Event, NotificationsActive } from '@mui/icons-material';
const StatCard = ({ title, count, icon, color }) => (
  <Card sx={{ height: '100%', boxShadow: 2 }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" variant="overline">{title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{count}</Typography>
        </Box>
        <Box sx={{ backgroundColor: `${color}15`, p: 1, borderRadius: 2, display: 'flex', color: color }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Health Overview</Typography>

      <Grid container spacing={3}>
        {/* Statistics Row */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Prescriptions" count="12" icon={<Receipt />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Meds" count="4" icon={<Medication />} color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Upcoming Visits" count="2" icon={<Event />} color="#ed6c02" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Reminders" count="3" icon={<NotificationsActive />} color="#d32f2f" />
        </Grid>

        {/* Reminders / Quick Actions Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, boxShadow: 2, minHeight: '300px' }}>
            <Typography variant="h6" gutterBottom>Today's Medication Schedule</Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Mock Schedule Item */}
            <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Metformin - 500mg</Typography>
                <Typography variant="body2" color="textSecondary">After breakfast • 09:00 AM</Typography>
              </Box>
              <Button variant="outlined" size="small" color="success">Mark Taken</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, boxShadow: 2, bgcolor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom color="primary">Quick Upload</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>Got a new prescription? Upload it here to keep your records updated.</Typography>
            <Button variant="contained" fullWidth>Upload PDF/Image</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;