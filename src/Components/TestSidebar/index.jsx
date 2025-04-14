import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Test Creation", path: "/TCreation" },
  { name: "Question Form", path: "/questionForm" },
  { name: "Questions Page", path: "/questionPage" },
  { name: "Review Page", path: "/questionReview" },
];

const TestSidebar = () => {
  return (
    <Box
      sx={{
        width: "160px",
        background: "#ffffff",
        height: "100vh",
        padding: "20px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        borderRight: "2px solid #e0e0e0",
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              textDecoration: "none",
              color: "#333",
              borderRadius: "8px",
              marginBottom: "10px",
              "&.active": {
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontWeight: "bold",
              },
              "&:hover": {
                backgroundColor: "#e0e7ff",
              },
            }}
          >
              <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
                  {item.name}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TestSidebar;
