import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../middleware.js";

export default function ManageAccountPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    role: "",
    username: "",
    email: "",
    linkedIn: "",
    isMentor: false,
    // admin-only
    permission: "Faculty",
    collegeDeptName: "",
    collegeCode: "",
    // optional password change
    password: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const showMessage = (msg, sev = "success") =>
    setSnackbar({ open: true, message: msg, severity: sev });
  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const syncFromUser = (u) => {
    setForm({
      role: u.role || "",
      username: u.username || "",
      email: u.email || "",
      linkedIn: u.linkedIn || "",
      isMentor: !!u.isMentor,
      permission: u.permission || "Faculty",
      collegeDeptName: u.collegeDeptName || "",
      collegeCode: u.collegeCode || "",
      password: "",
    });

    // Keep Header in sync (avatar + name).
    if (u) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: u.id || u._id,
          _id: u._id,
          username: u.username,
          email: u.email,
          role: u.role,
          permission: u.permission,
        })
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/manage-account" } });
      return;
    }

    const loadMe = async () => {
      try {
        setLoading(true);
        const api = backendAPI();
        const res = await axios.get(`${api}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res?.data?.success && res.data.user) {
          syncFromUser(res.data.user);
        } else {
          throw new Error("Invalid /api/me response");
        }
      } catch (err) {
        console.error(err);
        showMessage(err.response?.data?.message || "Failed to load account.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const api = backendAPI();

      const payload = {
        username: form.username,
      };

      if (form.role === "alumni") {
        payload.linkedIn = form.linkedIn;
        payload.isMentor = form.isMentor;
      }
      if (form.role === "student") {
        payload.linkedIn = form.linkedIn;
      }
      if (form.role === "admin") {
        payload.permission = form.permission;
        payload.collegeDeptName = form.collegeDeptName;
        payload.collegeCode = form.collegeCode;
      }

      if (form.password && form.password.trim().length > 0) {
        payload.password = form.password;
      }

      const res = await axios.patch(`${api}/api/me`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res?.data?.success || !res.data.user) {
        throw new Error("Invalid update response");
      }

      syncFromUser(res.data.user);
      window.dispatchEvent(new Event("userUpdated"));
      showMessage("Account updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      showMessage(err.response?.data?.message || "Failed to update account.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 520, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Typography variant="h5" gutterBottom>
        Manage Account
      </Typography>

      <Stack spacing={2}>
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={form.email} disabled fullWidth />

        {form.role !== "admin" && (
          <TextField
            label="LinkedIn"
            name="linkedIn"
            value={form.linkedIn}
            onChange={handleChange}
            fullWidth
            placeholder="https://linkedin.com/in/..."
          />
        )}

        {form.role === "alumni" && (
          <FormControlLabel
            control={<Checkbox name="isMentor" checked={form.isMentor} onChange={handleChange} />}
            label="Available as Mentor"
          />
        )}

        {form.role === "admin" && (
          <>
            <Select name="permission" value={form.permission} onChange={handleChange} fullWidth displayEmpty>
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
            <TextField
              label="College Department Name"
              name="collegeDeptName"
              value={form.collegeDeptName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="College Code"
              name="collegeCode"
              value={form.collegeCode}
              onChange={handleChange}
              fullWidth
            />
          </>
        )}

        <TextField
          label="New Password (optional)"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}
