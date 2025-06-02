import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import ManifestUpload from './components/ManifestUpload';
import RouteOptimizer from './components/RouteOptimizer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<ManifestUpload />} />
        <Route path="/optimize" element={<RouteOptimizer />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 