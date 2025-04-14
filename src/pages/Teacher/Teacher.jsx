import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import moment from "moment";
import teacherService from "../../services/teacherService";
import apiServices from "../../services/apiServices";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Teacher = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const instituteId = JSON.parse(localStorage.getItem("instituteId"));
  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState([]);
  const [branch, setBranch] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await teacherService.getTeachers();
      setTeachers(
        data.map((teacher, index) => ({
          ...teacher,
          id: teacher._id,
          sno: index + 1,
          createdAt: moment(teacher.createdAt).format("DD/MM/YYYY"),
        }))
      );
    } catch (error) {
      toast.error("Failed to fetch teachers.");
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await apiServices.fetchSubjects();
      setSubjects(data);
    } catch (error) {
      toast.error("Failed to fetch subjects.");
    }
  };

  const handleEditTeacher = (teacher) => {
    setIsEditMode(true);
    setSelectedRow(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setPhone(teacher.phoneNumber);
    setAddress(teacher.address);
    setBranch(teacher.branch);
    setExperience(teacher.experience);
    setPassword("");

    const formattedSubjects = Array.isArray(teacher.subjects)
      ? teacher.subjects
      : [];

    setSubject(formattedSubjects);
    setIsDrawerOpen(true);
  };

  const handleSaveTeacher = async () => {
    try {
      const teacherData = {
        name,
        phoneNumber: phone,
        email,
        experience,
        address,
        subjects: subject,
        branch,
        instituteId: instituteId,
      };

      if (isEditMode) {
        await teacherService.updateTeacher(selectedRow.id, teacherData);
        toast.success("Teacher Updated Successfully!");
      } else {
        await teacherService.createTeacher({ ...teacherData, password });
        toast.success("Teacher Created Successfully!");
      }

      resetForm();
      fetchTeachers();
      setIsDrawerOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to update teacher." : "Failed to create teacher."
      );
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await teacherService.deleteTeacher(id);
      toast.success("Teacher Deleted Successfully!");
      fetchTeachers();
    } catch (error) {
      toast.error("Failed to delete teacher.");
    }
  };

  const resetForm = () => {
    setIsEditMode(false);
    setSelectedRow(null);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPassword("");
    setBranch("");
    setExperience("");
    setSubject("");
  };

  const handleSubjectChange = (event) => {
    const selectedSubjects = event.target.value
      .map((subjectName) => {
        const selectedSubject = subjects?.find(
          (s) => s.subjectName === subjectName
        );
        return selectedSubject
          ? { id: selectedSubject._id, name: subjectName }
          : null;
      })
      .filter(Boolean);

    setSubject(selectedSubjects);
  };

  const columns = [
    { field: "sno", headerName: "SL", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Number", flex: 1 },
    { field: "branch", headerName: "Branch", flex: 1 },
    {
      field: "subjects",
      headerName: "Subject",
      flex: 1,
      renderCell: (params) => {
        console.log("params.row?.subjects", params.row.subjects);
        return (
          <span>
            {params.row.subjects
              ? params.row.subjects.map((s) => s.name).join(", ")
              : ""}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "15px" }}>
          <PencilSquareIcon
            style={{ width: "20px", cursor: "pointer" }}
            onClick={() => handleEditTeacher(params.row)}
          />
          <TrashIcon
            style={{ width: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteTeacher(params.row.id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <div style={{ padding: isMobile ? "10px" : "15px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Teachers</Typography>
        <StyledButton
          onClick={() => {
            setIsDrawerOpen(true);
            setSelectedRow(null); // Use null instead of an empty string
          }}
        >
          Create Teacher
        </StyledButton>
      </Box>

      <DataGrid rows={teachers} columns={columns} pageSize={5} />

      {/* Drawer for Adding/Editing Teacher */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 400, padding: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {isEditMode ? "Edit Teacher" : "Add New Teacher"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            required
            size="small"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Phone Number"
            type="number"
            fullWidth
            required
            size="small"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            size="small"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isEditMode && (
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              size="small"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel size="small">Subject</InputLabel>
            <Select
              label="Subjects"
              multiple
              value={subject?.map((s) => s.name) || []}
              onChange={handleSubjectChange}
              size="small"
              renderValue={(selected) => selected.join(", ")}
            >
              {subjects?.map((subject) => (
                <MenuItem key={subject._id} value={subject.subjectName}>
                  {subject.subjectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Branch"
            fullWidth
            size="small"
            margin="normal"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            size="small"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Experience"
            fullWidth
            size="small"
            margin="normal"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <StyledButton fullWidth onClick={handleSaveTeacher} sx={{ mt: 3 }}>
            {isEditMode ? "Update" : "Save"}
          </StyledButton>
        </Box>
      </Drawer>
    </div>
  );
};

export default Teacher;
