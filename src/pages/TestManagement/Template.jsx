import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  Typography,
  Box,
  Pagination,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
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
  const instituteId = JSON.parse(localStorage.getItem("instituteId"));
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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
      instituteId: instituteId,
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
    setSelectedRow(null);
  };

  const handleDelete = async (id) => {
    await deleteTestTemplate(id);
    fetchTemplates(page, pageSize);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setTemplatename(row.templatename);
    setDescription(row.tempDesc);
    setDuration(row.duration);
    setTesttype(row.testType);
    setClassname(row.class);
    setMark(row.totalMarks);
    setLanguage(row.language);
    setIsEditDrawerOpen(true);
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
          <StyledButton
            onClick={() => {
              resetForm();
              setIsDrawerOpen(true);
            }}
          >
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
          {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <Box display="flex" gap="15px">
                <PencilSquareIcon
                  style={{ width: "20px", color: "#10b981", cursor: "pointer" }}
                  title="Edit"
                  onClick={() => handleEdit(params.row)}
                />
                <TrashIcon
                  style={{ width: "20px", color: "#ef4444", cursor: "pointer" }}
                  title="Delete"
                  onClick={() => handleDelete(params.row.id)}
                />
              </Box>
            ),
            sortable: false,
          },
        ]}
        pagination={false}
        hideFooter
        disableSelectionOnClick
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
            fullWidth
            size="small"
            margin="normal"
            value={templatename}
            onChange={(e) => setTemplatename(e.target.value)}
          />

          <TextField
            label="Test Duration"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            label="Total Marks"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            type="number"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth size="small">
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              label="Language"
            >
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Hindi"}>Hindi</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={testtype}
              onChange={(e) => setTesttype(e.target.value)}
              label="Category"
            >
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Hindi"}>Hindi</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Class</InputLabel>
            <Select
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
              label="Class"
            >
              <MenuItem value={"11"}>11</MenuItem>
              <MenuItem value={"12"}>12</MenuItem>
            </Select>
          </FormControl>

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
