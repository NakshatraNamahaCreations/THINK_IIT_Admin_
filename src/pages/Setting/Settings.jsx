import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

function Profile() {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const handleChangePasswordOpen = () => {
    setChangePasswordOpen(true);
  };

  const handleChangePasswordClose = () => {
    setChangePasswordOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePasswordSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Add logic to handle password change
    alert("Password changed successfully!");
    handleChangePasswordClose();
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Profile Header */}
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Natashia Khaleira"
              src="https://via.placeholder.com/100"
              sx={{
                width: 100,
                height: 100,
                marginRight: "20px",
                border: "2px solid #e0e0e0",
              }}
            />
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Natashia Khaleira
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Admin
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Leeds, United Kingdom
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              marginTop: { xs: "10px", md: "0" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePasswordOpen}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Change Password
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Personal Information Section */}
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Personal Information
          </Typography>
          <IconButton
            color="warning"
            sx={{
              backgroundColor: "#ffecb3",
              borderRadius: "8px",
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Divider sx={{ marginY: "10px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>First Name:</strong> Natashia
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Last Name:</strong> Khaleira
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Date of Birth:</strong> 12-10-1990
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Email Address:</strong> info@binary-fusion.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Phone Number:</strong> (+62) 821 2554 5846
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>User Role:</strong> Admin
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Address Section */}
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Address
          </Typography>
          <IconButton
            color="warning"
            sx={{
              backgroundColor: "#ffecb3",
              borderRadius: "8px",
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Divider sx={{ marginY: "10px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Country:</strong> United Kingdom
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>City:</strong> Leeds, East London
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Postal Code:</strong> ERT 1254
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onClose={handleChangePasswordClose}>
        <DialogTitle
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
        >
          Change Password
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="dense"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="dense"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePasswordClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePasswordSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;
