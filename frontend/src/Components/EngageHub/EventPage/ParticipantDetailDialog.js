import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ParticipantDetailDialog({ open, participant, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Participant Details
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {participant ? (
          <Box>
            {/* AVATAR + NAME + EMAIL + PHONE */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <Avatar
                src={participant.avatar || participant.photo}
                sx={{ width: 72, height: 72 }}
              >
                {(participant.name || participant.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {participant.name || participant.fullName || "Unknown"}
                </Typography>
                <Typography variant="body2">{participant.email}</Typography>
                {participant.phone && (
                  <Typography variant="body2">{participant.phone}</Typography>
                )}
              </Box>
            </Box>

            {/* COLLEGE */}
            {participant.college && (
              <Typography>
                <b>College:</b> {participant.college}
              </Typography>
            )}

            {/* REGISTRATION DATE */}
            {participant.registrationDate && (
              <Typography>
                <b>Registered on:</b>{" "}
                {new Date(participant.registrationDate).toLocaleString()}
              </Typography>
            )}

            {/* OTHER FIELDS */}
            {participant.fields && (
              <Box mt={1}>
                <Typography>
                  <b>Other details</b>
                </Typography>
                <Typography variant="body2">
                  {JSON.stringify(participant.fields)}
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Typography>No participant selected.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}