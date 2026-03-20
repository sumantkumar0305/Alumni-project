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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    const required = ["title", "company", "location", "type", "skill", "availablePosts", "description"];
    
    required.forEach(field => {
      if (!String(formData[field]).trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const api = backendAPI();
      const response = await axios.post(`${api}/jobs/api/jobs`, formData, {
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        navigate("/jobs", { state: { successMessage: "Job posted successfully!" } });
      }
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred while posting the job.");
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};