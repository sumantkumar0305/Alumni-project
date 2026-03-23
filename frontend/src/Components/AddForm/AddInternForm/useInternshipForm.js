import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendAPI, getAuthHeaders } from "../../middleware.js";

const initialState = {
  title: "", company: "", description: "",
  skills: "", location: "", stipend: "", duration: "",
};

export const useInternshipForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (serverError) setServerError(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Internship title is required.";
    if (!formData.company.trim()) newErrors.company = "Company name is required.";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required.";
    if (!formData.description.trim()) newErrors.description = "Job description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      const api = backendAPI();
      const response = await axios.post(`${api}/internship/api/internships`, formData, {
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        navigate("/internships", { state: { successMessage: "Internship posted successfully!" } });
      }
    } catch (err) {
      console.error("postInternship error:", err);
      setServerError(err.response?.data?.message || err.response?.data?.error || "Failed to post internship. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
    setErrors({});
    setServerError(null);
  };

  return { formData, errors, serverError, loading, handleChange, handleSubmit, handleCancel };
};