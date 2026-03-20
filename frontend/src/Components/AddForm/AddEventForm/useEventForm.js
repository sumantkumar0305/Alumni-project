import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { backendAPI, getAuthHeaders } from "../middleware.js";4
import { backendAPI, getAuthHeaders } from "../../middleware.js";

export const useEventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "", description: "", date: "", location: "",
    maxAttendees: "", organization: "", category: "",
    visibility: "", eventFile: null,
  });
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, eventFile: file }));
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) dataToSend.append(key, value);
    });

    try {
      const api = backendAPI();
      await axios.post(`${api}/event/save/event/data`, dataToSend, { headers: getAuthHeaders() });
      navigate("/events", { state: { message: "Event created successfully!", type: "success" } });
    } catch (err) {
      setNotification({ message: err.response?.data?.error || "Error occurred", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { 
    formData, setFormData, notification, setNotification, 
    loading, initialLoading, preview, setPreview, 
    handleChange, handleFileChange, handleSubmit 
  };
};