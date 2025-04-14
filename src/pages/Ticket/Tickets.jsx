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
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ReceiptLong as TicketIcon,
  WarningAmber as OverdueIcon,
  AccessTime as AvgTimeIcon,
  CheckCircle as SolvedIcon,
} from "@mui/icons-material";

const Tickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticketid: "#TC-192",
      subject: "Unrecognized Charges on My Account",
      priority: "High",
      type: "Incident",
      requestDate: "07/11/2023, 06:25AM",
      status: "Open",
      assignedTo: "John Admin",
      resolution: null,
    },
    {
      id: 2,
      ticketid: "#TC-191",
      subject: "Defective Item Received",
      priority: "Low",
      type: "Suggestion",
      requestDate: "06/11/2023, 11:47PM",
      status: "In Progress",
      assignedTo: "Yogi Admin",
      resolution: null,
    },
  ]);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentTicketId, setCurrentTicketId] = useState(null);

  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
  const [resolutionComment, setResolutionComment] = useState("");
  const [resolutionVideo, setResolutionVideo] = useState(null);

  const handleMenuOpen = (event, ticketId) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentTicketId(ticketId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentTicketId(null);
  };

  const handleResolveClick = (ticketId) => {
    setCurrentTicketId(ticketId);
    setIsResolveDialogOpen(true);
  };

  const handleResolveSubmit = () => {
    const resolvedTicket = tickets.find(
      (ticket) => ticket.id === currentTicketId
    );

    // Update the ticket with resolution comment and video URL
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === currentTicketId
        ? {
            ...ticket,
            status: "Resolved",
            resolution: {
              comment: resolutionComment,
              video: resolutionVideo
                ? URL.createObjectURL(resolutionVideo)
                : null,
            },
          }
        : ticket
    );

    setTickets(updatedTickets);

    // Reset dialog state
    setResolutionComment("");
    setResolutionVideo(null);
    setIsResolveDialogOpen(false);
  };

  const columns = [
    { field: "id", headerName: "Sl.no", flex: 0.5 },
    { field: "ticketid", headerName: "Ticket ID", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 2 },
    { field: "priority", headerName: "Priority", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1.5 },
    { field: "assignedTo", headerName: "Assigned To", flex: 1 },
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "#21BA45",
              "&:hover": { backgroundColor: "#1D9941" },
            }}
            onClick={() => handleResolveClick(params.row.id)}
          >
            Resolve
          </Button>
        </Box>
      ),
    },
  ];

  const filteredTickets = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <Box sx={{ padding: "20px", fontFamily: "Poppins" }}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                backgroundColor: "#f9f9f9",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: stat.color,
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#888" }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#4a4a4a",
                    marginTop: "5px",
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TextField
        placeholder="Search tickets..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "300px",
          marginBottom: "20px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
            marginTop: "30px",
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

      {/* Resolve Dialog */}
      <Dialog
        open={isResolveDialogOpen}
        onClose={() => setIsResolveDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Resolve Ticket</DialogTitle>
        <DialogContent>
          <TextField
            label="Resolution Comment"
            fullWidth
            multiline
            rows={3}
            value={resolutionComment}
            onChange={(e) => setResolutionComment(e.target.value)}
            margin="normal"
          />
          <Typography variant="body2" sx={{ marginBottom: "10px" }}>
            Upload a resolution video (optional)
          </Typography>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setResolutionVideo(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsResolveDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleResolveSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#21BA45",
              "&:hover": { backgroundColor: "#1D9941" },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tickets;
