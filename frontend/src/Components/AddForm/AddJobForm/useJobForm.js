import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendAPI, getAuthHeaders } from "../../middleware.js";

const initialState = {
  title: "", company: "", location: "",
  salary: "", type: "", skill: "",
  availablePosts: "", description: "",
};

export const useJobForm = () => {
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
    const requiredFields = {
      title: "Job Title",
      company: "Company Name",
      location: "Location",
      type: "Job Type",
      skill: "Required Skills",
      availablePosts: "Available Posts",
      description: "Job Description",
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!String(formData[field]).trim()) {
        newErrors[field] = `${label} is required.`;
      }
    });
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
      const response = await axios.post(`${api}/jobs/api/jobs`, formData, {
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        navigate("/jobs", { state: { successMessage: "Job posted successfully!" } });
      }
    } catch (err) {
      console.error("postJob error:", err);
      setServerError(
        err.response?.data?.message || err.response?.data?.error || "An error occurred while posting the job."
      );
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