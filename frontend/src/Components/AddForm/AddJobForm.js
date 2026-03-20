import React from "react";
import { Box, Button, Container, Typography, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useNavigate } from "react-router-dom";
import { JobFields } from "./AddJobForm/JobFields";
import { useJobForm } from "./AddJobForm/useJobForm";

export default function AddJobForm() {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit } = useJobForm();

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>
          
          {/* HEADER */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2.5, px: 3, background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)", color: "white" }}>
            <IconButton onClick={() => navigate("/jobs")} sx={{ color: "white", bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" } }}>
              <ArrowBackIcon />
            </IconButton>
            <BusinessCenterIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">Post a New Job</Typography>
          </Box>

          {/* FORM BODY */}
          <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, py: 4 }}>
            <JobFields formData={formData} errors={errors} handleChange={handleChange} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
              <Button variant="outlined" onClick={() => navigate("/jobs")}>Cancel</Button>
              <Button type="submit" variant="contained">Post Job</Button>
            </Box>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}