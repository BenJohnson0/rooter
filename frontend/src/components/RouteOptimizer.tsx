import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { RouteOptimizationRequest, RouteOptimizationResponse } from '../types';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 51.5074,
  lng: -0.1278
};

const RouteOptimizer: React.FC = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [deliveries, setDeliveries] = useState<string[]>([]);
  const [newDelivery, setNewDelivery] = useState('');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    // Map is loaded
  }, []);

  const addDelivery = () => {
    if (newDelivery.trim()) {
      setDeliveries([...deliveries, newDelivery.trim()]);
      setNewDelivery('');
    }
  };

  const removeDelivery = (index: number) => {
    setDeliveries(deliveries.filter((_, i) => i !== index));
  };

  const optimizeRoute = async () => {
    if (!startLocation || !endLocation || deliveries.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const request: RouteOptimizationRequest = {
        start_location: startLocation,
        end_location: endLocation,
        deliveries: deliveries
      };

      const response = await fetch('http://localhost:5000/api/route/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data: RouteOptimizationResponse = await response.json();

      if (data.route) {
        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
          origin: startLocation,
          destination: endLocation,
          waypoints: deliveries.map(address => ({
            location: address,
            stopover: true
          })),
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirections(result);
      }
    } catch (error) {
      console.error('Error optimizing route:', error);
      alert('Error optimizing route. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Route Optimizer
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          required
        />
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Delivery Addresses
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="New Delivery Address"
            value={newDelivery}
            onChange={(e) => setNewDelivery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addDelivery()}
          />
          <Button variant="contained" onClick={addDelivery}>
            Add
          </Button>
        </Box>

        <List>
          {deliveries.map((delivery, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" onClick={() => removeDelivery(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={delivery} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={optimizeRoute}
        disabled={!startLocation || !endLocation || deliveries.length === 0}
        sx={{ mb: 3 }}
      >
        Optimize Route
      </Button>

      {isLoaded && (
        <Paper sx={{ p: 2 }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onMapLoad}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </Paper>
      )}
    </Container>
  );
};

export default RouteOptimizer; 