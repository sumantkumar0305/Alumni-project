import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box, Divider } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";

export const InternshipCard = ({ internship, userRole, userId, onOpenDetails, navigate }) => {
  const isOwner = userRole === "alumni" && internship.createdBy === userId;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{
        borderRadius: 3, 
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s", 
        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
      }}>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
            {internship.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#43A047", fontWeight: 500, mb: 1 }}>
            {internship.company}
          </Typography>

          <Divider sx={{ my: 1.5, width: "80%", mx: "auto" }} />

          <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, color: "#666" }}>
              <ScheduleIcon sx={{ fontSize: "1rem" }} />
              <Typography variant="body2">Duration: {internship.duration}</Typography>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, color: "#666" }}>
              <LocationOnIcon sx={{ fontSize: "1rem" }} />
              <Typography variant="body2">{internship.location}</Typography>
            </Box>

            {/* ✅ Stipend Field with Rupee Icon */}
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              gap: 0.5, 
              mt: 0.5, 
              color: "#2E7D32", 
              fontWeight: "bold" 
            }}>
              <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
              <Typography variant="body2">
                {internship.stipend ? internship.stipend : "Unpaid / Negotiable"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: "auto" }}>
            {userRole === "student" && (
              <Button
                variant="contained" 
                fullWidth 
                sx={{ bgcolor: "#43A047", "&:hover": { bgcolor: "#388E3C" }, fontWeight: "bold", textTransform: "none" }}
                onClick={() => navigate(`/apply/${internship._id}`)}
                onMouseEnter={(e) => onOpenDetails(e, internship)}
              >
                Apply Now
              </Button>
            )}

            {isOwner && (
              <Button
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2, fontWeight: "bold", textTransform: "none" }}
                onClick={() => navigate(`/internship/${internship._id}/participants`)}
                onMouseEnter={(e) => onOpenDetails(e, internship)}
              >
                View Participants
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};