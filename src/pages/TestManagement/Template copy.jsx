import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  InputAdornment,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  getTestTemplates,
  createTestTemplate,
  updateTestTemplate,
  deleteTestTemplate,
} from "../../services/testTemplateService";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const TestTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  // Form state
  const [templatename, setTemplatename] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [testtype, setTesttype] = useState("");
  const [classname, setClassname] = useState("");
  const [mark, setMark] = useState("");
  const [language, setLanguage] = useState("");

  // Data and Pagination state
  const [testTemplates, setTestTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchTemplates(page, pageSize);
  }, [page]);

  const fetchTemplates = async (page, limit) => {
    const { templates, totalPages } = await getTestTemplates(page, limit);
    setTestTemplates(templates);
    setTotalPages(totalPages);
  };

  const handleCreateOrUpdate = async () => {
    if (
      !templatename ||
      !description ||
      !duration ||
      !testtype ||
      !classname ||
      !mark ||
      !language
    ) {
      toast.error("All fields are required!");
      return;
    }

    const newTemplate = {
      templatename,
      tempDesc: description,
      duration,
      testType: testtype,
      class: classname,
      totalMarks: mark,
      language,
    };

    if (isEditDrawerOpen) {
      await updateTestTemplate(selectedRow.id, newTemplate);
      setIsEditDrawerOpen(false);
    } else {
      await createTestTemplate(newTemplate);
      setIsDrawerOpen(false);
      setPage(1); // Reset to first page to see the newly created item
    }

    resetForm();
    fetchTemplates(page, pageSize);
  };

  const resetForm = () => {
    setTemplatename("");
    setDescription("");
    setDuration("");
    setTesttype("");
    setClassname("");
    setMark("");
    setLanguage("");
  };

  const handleDelete = async (id) => {
    await deleteTestTemplate(id);
    fetchTemplates(page, pageSize);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredRows = testTemplates.filter((row) =>
    row?.templatename?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Poppins", padding: "15px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <Typography variant="h5" fontWeight="bold" color="#2b3674">
          Test Templates
        </Typography>
        <Box display="flex" gap="10px">
          <TextField
            placeholder="Search template..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <StyledButton onClick={() => setIsDrawerOpen(true)}>
            Create Template
          </StyledButton>
        </Box>
      </Box>

      <DataGrid
        rows={filteredRows}
        columns={[
          { field: "sno", headerName: "SL", flex: 0.3 },
          { field: "templatename", headerName: "Template Name", flex: 1 },
          { field: "class", headerName: "Class", flex: 1 },
          { field: "testType", headerName: "Test Type", flex: 1 },
          { field: "language", headerName: "Language", flex: 1 },
          { field: "totalMarks", headerName: "Marks", flex: 1 },
          { field: "duration", headerName: "Test Duration", flex: 1 },
          { field: "createdAt", headerName: "Created Date", flex: 1 },
        ]}
        pageSize={5}
        rowCount={total} // Display correct total count
        pagination
        page={page - 1} // DataGrid uses 0-based index for pages
        onPageChange={(newPage) => setPage(newPage + 1)} // Adjust to 1-based index
        paginationMode="server"
        disableSelectionOnClick
        autoHeight
      />

      <Box display="flex" justifyContent="center" marginTop="20px">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>

      {/* Drawer for Create & Edit */}
      <Drawer
        anchor="right"
        open={isDrawerOpen || isEditDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setIsEditDrawerOpen(false);
        }}
      >
        <Box width={400} padding="20px">
          <Typography variant="h6">
            {isEditDrawerOpen ? "Edit Template" : "Add New Template"}
          </Typography>
          <TextField
            label="Template Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={templatename}
            onChange={(e) => setTemplatename(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiInputLabel-root": {
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
              },
            }}
          />

          <TextField
            label="Test Duration"
            variant="outlined"
            fullWidth
            margin="normal"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            label="Total Marks"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Language"
            variant="outlined"
            fullWidth
            margin="normal"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <TextField
            label="Test Type"
            variant="outlined"
            fullWidth
            margin="normal"
            value={testtype}
            onChange={(e) => setTesttype(e.target.value)}
          />
          <TextField
            label="Class"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
          />
          <StyledButton
            fullWidth
            onClick={handleCreateOrUpdate}
            sx={{ marginTop: "20px" }}
          >
            {isEditDrawerOpen ? "Update" : "Save"}
          </StyledButton>
        </Box>
      </Drawer>
    </div>
  );
};

export default TestTemplates;
