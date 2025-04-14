import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { ArrowDropDown, Notifications } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);
  const navigate = useNavigate();

  // User Menu Handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Notification Menu Handlers
  const handleNotificationOpen = (event) => {
    setNotificationEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationEl(null);
  };

  const [admin, setAdmin] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setAdmin(parsedUser);
      } catch (error) {
        toast.warning("Error parsing Admin data");
      }
    } else {
      console.log("No user data found in localStorage.");
      toast.error("No user data found in localStorage.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    toast.success("User logged out successfully");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 20px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Logo */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#2563eb", fontSize: "22px" }}
      ></Typography>

      {/* Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Notification Icon */}
        <IconButton
          sx={{
            color: "#2563eb",
          }}
          onClick={handleNotificationOpen}
        >
          <Badge badgeContent={3} color="error">
            <Notifications color="grey" />
          </Badge>
        </IconButton>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationEl}
          open={Boolean(notificationEl)}
          onClose={handleNotificationClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 250,
              borderRadius: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        >
          <MenuItem sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Notifications
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNotificationClose();
              navigate("/tickets"); // Navigate to Tickets page
            }}
            sx={{ fontSize: "14px" }}
          >
            New user ticket
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNotificationClose();
              navigate("/tickets"); // Navigate to Tickets page
            }}
            sx={{ fontSize: "14px" }}
          >
            New ticket assigned
          </MenuItem>
        </Menu>

        {/* User Avatar and Dropdown */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleMenuOpen}
        >
          <Avatar
            alt="User"
            src="https://i.pravatar.cc/150?img=7"
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ ml: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                color: "#1e293b",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {admin?.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <ArrowDropDown sx={{ color: "#64748b", fontSize: "20px" }} />
            </Box>
          </Box>
        </Box>

        {/* User Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 150,
              borderRadius: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        >
          {/* <MenuItem onClick={handleMenuClose} sx={{ fontSize: "14px" }}>
            Account
          </MenuItem> */}
          <MenuItem
            sx={{ fontSize: "14px" }}
            onClick={() => {
              handleMenuClose();
              navigate("/settings"); // Navigate to Login page on Logout
            }}
          >
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ fontSize: "14px" }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
