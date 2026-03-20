import { useState } from "react";
import axios from "axios";
import { backendAPI } from "../../../middleware.js";
import { getAuthHeaders } from "./useEvents.js";

export function useParticipants() {
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [participantsError, setParticipantsError] = useState(null);

  const [participantDetailOpen, setParticipantDetailOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const api = backendAPI();

  const handleViewParticipants = async (eventId) => {
    try {
      setParticipants([]);
      setParticipantsError(null);
      setParticipantsLoading(true);
      setParticipantsDialogOpen(true);

      const res = await axios.get(`${api}/api/events/${eventId}/participants`, {
        headers: getAuthHeaders(),
      });

      const data = res?.data?.participants ?? res?.data?.data ?? res?.data ?? [];
      setParticipants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch participants:", err);
      setParticipantsError(
        "Failed to load participants. Try again or check permissions."
      );
    } finally {
      setParticipantsLoading(false);
    }
  };

  const closeParticipantsDialog = () => {
    setParticipantsDialogOpen(false);
    setParticipants([]);
    setParticipantsError(null);
  };

  const handleOpenParticipantDetail = (participant) => {
    setSelectedParticipant(participant);
    setParticipantDetailOpen(true);
  };

  const closeParticipantDetail = () => {
    setParticipantDetailOpen(false);
    setSelectedParticipant(null);
  };

  return {
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
  };
}