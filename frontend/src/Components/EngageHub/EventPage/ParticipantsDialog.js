import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ParticipantsDialog({
  open,
  loading,
  participants,
  error,
  onClose,
  onViewParticipantDetail,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Participants
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : participants.length === 0 ? (
          <Typography>No participants registered yet.</Typography>
        ) : (
          <List>
            {participants.map((p) => (
              <React.Fragment key={p._id || p.id || p.email}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => onViewParticipantDetail(p)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={p.avatar || p.photo}
                      alt={p.name || p.fullName || p.email}
                    >
                      {p.name
                        ? p.name.charAt(0).toUpperCase()
                        : p.email?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={p.name || p.fullName || p.email}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {p.email}
                        </Typography>
                        {p.phone ? ` — ${p.phone}` : ""}
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}