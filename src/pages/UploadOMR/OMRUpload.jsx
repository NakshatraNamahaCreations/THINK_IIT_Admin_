import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DataGrid } from "@mui/x-data-grid";

const OMRUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store uploaded files

  const allowedFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Unsupported file type. Please upload a valid OMR file.");
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    // Simulate file upload process
    setTimeout(() => {
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        {
          id: prevFiles.length + 1,
          name: selectedFile.name,
          type: selectedFile.type,
          date: new Date().toLocaleString(),
        },
      ]);
      setSuccessMessage(`File "${selectedFile.name}" uploaded successfully.`);
      setSelectedFile(null); // Reset file
      setError("");
    }, 1000);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "File Name", flex: 1 },
    { field: "type", headerName: "File Type", flex: 1 },
    { field: "date", headerName: "Upload Date", flex: 1 },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        marginTop: "30px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}
      >
        OMR File Upload
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: ".csv, .xls, .xlsx, .pdf, .jpg, .png" }}
            onChange={handleFileChange}
            helperText="Supported file types: .csv, .xls, .xlsx, .pdf, .jpg, .png"
          />
        </Grid>

        {selectedFile && (
          <Grid item xs={12}>
            <Typography variant="body1" color="primary">
              Selected File: {selectedFile.name}
            </Typography>
          </Grid>
        )}

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {successMessage && (
          <Grid item xs={12}>
            <Alert severity="success">{successMessage}</Alert>
          </Grid>
        )}

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
          >
            Upload File
          </Button>
        </Grid>
      </Grid>

      {uploadedFiles.length > 0 && (
        <Box mt={4}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}
          >
            Uploaded Files
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={uploadedFiles}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OMRUpload;
