import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const PaymentReports = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John Doe",
      instituteName: "ABC Institute",
      email: "john@example.com",
      number: "1234567890",
      paymentDate: "2023-06-26",
      plan: "Basic Plan",
      amount: 10000,
    },
    {
      id: 2,
      name: "Yogi",
      instituteName: "Christ Academy",
      email: "yogi@example.com",
      number: "9876543210",
      paymentDate: "2023-07-15",
      plan: "Premium Plan",
      amount: 15000,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Media Query for Mobile Screens
  const isMobile = useMediaQuery("(max-width:600px)");

  // Filtered Rows for Search
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table Columns
  const columns = [
    { field: "id", headerName: "SL", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "instituteName", headerName: "Institute Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "paymentDate", headerName: "Payment Date", flex: 1 },
    { field: "plan", headerName: "Plan", flex: 1 },
    {
      field: "amount",
      headerName: "Amount Rs",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? `Rs${params.value.toLocaleString()}` : "Rs0", // Handle undefined or null amount
    },
  ];

  // Export to CSV
  const handleExport = () => {
    const headers = columns.map((col) => col.headerName).join(",");
    const csvRows = filteredRows.map((row) =>
      columns.map((col) => row[col.field] || "").join(",")
    );
    const csvContent = [headers, ...csvRows].join("\n");

    // Create a Blob for the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "PaymentReports.csv";
    a.click();

    // Revoke the URL to free up resources
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        fontFamily: "Poppins",
        padding: isMobile ? "10px" : "15px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          gap: isMobile ? "10px" : "0",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontFamily: "Poppins",
            color: "#2b3674",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Payment Reports
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search by Name, Institute, Email, or Plan..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: isMobile ? "100%" : 300,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                "&.Mui-focused": {
                  borderColor: "#7366FF",
                  boxShadow: "0px 0px 8px rgba(115, 102, 255, 0.5)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon
                    style={{ width: "20px", height: "20px", color: "#7366FF" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleExport}
            sx={{
              backgroundColor: "#7366FF",
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "#5A52D6" },
            }}
          >
            Export to CSV
          </Button>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <Box
        sx={{
          height: 500,
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={
            isMobile
              ? columns.filter(
                  (col) => col.field !== "email" && col.field !== "number"
                )
              : columns
          }
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            fontFamily: "Poppins",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f1f5f9",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#2b3674",
            },
            "& .MuiDataGrid-row": {
              fontSize: "14px",
              color: "#2b3674",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PaymentReports;
