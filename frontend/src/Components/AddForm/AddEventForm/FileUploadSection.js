import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const FileUploadSection = ({ fileInputRef, formData, preview, onFileChange, onRemoveFile }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      // Reset input so same file can be re-selected after error
      e.target.value = "";
      // Pass null to signal invalid file — parent will show inline error
      onFileChange(null, `"${file.name}" is not allowed. Please upload a PNG, JPG, JPEG, or WEBP image.`);
      return;
    }

    onFileChange(file, null);
  };

  return (
    <Box>
      <Typography sx={{ mb: 1, fontWeight: 500 }}>
        Event Image (PNG, JPG, JPEG, WEBP) *
      </Typography>

      <Box
        sx={{
          border: "2px dashed",
          borderColor: formData.fileError ? "#d32f2f" : "#1976D2",
          borderRadius: 3,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          transition: "border-color 0.2s ease",
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <CloudUploadIcon
          sx={{ fontSize: 40, color: formData.fileError ? "#d32f2f" : "#1976D2", mb: 1 }}
        />
        <Typography variant="body1" color="textSecondary">
          {formData.eventFile
            ? `Selected: ${formData.eventFile.name}`
            : "Click to upload image"}
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 0.5 }}>
          Supported formats: PNG, JPG, JPEG, WEBP
        </Typography>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
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

      {/* INLINE ERROR — shows right below the upload box */}
      {formData.fileError && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            mt: 1,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            backgroundColor: "#fff5f5",
            border: "1px solid #fecaca",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: "1rem", color: "#d32f2f", flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: "#d32f2f", fontSize: "0.82rem" }}>
            {formData.fileError}
          </Typography>
        </Box>
      )}

      {/* IMAGE PREVIEW */}
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