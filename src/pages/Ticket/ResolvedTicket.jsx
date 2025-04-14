import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid from @mui/x-data-grid
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  ReceiptLong as TicketIcon,
  WarningAmber as OverdueIcon,
  AccessTime as AvgTimeIcon,
  CheckCircle as SolvedIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Overall Tickets",
    value: 500,
    icon: <TicketIcon />,
    color: "#4caf50",
  },
  {
    title: "Overdue Tickets",
    value: 100,
    icon: <OverdueIcon />,
    color: "#f44336",
  },
  {
    title: "Avg Response Time",
    value: "25 mins",
    icon: <AvgTimeIcon />,
    color: "#ff9800",
  },
  {
    title: "Solved Tickets",
    value: 400,
    icon: <SolvedIcon />,
    color: "#3f51b5",
  },
];

const ResolvedTicket = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigate();
  const [tickets, setTickets] = useState([
    {
      id: "#TC-192",
      subject: "Unrecognized Charges on My Account",
      priority: "High",
      type: "Incident",
      requestDate: "07/11/2023, 06:25AM",
      status: "Closed",
    },
    {
      id: "#TC-191",
      subject: "Defective Item Received",
      priority: "Low",
      type: "Suggestion",
      requestDate: "06/11/2023, 11:47PM",
      status: "Closed",
    },
    {
      id: "#TC-190",
      subject: "Unable to Access My Account",
      priority: "Medium",
      type: "Problem",
      requestDate: "06/11/2023, 05:31AM",
      status: "Closed",
    },
  ]);

  const columns = [
    { field: "id", headerName: "Ticket ID", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 2 },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor:
              params.value === "High"
                ? "rgba(255, 77, 79, 0.2)" // Light red
                : params.value === "Medium"
                ? "rgba(255, 176, 46, 0.2)" // Light orange
                : "rgba(82, 196, 26, 0.2)", // Light green
            color:
              params.value === "High"
                ? "#FF4D4F"
                : params.value === "Medium"
                ? "#FFB02E"
                : "#52C41A",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        />
      ),
    },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor:
              params.value === "Open"
                ? "rgba(115, 102, 255, 0.2)"
                : params.value === "In Progress"
                ? "rgba(255, 176, 46, 0.2)"
                : "rgba(82, 196, 26, 0.2)",
            color:
              params.value === "Open"
                ? "#7366FF"
                : params.value === "In Progress"
                ? "#FFB02E"
                : "#52C41A",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        />
      ),
    },
  ];

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px", fontFamily: "Poppins" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <TextField
          placeholder="Search tickets..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "300px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
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
          sx={{
            backgroundColor: "#7366FF",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#5A52D6" },
          }}
          onClick={() => navigation("/tickets")}
        >
          All Tickets
        </Button>
      </Box>

      {/* Tickets Table with DataGrid */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredTickets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          disableSelectionOnClick
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            fontFamily: "Poppins",
          }}
        />
      </Box>
    </Box>
  );
};

export default ResolvedTicket;
