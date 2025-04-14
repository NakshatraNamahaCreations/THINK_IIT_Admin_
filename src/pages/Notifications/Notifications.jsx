import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

function Notification() {
  const handleClick = () => {
    Swal.fire({
      title: "Successfully Sent",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { field: "id", headerName: "S.No.", width: 100 },
    { field: "from", headerName: "Notification From", width: 200 },
    { field: "notification", headerName: "Notification Title", width: 400 },
    { field: "createdDate", headerName: "Created Date", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      from: "Admin",
      notification: "System Maintenance Notification",
      createdDate: "03/12/2024",
      description: "The system will be down for maintenance on 05/12/2024.",
    },
    {
      id: 2,
      from: "Admin",
      notification: "Class Schedule Update",
      createdDate: "04/12/2024",
      description: "Class timings for Physics have been updated.",
    },
  ]);

  const [notificationData, setNotificationData] = useState({
    title: "",
    campaignTitle: "",
    category: "",
    description: "",
  });

  const handleInputChange = (field, value) => {
    setNotificationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newNotification = {
      id: rows.length + 1,
      from: "Admin",
      notification: notificationData.title,
      createdDate: new Date().toLocaleDateString(),
      description: notificationData.description,
    };
    setRows([...rows, newNotification]);
    setNotificationData({
      title: "",
      campaignTitle: "",
      category: "",
      description: "",
    });
    handleClick();
    handleClose();
  };

  const style = {
    position: "absolute",
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder="Search..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <span style={{ color: "#aaa" }}>🔍</span>,
              }}
              sx={{ width: 300 }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ backgroundColor: "#7366FF" }}
          >
            Create Notification
          </Button>
        </Box>
        <DataGrid rows={rows} columns={columns} autoHeight />
      </Box>

      {/* Create Notification Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Create Notification
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel control={<Checkbox />} label="Push Notification" />
            <FormControlLabel control={<Checkbox />} label="E-mail" />
            <FormControlLabel control={<Checkbox />} label="SMS" />
          </Box>

         

          <TextField
            fullWidth
            label="Notification Title"
            variant="outlined"
            size="small"
            sx={{ marginBottom: 2 }}
            value={notificationData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />

        

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
            value={notificationData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, backgroundColor: "#7366FF" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Notification;
