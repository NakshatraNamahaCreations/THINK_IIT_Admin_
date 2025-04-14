import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const TermsConditions = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      title: "Terms for Students",
      description: "These are the terms and conditions for students...",
      createdAt: "2023-06-26",
    },
    {
      id: 2,
      title: "Terms for Teachers",
      description: "These are the terms and conditions for teachers...",
      createdAt: "2023-06-26",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRow = (row) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedRow.id) {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === selectedRow.id ? selectedRow : row))
      );
    } else {
      const newId = rows.length + 1;
      setRows([
        ...rows,
        {
          ...selectedRow,
          id: newId,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setSelectedRow(null);
    setIsDrawerOpen(false);
  };

  const handleInputChange = (field, value) => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "SL", flex: 0.3 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
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
            style={{
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            onClick={() => handleEditRow(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="text"
            style={{
              color: "#FF4D4F",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            onClick={() =>
              setRows((prevRows) =>
                prevRows.filter((row) => row.id !== params.row.id)
              )
            }
          >
            Delete
          </Button>
        </Box>
      ),
      sortable: false,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Poppins",
        padding: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: { xs: "column", sm: "row" },
          gap: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#2b3674",
          }}
        >
          Terms and Conditions
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextField
            placeholder="Search terms..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 300,
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
          <StyledButton
            onClick={() => {
              setSelectedRow({
                title: "",
                description: "",
              });
              setIsDrawerOpen(true);
            }}
          >
            Add Terms
          </StyledButton>
        </Box>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
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
        <div
          style={{
            width: 400,
            padding: "20px",
            fontFamily: "Poppins",
          }}
        >
          <h3>{selectedRow?.id ? "Edit Terms" : "Add New Terms"}</h3>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={selectedRow?.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={6}
            margin="normal"
            value={selectedRow?.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <StyledButton
            fullWidth
            onClick={handleSaveChanges}
            sx={{ marginTop: "20px" }}
          >
            Save
          </StyledButton>
        </div>
      </Drawer>
    </div>
  );
};

export default TermsConditions;
