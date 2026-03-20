import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendAPI } from "../../../middleware.js";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const api = backendAPI();

  const findEventData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { state: { from: "/events" } });
        return;
      }
      const res = await axios.get(`${api}/event/api/get/event`, {
        headers: getAuthHeaders(),
      });
      setEvents(res.data.data || []);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const res = await axios.get(`${api}/api/me`, {
        headers: getAuthHeaders(),
      });
      if (res?.data?.success && res.data.user) {
        setCurrentUser(res.data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      try {
        const stored = localStorage.getItem("user");
        if (stored) setCurrentUser(JSON.parse(stored));
      } catch (e) {
        setCurrentUser(null);
      }
    }
  };

  useEffect(() => {
    loadCurrentUser();
    findEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { events, loading, error, currentUser };
}