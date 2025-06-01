import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  LocalShipping as ShippingIcon,
  Route as RouteIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  // TODO: Get stats from backend
  const stats = {
    activeDrivers: 12,
    pendingDeliveries: 25,
    completedRoutes: 156,
    totalDistance: '1,234 km',
  };

  const recentDeliveries = [
    { id: 1, address: '123 Main St', status: 'In Progress' },
    { id: 2, address: '456 Oak Ave', status: 'Completed' },
    { id: 3, address: '789 Pine Rd', status: 'Pending' },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CarIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Drivers</Typography>
              </Box>
              <Typography variant="h4">{stats.activeDrivers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ShippingIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending Deliveries</Typography>
              </Box>
              <Typography variant="h4">{stats.pendingDeliveries}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <RouteIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Completed Routes</Typography>
              </Box>
              <Typography variant="h4">{stats.completedRoutes}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TimelineIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Distance</Typography>
              </Box>
              <Typography variant="h4">{stats.totalDistance}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Deliveries */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Deliveries
            </Typography>
            <List>
              {recentDeliveries.map((delivery) => (
                <ListItem key={delivery.id}>
                  <ListItemIcon>
                    <ShippingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={delivery.address}
                    secondary={`Status: ${delivery.status}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem button component="a" href="/optimize">
                <ListItemIcon>
                  <RouteIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Optimize New Route" />
              </ListItem>
              <ListItem button component="a" href="/upload">
                <ListItemIcon>
                  <ShippingIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Upload New Manifest" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 