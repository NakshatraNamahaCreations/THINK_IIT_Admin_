import React, { useEffect, useState } from "react";
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
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const TCreationlist = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const getTestData = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8083/api/test/test-section/template`
      );
      const formattedData = res.data.data.map((item, index) => ({
        id: item._id,
        testName: item.templateId?.tempDesc || "N/A",
        testTemplateName: item.templateId?._id || "N/A",
        duration: item.templateId?.duration || "N/A",
        timerEnable: item.templateId?.timerEnable ? "Yes" : "No",
        sections: item.sections.length,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  useEffect(() => {
    getTestData();
  }, []);

  const filteredRows = data.filter((row) =>
    row.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRow = (row) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const handleSaveChanges = () => {
    setSelectedRow(null);
    setIsDrawerOpen(false);
  };

  const handleInputChange = (field, value) => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [field]: value,
    }));
  };

  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/TCreations");
  };

  const columns = [
    // {
    //   field: "sl",
    //   headerName: "Sl No",
    //   flex: 0.3,
    //   renderCell: (params) => params.api.currentPage + params.rowIndex + 1,
    // },
    { field: "testName", headerName: "Test Name", flex: 1 },
    { field: "testTemplateName", headerName: "Template ID", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "timerEnable", headerName: "Timer Enabled", flex: 1 },
    { field: "sections", headerName: "No. of Sections", flex: 1 },
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
          <PencilSquareIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#10b981",
              cursor: "pointer",
            }}
            title="Edit"
            onClick={() => handleEditRow(params.row)}
          />
          <TrashIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#ef4444",
              cursor: "pointer",
            }}
            title="Delete"
            onClick={() =>
              setData((prevRows) =>
                prevRows.filter((row) => row.id !== params.row.id)
              )
            }
          />
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
          Test Creation
        </Typography>
        <TextField
          placeholder="Search test name..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          // sx={{ "100%" ]}}
        >
          Create Test
        </StyledButton>
      </Box>

      <div style={{ width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default TCreationlist;
