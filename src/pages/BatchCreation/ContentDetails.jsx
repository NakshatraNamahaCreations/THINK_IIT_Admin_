import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Link as MuiLink,
  List,
  ListItem,
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

const ContentDetails = () => {
  const { id } = useParams(); // Get batch ID from URL

  // Example Batch Data with multiple entries
  const contentDetails = {
    batchName: "Batch A - Algebra",
    videos: [
      { title: "Algebra Basics", url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
      { title: "Advanced Algebra", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ],
    assignments: [
      { title: "Assignment 1", url: "https://example.com/algebra-assignment1.pdf" },
      { title: "Assignment 2", url: "https://example.com/algebra-assignment2.pdf" },
    ],
    tests: [
      { title: "Test 1", url: "https://example.com/algebra-test1.pdf" },
      { title: "Test 2", url: "https://example.com/algebra-test2.pdf" },
    ],
    ebooks: [
      { title: "Algebra Guide", url: "https://example.com/algebra-ebook1.pdf" },
      { title: "Advanced Algebra", url: "https://example.com/algebra-ebook2.pdf" },
    ],
    description:
      "This batch focuses on advanced algebra topics for Class 12 students, preparing them for competitive exams and school finals.",
    status: "Active",
  };

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
        Back to Content List
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
        Content Details
      </Typography>

      {/* Content Details Section */}
      <StyledPaper>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Batch Information
        </Typography>
        <Typography mt={2}>
          <strong>Batch Name:</strong> {contentDetails.batchName}
        </Typography>
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Videos
          </Typography>
          <List>
            {contentDetails.videos.map((video, index) => (
              <ListItem key={index}>
                <MuiLink
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {video.title}
                </MuiLink>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Assignments
          </Typography>
          <List>
            {contentDetails.assignments.map((assignment, index) => (
              <ListItem key={index}>
                <MuiLink
                  href={assignment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {assignment.title}
                </MuiLink>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Tests
          </Typography>
          <List>
            {contentDetails.tests.map((test, index) => (
              <ListItem key={index}>
                <MuiLink
                  href={test.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {test.title}
                </MuiLink>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            eBooks
          </Typography>
          <List>
            {contentDetails.ebooks.map((ebook, index) => (
              <ListItem key={index}>
                <MuiLink
                  href={ebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {ebook.title}
                </MuiLink>
              </ListItem>
            ))}
          </List>
        </Box>

       
        <Box mt={2}>
          <Typography>
            <strong>Status:</strong>{" "}
            <span
              style={{
                fontWeight: "bold",
                color: contentDetails.status === "Active" ? "green" : "red",
              }}
            >
              {contentDetails.status}
            </span>
          </Typography>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default ContentDetails;
