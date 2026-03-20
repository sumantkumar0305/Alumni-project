import React from "react";
import { Box, Typography, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const DirectoryHeader = ({ userRole }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
      <Typography variant="h3" sx={{ color: "#0D47A1", fontWeight: "bold" }}>
        Alumni Directory
      </Typography>

      {userRole === "alumni" && (
        <Button
          variant="contained"
          startIcon={<FavoriteIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1.1rem",
            padding: "10px 24px",
            background: "linear-gradient(45deg, #FF6B6B, #FF3D00)",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={() => navigate("/donate")}
        >
          Donate
        </Button>
      )}
    </Box>
  );
};

export default DirectoryHeader;