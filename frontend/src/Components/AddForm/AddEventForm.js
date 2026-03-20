import React, { useRef } from "react";
import { Box, Button, Typography, IconButton, CircularProgress, Backdrop } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import { useEventForm } from "./AddEventForm/useEventForm";
import { FormFields } from "./AddEventForm/FormFields";
import FileUploadSection from "./AddEventForm/FileUploadSection";
import AlertMessage from "../Utils/AlertMessage";

export default function AddEventForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { 
    formData, setFormData, notification, setNotification, 
    loading, initialLoading, preview, setPreview, 
    handleChange, handleFileChange, handleSubmit 
  } = useEventForm();

  if (initialLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  return (
    <>
      <AlertMessage 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: "", type: "info" })} 
      />
      
      <Box sx={{ maxWidth: "650px", mx: "auto", mt: 4, p: 4, borderRadius: 3, boxShadow: 3, bgcolor: "background.paper" }}>
        <IconButton onClick={() => navigate("/events")} sx={{ mb: 2 }}><ArrowBackIcon /></IconButton>
        <Typography variant="h4" textAlign="center" gutterBottom color="primary">Add New Event</Typography>

        <form onSubmit={handleSubmit}>
          <FormFields formData={formData} handleChange={handleChange} />
          
          <Box sx={{ mt: 3, mb: 3 }}>
            <FileUploadSection 
              fileInputRef={fileInputRef}
              formData={formData}
              preview={preview}
              onFileChange={(e) => handleFileChange(e.target.files[0])}
              onRemoveFile={() => { setFormData({...formData, eventFile: null}); setPreview(null); }}
            />
          </Box>

          <Button type="submit" variant="contained" fullWidth disabled={loading} size="large">
            {loading ? <CircularProgress size={24} /> : "Create Event"}
          </Button>
        </form>
      </Box>

      <Backdrop open={loading} sx={{ zIndex: 9999, color: '#fff' }}><CircularProgress color="inherit" /></Backdrop>
    </>
  );
}