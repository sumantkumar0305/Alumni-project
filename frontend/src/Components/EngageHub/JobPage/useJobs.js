import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendAPI, getAuthHeaders } from "../../middleware";

export const useJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [userRole, setUserRole] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"))?.role || null;
    } catch { return null; }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        setUserRole(JSON.parse(localStorage.getItem("user"))?.role || null);
      } catch { setUserRole(null); }
    };
    window.addEventListener("userUpdated", syncUser);
    return () => window.removeEventListener("userUpdated", syncUser);
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { state: { from: "/jobs" } });
        return;
      }
      const res = await axios.get(`${backendAPI()}/jobs/get/job/data`, { headers: getAuthHeaders() });
      setJobs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const filteredJobs = jobs.filter((job) => 
    currentFilter === "All" ? true : job.skill === currentFilter
  );

  return { filteredJobs, userRole, currentFilter, setCurrentFilter, navigate };
};