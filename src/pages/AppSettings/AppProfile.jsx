import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { AddPhotoAlternate, Edit, Close } from "@mui/icons-material";

const AppProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appName, setAppName] = useState("");
  const [iconFile, setIconFile] = useState(null);

  const handleFileUpload = (e) => {
    setIconFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (appName && iconFile) {
      alert(`App Name: ${appName}, Icon: ${iconFile.name}`);
    } else {
      alert("Please fill out all fields!");
    }
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          App Profile
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Avatar
            src={iconFile ? URL.createObjectURL(iconFile) : ""}
            alt="App Icon"
            sx={{
              width: 100,
              height: 100,
              backgroundColor: "#f3f4f6",
              fontSize: "36px",
              color: "#9ca3af",
            }}
          >
            {iconFile ? "" : "A"}
          </Avatar>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              color: "#1f2937",
            }}
          >
            {appName || "No App Name Set"}
          </Typography>

          <Tooltip title="Edit Profile">
            <IconButton
              onClick={() => setIsModalOpen(true)}
              sx={{
                color: "#2563eb",
                "&:hover": { backgroundColor: "#e0e7ff" },
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Modal for Adding App Details */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "400px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                color: "#2563eb",
              }}
            >
              Update App Details
            </Typography>
            <IconButton
              onClick={() => setIsModalOpen(false)}
              sx={{
                color: "#9ca3af",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <TextField
            label="App Name"
            variant="outlined"
            fullWidth
            size="small"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              textTransform: "none",
              marginBottom: "15px",
              color: "#2563eb",
              borderColor: "#2563eb",
              "&:hover": { borderColor: "#1e40af", backgroundColor: "#f1f5f9" },
            }}
            startIcon={<AddPhotoAlternate />}
          >
            Upload Icon
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2563eb",
                color: "white",
                textTransform: "none",
                fontWeight: "500",
                "&:hover": { backgroundColor: "#1e40af" },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: "500",
                borderColor: "#ef4444",
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "#fee2e2",
                  borderColor: "#b91c1c",
                },
              }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AppProfile;
