import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box, Divider } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const JobCard = ({ job, userRole, onApply, onMouseEnter, onMouseLeave }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{
      borderRadius: 3, 
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
      height: "100%", 
      display: "flex", 
      flexDirection: "column",
      transition: "0.3s", 
      "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }
    }}>
      <CardContent sx={{ textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#333", mb: 0.5 }}>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#1976D2", mb: 1, fontWeight: 500 }}>
          {job.company}
        </Typography>
        
        <Divider sx={{ my: 1.5, width: "80%", mx: "auto" }} />

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, color: "#666" }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">{job.location}</Typography>
          </Box>
          
          {/* ✅ Salary Field Added Here */}
          <Box 
            sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                gap: 0.5, 
                mt: 0.5, 
                color: "#2E7D32", 
                fontWeight: "bold" 
            }}
            >
                {/* Replaced AttachMoneyIcon with CurrencyRupeeIcon */}
                <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} /> 
                <Typography variant="body2">
                    {job.salary ? job.salary : "Negotiable"}
                </Typography>
            </Box>
        </Box>

        <Typography 
          variant="caption" 
          sx={{ 
            display: "inline-block",
            bgcolor: job.type === "Full-Time" ? "#E8F5E9" : "#FFF3E0", 
            color: job.type === "Full-Time" ? "#2E7D32" : "#E65100",
            px: 1.5, py: 0.5, borderRadius: 1, fontWeight: "bold", mb: 2, alignSelf: "center"
          }}
        >
          {job.type} — {job.skill}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          {userRole === "student" && (
            <Button 
              variant="contained" 
              fullWidth
              sx={{ 
                bgcolor: "#FF6F00", 
                "&:hover": { bgcolor: "#E65100" },
                textTransform: "none",
                fontWeight: "bold"
              }}
              onClick={() => onApply(job)}
              onMouseEnter={(e) => onMouseEnter(e, job)}
              onMouseLeave={onMouseLeave}
            >
              Apply Now
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  </Grid>
);