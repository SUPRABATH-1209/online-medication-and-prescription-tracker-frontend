import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Avatar, LinearProgress, Chip, Button
} from '@mui/material';
import {
  People, PersonAdd, Analytics, Circle
} from '@mui/icons-material';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import AiChat from '../../components/common/AiChat';

/**
 * DOCTOR DASHBOARD - REDESIGNED
 * Features:
 * - Stats cards (Total Patients, Requests, Adherence)
 * - Patient list - click to see their chart
 * - Day-wise medication adherence chart
 * - Overall pie chart
 */
const DoctorDashboard = () => {

  // Selected patient state
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAI, setShowAI] = useState(false);

  // Stats
  const stats = {
    totalPatients: 24,
    pendingRequests: 3,
    averageAdherence: 78
  };

  // Mock patients with day-wise data
  const patients = [
    {
      id: 1,
      name: 'Namitha Ganji',
      age: 25,
      gender: 'Female',
      adherence: 85,
      totalDays: 7,
      completedDays: 5,
      dayWiseData: [
        { day: 'Day 1', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 2', onTime: 2, late: 1, missed: 0 },
        { day: 'Day 3', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 4', onTime: 1, late: 1, missed: 1 },
        { day: 'Day 5', onTime: 2, late: 0, missed: 1 },
        { day: 'Day 6', onTime: 0, late: 0, missed: 0 },
        { day: 'Day 7', onTime: 0, late: 0, missed: 0 },
      ],
      pieData: [
        { name: 'On Time', value: 70 },
        { name: 'Late', value: 15 },
        { name: 'Missed', value: 15 }
      ]
    },
    {
      id: 2,
      name: 'Sree Ram',
      age: 28,
      gender: 'Male',
      adherence: 72,
      totalDays: 7,
      completedDays: 6,
      dayWiseData: [
        { day: 'Day 1', onTime: 2, late: 1, missed: 0 },
        { day: 'Day 2', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 3', onTime: 1, late: 1, missed: 1 },
        { day: 'Day 4', onTime: 2, late: 0, missed: 1 },
        { day: 'Day 5', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 6', onTime: 2, late: 1, missed: 0 },
        { day: 'Day 7', onTime: 0, late: 0, missed: 0 },
      ],
      pieData: [
        { name: 'On Time', value: 60 },
        { name: 'Late', value: 25 },
        { name: 'Missed', value: 15 }
      ]
    },
    {
      id: 3,
      name: 'Pramodini',
      age: 24,
      gender: 'Female',
      adherence: 90,
      totalDays: 7,
      completedDays: 7,
      dayWiseData: [
        { day: 'Day 1', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 2', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 3', onTime: 2, late: 1, missed: 0 },
        { day: 'Day 4', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 5', onTime: 3, late: 0, missed: 0 },
        { day: 'Day 6', onTime: 2, late: 0, missed: 1 },
        { day: 'Day 7', onTime: 3, late: 0, missed: 0 },
      ],
      pieData: [
        { name: 'On Time', value: 85 },
        { name: 'Late', value: 10 },
        { name: 'Missed', value: 5 }
      ]
    }
  ];

  // Colors for chart
  const COLORS = ['#2e7d32', '#ed6c02', '#d32f2f'];

  // Get adherence color
  const getAdherenceColor = (pct) => {
    if (pct >= 80) return '#2e7d32';
    if (pct >= 50) return '#ed6c02';
    return '#d32f2f';
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>

      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={900} sx={{ color: '#1e293b' }}>
          Dashboard Overview
        </Typography>
        <Typography color="textSecondary">
          Welcome back, Dr. Ram! Here's your patient summary.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,98,255,0.1)', border: '1px solid #e3f2fd' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="overline" color="textSecondary" fontWeight="bold">
                    Total Patients
                  </Typography>
                  <Typography variant="h3" fontWeight={900} sx={{ color: '#0062ff' }}>
                    {stats.totalPatients}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 3 }}>
                  <People sx={{ fontSize: 40, color: '#0062ff' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(237,108,2,0.1)', border: '1px solid #fff3e0' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="overline" color="textSecondary" fontWeight="bold">
                    Pending Requests
                  </Typography>
                  <Typography variant="h3" fontWeight={900} sx={{ color: '#ed6c02' }}>
                    {stats.pendingRequests}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#fff3e0', p: 2, borderRadius: 3 }}>
                  <PersonAdd sx={{ fontSize: 40, color: '#ed6c02' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(46,125,50,0.1)', border: '1px solid #e8f5e9' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="overline" color="textSecondary" fontWeight="bold">
                    Avg. Adherence
                  </Typography>
                  <Typography variant="h3" fontWeight={900} sx={{ color: '#2e7d32' }}>
                    {stats.averageAdherence}%
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 3 }}>
                  <Analytics sx={{ fontSize: 40, color: '#2e7d32' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>

        {/* Patient List */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3} sx={{ color: '#1e293b' }}>
                Recent Patients
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                {patients.map(patient => (
                  <Box
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      cursor: 'pointer',
                      border: selectedPatient?.id === patient.id
                        ? '2px solid #0062ff'
                        : '1px solid #e2e8f0',
                      bgcolor: selectedPatient?.id === patient.id
                        ? '#f0f7ff'
                        : 'white',
                      transition: 'all 0.2s',
                      '&:hover': { boxShadow: 3, borderColor: '#0062ff' }
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      {/* Avatar */}
                      <Avatar sx={{ bgcolor: '#0062ff', width: 48, height: 48, fontWeight: 'bold' }}>
                        {patient.name.charAt(0)}
                      </Avatar>

                      {/* Info */}
                      <Box flex={1}>
                        <Typography fontWeight="bold" sx={{ color: '#1e293b' }}>
                          {patient.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {patient.age} yrs • {patient.gender}
                        </Typography>

                        {/* Progress Bar */}
                        <Box mt={0.5}>
                          <LinearProgress
                            variant="determinate"
                            value={patient.adherence}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: '#e2e8f0',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getAdherenceColor(patient.adherence),
                                borderRadius: 3
                              }
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Adherence % */}
                      <Typography
                        fontWeight={900}
                        sx={{ color: getAdherenceColor(patient.adherence) }}
                      >
                        {patient.adherence}%
                      </Typography>
                    </Box>

                    {/* Day Progress */}
                    <Box display="flex" alignItems="center" gap={1} mt={1} ml={8}>
                      <Typography variant="caption" color="textSecondary">
                        Day {patient.completedDays} of {patient.totalDays}
                      </Typography>
                      <Chip
                        label={patient.completedDays === patient.totalDays ? "Complete" : "In Progress"}
                        size="small"
                        sx={{
                          bgcolor: patient.completedDays === patient.totalDays ? '#e8f5e9' : '#fff3e0',
                          color: patient.completedDays === patient.totalDays ? '#2e7d32' : '#ed6c02',
                          fontWeight: 700,
                          fontSize: '0.65rem'
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} lg={7}>
          {selectedPatient ? (
            <Box display="flex" flexDirection="column" gap={3}>

              {/* Patient Header Card */}
              <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0', bgcolor: '#0062ff' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: 'white', color: '#0062ff', width: 56, height: 56, fontWeight: 'bold', fontSize: 24 }}>
                      {selectedPatient.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                        {selectedPatient.name}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        {selectedPatient.age} years • {selectedPatient.gender}
                      </Typography>
                    </Box>
                    <Box ml="auto" textAlign="right">
                      <Typography variant="h4" fontWeight={900} sx={{ color: 'white' }}>
                        {selectedPatient.adherence}%
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
                        Overall Adherence
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Medication Adherence
                    </Typography>
                    <Chip
                      label={`Day ${selectedPatient.completedDays} of ${selectedPatient.totalDays}`}
                      sx={{ bgcolor: '#e3f2fd', color: '#0062ff', fontWeight: 700 }}
                    />
                  </Box>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={selectedPatient.pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                      >
                        {selectedPatient.pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Day-wise Bar Chart */}
              <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Day-wise Medication Tracking
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={selectedPatient.dayWiseData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="onTime" name="On Time" fill="#2e7d32" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="late" name="Late" fill="#ed6c02" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="missed" name="Missed" fill="#d32f2f" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

            </Box>
          ) : (
            /* No Patient Selected */
            <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0', height: '100%' }}>
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px'
              }}>
                <People sx={{ fontSize: 80, color: '#e2e8f0', mb: 2 }} />
                <Typography variant="h6" color="textSecondary" fontWeight="bold">
                  Select a Patient
                </Typography>
                <Typography color="textSecondary" textAlign="center" mt={1}>
                  Click on any patient from the list to view their medication adherence charts
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* AI Chat Button - Fixed Position */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        {showAI ? (
          <AiChat role="DOCTOR" onClose={() => setShowAI(false)} />
        ) : (
          <Button
            variant="contained"
            onClick={() => setShowAI(true)}
            sx={{
              bgcolor: '#0062ff',
              borderRadius: 4,
              px: 3, py: 1.5,
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 8px 25px rgba(0,98,255,0.4)',
              '&:hover': { bgcolor: '#0051d5', transform: 'scale(1.05)' },
              transition: 'all 0.2s'
            }}
          >
            🤖 Ask AI Assistant
          </Button>
        )}
      </Box>

    </Box>
  );
};

export default DoctorDashboard;