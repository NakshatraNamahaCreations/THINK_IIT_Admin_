import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const Wallet = () => {
  const [balance, setBalance] = useState(5704563); // Initial wallet balance
  const [history] = useState([
    {
      id: 1,
      plan: "JEE Advanced - One Year",
      amount: "Rs. 25,000",
      date: "03/10/2024",
    },
    {
      id: 2,
      plan: "NEET Crash Course",
      amount: "Rs. 15,000",
      date: "10/01/2025",
    },
    {
      id: 3,
      plan: "CBSE Class 12 - Full Year",
      amount: "Rs. 30,000",
      date: "15/07/2024",
    },
    {
      id: 4,
      plan: "IIT Foundation Course (Class 10)",
      amount: "Rs. 18,000",
      date: "05/03/2024",
    },
    {
      id: 5,
      plan: "JEE Mains - Online Course",
      amount: "Rs. 12,000",
      date: "01/12/2024",
    },
  ]);

  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* Header and Wallet Info */}
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#6b7280",
                textTransform: "uppercase",
              }}
            >
              Wallet Balance
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#1f2937",
                marginTop: "10px",
              }}
            >
              Rs. {balance.toLocaleString()}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2563eb",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "8px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#1e3a8a",
                },
              }}
            >
              Recharge Wallet
            </Button>
          </Card>
        </Grid>

        {/* Search Bar */}
        <Grid item xs={12} sm={6}></Grid>
      </Grid>

      {/* Transaction History */}

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#374151",
          marginBottom: "20px",
        }}
      >
        Transaction History
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                S.No.
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                Subscriptions Plan
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                Payment Amount
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                Payment Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.plan}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Wallet;
