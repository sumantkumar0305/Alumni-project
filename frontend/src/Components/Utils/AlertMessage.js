import React from 'react';
import { Collapse, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CONFIG = {
  success: {
    icon: <CheckCircleOutlineIcon sx={{ fontSize: "1.3rem" }} />,
    gradient: "linear-gradient(135deg, #166534 0%, #16a34a 100%)",
    glow: "rgba(22, 163, 74, 0.35)",
    border: "rgba(134, 239, 172, 0.25)",
    label: "Success",
  },
  error: {
    icon: <ErrorOutlineIcon sx={{ fontSize: "1.3rem" }} />,
    gradient: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
    glow: "rgba(220, 38, 38, 0.35)",
    border: "rgba(252, 165, 165, 0.25)",
    label: "Error",
  },
  warning: {
    icon: <WarningAmberIcon sx={{ fontSize: "1.3rem" }} />,
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
    glow: "rgba(217, 119, 6, 0.35)",
    border: "rgba(253, 211, 77, 0.25)",
    label: "Warning",
  },
  info: {
    icon: <InfoOutlinedIcon sx={{ fontSize: "1.3rem" }} />,
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1976D2 100%)",
    glow: "rgba(25, 118, 210, 0.35)",
    border: "rgba(147, 197, 253, 0.25)",
    label: "Info",
  },
};

export default function AlertMessage({ message, type = 'info', onClose }) {
  const cfg = CONFIG[type] || CONFIG.info;

  return (
    <Collapse in={!!message}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, px: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            background: cfg.gradient,
            border: `1px solid ${cfg.border}`,
            borderRadius: "14px",
            px: 2.5,
            py: 1.6,
            maxWidth: 360,
            width: "100%",
            boxShadow: `0 8px 24px ${cfg.glow}, 0 2px 8px rgba(0,0,0,0.15)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* SHINE OVERLAY */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "14px 14px 60% 60%",
              pointerEvents: "none",
            }}
          />

          {/* ICON */}
          <Box sx={{ color: "#fff", mt: "1px", flexShrink: 0 }}>
            {cfg.icon}
          </Box>

          {/* TEXT */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                mb: 0.2,
                lineHeight: 1,
              }}
            >
              {cfg.label}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "0.88rem",
                fontWeight: 500,
                lineHeight: 1.5,
                wordBreak: "break-word",
              }}
            >
              {message}
            </Typography>
          </Box>

          {/* CLOSE BUTTON */}
          <IconButton
            aria-label="close"
            size="small"
            onClick={onClose}
            sx={{
              color: "rgba(255,255,255,0.6)",
              p: 0.3,
              mt: "1px",
              flexShrink: 0,
              borderRadius: "6px",
              transition: "all 0.18s ease",
              "&:hover": {
                color: "#fff",
                background: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: "0.95rem" }} />
          </IconButton>
        </Box>
      </Box>
    </Collapse>
  );
}