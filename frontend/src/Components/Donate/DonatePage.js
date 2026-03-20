import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { backendAPI, getAuthHeaders } from "../middleware.js";

export default function DonatePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("College Donation");
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [roleOk, setRoleOk] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.role === "alumni";
    } catch {
      return false;
    }
  });

  const showMessage = (msg, severity = "success") => {
    setSnackbar({ open: true, message: msg, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/donate" } });
      return;
    }

    if (!roleOk) {
      showMessage("Only alumni can donate.", "error");
      return;
    }

    const donationAmount = Number(amount);
    if (!Number.isFinite(donationAmount) || donationAmount < 1) {
      showMessage("Please enter a valid donation amount.", "error");
      return;
    }

    setLoading(true);
    try {
      const api = backendAPI();
      const res = await axios.post(
        `${api}/api/donate`,
        { amount: donationAmount, purpose, message },
        { headers: getAuthHeaders() }
      );

      if (res?.data?.success) {
        showMessage("Donation submitted successfully!", "success");
        navigate("/alumni-directory");
      } else {
        showMessage(res?.data?.message || "Donation failed.", "error");
      }
    } catch (err) {
      showMessage(err.response?.data?.message || "Donation failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#f5f5f5" }}>
      <Box sx={{ maxWidth: 720, mx: "auto", px: 2 }}>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/alumni-directory")}
            sx={{ backgroundColor: "white" }}
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ color: "#0D47A1", fontWeight: "bold" }}>
            College Donation
          </Typography>
        </Box>

        {!roleOk ? (
          <Alert severity="error">
            You must be logged in as an alumni to donate.{" "}
            <Button onClick={() => navigate("/login")} sx={{ ml: 1 }}>
              Go to Login
            </Button>
          </Alert>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ backgroundColor: "white", p: 4, borderRadius: 3, boxShadow: 1 }}
          >
            <Stack spacing={2}>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Please enter the donation amount you want to contribute.
              </Typography>

              <TextField
                label="Donation Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                required
              />

              <TextField
                select
                label="Purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                fullWidth
              >
                <MenuItem value="College Donation">College Donation</MenuItem>
                <MenuItem value="Scholarship Fund">Scholarship Fund</MenuItem>
                <MenuItem value="Event Sponsorship">Event Sponsorship</MenuItem>
              </TextField>

              <TextField
                label="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ backgroundColor: "#FF6F00", "&:hover": { backgroundColor: "#FF8F00" } }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Donate"}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}

