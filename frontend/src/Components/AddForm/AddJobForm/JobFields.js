import React from "react";
import { Grid, TextField, InputAdornment, MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";

const JOB_TYPES = ["Full-Time", "Part-Time", "Contract"];

export const JobFields = ({ formData, errors, handleChange }) => (
  <Grid container spacing={3}>

    {/* ROW 1: Job Title */}
    <Grid item xs={12}>
      <TextField
        label="Job Title *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        error={!!errors.title}
        helperText={errors.title}
      />
    </Grid>

    {/* ROW 2: Company Name + Location */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Company Name *"
        name="company"
        value={formData.company}
        onChange={handleChange}
        fullWidth
        error={!!errors.company}
        helperText={errors.company}
        InputProps={{
          startAdornment: <InputAdornment position="start"><CorporateFareIcon /></InputAdornment>
        }}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        label="Location *"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        error={!!errors.location}
        helperText={errors.location}
        InputProps={{
          startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>
        }}
      />
    </Grid>

    {/* ROW 3: Salary + Job Type */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon /></InputAdornment>
        }}
      />
    </Grid>

    {/* JOB TYPE — FormControl with explicit height to match other TextFields */}
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth error={!!errors.type}>
        <InputLabel id="job-type-label">Job Type *</InputLabel>
        <Select
          labelId="job-type-label"
          label="Job Type *"
          name="type"
          value={formData.type}
          onChange={handleChange}
          sx={{
            height: "56px",           // same height as MUI TextField default
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",   // vertically center the text
              width: "80px"
            },
          }}
        >
          {JOB_TYPES.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
        {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
      </FormControl>
    </Grid>

    {/* ROW 4: Available Posts + Required Skills */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Available Posts *"
        name="availablePosts"
        type="number"
        value={formData.availablePosts}
        onChange={handleChange}
        fullWidth
        error={!!errors.availablePosts}
        helperText={errors.availablePosts}
        InputProps={{
          inputProps: { min: 1 },
          startAdornment: <InputAdornment position="start"><GroupIcon /></InputAdornment>
        }}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        label="Required Skills *"
        name="skill"
        value={formData.skill}
        onChange={handleChange}
        fullWidth
        error={!!errors.skill}
        helperText={errors.skill}
        InputProps={{
          startAdornment: <InputAdornment position="start"><WorkIcon /></InputAdornment>
        }}
      />
    </Grid>

    {/* ROW 5: Job Description */}
    <Grid item xs={12}>
      <TextField
        label="Job Description *"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        error={!!errors.description}
        helperText={errors.description}
      />
    </Grid>

  </Grid>
);