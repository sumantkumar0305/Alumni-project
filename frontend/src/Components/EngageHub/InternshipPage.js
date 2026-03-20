import React, { useState } from "react";
import { Box, Grid, Popover, Typography } from "@mui/material";
import { useInternships } from "./InternshipPage/useInternships";
import { InternshipHeader } from "./InternshipPage/InternshipHeader";
import { InternshipCard } from "./InternshipPage/InternshipCard";

export default function InternshipsPage() {
  const { filteredData, userRole, userId, currentFilter, setCurrentFilter, navigate } = useInternships();
  const [popover, setPopover] = useState({ anchor: null, data: null });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <InternshipHeader 
        currentFilter={currentFilter} 
        onFilterChange={setCurrentFilter} 
        userRole={userRole} 
        onAdd={() => navigate("/add-Internship")} 
      />

      <Grid container spacing={4}>
        {filteredData.map((item) => (
          <InternshipCard 
            key={item._id} 
            internship={item} 
            userRole={userRole} 
            userId={userId} 
            navigate={navigate}
            onOpenDetails={(e, data) => setPopover({ anchor: e.currentTarget, data })}
          />
        ))}
      </Grid>

      <Popover
        open={Boolean(popover.anchor)}
        anchorEl={popover.anchor}
        onClose={() => setPopover({ anchor: null, data: null })}
        sx={{ pointerEvents: "none" }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography fontWeight="bold">{popover.data?.title}</Typography>
          <Typography variant="body2">{popover.data?.description}</Typography>
        </Box>
      </Popover>
    </Box>
  );
}