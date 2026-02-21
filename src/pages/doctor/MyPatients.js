import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Avatar, TextField, InputAdornment, Chip, LinearProgress, Button
} from '@mui/material';
import { Search, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * MY PATIENTS PAGE
 * Purpose: Doctor sees all their patients
 * Click View Details → goes to PatientDetail page
 */
const MyPatients = () => {

  const navigate = useNavigate();

  const [patients] = useState([
    { id: 1, name: 'Namitha Ganji', age: 25, gender: 'Female', adherence: 85, condition: 'Diabetes', days: '5/7' },
    { id: 2, name: 'Sree Ram', age: 28, gender: 'Male', adherence: 72, condition: 'Hypertension', days: '6/7' },
    { id: 3, name: 'Pramodini', age: 24, gender: 'Female', adherence: 90, condition: 'Fever', days: '7/7' },
    { id: 4, name: 'Maruthi Sreeram', age: 26, gender: 'Male', adherence: 65, condition: 'Asthma', days: '4/7' },
    { id: 5, name: 'Suprabath Behera', age: 25, gender: 'Male', adherence: 88, condition: 'Migraine', days: '7/7' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAdherenceColor = (pct) => {
    if (pct >= 80) return '#2e7d32';
    if (pct >= 50) return '#f57f17';
    return '#d32f2f';
  };

  const getAdherenceBg = (pct) => {
    if (pct >= 80) return '#e8f5e9';
    if (pct >= 50) return '#fff3e0';
    return '#ffebee';
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl">

        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#1e293b' }}>
            My Patients
          </Typography>
          <Typography color="textSecondary">
            {patients.length} patients under your care
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search patients by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 4,
            bgcolor: 'white',
            borderRadius: 3,
            '& .MuiOutlinedInput-root': { borderRadius: 3 }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#0062ff' }} />
              </InputAdornment>
            )
          }}
        />

        {/* Patient Cards */}
        <Grid container spacing={3}>
          {filteredPatients.map(patient => (
            <Grid item xs={12} sm={6} lg={4} key={patient.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,98,255,0.15)',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>

                  {/* Top Row */}
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Chip
                      label={patient.condition}
                      size="small"
                      sx={{ bgcolor: '#e3f2fd', color: '#0062ff', fontWeight: 600 }}
                    />
                    <Chip
                      label={`Day ${patient.days}`}
                      size="small"
                      sx={{ bgcolor: '#f8fafc', color: '#64748b', fontWeight: 600 }}
                    />
                  </Box>

                  {/* Patient Info */}
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar
                      sx={{
                        bgcolor: '#0062ff',
                        width: 56,
                        height: 56,
                        fontSize: 22,
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0,98,255,0.3)'
                      }}
                    >
                      {patient.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold" sx={{ color: '#1e293b' }}>
                        {patient.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {patient.age} yrs • {patient.gender}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Adherence */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: getAdherenceBg(patient.adherence),
                      mb: 2
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: getAdherenceColor(patient.adherence) }}
                      >
                        Medication Adherence
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={900}
                        sx={{ color: getAdherenceColor(patient.adherence) }}
                      >
                        {patient.adherence}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={patient.adherence}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.5)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getAdherenceColor(patient.adherence),
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>

                  {/* View Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                    sx={{
                      borderColor: '#0062ff',
                      color: '#0062ff',
                      fontWeight: 700,
                      borderRadius: 2,
                      '&:hover': { bgcolor: '#e3f2fd' }
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* No results */}
          {filteredPatients.length === 0 && (
            <Grid item xs={12}>
              <Box textAlign="center" py={6}>
                <Typography color="textSecondary" variant="h6">
                  No patients found!
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default MyPatients;