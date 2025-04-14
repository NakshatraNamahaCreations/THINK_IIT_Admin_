import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

import { toast } from "react-toastify";
import { config } from "../../services/config";

const CreateBatch = () => {
  // State for managing form data
  const [formData, setFormData] = useState({
    batchName: "",
    targetYear: "",
    batchFee: "",
    classname: "",
    contentCategory: "",
    language: "",
    teachers: [],
    imageFile: null,
  });
  const [categories, setCategories] = useState([]);
  const [classdata, setClassdata] = useState([]);

  console.log("classdata", classdata);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const fileInputRef = useRef(null);

  const getCategories = async () => {
    const response = await axios.get("http://localhost:8002/api/category/");
    setCategories(response.data);
  };
  const getClassData = async () => {
    let res = await axios.get(`${config.BASE_URL_QUESTIONS}class/`);
    setClassdata(res.data);
  };

  const [teacher, setTeacher] = useState([]);

  console.log("teacher", teacher);
  const getTeacher = async () => {
    const res = await axios.get(`${config.BASE_URL}teacher/`);
    if (res.status === 200) {
      setTeacher(res.data.data);
    }
  };
  const [subjectdata, setSubjectdata] = useState([]);
  console.log("subjectdata", subjectdata);

  const getSubject = async () => {
    const res = await axios.get(`${config.BASE_URL_QUESTIONS}subject/`);
    if (res.status === 200) {
      setSubjectdata(res.data);
    }
  };
  useEffect(() => {
    getCategories();
    getClassData();
    getTeacher();
    getSubject();
  }, []);
  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [batchname, setBatchname] = useState("");
  const [targetdate, setTargetdate] = useState("");
  const [batchfee, setBatchfee] = useState("");
  const [batchclass, setBatchclass] = useState({ _id: "", className: "" });
  // const [batchclass, setBatchclass] = useState("");
  const [batchcontentcategory, setBatchcontentcategory] = useState("");
  const [batchlanguage, setBatchlanguage] = useState("");
  const [batchimagefile, setBatchimagefile] = useState(null);

  const [batchdescription, setDescription] = useState("");
  const [videoSelected, setVideoSelected] = useState(false);
  const [ebookSelected, setEbookSelected] = useState(false);
  const [assignmentSelected, setAssignmentSelected] = useState(false);

  const teacherFilterByclass = subjectdata.filter(
    (ele) => ele?.classId === batchclass?._id
  );

  // console.log(teacherFilterByclass,"teacherFilterByclass")
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBatchimagefile(file);
    }
  };

  const [filteredTeachers, setFilteredTeachers] = useState([]);
  console.log(filteredTeachers, "filteredTeachers");
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSubjects((prev) => {
      const updatedSubjects = checked
        ? [...prev, name]
        : prev.filter((subject) => subject !== name);
      setFilteredTeachers(
        teacher?.filter((t) => updatedSubjects.includes(t.subject))
      );
      return updatedSubjects;
    });
  };

  const columns = [
    {
      field: "select",
      headerName: "Select",
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={selectedTeachers.some((t) => t._id === params.row._id)} // Ensure correct selection tracking
          onChange={(event) => handleTeacherCheckboxChange(event, params.row)} // Pass full teacher object
        />
      ),
    },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "name", headerName: "Assigned Teacher", flex: 1 },
  ];
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  // console.log(selectedTeachers)
  const handleTeacherCheckboxChange = (event, teacher) => {
    const { checked } = event.target;

    setSelectedTeachers((prev) => {
      if (checked) {
        return [...prev, teacher]; // Add full teacher object
      } else {
        return prev.filter((t) => t._id !== teacher._id); // Remove teacher by ID
      }
    });
  };

  const createBatch = async () => {
    if (
      !batchname ||
      !targetdate ||
      !batchfee ||
      !batchclass ||
      !batchcontentcategory ||
      !batchlanguage ||
      // !batchimagefile ||
      !batchdescription
    ) {
      toast.error("All fields are required!");
      return;
    }

    let formData = new FormData();
    formData.append("batch_name", batchname);
    formData.append("batch_year", targetdate);
    formData.append("price", batchfee);
    formData.append("class", batchclass.className);
    formData.append("category", batchcontentcategory);
    formData.append("language", batchlanguage);
    formData.append("banner_img_path", batchimagefile);
    formData.append("description", batchdescription);
    formData.append("subject", JSON.stringify(selectedSubjects));
    formData.append("teachers", JSON.stringify(selectedTeachers));
    formData.append("videos", videoSelected ? "true" : "false");
    formData.append("ebooks", ebookSelected ? "true" : "false");
    formData.append("assignments", assignmentSelected ? "true" : "false");

    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}batches/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Batch created successfully", response.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error creating batch", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Batch Details Section */}
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
        Back to Batch List
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Batch Name"
            fullWidth
            InputProps={{
              style: { padding: "7px" }, // Padding inside the TextField
            }}
            value={batchname}
            onChange={(e) => setBatchname(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Target Years"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={targetdate}
            onChange={(e) => setTargetdate(e.target.value)}
            InputProps={{
              style: { padding: "7px" }, // Padding inside the TextField
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Class</InputLabel>
          <Select
            fullWidth
            value={batchclass?._id || ""}
            onChange={(e) => {
              const selectedOption = classdata.find(
                (option) => option._id === e.target.value
              );
              setBatchclass(selectedOption);
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Class
            </MenuItem>
            {classdata.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.className}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} mt={3}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleFileClick}
            style={{ padding: "16px" }}
          >
            Upload Batch Banner Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            InputProps={{
              style: { padding: "7px" },
            }}
          />
          {batchimagefile && (
            <Box mt={2}>
              <img
                src={URL.createObjectURL(batchimagefile)}
                alt="Batch Banner"
                style={{
                  width: "100%",
                  maxHeight: "100px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      <Typography variant="h5" mt={4} style={{ fontWeight: 600 }}>
        Content Type
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              name="Video"
              checked={videoSelected}
              onChange={(e) => setVideoSelected(e.target.checked)}
            />
          }
          label="Video"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Ebook"
              checked={ebookSelected}
              onChange={(e) => setEbookSelected(e.target.checked)}
            />
          }
          label="Ebook"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Assignment"
              checked={assignmentSelected}
              onChange={(e) => setAssignmentSelected(e.target.checked)}
            />
          }
          label="Assignment"
        />
      </FormGroup>

      {/* Teacher Assignment Section */}
      <Typography
        variant="h5"
        mt={4}
        style={{ fontSize: "20px", fontWeight: "600" }}
      >
        Teacher for Subjects
      </Typography>
      <FormGroup row>
        {[...new Set(teacherFilterByclass)].map((subject) => (
          <FormControlLabel
            key={subject.subjectName}
            control={
              <Checkbox
                name={subject.subjectName}
                onChange={handleCheckboxChange}
                checked={selectedSubjects.includes(subject.subjectName)}
              />
            }
            label={subject.subjectName}
          />
        ))}
      </FormGroup>
      {teacher?.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Assigned Teachers
          </Typography>
          <DataGrid
            rows={filteredTeachers}
            columns={columns}
            autoHeight
            style={{ width: "40%" }}
            getRowId={(row) => row?._id}
          />
        </Box>
      )}

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Batch Category"
            fullWidth
            value={batchcontentcategory}
            onChange={(e) => setBatchcontentcategory(e.target.value)}
            select
          >
            {categories?.map((ele, index) => {
              return <MenuItem value={ele?.name}>{ele?.name}</MenuItem>;
            })}
          </TextField>
        </Grid>
      </Grid>

      {/* Additional Info Section */}
      {/* <Typography variant="h5" mt={4}>
        Additional Info
      </Typography> */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Batch Fee"
            fullWidth
            value={batchfee}
            onChange={(e) => setBatchfee(e.target.value)}
            InputProps={{
              style: { padding: "7px" }, // Padding inside the TextField
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            // multiple
            fullWidth
            value={batchlanguage}
            onChange={(e) => setBatchlanguage(e.target.value)}
            // renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Gujarati">Gujarati</MenuItem>
          </Select>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            label="Language"
            fullWidth
            value={batchlanguage}
            onChange={(e) => setBatchlanguage(e.target.value)}
            InputProps={{
              style: { padding: "7px" }, // Padding inside the TextField
            }}
          />
        </Grid> */}
        <Grid item xs={6}>
          <TextField
            label="Batch Description "
            placeholder="Enter a detailed description about the batch"
            fullWidth
            multiline
            rows={4}
            value={batchdescription}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <StyledButton
        fullWidth={70}
        onClick={createBatch}
        sx={{ marginTop: "20px" }}
      >
        Save
      </StyledButton>
    </Box>
  );
};

export default CreateBatch;
const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});
