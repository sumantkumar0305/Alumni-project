import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendAPI, getAuthHeaders } from "../../middleware.js";

export const useInternships = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [internships, setInternships] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    const syncUser = () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserRole(user?.role || null);
        setUserId(user?._id || user?.id || null);
      } catch { setUserRole(null); }
    };
    syncUser();
    window.addEventListener("userUpdated", syncUser);
    return () => window.removeEventListener("userUpdated", syncUser);
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendAPI()}/internship/get/intern/data`, { 
        headers: getAuthHeaders() 
      });
      setInternships(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredData = internships.filter((item) => {
    if (currentFilter === "All") return true;
    return item.skills?.toLowerCase().includes(currentFilter.toLowerCase());
  });

  return { filteredData, userRole, userId, currentFilter, setCurrentFilter, navigate, location };
};