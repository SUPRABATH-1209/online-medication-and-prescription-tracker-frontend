import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, TextField, Button, Avatar, Grid } from '@mui/material';
import { Person, CameraAlt } from '@mui/icons-material';

/**
 * DOCTOR PROFILE/SETTINGS PAGE
 * Purpose: Doctor can update profile info and upload profile picture
 * Features:
 * - Upload profile picture
 * - Edit name, specialization, phone
 * - Save changes button
 */
const DoctorProfile = () => {

  // MOCK DATA (Replace with API calls and actual user data)
  const [profile, setProfile] = useState({
    name: 'Dr. Ram Kumar',
    email: 'ram@doctor.com',
    specialization: 'Cardiologist',
    phone: '9876543210',
    experience: '10 years',
    hospitalName: 'MediCare Hospital'
  });

  const [profilePic, setProfilePic] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile changes
  const handleSave = () => {
    console.log('Saving profile:', profile);
    // TODO: API call to update profile
    alert('Profile updated successfully!');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Profile Settings
          </Typography>
          <Typography color="textSecondary">
            Update your profile information
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Profile Picture Section */}
            <Box textAlign="center" mb={4}>
              <Avatar
                src={profilePic}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto',
                  bgcolor: '#0062ff',
                  fontSize: 40
                }}
              >
                {!profilePic && <Person sx={{ fontSize: 60 }} />}
              </Avatar>

              <Button
                component="label"
                startIcon={<CameraAlt />}
                sx={{ mt: 2, fontWeight: 700 }}
              >
                Upload Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePictureUpload}
                />
              </Button>
            </Box>

            {/* Profile Form */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profile.email}
                  disabled
                  helperText="Email cannot be changed"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Specialization"
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hospital Name"
                  name="hospitalName"
                  value={profile.hospitalName}
                  onChange={handleChange}
                />
              </Grid>

              {/* Save Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSave}
                  sx={{
                    bgcolor: '#0062ff',
                    fontWeight: 700,
                    py: 1.5,
                    mt: 2
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DoctorProfile;