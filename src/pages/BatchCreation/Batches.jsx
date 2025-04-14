import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { config } from "../../services/config";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Batches = () => {
  const [batches, setBatches] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const getBatches = async () => {
    let res = await axios.get(`${config.BASE_URL_TEST}batches/`);
    const batches = res.data.map((batches, index) => ({
      ...batches,
      id: batches._id,
      sno: index + 1,
      createdAt: moment(batches.createdAt).format("DD/MM/YYYY"),
    }));
    setBatches(batches);
  };
  useEffect(() => {
    getBatches();
  }, []);

  const deleteBatch = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this batch?"
    );
    if (!confirmDelete) return;

    try {
      let res = await axios.delete(`${config.BASE_URL_TEST}batches/${id}`);
      if (res.status === 200) {
        toast.success("Batch Deleted Successfully!");
        setBatches((prevBatches) =>
          prevBatches.filter((batch) => batch._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete batch.");
    }
  };

  const handleDelete = (id) => {
    deleteBatch(id);
  };

  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/create-batch");
  };

  const columns = [
    { field: "sno", headerName: "SL", flex: 0.3 },
    { field: "batch_name", headerName: "Batch Name", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "startDate", headerName: "Start Date ", flex: 1 },
    { field: "endDate", headerName: "End Date ", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdBy", headerName: "Created By", flex: 1 },

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
          {/* View Icon */}
          <Link to={`/batch-details/${params.row._id}`}>
            <EyeIcon
              style={{
                width: "20px",
                height: "20px",
                color: "#2563eb",
                cursor: "pointer",
              }}
              title="View Details"
            />
          </Link>

          {/* Edit Icon */}
          <Link to={`/batch-update/${params.row._id}`}>
            <PencilSquareIcon
              style={{
                width: "20px",
                height: "20px",
                color: "#10b981",
                cursor: "pointer",
              }}
              title="Edit"
            />
          </Link>
          {/* Delete Icon */}
          <TrashIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#ef4444",
              cursor: "pointer",
            }}
            title="Delete"
            onClick={() => handleDelete(params?.row?._id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Poppins",
        padding: isMobile ? "10px" : "15px",
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
          Batch Lists
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
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: isMobile ? "100%" : 300,
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
            onClick={handlenavigate}
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            Create Batch
          </StyledButton>
        </Box>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={batches}
          columns={
            isMobile ? columns.filter((col) => col.field !== "number") : columns
          }
          pageSize={15}
          rowsPerPageOptions={[15]}
          disableSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Batches;
