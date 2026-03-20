import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Popover,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupsIcon from "@mui/icons-material/Groups";

// Category color map — each category gets its own personality
const CATEGORY_COLORS = {
  Workshop:    { bg: "#fff7ed", accent: "#f97316", text: "#c2410c" },
  Fest:        { bg: "#fdf4ff", accent: "#a855f7", text: "#7e22ce" },
  Webinar:     { bg: "#eff6ff", accent: "#3b82f6", text: "#1d4ed8" },
  Orientation: { bg: "#f0fdf4", accent: "#22c55e", text: "#15803d" },
  Other:       { bg: "#f8fafc", accent: "#64748b", text: "#334155" },
};

const DEFAULT_COLOR = { bg: "#eff6ff", accent: "#1976D2", text: "#1565C0" };

export default function EventCard({
  event,
  currentUser,
  isOrganizerOf,
  onRegisterClick,
  onViewParticipants,
}) {
  const [hoverAnchorEl, setHoverAnchorEl] = useState(null);
  const [hoverEvent, setHoverEvent] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const colors = CATEGORY_COLORS[event.category] || DEFAULT_COLOR;

  const handleRegisterClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: {
          from: location.pathname,
          openRegister: true,
          eventId: event._id,
        },
      });
    } else {
      onRegisterClick();
    }
  };

  return (
    <>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid",
          borderColor: isHovered ? colors.accent : "#e8edf2",
          background: "#ffffff",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.10), 0 0 0 1px ${colors.accent}22`
            : "0 2px 12px rgba(0,0,0,0.06)",
          overflow: "visible",
          position: "relative",
        }}
      >
        {/* TOP ACCENT BAR */}
        <Box
          sx={{
            height: "5px",
            borderRadius: "20px 20px 0 0",
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}55)`,
            transition: "opacity 0.3s",
            opacity: isHovered ? 1 : 0.45,
          }}
        />

        <CardContent sx={{ p: "24px !important" }}>
          {/* CATEGORY CHIP */}
          <Box sx={{ mb: 2 }}>
            <Chip
              label={event.category || "Event"}
              size="small"
              sx={{
                backgroundColor: colors.bg,
                color: colors.text,
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                border: `1px solid ${colors.accent}33`,
                height: "24px",
                borderRadius: "6px",
              }}
            />
          </Box>

          {/* TITLE */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.08rem",
              lineHeight: 1.35,
              color: "#0f172a",
              mb: 2,
              letterSpacing: "-0.01em",
              fontFamily: "'Georgia', serif",
            }}
          >
            {event.title}
          </Typography>

          {/* META: DATE + LOCATION */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: "0.82rem", color: colors.accent }} />
              <Typography
                variant="body2"
                sx={{ color: "#475569", fontSize: "0.81rem", fontWeight: 500 }}
              >
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: "0.82rem", color: colors.accent }} />
              <Typography
                variant="body2"
                sx={{ color: "#475569", fontSize: "0.81rem", fontWeight: 500 }}
              >
                {event.location}
              </Typography>
            </Box>
          </Box>

          {/* THIN DIVIDER */}
          <Box
            sx={{
              height: "1px",
              background: "linear-gradient(90deg, #e2e8f0, transparent)",
              mb: 2,
            }}
          />

          {/* DESCRIPTION — clamped to 2 lines */}
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontSize: "0.84rem",
              lineHeight: 1.65,
              mb: 3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {event.description}
          </Typography>

          {/* ACTION BUTTONS */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
            {/* REGISTER BUTTON */}
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: "0.88rem !important" }} />}
              onMouseEnter={(e) => {
                setHoverAnchorEl(e.currentTarget);
                setHoverEvent(event);
              }}
              onClick={handleRegisterClick}
              sx={{
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.text} 100%)`,
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.81rem",
                textTransform: "none",
                borderRadius: "10px",
                px: 2.5,
                py: 0.9,
                boxShadow: `0 4px 14px ${colors.accent}40`,
                letterSpacing: "0.01em",
                "&:hover": {
                  background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.accent} 100%)`,
                  boxShadow: `0 6px 20px ${colors.accent}55`,
                  transform: "scale(1.03)",
                },
                transition: "all 0.22s ease",
              }}
            >
              Register
            </Button>

            {/* VIEW PARTICIPANTS — only for organizers, not students */}
            {isOrganizerOf(event) && currentUser?.role !== "student" && (
              <Button
                variant="outlined"
                startIcon={<GroupsIcon sx={{ fontSize: "0.88rem !important" }} />}
                onClick={() => onViewParticipants(event._id)}
                sx={{
                  color: colors.accent,
                  borderColor: `${colors.accent}55`,
                  fontWeight: 600,
                  fontSize: "0.81rem",
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  "&:hover": {
                    borderColor: colors.accent,
                    backgroundColor: colors.bg,
                    transform: "scale(1.03)",
                  },
                  transition: "all 0.22s ease",
                }}
              >
                Participants
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* HOVER DETAILS POPOVER */}
      <Popover
        open={Boolean(hoverAnchorEl) && hoverEvent?._id === event._id}
        anchorEl={hoverAnchorEl}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        PaperProps={{
          elevation: 0,
          sx: {
            p: 2.5,
            width: 300,
            borderRadius: "16px",
            border: `1px solid ${colors.accent}33`,
            boxShadow: "0px 16px 40px rgba(0,0,0,0.12)",
            pointerEvents: "auto",
            background: "#fff",
          },
          onMouseLeave: () => {
            setHoverAnchorEl(null);
            setHoverEvent(null);
          },
        }}
      >
        {hoverEvent && (
          <>
            <Chip
              label={hoverEvent.category || "Event"}
              size="small"
              sx={{
                backgroundColor: colors.bg,
                color: colors.text,
                fontWeight: 700,
                fontSize: "0.67rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                border: `1px solid ${colors.accent}33`,
                height: "22px",
                borderRadius: "6px",
                mb: 1.5,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#0f172a",
                mb: 1.5,
                fontFamily: "'Georgia', serif",
                lineHeight: 1.3,
              }}
            >
              {hoverEvent.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, mb: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: "0.76rem", color: colors.accent }} />
                <Typography variant="body2" sx={{ color: "#475569", fontSize: "0.79rem" }}>
                  {new Date(hoverEvent.date).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: "0.76rem", color: colors.accent }} />
                <Typography variant="body2" sx={{ color: "#475569", fontSize: "0.79rem" }}>
                  {hoverEvent.location}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: "1px", background: "#e2e8f0", mb: 1.5 }} />
            <Typography
              variant="body2"
              sx={{ color: "#64748b", fontSize: "0.81rem", lineHeight: 1.6 }}
            >
              {hoverEvent.description}
            </Typography>
          </>
        )}
      </Popover>
    </>
  );
}