import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const ManifestUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setUploadStatus('');

      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });

  const handleUpload = async () => {
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const endpoint = uploadedFile.type.startsWith('image/')
        ? 'http://localhost:5000/api/upload/image'
        : 'http://localhost:5000/api/upload/manifest';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus('Upload successful!');
        // Handle successful upload (e.g., show extracted data)
        console.log('Upload response:', data);
      } else {
        setUploadStatus(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Upload Manifest
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            {...getRootProps()}
            sx={{
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive
                ? 'Drop the file here'
                : 'Drag and drop an Excel file or image here'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supported formats: .xlsx, .png, .jpg, .jpeg
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload Status
            </Typography>
            {uploadedFile && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Selected file: {uploadedFile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {uploadedFile.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Size: {(uploadedFile.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            )}
            {previewUrl && (
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={previewUrl}
                  alt="Preview"
                  sx={{ objectFit: 'contain' }}
                />
              </Card>
            )}
            {uploadStatus && (
              <Typography
                variant="body1"
                color={uploadStatus.includes('successful') ? 'success.main' : 'error.main'}
                sx={{ mt: 2 }}
              >
                {uploadStatus}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!uploadedFile}
              sx={{ mt: 2 }}
            >
              Upload
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManifestUpload; 