import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import { globalColor } from "../../styles/colors";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { config } from "../../services/config";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [newPassword, setnewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmpassword) {
      return toast.warning("Please fill in all fields");
    }
    if (newPassword !== confirmpassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const response = await axios.post(
        `${config.INSTITUTE_BASE_URL}admin/reset-password/${token}`,
        { newPassword }
      );
      if (response.status === 200) {
        toast.success("Password reset successful. Please login.");
        navigate("/");
      }
    } catch (err) {
      toast.error("An error occurred during password reset. Please try again.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid container sx={{ height: "100vh" }}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            background: "linear-gradient(to top right, #7366FF, #5A52D6)",
            color: "#fff",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 4,
              color: "#fff",
              fontFamily: "Poppins",
            }}
          >
            ABC Institute
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "30px",
              color: "#f0f0f0",
              textAlign: "center",
            }}
          >
            Set new password for your account
          </Typography>

          {/* Sign-In Form */}
          <Box component="form" sx={{ width: "100%", maxWidth: "400px" }}>
            <TextField
              label="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: "#fff",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              label="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: "#fff",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#f0f0f0",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                Show
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#fff",
                color: globalColor.mainColor,
                padding: "10px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#e6e6e6",
                },
              }}
              onClick={handleResetPassword}
            >
              Create Password
            </Button>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/female-speaker-giving-presentation-hall-university-workshop-audience-conference-hall_155003-27432.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </Box>
  );
};

export default NewPassword;
