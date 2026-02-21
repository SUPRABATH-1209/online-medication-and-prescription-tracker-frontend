import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Dashboard, Receipt, Medication, Notifications, Person, Info, Menu } from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Prescriptions', icon: <Receipt />, path: '/prescriptions' },
    { text: 'Medications', icon: <Medication />, path: '/medications' },
    { text: 'Reminders', icon: <Notifications />, path: '/reminders' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'About Us', icon: <Info />, path: '/about' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>MedTracker</Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon color="primary">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}><Menu /></IconButton>
          <Typography variant="h6" noWrap component="div">My Health Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Outlet /> {/* This is where the specific page content (like Dashboard) will render */}
      </Box>
    </Box>
  );
};

export default MainLayout;