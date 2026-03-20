import React from "react";
import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import { useInternshipForm } from "./AddInternForm/useInternshipForm";
import { InternshipFields } from "./AddInternForm/InternshipFields";

export default function AddInternForm() {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit, handleCancel } = useInternshipForm();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", bgcolor: "#f4f6f8", p: 3 }}>
      <Paper elevation={8} sx={{ maxWidth: 700, width: "100%", borderRadius: 4, overflow: "hidden" }}>
        
        {/* Header Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)", color: "#fff", p: 3 }}>
          <IconButton onClick={() => navigate("/internships")} sx={{ color: "white", bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" } }}>
            <ArrowBackIcon />
          </IconButton>
          <WorkIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">Post a New Internship</Typography>
        </Box>

        {/* Form Body */}
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }} noValidate>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Fields marked with * are required.</Typography>
          
          <InternshipFields formData={formData} errors={errors} handleChange={handleChange} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">Post Internship</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}