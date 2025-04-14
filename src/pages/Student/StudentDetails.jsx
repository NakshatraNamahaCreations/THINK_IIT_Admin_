import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(3),
  fontFamily: "'Poppins', sans-serif",
}));

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
  fontFamily: "'Poppins', sans-serif",
});

const StudentDetails = () => {
  const { id } = useParams(); // Get student ID from URL

  // Example data
  const studentInfo = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    number: "1234567890",
    collegeName: "XYZ University",
    class: "12th Grade",
    address: "123, Main Street, City",
    status: "Active",
  };

  const testSeries = [
    { id: 1, name: "Math Test Series", score: "85/100", date: "2023-12-01" },
    { id: 2, name: "Science Test Series", score: "90/100", date: "2023-11-20" },
  ];

  const batches = [
    {
      id: 1,
      batchName: "Batch A - Algebra",
      startDate: "2023-10-01",
      status: "Completed",
    },
    {
      id: 2,
      batchName: "Batch B - Geometry",
      startDate: "2023-11-01",
      status: "Ongoing",
    },
  ];

  const payments = [
    { id: 1, amount: "₹2000", date: "2023-11-01", status: "Paid" },
    { id: 2, amount: "₹1500", date: "2023-10-15", status: "Paid" },
  ];

  return (
    <Box sx={{ padding: 4, fontFamily: "'Poppins', sans-serif" }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{
          marginBottom: 3,
          textTransform: "none",
          fontWeight: "bold",
          color: "#2563eb",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Back to Student List
      </Button>

      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Student Details
      </Typography>

      {/* Student Info Section */}
      <StyledPaper>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Basic Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Name:</strong> {studentInfo.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {studentInfo.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {studentInfo.number}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>College:</strong> {studentInfo.collegeName}
            </Typography>
            <Typography>
              <strong>Class:</strong> {studentInfo.class}
            </Typography>
            <Typography>
              <strong>Address:</strong> {studentInfo.address}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Chip
            label={studentInfo.status}
            color={studentInfo.status === "Active" ? "success" : "default"}
            sx={{
              fontWeight: "bold",
              padding: "5px 10px",
              fontFamily: "'Poppins', sans-serif",
            }}
          />
        </Box>
      </StyledPaper>

      {/* Test Series Section */}
      <StyledPaper>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Test Series
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>SL.No</StyledTableCell>
                <StyledTableCell>Test Name</StyledTableCell>
                <StyledTableCell>Score</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testSeries.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.id}</TableCell>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.score}</TableCell>
                  <TableCell>{test.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      {/* Batches Section */}
      <StyledPaper>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Batches
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl.No</StyledTableCell>
                <StyledTableCell>Batch Name</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>{batch.id}</TableCell>

                  <TableCell>{batch.batchName}</TableCell>
                  <TableCell>{batch.startDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={batch.status}
                      color={batch.status === "Ongoing" ? "warning" : "success"}
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      {/* Payments Section */}
      <StyledPaper>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Payments
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>SL.No</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={payment.status === "Paid" ? "success" : "error"}
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </Box>
  );
};

export default StudentDetails;
