import React from "react";
import { Grid, Card, CardContent, Avatar, Typography, Box, Button } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const AlumniCard = ({ alumni }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{
      borderRadius: 3, textAlign: "center", transition: "0.3s",
      "&:hover": { transform: "translateY(-8px)", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }
    }}>
      <CardContent>
        <Avatar
          src={alumni.avatar}
          sx={{ width: 80, height: 80, mx: "auto", mb: 2, border: "3px solid #0D47A1" }}
        >
          {alumni.username?.charAt(0)}
        </Avatar>

        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {alumni.username}
        </Typography>
        <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
          {alumni.department || "General"} • Class of {alumni.graduationYear || "N/A"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2, color: "#555" }}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <WorkOutlineIcon fontSize="small" />
            <Typography variant="body2">{alumni.jobRole || "Alumni"}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <BusinessCenterIcon fontSize="small" />
            <Typography variant="body2">{alumni.company || "N/A"}</Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<LinkedInIcon />}
          href={alumni.linkedIn}
          target="_blank"
          disabled={!alumni.linkedIn}
          sx={{ backgroundColor: "#0A66C2", textTransform: "none" }}
        >
          Connect
        </Button>
      </CardContent>
    </Card>
  </Grid>
);

export default AlumniCard;