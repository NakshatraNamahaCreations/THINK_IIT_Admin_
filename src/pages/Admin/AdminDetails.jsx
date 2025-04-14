import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Avatar,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { config } from "../../services/config";

const AdminDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [rights, setrights] = useState({});

  useEffect(() => {
    getAdminDetails();
  }, []);
  const getAdminDetails = async () => {
    try {
      const response = await axios.get(
        `${config.INSTITUTE_BASE_URL}${config.DETAILS}/${id}`
      );
      const admin = response?.data?.data;

      if (!admin) {
        console.log("Admin not found");
        return;
      }
      const formattedAdmin = {
        ...admin,
        id: admin._id,
        createdAt: moment(admin.createdAt).format("DD/MM/YYYY"),
      };
      setData(formattedAdmin);
      setrights(admin.rights || {});
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },

    { id: "admin", label: "Admin" },
    { id: "teacher", label: "Teacher" },
    { id: "student", label: "Students" },
    { id: "questionManagement", label: "Question-Managment" },

    { id: "batchManagement", label: "Batch-Managment" },
    { id: "testManagement", label: "Test-Managment" },

    { id: "doubtManagement", label: "Doubt-Managment" },
    { id: "marketing", label: "Marketing" },
    { id: "coupons", label: "Coupons" },
    { id: "wallets", label: "Wallet" },
    { id: "tickets", label: "Tickets" },
    { id: "omr", label: "OMR Upload" },
    { id: "notifications", label: "Notifications" },
    { id: "appsetting", label: "App Settings" },
    { id: "payments", label: "Payments" },
    { id: "analytics", label: "Analytics" },
  ];

  const StyledButton = styled(Button)(() => ({
    fontFamily: "Poppins",
    backgroundColor: "#7366FF",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#5A52D6",
    },
  }));
  const handleRoleChange = (roleId) => {
    setrights((prevRoles) => ({
      ...prevRoles,
      [roleId]: !prevRoles[roleId], // Toggle role status
    }));
  };

  const updateRoles = async () => {
    try {
      const res = await axios.put(
        `${config.INSTITUTE_BASE_URL}admin/${id}/assign-role`,
        { rights: rights }
      );
      if (res.status === 200) {
        toast.success("Roles updated successfully!");
      }
    } catch (error) {
      console.error("Error updating rights:", error);
      toast.error("Failed to update rights. Please try again.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 2,
          padding: 2,
        }}
      >
        <StyledButton onClick={() => navigate("/admin")}>
          Admin List
        </StyledButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 4,

          padding: 3,
          fontFamily: "'Poppins', sans-serif",
          borderRadius: 2,
          // boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          marginTop: 3,
        }}
      >
        {/* Left Side: Admin Details */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#2196F3",
                width: 64,
                height: 64,
                marginRight: 2,
              }}
            >
              {data?.adminName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {data?.adminName}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Email:
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {data?.email}
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Contact Number:
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {data?.phoneNumber}
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Created Date:
          </Typography>
          <Typography variant="body2">{data?.createdAt}</Typography>
        </Box>

        {/* Right Side: Assign Roles */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Assign Roles
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <ul style={{ listStyle: "none", padding: 0 }}>
              {menuItems.map((item) => (
                <li key={item.id} style={{ padding: "4px 0" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!rights[item.id]}
                        onChange={() => handleRoleChange(item.id)}
                        color="primary"
                      />
                    }
                    label={item.label}
                  />
                </li>
              ))}
            </ul>
          </Box>
          <StyledButton
            sx={{
              marginTop: 3,
            }}
            onClick={updateRoles}
          >
            Save Changes
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDetails;
