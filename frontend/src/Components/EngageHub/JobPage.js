import React, { useState } from "react";
import { Box, Grid, Popover, Typography } from "@mui/material";
import { useJobs } from "./JobPage/useJobs";
import { JobHeader } from "./JobPage/JobHeader";
import { JobCard } from "./JobPage/JobCard";

export default function JobPage() {
  const { filteredJobs, userRole, currentFilter, setCurrentFilter, navigate } = useJobs();
  const [popover, setPopover] = useState({ anchor: null, job: null });

  const handleApply = (job) => {
    navigate(`/apply/job/${job.id || job._id}`, { state: { job } });
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <JobHeader 
        currentFilter={currentFilter} 
        onFilterChange={setCurrentFilter} 
        userRole={userRole} 
        onAddClick={() => navigate("/add/a/new/job")} 
      />

      <Grid container spacing={4} justifyContent="center">
        {filteredJobs.map((job) => (
          <JobCard 
            key={job.id || job._id} 
            job={job} 
            userRole={userRole} 
            onApply={handleApply}
            onMouseEnter={(e, j) => setPopover({ anchor: e.currentTarget, job: j })}
            onMouseLeave={() => setPopover({ anchor: null, job: null })}
          />
        ))}
        {filteredJobs.length === 0 && (
          <Typography sx={{ mt: 4, color: "#777" }}>No jobs found for this category.</Typography>
        )}
      </Grid>

      <Popover
        open={Boolean(popover.anchor)}
        anchorEl={popover.anchor}
        sx={{ pointerEvents: "none" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { p: 2, maxWidth: 300 } }}
      >
        {popover.job && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{popover.job.title}</Typography>
            <Typography variant="body2">Salary: {popover.job.salary}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{popover.job.description}</Typography>
          </Box>
        )}
      </Popover>
    </Box>
  );
}