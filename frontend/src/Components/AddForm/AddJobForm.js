import React from "react";
import {
  Box, Button, Container, Typography, Paper,
  IconButton, Alert, CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useNavigate } from "react-router-dom";
import { JobFields } from "./AddJobForm/JobFields";
import { useJobForm } from "./AddJobForm/useJobForm";

export default function AddJobForm() {
  const navigate = useNavigate();
  const {
    formData, errors, serverError, loading,
    handleChange, handleSubmit, handleCancel,
  } = useJobForm();

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>

          {/* HEADER */}
          <Box sx={{
            display: "flex", alignItems: "center", gap: 2,
            py: 2.5, px: 3,
            background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
            color: "white",
          }}>
            <IconButton
              onClick={() => navigate("/jobs")}
              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <BusinessCenterIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">Post a New Job</Typography>
          </Box>

          {/* FORM BODY */}
          <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, py: 4 }}>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fields marked with * are required.
            </Typography>

            {/* SERVER ERROR — inline, above the fields */}
            {serverError && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {serverError}
              </Alert>
            )}

            <JobFields formData={formData} errors={errors} handleChange={handleChange} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
              >
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </Box>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}