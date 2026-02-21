import React, { useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent, Grid, TextField,
  Button, Select, MenuItem, FormControl, InputLabel, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  ToggleButton, ToggleButtonGroup, Avatar, Divider, Radio,
  RadioGroup, FormControlLabel
} from '@mui/material';
import {
  Add, Delete, Person, AccessTime, WbSunny,
  Brightness3, Brightness5, CheckCircle, LocalHospital,
  FamilyRestroom, PersonOutline
} from '@mui/icons-material';

/**
 * PRESCRIPTIONS PAGE - REDESIGNED
 * Features:
 * - Professional medicine timing UI (no ugly dropdowns!)
 * - Beautiful time slot cards for Morning/Afternoon/Night
 * - Caretaker assignment (Stable/Critical patient)
 * - Staff shift assignment for critical patients
 */
const Prescriptions = () => {

  // =====================
  // MOCK DATA
  // =====================
  const [patients] = useState([
    { id: 1, name: 'Namitha Ganji', age: 25, gender: 'Female' },
    { id: 2, name: 'Sree Ram', age: 28, gender: 'Male' },
    { id: 3, name: 'Pramodini', age: 24, gender: 'Female' }
  ]);

  const [availableMedicines] = useState([
    { id: 1, name: 'Dolo 650' },
    { id: 2, name: 'Paracetamol 500mg' },
    { id: 3, name: 'Amoxicillin 250mg' },
    { id: 4, name: 'Cetirizine 10mg' }
  ]);

  // Staff list with shifts
  const [staffList] = useState([
    { id: 1, name: 'Nurse Priya', shift: 'MORNING', shiftTime: '6:00 AM - 2:00 PM', role: 'Nurse' },
    { id: 2, name: 'Nurse Kavitha', shift: 'MORNING', shiftTime: '6:00 AM - 2:00 PM', role: 'Nurse' },
    { id: 3, name: 'Staff Ravi', shift: 'EVENING', shiftTime: '2:00 PM - 10:00 PM', role: 'Assistant' },
    { id: 4, name: 'Nurse Sunita', shift: 'EVENING', shiftTime: '2:00 PM - 10:00 PM', role: 'Nurse' },
    { id: 5, name: 'Staff Kumar', shift: 'NIGHT', shiftTime: '10:00 PM - 6:00 AM', role: 'Assistant' },
    { id: 6, name: 'Nurse Lakshmi', shift: 'NIGHT', shiftTime: '10:00 PM - 6:00 AM', role: 'Nurse' },
  ]);

  // =====================
  // STATE
  // =====================
  const [selectedPatient, setSelectedPatient] = useState('');
  const [remarks, setRemarks] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Caretaker state
  const [patientCondition, setPatientCondition] = useState('STABLE'); // STABLE or CRITICAL
  const [caretakerType, setCaretakerType] = useState('SELF'); // SELF, FAMILY, STAFF
  const [caretakerName, setCaretakerName] = useState('');
  const [caretakerPhone, setCaretakerPhone] = useState('');
  const [assignedStaff, setAssignedStaff] = useState([]);

  // Current medicine being added
  const [currentMed, setCurrentMed] = useState({
    medicineId: '',
    medicineName: '',
    dosage: '',
    durationDays: '',
    frequency: [],
    morning: { meal: '', timeStart: '07:00', timeEnd: '09:00' },
    afternoon: { meal: '', timeStart: '12:00', timeEnd: '13:00' },
    night: { meal: '', timeStart: '21:00', timeEnd: '22:00' }
  });

  // =====================
  // HANDLERS
  // =====================

  // Toggle morning/afternoon/night
  const toggleFrequency = (slot) => {
    const freq = currentMed.frequency.includes(slot)
      ? currentMed.frequency.filter(f => f !== slot)
      : [...currentMed.frequency, slot];
    setCurrentMed({ ...currentMed, frequency: freq });
  };

  // Update time slot meal/time
  const updateSlot = (slot, field, value) => {
    setCurrentMed({
      ...currentMed,
      [slot]: { ...currentMed[slot], [field]: value }
    });
  };

  // Add medicine to list
  const handleAddMedicine = () => {
    if (!currentMed.medicineId || !currentMed.dosage || currentMed.frequency.length === 0) {
      alert('Please select medicine, dosage, and at least one time slot!');
      return;
    }
    setMedicines([...medicines, { ...currentMed }]);
    setCurrentMed({
      medicineId: '', medicineName: '', dosage: '', durationDays: '',
      frequency: [],
      morning: { meal: '', timeStart: '07:00', timeEnd: '09:00' },
      afternoon: { meal: '', timeStart: '12:00', timeEnd: '13:00' },
      night: { meal: '', timeStart: '21:00', timeEnd: '22:00' }
    });
    setOpenDialog(false);
  };

  // Toggle staff assignment
  const toggleStaff = (staffId) => {
    const already = assignedStaff.includes(staffId);
    if (already) {
      setAssignedStaff(assignedStaff.filter(id => id !== staffId));
    } else {
      setAssignedStaff([...assignedStaff, staffId]);
    }
  };

  // Save prescription
  const handleSave = () => {
    if (!selectedPatient || medicines.length === 0) {
      alert('Please select patient and add medicines!');
      return;
    }
    console.log({
      patientId: selectedPatient,
      remarks,
      medicines,
      patientCondition,
      caretakerType,
      caretakerName,
      caretakerPhone,
      assignedStaff
    });
    alert('Prescription saved successfully!');
  };

  // =====================
  // STYLES
  // =====================
  const shiftColors = {
    MORNING: { bg: '#fff8e1', color: '#f57f17', border: '#ffe082' },
    EVENING: { bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
    NIGHT: { bg: '#ede7f6', color: '#4527a0', border: '#b39ddb' }
  };

  const shiftIcons = {
    MORNING: <Brightness5 sx={{ fontSize: 18 }} />,
    EVENING: <WbSunny sx={{ fontSize: 18 }} />,
    NIGHT: <Brightness3 sx={{ fontSize: 18 }} />
  };

  // =====================
  // RENDER
  // =====================
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl">

        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#1e293b' }}>
            Create Prescription
          </Typography>
          <Typography color="textSecondary">
            Write detailed prescriptions with medication timing and caretaker assignment
          </Typography>
        </Box>

        {/* STEP 1: Patient Selection */}
        <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0', mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <Box sx={{ bgcolor: '#0062ff', color: 'white', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 14 }}>1</Box>
              <Typography variant="h6" fontWeight="bold">Patient & Notes</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Patient *</InputLabel>
                  <Select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    label="Select Patient *"
                    sx={{ borderRadius: 2 }}
                  >
                    {patients.map(p => (
                      <MenuItem key={p.id} value={p.id}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar sx={{ bgcolor: '#0062ff', width: 32, height: 32, fontSize: 14 }}>
                            {p.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography fontWeight="bold">{p.name}</Typography>
                            <Typography variant="caption" color="textSecondary">{p.age} yrs • {p.gender}</Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Doctor's Remarks"
                  placeholder="E.g., Follow up after 7 days..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* STEP 2: Medicines */}
        <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0', mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box sx={{ bgcolor: '#0062ff', color: 'white', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 14 }}>2</Box>
                <Typography variant="h6" fontWeight="bold">Medicines</Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                sx={{ bgcolor: '#0062ff', fontWeight: 700, borderRadius: 2 }}
              >
                Add Medicine
              </Button>
            </Box>

            {medicines.length === 0 ? (
              <Box textAlign="center" py={4} sx={{ bgcolor: '#f8fafc', borderRadius: 3, border: '2px dashed #e2e8f0' }}>
                <Typography color="textSecondary">
                  No medicines added yet. Click "Add Medicine" to start.
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e2e8f0', borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f8fafc' }}>
                    <TableRow>
                      <TableCell><strong>Medicine</strong></TableCell>
                      <TableCell><strong>Dosage</strong></TableCell>
                      <TableCell><strong>Schedule</strong></TableCell>
                      <TableCell><strong>Duration</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medicines.map((med, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography fontWeight="bold">{med.medicineName}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={med.dosage} size="small" sx={{ bgcolor: '#e3f2fd', color: '#0062ff', fontWeight: 700 }} />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" flexDirection="column" gap={0.5}>
                            {med.frequency.includes('morning') && (
                              <Box display="flex" alignItems="center" gap={1}>
                                <Chip icon={<Brightness5 />} label={`Morning • ${med.morning.meal} meal • ${med.morning.timeStart}-${med.morning.timeEnd}`} size="small" sx={{ bgcolor: '#fff8e1', color: '#f57f17', fontWeight: 600 }} />
                              </Box>
                            )}
                            {med.frequency.includes('afternoon') && (
                              <Box display="flex" alignItems="center" gap={1}>
                                <Chip icon={<WbSunny />} label={`Afternoon • ${med.afternoon.meal} meal • ${med.afternoon.timeStart}-${med.afternoon.timeEnd}`} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 600 }} />
                              </Box>
                            )}
                            {med.frequency.includes('night') && (
                              <Box display="flex" alignItems="center" gap={1}>
                                <Chip icon={<Brightness3 />} label={`Night • ${med.night.meal} meal • ${med.night.timeStart}-${med.night.timeEnd}`} size="small" sx={{ bgcolor: '#ede7f6', color: '#4527a0', fontWeight: 600 }} />
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">{med.durationDays} days</Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => setMedicines(medicines.filter((_, i) => i !== index))}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* STEP 3: Caretaker Assignment */}
        <Card sx={{ borderRadius: 4, boxShadow: 2, border: '1px solid #e2e8f0', mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <Box sx={{ bgcolor: '#0062ff', color: 'white', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 14 }}>3</Box>
              <Typography variant="h6" fontWeight="bold">Caretaker Assignment</Typography>
            </Box>

            {/* Patient Condition Toggle */}
            <Typography variant="subtitle2" fontWeight="bold" mb={2} color="textSecondary">
              PATIENT CONDITION
            </Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={6}>
                <Box
                  onClick={() => { setPatientCondition('STABLE'); setCaretakerType('SELF'); }}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: patientCondition === 'STABLE' ? '2px solid #2e7d32' : '1px solid #e2e8f0',
                    bgcolor: patientCondition === 'STABLE' ? '#f1f8e9' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#2e7d32' }
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ bgcolor: '#e8f5e9', p: 1.5, borderRadius: 2 }}>
                      <PersonOutline sx={{ color: '#2e7d32', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" sx={{ color: '#1e293b' }}>
                        Stable Patient ✅
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Patient can manage medication themselves
                      </Typography>
                    </Box>
                    {patientCondition === 'STABLE' && (
                      <CheckCircle sx={{ color: '#2e7d32', ml: 'auto' }} />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  onClick={() => { setPatientCondition('CRITICAL'); setCaretakerType('STAFF'); }}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: patientCondition === 'CRITICAL' ? '2px solid #d32f2f' : '1px solid #e2e8f0',
                    bgcolor: patientCondition === 'CRITICAL' ? '#fff5f5' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#d32f2f' }
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ bgcolor: '#ffebee', p: 1.5, borderRadius: 2 }}>
                      <LocalHospital sx={{ color: '#d32f2f', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" sx={{ color: '#1e293b' }}>
                        Critical Patient 🚨
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Needs hospital staff monitoring
                      </Typography>
                    </Box>
                    {patientCondition === 'CRITICAL' && (
                      <CheckCircle sx={{ color: '#d32f2f', ml: 'auto' }} />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {/* STABLE: Caretaker Options */}
            {patientCondition === 'STABLE' && (
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" mb={2} color="textSecondary">
                  WHO WILL MONITOR MEDICATION?
                </Typography>
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      onClick={() => setCaretakerType('SELF')}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: caretakerType === 'SELF' ? '2px solid #0062ff' : '1px solid #e2e8f0',
                        bgcolor: caretakerType === 'SELF' ? '#f0f7ff' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ bgcolor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
                          <Person sx={{ color: '#0062ff', fontSize: 28 }} />
                        </Box>
                        <Box>
                          <Typography fontWeight="bold">Self</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Patient marks their own medicine
                          </Typography>
                        </Box>
                        {caretakerType === 'SELF' && (
                          <CheckCircle sx={{ color: '#0062ff', ml: 'auto' }} />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      onClick={() => setCaretakerType('FAMILY')}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: caretakerType === 'FAMILY' ? '2px solid #0062ff' : '1px solid #e2e8f0',
                        bgcolor: caretakerType === 'FAMILY' ? '#f0f7ff' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ bgcolor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
                          <FamilyRestroom sx={{ color: '#0062ff', fontSize: 28 }} />
                        </Box>
                        <Box>
                          <Typography fontWeight="bold">Family / Friend</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Someone else monitors for patient
                          </Typography>
                        </Box>
                        {caretakerType === 'FAMILY' && (
                          <CheckCircle sx={{ color: '#0062ff', ml: 'auto' }} />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Family/Friend Details */}
                {caretakerType === 'FAMILY' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Caretaker Name"
                        placeholder="Enter name of family/friend"
                        value={caretakerName}
                        onChange={(e) => setCaretakerName(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Caretaker Phone"
                        placeholder="Enter phone number"
                        value={caretakerPhone}
                        onChange={(e) => setCaretakerPhone(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}

            {/* CRITICAL: Staff Assignment */}
            {patientCondition === 'CRITICAL' && (
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" mb={2} color="textSecondary">
                  ASSIGN HOSPITAL STAFF (Select one per shift)
                </Typography>

                {['MORNING', 'EVENING', 'NIGHT'].map(shift => (
                  <Box key={shift} mb={3}>
                    {/* Shift Header */}
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      mb={2}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: shiftColors[shift].bg,
                        border: `1px solid ${shiftColors[shift].border}`
                      }}
                    >
                      <Box sx={{ color: shiftColors[shift].color }}>
                        {shiftIcons[shift]}
                      </Box>
                      <Typography
                        fontWeight="bold"
                        sx={{ color: shiftColors[shift].color }}
                      >
                        {shift === 'MORNING' ? '🌅 Morning Shift' : shift === 'EVENING' ? '☀️ Evening Shift' : '🌙 Night Shift'}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: shiftColors[shift].color, ml: 1 }}
                      >
                        {shift === 'MORNING' ? '6:00 AM - 2:00 PM' : shift === 'EVENING' ? '2:00 PM - 10:00 PM' : '10:00 PM - 6:00 AM'}
                      </Typography>
                    </Box>

                    {/* Staff Cards for this shift */}
                    <Grid container spacing={2}>
                      {staffList
                        .filter(s => s.shift === shift)
                        .map(staff => (
                          <Grid item xs={12} md={6} key={staff.id}>
                            <Box
                              onClick={() => toggleStaff(staff.id)}
                              sx={{
                                p: 2,
                                borderRadius: 3,
                                border: assignedStaff.includes(staff.id)
                                  ? `2px solid ${shiftColors[shift].color}`
                                  : '1px solid #e2e8f0',
                                bgcolor: assignedStaff.includes(staff.id)
                                  ? shiftColors[shift].bg
                                  : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { borderColor: shiftColors[shift].color }
                              }}
                            >
                              <Box display="flex" alignItems="center" gap={2}>
                                <Avatar
                                  sx={{
                                    bgcolor: shiftColors[shift].color,
                                    width: 40,
                                    height: 40,
                                    fontSize: 16
                                  }}
                                >
                                  {staff.name.charAt(0)}
                                </Avatar>
                                <Box flex={1}>
                                  <Typography fontWeight="bold" sx={{ fontSize: '0.9rem' }}>
                                    {staff.name}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {staff.role}
                                  </Typography>
                                </Box>
                                {assignedStaff.includes(staff.id) && (
                                  <CheckCircle sx={{ color: shiftColors[shift].color }} />
                                )}
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSave}
          sx={{
            bgcolor: '#0062ff',
            fontWeight: 800,
            py: 2,
            borderRadius: 3,
            fontSize: '1rem'
          }}
        >
          📋 Save Prescription
        </Button>
      </Container>

      {/* Add Medicine Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          💊 Add Medicine
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>

            {/* Medicine Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Medicine *</InputLabel>
                <Select
                  value={currentMed.medicineId}
                  onChange={(e) => {
                    const med = availableMedicines.find(m => m.id === parseInt(e.target.value));
                    setCurrentMed({ ...currentMed, medicineId: med.id, medicineName: med.name });
                  }}
                  label="Select Medicine *"
                  sx={{ borderRadius: 2 }}
                >
                  {availableMedicines.map(med => (
                    <MenuItem key={med.id} value={med.id}>{med.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Dosage *"
                placeholder="E.g., 650mg"
                value={currentMed.dosage}
                onChange={(e) => setCurrentMed({ ...currentMed, dosage: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Duration (Days) *"
                value={currentMed.durationDays}
                onChange={(e) => setCurrentMed({ ...currentMed, durationDays: e.target.value })}
              />
            </Grid>

            {/* Time Slot Selection */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="bold" mb={1.5} color="textSecondary">
                SELECT TIME SLOTS *
              </Typography>
              <Grid container spacing={2}>
                {/* Morning */}
                <Grid item xs={12}>
                  <Box
                    onClick={() => toggleFrequency('morning')}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: currentMed.frequency.includes('morning') ? '2px solid #f57f17' : '1px solid #e2e8f0',
                      bgcolor: currentMed.frequency.includes('morning') ? '#fff8e1' : '#fafafa',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Typography fontSize={22}>🌅</Typography>
                        <Box>
                          <Typography fontWeight="bold" sx={{ color: '#f57f17' }}>Morning</Typography>
                          <Typography variant="caption" color="textSecondary">Default: 7:00 AM - 9:00 AM</Typography>
                        </Box>
                      </Box>
                      {currentMed.frequency.includes('morning') && (
                        <CheckCircle sx={{ color: '#f57f17' }} />
                      )}
                    </Box>

                    {/* Morning Details */}
                    {currentMed.frequency.includes('morning') && (
                      <Box mt={2} onClick={e => e.stopPropagation()}>
                        <Grid container spacing={1.5}>
                          <Grid item xs={12}>
                            <ToggleButtonGroup
                              value={currentMed.morning.meal}
                              exclusive
                              onChange={(e, val) => val && updateSlot('morning', 'meal', val)}
                              size="small"
                              fullWidth
                            >
                              <ToggleButton value="before" sx={{ fontWeight: 700, borderRadius: '8px 0 0 8px' }}>
                                Before Meal
                              </ToggleButton>
                              <ToggleButton value="after" sx={{ fontWeight: 700, borderRadius: '0 8px 8px 0' }}>
                                After Meal
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              type="time"
                              label="Start Time"
                              size="small"
                              value={currentMed.morning.timeStart}
                              onChange={(e) => updateSlot('morning', 'timeStart', e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              type="time"
                              label="End Time"
                              size="small"
                              value={currentMed.morning.timeEnd}
                              onChange={(e) => updateSlot('morning', 'timeEnd', e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Grid>

                {/* Afternoon */}
                <Grid item xs={12}>
                  <Box
                    onClick={() => toggleFrequency('afternoon')}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: currentMed.frequency.includes('afternoon') ? '2px solid #1565c0' : '1px solid #e2e8f0',
                      bgcolor: currentMed.frequency.includes('afternoon') ? '#e3f2fd' : '#fafafa',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Typography fontSize={22}>☀️</Typography>
                        <Box>
                          <Typography fontWeight="bold" sx={{ color: '#1565c0' }}>Afternoon</Typography>
                          <Typography variant="caption" color="textSecondary">Default: 12:00 PM - 1:00 PM</Typography>
                        </Box>
                      </Box>
                      {currentMed.frequency.includes('afternoon') && (
                        <CheckCircle sx={{ color: '#1565c0' }} />
                      )}
                    </Box>

                    {currentMed.frequency.includes('afternoon') && (
                      <Box mt={2} onClick={e => e.stopPropagation()}>
                        <Grid container spacing={1.5}>
                          <Grid item xs={12}>
                            <ToggleButtonGroup
                              value={currentMed.afternoon.meal}
                              exclusive
                              onChange={(e, val) => val && updateSlot('afternoon', 'meal', val)}
                              size="small"
                              fullWidth
                            >
                              <ToggleButton value="before" sx={{ fontWeight: 700, borderRadius: '8px 0 0 8px' }}>
                                Before Meal
                              </ToggleButton>
                              <ToggleButton value="after" sx={{ fontWeight: 700, borderRadius: '0 8px 8px 0' }}>
                                After Meal
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              type="time"
                              label="Start Time"
                              size="small"
                              value={currentMed.afternoon.timeStart}
                              onChange={(e) => updateSlot('afternoon', 'timeStart', e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              type="time"
                              label="End Time"
                              size="small"
                              value={currentMed.afternoon.timeEnd}
                              onChange={(e) => updateSlot('afternoon', 'timeEnd', e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Grid>

                {/* Night */}
                <Grid item xs={12}>
                  <Box
                    onClick={() => toggleFrequency('night')}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: currentMed.frequency.includes('night') ? '2px solid #4527a0' : '1px solid #e2e8f0',
                      bgcolor: currentMed.frequency.includes('night') ? '#ede7f6' : '#fafafa',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Typography fontSize={22}>🌙</Typography>
                        <Box>
                          <Typography fontWeight="bold" sx={{ color: '#4527a0' }}>Night</Typography>
                          <Typography variant="caption" color="textSecondary">Default: 9:00 PM - 10:00 PM</Typography>
                        </Box>
                      </Box>
                      {currentMed.frequency.includes('night') && (
                        <CheckCircle sx={{ color: '#4527a0' }} />
                      )}
                    </Box>

                    {currentMed.frequency.includes('night') && (
                      <Box mt={2} onClick={e => e.stopPropagation()}>
                        <Grid container spacing={1.5}>
                          <Grid item xs={12}>
                            <ToggleButtonGroup
                              value={currentMed.night.meal}
                              exclusive
                              onChange={(e, val) => val && updateSlot('night', 'meal', val)}
                              size="small"
                              fullWidth
                            >
                              <ToggleButton value="before" sx={{ fontWeight: 700, borderRadius: '8px 0 0 8px' }}>
                                Before Meal
                              </ToggleButton>
                              <ToggleButton value="after" sx={{ fontWeight: 700, borderRadius: '0 8px 8px 0' }}>
                                After Meal
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              type="time"
                              label="Start Time"
                              size="small"
                              value={currentMed.night.timeStart}
                              onChange={(e) => updateSlot('night', 'timeStart', e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              type="time"
                              label="End Time"
                              size="small"
                              value={currentMed.night.timeEnd}
                              onChange={(e) => updateSlot('night', 'timeEnd', e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e2e8f0' }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddMedicine}
            sx={{ bgcolor: '#0062ff', fontWeight: 700, borderRadius: 2 }}
          >
            Add to Prescription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Prescriptions;