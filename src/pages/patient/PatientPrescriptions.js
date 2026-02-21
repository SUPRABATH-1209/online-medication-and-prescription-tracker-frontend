import React, { useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent,
  Grid, Chip, Avatar, Divider, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Assignment, CalendarToday, Person } from '@mui/icons-material';

/**
 * PATIENT PRESCRIPTIONS PAGE
 * Purpose: Shows all prescriptions given by doctor
 * Features:
 * - List of prescriptions with date
 * - Medicine details per prescription
 * - Doctor info
 */
const PatientPrescriptions = () => {

  const [prescriptions] = useState([
    {
      id: 1,
      date: '2026-02-15',
      doctor: 'Dr. Ram Kumar',
      specialization: 'Cardiologist',
      remarks: 'Follow up after 7 days. Take medicines regularly.',
      status: 'ACTIVE',
      medicines: [
        { name: 'Dolo 650', dosage: '650mg', frequency: 'Morning, Afternoon, Night', duration: '7 days', meal: 'After Meal' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Morning, Night', duration: '7 days', meal: 'After Meal' }
      ]
    },
    {
      id: 2,
      date: '2026-02-01',
      doctor: 'Dr. Ram Kumar',
      specialization: 'Cardiologist',
      remarks: 'Complete the full course.',
      status: 'COMPLETED',
      medicines: [
        { name: 'Amoxicillin', dosage: '250mg', frequency: 'Morning, Night', duration: '5 days', meal: 'Before Meal' },
        { name: 'Cetirizine', dosage: '10mg', frequency: 'Night', duration: '5 days', meal: 'After Meal' }
      ]
    }
  ]);

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl">

        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#1e293b' }}>
            My Prescriptions
          </Typography>
          <Typography color="textSecondary">
            All prescriptions from your doctor
          </Typography>
        </Box>

        {/* Prescriptions List */}
        <Box display="flex" flexDirection="column" gap={3}>
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>

                {/* Prescription Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#0062ff', width: 50, height: 50 }}>
                      <Assignment />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Prescription #{prescription.id}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 14, color: '#64748b' }} />
                        <Typography variant="caption" color="textSecondary">
                          {prescription.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chip
                    label={prescription.status}
                    sx={{
                      bgcolor: prescription.status === 'ACTIVE' ? '#e8f5e9' : '#f8fafc',
                      color: prescription.status === 'ACTIVE' ? '#2e7d32' : '#64748b',
                      fontWeight: 700
                    }}
                  />
                </Box>

                {/* Doctor Info */}
                <Box
                  sx={{ p: 2, bgcolor: '#f0f7ff', borderRadius: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <Person sx={{ color: '#0062ff' }} />
                  <Box>
                    <Typography fontWeight="bold" sx={{ color: '#0062ff' }}>
                      {prescription.doctor}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {prescription.specialization}
                    </Typography>
                  </Box>
                </Box>

                {/* Remarks */}
                <Box sx={{ p: 2, bgcolor: '#fffbf0', borderRadius: 3, mb: 3, border: '1px solid #ffe082' }}>
                  <Typography variant="caption" fontWeight="bold" color="textSecondary">
                    DOCTOR'S REMARKS
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    {prescription.remarks}
                  </Typography>
                </Box>

                {/* Medicines Table */}
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e2e8f0', borderRadius: 3 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                      <TableRow>
                        <TableCell><strong>Medicine</strong></TableCell>
                        <TableCell><strong>Dosage</strong></TableCell>
                        <TableCell><strong>Frequency</strong></TableCell>
                        <TableCell><strong>Duration</strong></TableCell>
                        <TableCell><strong>Meal</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prescription.medicines.map((med, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography fontWeight="bold">{med.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={med.dosage} size="small" sx={{ bgcolor: '#e3f2fd', color: '#0062ff', fontWeight: 700 }} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{med.frequency}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">{med.duration}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={med.meal}
                              size="small"
                              sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a', fontWeight: 600 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PatientPrescriptions;