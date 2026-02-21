import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Avatar, Chip, LinearProgress, Button
} from '@mui/material';
import {
  Medication, LocalHospital, TrendingUp,
  FamilyRestroom, Person
} from '@mui/icons-material';
import {
  PieChart, Pie, Cell,
  ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import AiChat from '../../components/common/AiChat';

/**
 * PATIENT DASHBOARD
 * Purpose: Patient home screen
 * caretakerType options:
 * - 'SELF' = Patient themselves
 * - 'FAMILY' = Family member monitoring
 * - 'STAFF' = Hospital staff monitoring
 */
const PatientDashboard = () => {

  // Change this to test different views
  const [caretakerType] = useState('FAMILY');
  const [showAI, setShowAI] = useState(false);

  const [todayMeds, setTodayMeds] = useState([
    { id: 1, medicine: 'Dolo 650', dosage: '650mg', slot: 'Morning', time: '7:00 AM - 9:00 AM', meal: 'After Meal', status: 'ON_TIME', markedAt: '8:15 AM', icon: '🌅' },
    { id: 2, medicine: 'Metformin', dosage: '500mg', slot: 'Morning', time: '7:00 AM - 9:00 AM', meal: 'After Meal', status: 'LATE', markedAt: '10:30 AM', icon: '🌅' },
    { id: 3, medicine: 'Dolo 650', dosage: '650mg', slot: 'Afternoon', time: '12:00 PM - 1:00 PM', meal: 'After Meal', status: 'PENDING', markedAt: '-', icon: '☀️' },
    { id: 4, medicine: 'Metformin', dosage: '500mg', slot: 'Night', time: '9:00 PM - 10:00 PM', meal: 'After Meal', status: 'PENDING', markedAt: '-', icon: '🌙' }
  ]);

  const adherenceData = [
    { name: 'On Time', value: 70 },
    { name: 'Late', value: 15 },
    { name: 'Missed', value: 15 }
  ];

  const COLORS = ['#2e7d32', '#f57f17', '#d32f2f'];

  const handleMarkTaken = (medId) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setTodayMeds(todayMeds.map(med =>
      med.id === medId ? { ...med, status: 'ON_TIME', markedAt: timeStr } : med
    ));
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

  const totalMeds = todayMeds.length;
  const takenMeds = todayMeds.filter(m => m.status === 'ON_TIME' || m.status === 'LATE').length;
  const adherencePct = Math.round((takenMeds / totalMeds) * 100);

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl">

        {/* CARETAKER BANNER */}
        {caretakerType === 'FAMILY' && (
          <Box sx={{ p: 2.5, mb: 3, borderRadius: 3, bgcolor: '#e3f2fd', border: '1px solid #90caf9', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#0062ff', width: 44, height: 44 }}>
              <FamilyRestroom />
            </Avatar>
            <Box>
              <Typography fontWeight="bold" sx={{ color: '#0062ff' }}>
                👨‍👩‍👧 Family Caretaker Mode
              </Typography>
              <Typography variant="body2" sx={{ color: '#1565c0' }}>
                You are monitoring medicines for <strong>Namitha Ganji</strong>. Mark medicines on their behalf.
              </Typography>
            </Box>
          </Box>
        )}

        {caretakerType === 'STAFF' && (
          <Box sx={{ p: 2.5, mb: 3, borderRadius: 3, bgcolor: '#fff8e1', border: '1px solid #ffe082', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#f57f17', width: 44, height: 44 }}>
              <LocalHospital />
            </Avatar>
            <Box>
              <Typography fontWeight="bold" sx={{ color: '#f57f17' }}>
                🏥 Staff Mode - Morning Shift (6:00 AM - 2:00 PM)
              </Typography>
              <Typography variant="body2" sx={{ color: '#e65100' }}>
                You are assigned to monitor <strong>Namitha Ganji</strong>. Mark medicines during your shift.
              </Typography>
            </Box>
          </Box>
        )}

        {/* HEADER */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#1e293b' }}>
            Good Morning, Namitha! 👋
          </Typography>
          <Typography color="textSecondary">
            Here's your medication schedule for today - Feb 17, 2026
          </Typography>
        </Box>

        {/* CARETAKER INFO CARDS */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, border: '1px solid #e3f2fd', boxShadow: '0 4px 20px rgba(0,98,255,0.08)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" fontWeight="bold" color="textSecondary">
                  YOUR CARETAKER
                </Typography>

                {caretakerType === 'SELF' && (
                  <Box display="flex" alignItems="center" gap={2} mt={1.5}>
                    <Avatar sx={{ bgcolor: '#e3f2fd', width: 50, height: 50 }}>
                      <Person sx={{ color: '#0062ff', fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">Self Monitoring</Typography>
                      <Typography variant="body2" color="textSecondary">
                        You are managing your own medicines
                      </Typography>
                      <Chip label="✅ Active" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 700, mt: 0.5 }} />
                    </Box>
                  </Box>
                )}

                {caretakerType === 'FAMILY' && (
                  <Box display="flex" alignItems="center" gap={2} mt={1.5}>
                    <Avatar sx={{ bgcolor: '#e3f2fd', width: 50, height: 50 }}>
                      <FamilyRestroom sx={{ color: '#0062ff', fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">Ravi Kumar</Typography>
                      <Typography variant="body2" color="textSecondary">
                        👨‍👩‍👧 Family Member • 📞 9876500000
                      </Typography>
                      <Chip label="👀 Monitoring You" size="small" sx={{ bgcolor: '#e3f2fd', color: '#0062ff', fontWeight: 700, mt: 0.5 }} />
                    </Box>
                  </Box>
                )}

                {caretakerType === 'STAFF' && (
                  <Box display="flex" alignItems="center" gap={2} mt={1.5}>
                    <Avatar sx={{ bgcolor: '#fff8e1', width: 50, height: 50 }}>
                      <LocalHospital sx={{ color: '#f57f17', fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">Nurse Priya</Typography>
                      <Typography variant="body2" color="textSecondary">
                        🏥 Hospital Staff • Morning Shift
                      </Typography>
                      <Chip label="🌅 6AM - 2PM" size="small" sx={{ bgcolor: '#fff8e1', color: '#f57f17', fontWeight: 700, mt: 0.5 }} />
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, border: '1px solid #e8f5e9', boxShadow: '0 4px 20px rgba(46,125,50,0.08)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" fontWeight="bold" color="textSecondary">
                  MY DOCTOR
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mt={1.5}>
                  <Avatar sx={{ bgcolor: '#0062ff', width: 50, height: 50, fontWeight: 'bold' }}>
                    DR
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">Dr. Ram Kumar</Typography>
                    <Typography variant="body2" color="textSecondary">🏥 Cardiologist</Typography>
                    <Typography variant="body2" sx={{ color: '#0062ff', fontWeight: 600 }}>📞 9876543210</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* STATS ROW */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(46,125,50,0.1)', border: '1px solid #e8f5e9' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="overline" color="textSecondary" fontWeight="bold">
                      Today's Progress
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ color: '#2e7d32' }}>
                      {takenMeds}/{totalMeds}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Medicines taken
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 3 }}>
                    <Medication sx={{ fontSize: 40, color: '#2e7d32' }} />
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={adherencePct}
                  sx={{
                    mt: 2, height: 8, borderRadius: 4,
                    bgcolor: '#e8f5e9',
                    '& .MuiLinearProgress-bar': { bgcolor: '#2e7d32', borderRadius: 4 }
                  }}
                />
                <Typography variant="caption" color="textSecondary" mt={0.5} display="block">
                  {adherencePct}% completed today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,98,255,0.1)', border: '1px solid #e3f2fd' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="overline" color="textSecondary" fontWeight="bold">
                      Overall Adherence
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ color: '#0062ff' }}>
                      85%
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Day 5 of 7
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 3 }}>
                    <TrendingUp sx={{ fontSize: 40, color: '#0062ff' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* MAIN CONTENT */}
        <Grid container spacing={3}>

          {/* Today's Schedule */}
          <Grid item xs={12} lg={7}>
            <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  💊 Today's Medication Schedule
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {todayMeds.map((med) => {
                    const style = getStatusStyle(med.status);
                    return (
                      <Box
                        key={med.id}
                        sx={{
                          p: 2.5, borderRadius: 3,
                          border: `1px solid ${med.status === 'PENDING' ? '#e2e8f0' : style.bg}`,
                          bgcolor: style.bg, transition: 'all 0.2s'
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Typography fontSize={28}>{med.icon}</Typography>
                          <Box flex={1}>
                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                              <Typography fontWeight="bold" sx={{ color: '#1e293b' }}>
                                {med.medicine}
                              </Typography>
                              <Chip label={med.dosage} size="small" sx={{ bgcolor: '#e3f2fd', color: '#0062ff', fontWeight: 700 }} />
                            </Box>
                            <Typography variant="caption" color="textSecondary">
                              {med.slot} • {med.time} • {med.meal}
                            </Typography>
                          </Box>
                          <Box textAlign="right">
                            <Chip
                              label={style.label}
                              size="small"
                              sx={{ bgcolor: 'white', color: style.color, fontWeight: 700, border: `1px solid ${style.color}`, mb: 1 }}
                            />
                            {med.status === 'PENDING' && (
                              <Box>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => handleMarkTaken(med.id)}
                                  sx={{ bgcolor: '#2e7d32', fontWeight: 700, borderRadius: 2, fontSize: '0.7rem', '&:hover': { bgcolor: '#1b5e20' } }}
                                >
                                  ✅ Mark Taken
                                </Button>
                              </Box>
                            )}
                            {med.status !== 'PENDING' && (
                              <Typography variant="caption" color="textSecondary" display="block">
                                Marked: {med.markedAt}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} lg={5}>
            <Box display="flex" flexDirection="column" gap={3}>

              {/* Pie Chart */}
              <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    📊 Adherence Overview
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={adherenceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                        {adherenceData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Reminder Card */}
              <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #fff3e0', bgcolor: '#fffbf0' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: '#f57f17' }}>
                    ⏰ Next Reminder
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 3, border: '1px solid #ffe082' }}>
                    <Typography fontWeight="bold">☀️ Afternoon Medicines</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Dolo 650 + Metformin
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#f57f17', fontWeight: 700 }}>
                      12:00 PM - 1:00 PM • After Meal
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* AI Chat Button - Fixed Position */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        {showAI ? (
          <AiChat role="PATIENT" onClose={() => setShowAI(false)} />
        ) : (
          <Button
            variant="contained"
            onClick={() => setShowAI(true)}
            sx={{
              bgcolor: '#2e7d32',
              borderRadius: 4,
              px: 3, py: 1.5,
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 8px 25px rgba(46,125,50,0.4)',
              '&:hover': { bgcolor: '#1b5e20', transform: 'scale(1.05)' },
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

export default PatientDashboard;