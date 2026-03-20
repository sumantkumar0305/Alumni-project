import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const CATEGORIES = ["All", "Workshop", "Fest", "Webinar", "Orientation", "Other"];

export default function EventsHeader({ onCategoryChange, currentUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const canAddEvent =
    currentUser?.role === "alumni" ||
    currentUser?.role === "admin" ||
    currentUser?.permission === "Faculty" ||
    currentUser?.permission === "Admin";

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
      {/* FILTER BUTTON */}
      <Tooltip title="Filter Event" arrow>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ border: "1px solid #1976D2", borderRadius: 2 }}
        >
          <MenuIcon sx={{ color: "#1976D2" }} />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {CATEGORIES.map((cat) => (
          <MenuItem
            key={cat}
            onClick={() => {
              onCategoryChange(cat);
              setAnchorEl(null);
            }}
          >
            {cat}
          </MenuItem>
        ))}
      </Menu>

      {/* ADD EVENT BUTTON — only for alumni/admin/faculty */}
      {canAddEvent && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976D2",
            "&:hover": { backgroundColor: "#1565C0" },
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/add-event")}
        >
          Add Event
        </Button>
      )}
    </Box>
  );
}