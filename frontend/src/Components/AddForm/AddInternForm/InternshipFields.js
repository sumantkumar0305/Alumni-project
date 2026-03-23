import React from "react";
import { Grid, TextField, InputAdornment } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TitleIcon from "@mui/icons-material/Title";

export const InternshipFields = ({ formData, errors, handleChange }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField
        required fullWidth
        label="Internship Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        InputProps={{ startAdornment: (<InputAdornment position="start"><TitleIcon color="action" /></InputAdornment>) }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required fullWidth
        label="Company Name"
        name="company"
        value={formData.company}
        onChange={handleChange}
        error={!!errors.company}
        helperText={errors.company}
        InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessIcon color="action" /></InputAdornment>) }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        required fullWidth
        label="Required Skills"
        name="skills"
        placeholder="e.g., React, Node.js"
        value={formData.skills}
        onChange={handleChange}
        error={!!errors.skills}
        helperText={errors.skills}
        InputProps={{ startAdornment: (<InputAdornment position="start"><WorkIcon color="action" /></InputAdornment>) }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOnIcon color="action" /></InputAdornment>) }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Stipend"
        name="stipend"
        value={formData.stipend}
        onChange={handleChange}
        InputProps={{ startAdornment: (<InputAdornment position="start"><CurrencyRupeeIcon color="action" /></InputAdornment>) }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        InputProps={{ startAdornment: (<InputAdornment position="start"><ScheduleIcon color="action" /></InputAdornment>) }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        required fullWidth multiline rows={4}
        label="Job Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
      />
    </Grid>
  </Grid>
);