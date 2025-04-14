import React, { useState } from "react";
import { Box, Typography, Button, TextField, Drawer } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; // Correct import for DataGrid
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What is your refund policy?",
      answer: "Our refund policy allows refunds within 30 days of purchase.",
      createdAt: "2023-06-26",
    },
    {
      id: 2,
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking 'Forgot Password' on the login page.",
      createdAt: "2023-06-26",
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    question: "",
    answer: "",
  });

  const columns = [
    { field: "id", headerName: "SL", flex: 0.3 },
    { field: "question", headerName: "Question", flex: 1 },
    { field: "answer", headerName: "Answer", flex: 2 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            style={{ color: "#2563eb", fontSize: "12px", fontWeight: "bold" }}
            onClick={() => handleOpenDrawer(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="text"
            style={{ color: "#FF4D4F", fontSize: "12px", fontWeight: "bold" }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
      sortable: false,
    },
  ];

  const handleOpenDrawer = (item = { id: null, question: "", answer: "" }) => {
    setFormData(item);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: formData.id || Math.random() };

    setFaqs((prevData) =>
      formData.id
        ? prevData.map((item) => (item.id === formData.id ? newItem : item))
        : [...prevData, newItem]
    );
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    setFaqs((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Box
      sx={{
        fontFamily: "Poppins",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",

          color: "#333",
        }}
      >
        FAQ Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <StyledButton onClick={() => handleOpenDrawer()}>
          Create New FAQ
        </StyledButton>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={faqs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 400, padding: "20px", fontFamily: "Poppins" }}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            {formData.id ? "Edit FAQ" : "Add New FAQ"}
          </Typography>
          <TextField
            label="Question"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={formData.question}
            onChange={(e) => handleInputChange("question", e.target.value)}
          />
          <TextField
            label="Answer"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.answer}
            onChange={(e) => handleInputChange("answer", e.target.value)}
          />
          <StyledButton
            fullWidth
            onClick={handleSave}
            sx={{ marginTop: "20px" }}
          >
            Save
          </StyledButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FAQ;
