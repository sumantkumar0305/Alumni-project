import React, { useState } from "react";
import { Box, Typography, Stack, IconButton, Menu, MenuItem, Tooltip, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

const SKILL_CATEGORIES = ["All", "Web Development", "AI/ML", "Design", "Cloud & DevOps", "Mobile Development", "Cybersecurity"];

export const JobHeader = ({ currentFilter, onFilterChange, userRole, onAddClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
      <Typography variant="h3" sx={{ color: "#FF6F00", fontWeight: "bold", flexGrow: 1 }}>
        Job Opportunities
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Filter Job" arrow>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ border: "1px solid #ddd" }}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {SKILL_CATEGORIES.map((skill) => (
            <MenuItem key={skill} selected={skill === currentFilter} onClick={() => { onFilterChange(skill); setAnchorEl(null); }}>
              {skill}
            </MenuItem>
          ))}
        </Menu>
        {userRole === "alumni" && (
          <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#FF6F00", fontWeight: "bold" }} onClick={onAddClick}>
            Add Job
          </Button>
        )}
      </Stack>
    </Box>
  );
};