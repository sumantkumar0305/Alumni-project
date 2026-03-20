import React from "react";
import { TextField, MenuItem, Stack } from "@mui/material";

const CATEGORIES = ["Workshop", "Fest", "Webinar", "Orientation", "Other"];
const VISIBILITY = ["Open to All", "Open to Organization", "Same Course"];

export const FormFields = ({ formData, handleChange }) => (
  <Stack spacing={3}>
    <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required fullWidth />
    <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} fullWidth />
    <TextField label="Date & Time" name="date" type="datetime-local" value={formData.date} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
    
    <Stack direction="row" spacing={2}>
      <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
      <TextField label="Max Attendees" name="maxAttendees" type="number" value={formData.maxAttendees} onChange={handleChange} fullWidth />
    </Stack>

    <TextField label="Organization" name="organization" value={formData.organization} onChange={handleChange} required fullWidth />
    
    <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} required fullWidth>
      {CATEGORIES.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
    </TextField>

    <TextField select label="Visibility" name="visibility" value={formData.visibility} onChange={handleChange} required fullWidth>
      {VISIBILITY.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
    </TextField>
  </Stack>
);