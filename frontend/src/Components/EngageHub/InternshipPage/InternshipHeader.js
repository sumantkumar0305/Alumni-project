import React, { useState } from "react";
import { Box, Typography, Stack, IconButton, Menu, MenuItem, Tooltip, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

const SKILLS = ["All", "Web Dev", "ML", "Software Eng."];

export const InternshipHeader = ({ currentFilter, onFilterChange, userRole, onAdd }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
      <Typography variant="h3" sx={{ color: "#43A047", fontWeight: "bold", flexGrow: 1 }}>
        Opportunities
      </Typography>
      <Stack direction="row" spacing={1}>
        <Tooltip title="Filter">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ border: "1px solid #ddd" }}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {SKILLS.map(s => (
            <MenuItem key={s} selected={s === currentFilter} onClick={() => { onFilterChange(s); setAnchorEl(null); }}>
              {s}
            </MenuItem>
          ))}
        </Menu>
        {userRole === "alumni" && (
          <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#43A047" }} onClick={onAdd}>
            Add
          </Button>
        )}
      </Stack>
    </Box>
  );
};