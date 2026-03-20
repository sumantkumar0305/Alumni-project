import React from "react";
import { Grid, TextField, InputAdornment, MenuItem } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";

const JOB_TYPES = ["Full-Time", "Part-Time", "Internship", "Contract"];

export const JobFields = ({ formData, errors, handleChange }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField label="Job Title *" name="title" value={formData.title} onChange={handleChange} fullWidth error={!!errors.title} helperText={errors.title} />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField label="Company Name *" name="company" value={formData.company} onChange={handleChange} fullWidth error={!!errors.company} helperText={errors.company}
        InputProps={{ startAdornment: <InputAdornment position="start"><CorporateFareIcon /></InputAdornment> }} />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField label="Location *" name="location" value={formData.location} onChange={handleChange} fullWidth error={!!errors.location} helperText={errors.location}
        InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment> }} />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField label="Salary" name="salary" value={formData.salary} onChange={handleChange} fullWidth
        InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment> }} />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField select label="Job Type *" name="type" value={formData.type} onChange={handleChange} fullWidth error={!!errors.type} helperText={errors.type}
        InputProps={{ startAdornment: <InputAdornment position="start"><CategoryIcon /></InputAdornment> }}>
        {JOB_TYPES.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
      </TextField>
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField label="Available Posts *" name="availablePosts" type="number" value={formData.availablePosts} onChange={handleChange} fullWidth error={!!errors.availablePosts} helperText={errors.availablePosts}
        InputProps={{ inputProps: { min: 1 }, startAdornment: <InputAdornment position="start"><GroupIcon /></InputAdornment> }} />
    </Grid>

    <Grid item xs={12}>
      <TextField label="Required Skills *" name="skill" value={formData.skill} onChange={handleChange} fullWidth error={!!errors.skill} helperText={errors.skill}
        InputProps={{ startAdornment: <InputAdornment position="start"><WorkIcon /></InputAdornment> }} />
    </Grid>

    <Grid item xs={12}>
      <TextField label="Job Description *" name="description" value={formData.description} onChange={handleChange} multiline rows={4} fullWidth error={!!errors.description} helperText={errors.description} />
    </Grid>
  </Grid>
);