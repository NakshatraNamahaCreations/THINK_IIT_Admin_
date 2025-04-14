import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";

import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../../services/config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const handleForget = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.warning("Please fill fields");
    }
    try {
      const response = await axios.post(
        `${config.INSTITUTE_BASE_URL}admin/forgot-password`,
        { email }
      );
      if (response.data.success) {
        toast.success("Password reset link sent to your email");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
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

          {/* Forgot Password Form */}
          <Typography
            variant="h4"
            sx={{
              marginBottom: "30px",
              color: "#f0f0f0",
              textAlign: "center",
            }}
          >
            Forgot Password
          </Typography>
          <Box component="form" sx={{ width: "100%", maxWidth: "400px" }}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#fff",
                color: "#7366FF",
                padding: "10px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#e6e6e6",
                },
              }}
              onClick={handleForget}
            >
              Submit
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

export default SignIn;
