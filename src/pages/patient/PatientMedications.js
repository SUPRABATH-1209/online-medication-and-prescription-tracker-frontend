import React, { useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent,
  Grid, Chip, Button, LinearProgress, Divider, Avatar
} from '@mui/material';
import {
  Medication, CheckCircle, Cancel, AccessTime,
  WbSunny, Brightness5, Brightness3
} from '@mui/icons-material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/**
 * PATIENT MEDICATIONS PAGE
 * Purpose: Detailed view of all medications and tracking
 * Features:
 * - All medicines grouped by time slot
 * - Mark taken button
 * - Day-wise tracking chart
 * - Weekly summary
 */
const PatientMedications = () => {

  const [medications, setMedications] = useState({
    morning: [
      { id: 1, medicine: 'Dolo 650', dosage: '650mg', meal: 'After Meal', status: 'ON_TIME', markedAt: '8:15 AM' },
      { id: 2, medicine: 'Metformin', dosage: '500mg', meal: 'After Meal', status: 'LATE', markedAt: '10:30 AM' }
    ],
    afternoon: [
      { id: 3, medicine: 'Dolo 650', dosage: '650mg', meal: 'After Meal', status: 'PENDING', markedAt: '-' },
      { id: 4, medicine: 'Metformin', dosage: '500mg', meal: 'After Meal', status: 'PENDING', markedAt: '-' }
    ],
    night: [
      { id: 5, medicine: 'Dolo 650', dosage: '650mg', meal: 'After Meal', status: 'PENDING', markedAt: '-' }
    ]
  });

  const dayWiseData = [
    { day: 'Day 1', onTime: 3, late: 0, missed: 0 },
    { day: 'Day 2', onTime: 2, late: 1, missed: 0 },
    { day: 'Day 3', onTime: 3, late: 0, missed: 0 },
    { day: 'Day 4', onTime: 1, late: 1, missed: 1 },
    { day: 'Day 5', onTime: 2, late: 0, missed: 1 },
    { day: 'Day 6', onTime: 0, late: 0, missed: 0 },
    { day: 'Day 7', onTime: 0, late: 0, missed: 0 },
  ];

  // Mark medicine as taken
  const handleMarkTaken = (slot, medId) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMedications({
      ...medications,
      [slot]: medications[slot].map(med =>
        med.id === medId ? { ...med, status: 'ON_TIME', markedAt: timeStr } : med
      )
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ON_TIME': return { bg: '#e8f5e9', color: '#2e7d32', label: '✅ On Time' };
      case 'LATE': return { bg: '#fff8e1', color: '#f57f17', label: '⚠️ Late' };
      case 'MISSED': return { bg: '#ffebee', color: '#d32f2f', label: '❌ Missed' };
      case 'PENDING': return { bg: '#f0f7ff', color: '#0062ff', label: '⏳ Pending' };
      default: return { bg: '#f8fafc', color: '#64748b', label: 'Unknown' };
    }
  };

  const slotConfig = {
    morning: {
      label: '🌅 Morning',
      time: '7:00 AM - 9:00 AM',
      color: '#f57f17',
      bg: '#fff8e1',
      border: '#ffe082'
    },
    afternoon: {
      label: '☀️ Afternoon',
      time: '12:00 PM - 1:00 PM',
      color: '#1565c0',
      bg: '#e3f2fd',
      border: '#90caf9'
    },
    night: {
      label: '🌙 Night',
      time: '9:00 PM - 10:00 PM',
      color: '#4527a0',
      bg: '#ede7f6',
      border: '#b39ddb'
    }
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl">

        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#1e293b' }}>
            My Medications
          </Typography>
          <Typography color="textSecondary">
            Track and mark your daily medicines
          </Typography>
        </Box>

        <Grid container spacing={3}>

          {/* Medication Slots */}
          <Grid item xs={12} lg={7}>
            <Box display="flex" flexDirection="column" gap={3}>
              {Object.entries(medications).map(([slot, meds]) => {
                const config = slotConfig[slot];
                return (
                  <Card
                    key={slot}
                    sx={{
                      borderRadius: 4,
                      boxShadow: 2,
                      border: `1px solid ${config.border}`
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Slot Header */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                        sx={{
                          p: 2,
                          bgcolor: config.bg,
                          borderRadius: 3,
                          border: `1px solid ${config.border}`
                        }}
                      >
                        <Box>
                          <Typography fontWeight="bold" sx={{ color: config.color, fontSize: '1.1rem' }}>
                            {config.label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: config.color }}>
                            {config.time}
                          </Typography>
                        </Box>
                        <Chip
                          label={`${meds.filter(m => m.status !== 'PENDING').length}/${meds.length} Done`}
                          size="small"
                          sx={{ bgcolor: 'white', color: config.color, fontWeight: 700, border: `1px solid ${config.color}` }}
                        />
                      </Box>

                      {/* Medicine Cards */}
                      <Box display="flex" flexDirection="column" gap={2}>
                        {meds.map((med) => {
                          const style = getStatusStyle(med.status);
                          return (
                            <Box
                              key={med.id}
                              sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: style.bg,
                                border: `1px solid ${style.color}20`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                              }}
                            >
                              {/* Medicine Icon */}
                              <Avatar sx={{ bgcolor: style.color, width: 40, height: 40 }}>
                                <Medication sx={{ fontSize: 20 }} />
                              </Avatar>

                              {/* Medicine Info */}
                              <Box flex={1}>
                                <Typography fontWeight="bold">{med.medicine}</Typography>
                                <Box display="flex" gap={1} mt={0.3}>
                                  <Chip label={med.dosage} size="small" sx={{ bgcolor: '#e3f2fd', color: '#0062ff', fontWeight: 700 }} />
                                  <Chip label={med.meal} size="small" sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a', fontWeight: 600 }} />
                                </Box>
                              </Box>

                              {/* Status + Button */}
                              <Box textAlign="right">
                                <Chip
                                  label={style.label}
                                  size="small"
                                  sx={{ color: style.color, fontWeight: 700, mb: 0.5, display: 'block' }}
                                />
                                {med.status === 'PENDING' ? (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => handleMarkTaken(slot, med.id)}
                                    sx={{ bgcolor: '#2e7d32', fontWeight: 700, borderRadius: 2, fontSize: '0.7rem' }}
                                  >
                                    Mark Taken
                                  </Button>
                                ) : (
                                  <Typography variant="caption" color="textSecondary">
                                    {med.markedAt}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Grid>

          {/* Day-wise Chart */}
          <Grid item xs={12} lg={5}>
            <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  📊 Weekly Tracking
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dayWiseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTime" name="On Time" fill="#2e7d32" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="late" name="Late" fill="#f57f17" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="missed" name="Missed" fill="#d32f2f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <Divider sx={{ my: 2 }} />

                {/* Summary */}
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Box textAlign="center" sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                      <Typography fontWeight={900} sx={{ color: '#2e7d32' }}>11</Typography>
                      <Typography variant="caption" sx={{ color: '#2e7d32' }}>On Time</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box textAlign="center" sx={{ p: 1.5, bgcolor: '#fff8e1', borderRadius: 2 }}>
                      <Typography fontWeight={900} sx={{ color: '#f57f17' }}>2</Typography>
                      <Typography variant="caption" sx={{ color: '#f57f17' }}>Late</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box textAlign="center" sx={{ p: 1.5, bgcolor: '#ffebee', borderRadius: 2 }}>
                      <Typography fontWeight={900} sx={{ color: '#d32f2f' }}>2</Typography>
                      <Typography variant="caption" sx={{ color: '#d32f2f' }}>Missed</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PatientMedications;