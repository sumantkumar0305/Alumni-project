import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Modal,
  CircularProgress,
} from "@mui/material";

import EventsHeader from "./EventPage/EventsHeader";
import EventCard from "./EventPage/EventCard";
import ParticipantsDialog from "./EventPage/ParticipantsDialog";
import ParticipantDetailDialog from "./EventPage/ParticipantDetailDialog";
import EventRegisterForm from "./ReletedForm/EventRegisterForm";
import AlertMessage from "../Utils/AlertMessage";

import { useEvents } from "./EventPage/hooks/useEvents";
import { useParticipants } from "./EventPage/hooks/useParticipants";

export default function EventsPage() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const navigate = useNavigate();
  const location = useLocation();

  // Data hooks
  const { events, loading, error, currentUser } = useEvents();
  const {
    participantsDialogOpen,
    participantsLoading,
    participants,
    participantsError,
    participantDetailOpen,
    selectedParticipant,
    handleViewParticipants,
    closeParticipantsDialog,
    handleOpenParticipantDetail,
    closeParticipantDetail,
  } = useParticipants();

  // Handle navigation state (notifications, auto-open register)
  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || "success",
      });
      navigate(location.pathname, { replace: true });
    }
    if (location.state?.openRegister) {
      setOpenRegisterModal(true);
    }
  }, [location, navigate]);

  // Filter events by selected category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  // Check if the current user is the organizer of a given event
  const isOrganizerOf = (event) => {
    if (!currentUser) return false;
    const id = currentUser._id || currentUser.id || currentUser?.userId;
    const email = currentUser.email;
    return (
      (id &&
        (event.organizer === id ||
          event.organizerId === id ||
          event.organizerId === event.organizer ||
          event.organiserId === id)) ||
      (email &&
        (event.organizerEmail === email || event.organiserEmail === email))
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <AlertMessage
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: 6,
          backgroundColor: "#f9fafc",
          minHeight: "100vh",
        }}
      >
        {/* HEADER: Filter menu + Add Event button */}
        <EventsHeader
          onCategoryChange={setSelectedCategory}
          currentUser={currentUser}
        />

        {/* PAGE TITLE */}
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "#1976D2", fontWeight: "bold", mb: 4 }}
        >
          {selectedCategory === "All" ? "Events" : `${selectedCategory} Events`}
        </Typography>

        {/* EVENTS GRID */}
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard
                event={event}
                currentUser={currentUser}
                isOrganizerOf={isOrganizerOf}
                onRegisterClick={() => setOpenRegisterModal(true)}
                onViewParticipants={handleViewParticipants}
              />
            </Grid>
          ))}
        </Grid>

        {/* REGISTER MODAL */}
        <Modal
          open={openRegisterModal}
          onClose={() => setOpenRegisterModal(false)}
        >
          <EventRegisterForm onClose={() => setOpenRegisterModal(false)} />
        </Modal>

        {/* PARTICIPANTS LIST DIALOG */}
        <ParticipantsDialog
          open={participantsDialogOpen}
          loading={participantsLoading}
          participants={participants}
          error={participantsError}
          onClose={closeParticipantsDialog}
          onViewParticipantDetail={handleOpenParticipantDetail}
        />

        {/* PARTICIPANT DETAIL DIALOG */}
        <ParticipantDetailDialog
          open={participantDetailOpen}
          participant={selectedParticipant}
          onClose={closeParticipantDetail}
        />
      </Box>
    </>
  );
}