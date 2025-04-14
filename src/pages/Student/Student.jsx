import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as XLSX from "xlsx";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Student = () => {
  const [rows, setRows] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const instituteId = JSON.parse(localStorage.getItem("instituteId"));
  const [isDrawerassignstudentOpen, setisDrawerassignstudentOpen] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allbatch, setAllbatch] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [studentsFromFile, setStudentsFromFile] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setStudentsFromFile(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchStudents();
    fetchallcategory();
  }, []);

  const fetchallcategory = async () => {
    try {
      const response = await axios.get("http://localhost:8002/api/category");
      setAllbatch(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8009/api/auth");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCheckboxChange = (event, studentId) => {
    if (event.target.checked) {
      setSelectedStudents((prev) => [...prev, studentId]);
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
    }
  };
  const columns = [
    {
      field: "select",
      headerName: "Select",
      flex: 0.3,
      renderCell: (params) => (
        <Checkbox
          checked={selectedStudents.includes(params.row._id)}
          onChange={(event) => handleCheckboxChange(event, params.row._id)}
        />
      ),
    },
    // { field: "roll_no", headerName: "Roll No", flex: 0.3 },
    { field: "student_name", headerName: "Name", flex: 1 },
    { field: "email_id", headerName: "Email", flex: 1 },
    { field: "student_phone_no", headerName: "Phone Number", flex: 1 },
    { field: "userId", headerName: "UserId", flex: 1 },

    // { field: "password", headerName: "Password", flex: 1 },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>
            {showPassword[params.row._id] ? params.row.password : "••••••••"}
          </span>
          <Button
            onClick={() => togglePasswordVisibility(params.row._id)}
            sx={{ minWidth: "30px", padding: 0 }}
          >
            {showPassword[params.row._id] ? (
              <VisibilityOff style={{ fontSize: "22px" }} />
            ) : (
              <Visibility style={{ fontSize: "22px" }} />
            )}
          </Button>
        </Box>
      ),
    },
    { field: "batchname", headerName: "Batch Name", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Link to={`/studentDetails/${params.row.id}`}>
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
        </Box>
      ),
    },
  ];

  const handleAssignStudents = async () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    try {
      const requestData = selectedStudents.map((studentId) => ({
        student_id: studentId,
        batch_id: selectedCategory,
        batch_name:
          allbatch.find((batch) => batch._id === selectedCategory)
            ?.categoryName || "",

        payment_status: "unpaid",
        type: "admin",
      }));

      const response = await axios.post(
        "http://localhost:8009/api/batchpurchase/create-manualy-batch",
        { students: requestData }
      );
      if (response) {
        alert("Students assigned successfully!");
        setisDrawerassignstudentOpen(false);
        setSelectedCategory("");
        window.location.reload("");
      }
    } catch (error) {
      console.error("Error assigning students:", error);
      alert("Failed to assign students.");
    }
  };

  const filteredRows = rows.filter(
    (student) =>
      student?.student_name
        ?.toLowerCase()
        .includes(searchvalue.toLowerCase()) ||
      student?.userId.toLowerCase().includes(searchvalue.toLowerCase())
  );

  const handleDownloadCSV = () => {
    const dataToDownload = searchvalue ? filteredRows : rows;

    if (dataToDownload.length === 0) {
      alert("No students available to download.");
      return;
    }

    const csvData = dataToDownload.map((student) => ({
      "Student Name": student.student_name,
      Email: student.email_id,
      "Phone Number": student.student_phone_no,
      userId: student.userId,
      Password: student.password,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSample = () => {
    const sampleData = [
      ["student_name", "email_id", "student_phone_no", "userId"],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students_Template");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students_template.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkUpload = async () => {
    if (!studentsFromFile.length) {
      alert("Please upload an Excel file first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8009/api/auth/bulk-register",
        {
          students: studentsFromFile,
          instituteId: "6773228998778233",
        }
      );
      if (response) {
        alert(`${studentsFromFile.length} students created successfully!`);
        setStudentsFromFile([]);
        setSelectedFile(null);
        window.location.reload("");
      }
    } catch (error) {
      console.error("Error uploading students:", error);
      alert(error.response?.data?.message || "Failed to upload students.");
    }
  };

  const handleResetPasswords = async () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8009/api/auth/reset-passwords",
        { studentIds: selectedStudents }
      );

      if (response.status === 200) {
        alert("Passwords reset successfully!");
        const updatedRows = rows.map((student) => {
          const updatedStudent = response.data.updatedStudents.find(
            (s) => s.id === student._id
          );
          if (updatedStudent) {
            return { ...student, password: updatedStudent.newPassword };
          }
          return student;
        });

        setRows(updatedRows);
        window.location.reload("");
      }
    } catch (error) {
      console.error("Error resetting passwords:", error);
      alert("Failed to reset passwords.");
    }
  };

  return (
    <div style={{ fontFamily: "Poppins", padding: "15px" }}>
      <Typography variant="h5">Students List</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Search by Name"
          type="text"
          fullWidth
          size="small"
          margin="normal"
          value={searchvalue}
          onChange={(e) => setsearchvalue(e.target.value)}
          style={{ width: "250px" }}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <StyledButton onClick={() => setIsDrawerOpen(true)}>
            Create Students
          </StyledButton>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <StyledButton onClick={() => setisDrawerassignstudentOpen(true)}>
            Assign Student
          </StyledButton>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <StyledButton onClick={handleDownloadCSV}> Download</StyledButton>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <StyledButton onClick={handleDownloadSample}>
            Download Sample
          </StyledButton>
        </Box>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <StyledButton onClick={handleResetPasswords}>
            Reset Password
          </StyledButton>
        </Box>
      </Box>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 400, padding: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create Multiple Students
          </Typography>

          {/* <input type="file" className="form-control col-md-12" />
          <StyledButton fullWidth onClick={handleBulkCreate} sx={{ mt: 2 }}>
            Create Students
          </StyledButton> */}
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="form-control col-md-12"
          />

          {/* ✅ Show Selected File Name */}
          {selectedFile && (
            <Typography sx={{ mt: 1, color: "gray" }}>
              Selected File: {selectedFile.name}
            </Typography>
          )}

          {/* ✅ Upload Button */}
          <StyledButton fullWidth onClick={handleBulkUpload} sx={{ mt: 2 }}>
            Upload & Create Students
          </StyledButton>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={isDrawerassignstudentOpen}
        onClose={() => setisDrawerassignstudentOpen(false)}
      >
        <Box sx={{ width: 400, padding: 3 }}>
          <FormControl fullWidth size="small" margin="normal">
            {/* <InputLabel>Select Category</InputLabel> */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select Batch
            </Typography>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {allbatch.map((batch) => (
                <MenuItem
                  key={batch._id}
                  value={batch._id}
                  placeholder="Select Category"
                >
                  {batch.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <StyledButton fullWidth sx={{ mt: 2 }} onClick={handleAssignStudents}>
            Submit
          </StyledButton>
        </Box>
      </Drawer>
    </div>
  );
};

export default Student;
