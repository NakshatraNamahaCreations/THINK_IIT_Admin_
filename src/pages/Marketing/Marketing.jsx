import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Drawer, Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const StatusButton = styled(Button)(({ status }) => ({
  fontFamily: "Poppins",
  color: "white",
  backgroundColor: status === "Active" ? "#4CAF50" : "#F44336", // Green for Active, Red for Block
  textTransform: "none",
  borderRadius: "20px",
  padding: "5px 15px",
  fontSize: "12px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: status === "Active" ? "#388E3C" : "#D32F2F",
  },
}));

const Marketing = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      image: null,
      status: "Active",
      promotionName: "Summer Sale", // Promotion name field
    },
    {
      id: 2,
      image: null,
      status: "Block",
      promotionName: "Winter Discount", // Promotion name field
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditRow = (row) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const handleToggleStatus = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "Active" ? "Block" : "Active" }
          : row
      )
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedRow((prevRow) => ({
          ...prevRow,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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

  const columns = [
    { field: "id", headerName: "SL", flex: 0.3 },
    {
      field: "promotionName",
      headerName: "Promotion Name",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ fontFamily: "Poppins" }}>
          {params.row.promotionName || "N/A"}
        </Typography>
      ),
    },
    {
      field: "image",
      headerName: "Banner Image",
      flex: 1,
      renderCell: (params) =>
        params.row.image ? (
          <img
            src={params.row.image}
            alt="Banner"
            style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          />
        ) : (
          <Typography>No Image</Typography>
        ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <StatusButton
          status={params.row.status}
          onClick={() => handleToggleStatus(params.row.id)}
        >
          {params.row.status}
        </StatusButton>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <PencilSquareIcon
            style={{
              width: "18px",
              height: "18px",
              color: "#2563eb",
              cursor: "pointer",
            }}
            title="Edit"
            onClick={() => handleEditRow(params.row)}
          />
          <TrashIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#FF4D4F",
              cursor: "pointer",
            }}
            title="Delete"
            onClick={() =>
              setRows((prevRows) =>
                prevRows.filter((row) => row.id !== params.row.id)
              )
            }
          />
        </div>
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
          Banner
        </Typography>
        <StyledButton
          onClick={() => {
            setSelectedRow({
              image: null,
              status: "Block",
              promotionName: "",
            });
            setIsDrawerOpen(true);
          }}
        >
          Create Banner
        </StyledButton>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
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
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontFamily: "Poppins" }}
          >
            {selectedRow?.id ? "Edit Banner" : "Add New Banner"}
          </Typography>

          <TextField
            label="Promotion Name"
            fullWidth
            value={selectedRow?.promotionName || ""}
            onChange={(e) =>
              setSelectedRow((prev) => ({
                ...prev,
                promotionName: e.target.value,
              }))
            }
            sx={{ marginBottom: "20px" }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
          {selectedRow?.image && (
            <img
              src={selectedRow.image}
              alt="Preview"
              style={{
                marginBottom: "20px",
                maxWidth: "100%",
                borderRadius: "5px",
              }}
            />
          )}

          <StyledButton fullWidth onClick={handleSaveChanges}>
            Save Changes
          </StyledButton>
        </div>
      </Drawer>
    </div>
  );
};

export default Marketing;
