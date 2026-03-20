import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const FileUploadSection = ({ fileInputRef, formData, preview, onFileChange, onRemoveFile }) => {
  return (
    <Box>
      <Typography sx={{ mb: 1, fontWeight: 500 }}>
        Event Application (PDF or Image) *
      </Typography>
      <Box
        sx={{
          border: "2px dashed #1976D2",
          borderRadius: 3,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: "#1976D2", mb: 1 }} />
        <Typography variant="body1" color="textSecondary">
          {formData.eventFile ? `Selected: ${formData.eventFile.name}` : "Click to upload"}
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf, image/png, image/jpeg"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        {formData.eventFile && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile();
            }}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
      {preview && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Image Preview:</Typography>
          <img 
            src={preview} 
            alt="Event Preview" 
            style={{ width: "100%", maxHeight: "220px", borderRadius: "10px", objectFit: "cover" }} 
          />
        </Box>
      )}
    </Box>
  );
};

export default FileUploadSection;