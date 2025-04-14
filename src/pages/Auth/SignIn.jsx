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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { config } from "../../services/config";
import authService from "../../services/authServices";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warning("Please fill in all fields");
    }
    if (!rememberMe) {
      return toast.warning("Please check the Remember Me option");
    }

    try {
      const data = { email, password };

      const res = await authService.adminLogin(data);

      if (res && res.success) {
        toast.success(res.message);
        navigate("/dashboard");
      } else {
        toast.error(res?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
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
            color: "#fff", // Text color for contrast
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 4,
              color: "#fff", // Logo text color
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
            Sign in to your admin panel.
          </Typography>

          {/* Sign-In Form */}
          <Box component="form" sx={{ width: "100%", maxWidth: "400px" }}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              size="small"
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
            <TextField
              label="Password"
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": { color: "#fff" },
                    }}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />
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
              onClick={handleLogin}
            >
              Login
            </Button>

            {/* Links */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                color: "#fff",
              }}
            >
              <Link
                href="#"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              ></Link>
              <Link
                href="/signup"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Link>
            </Box>
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
