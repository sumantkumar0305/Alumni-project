import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { backendAPI, getAuthHeaders } from "../middleware.js";
import AlumniCard from "./AlumniDirectoryPage/AlumniCard";
import DirectoryHeader from "./AlumniDirectoryPage/DirectoryHeader";

export default function AlumniDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [alumniList, setAlumniList] = useState([]);
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"))?.role || null;
    } catch { return null; }
  });

  // Listen for Role changes
  useEffect(() => {
    const onUserUpdated = () => {
      setUserRole(JSON.parse(localStorage.getItem("user"))?.role || null);
    };
    window.addEventListener("userUpdated", onUserUpdated);
    return () => window.removeEventListener("userUpdated", onUserUpdated);
  }, []);

  // Fetch Alumni
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login", { state: { from: "/alumni-directory" } });
          return;
        }
        const res = await axios.get(`${backendAPI()}/api/alumni`, { headers: getAuthHeaders() });
        if (res.data.success) setAlumniList(res.data.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };
    fetchAlumni();
  }, [navigate]);

  // Filtering Logic
  const filteredAlumni = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return alumniList.filter((a) => 
      [a.username, a.department, a.company].some(field => 
        field?.toLowerCase().includes(query)
      )
    );
  }, [alumniList, searchQuery]);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
      <DirectoryHeader userRole={userRole} />

      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search by name, department, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ maxWidth: 600, backgroundColor: "#fff", borderRadius: 2 }}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((alumni) => (
            <AlumniCard key={alumni._id} alumni={alumni} />
          ))
        ) : (
          <Typography variant="h6" sx={{ color: "#777", mt: 4 }}>
            No results found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}