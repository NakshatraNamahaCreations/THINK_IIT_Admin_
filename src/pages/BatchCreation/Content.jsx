import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  TextField,
  Tabs,
  Tab,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

import { toast } from "react-toastify";
import moment from "moment";
import { config } from "../../services/config";
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

const Content = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpenedit, setisDrawerOpenedit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const tabNames = ["Assignment", "Ebook", "Video"];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleOpenDraweredit = (row) => {
    setIsEditMode(true);
    setSelectedItemId(row.id);
    setClassName(row.className);
    setSubjectName(row.subjectName);
    setchapter(row.chapter);
    settopic(row.topic);
    setMarks(row.marks || "");
    setVideolink(row.video_link || "");
    setSelectedImage(null);
    setisDrawerOpenedit(true);
    setcategory("");
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const handleCloseDraweredit = () => {
    setisDrawerOpenedit(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedImage(file); // Store the PDF file
      toast.success("PDF file selected successfully.");
    } else {
      setSelectedImage(null);
      toast.error("Please select a valid PDF file.");
    }
  };

  const [selectclassName, setSelectclassName] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchClass = await apiServices.fetchClasses();
        setSelectclassName(fetchClass);

        const fetchCategories = await apiServices.fetchCategories();
        setCategories(fetchCategories);
        const data = await apiServices.fetchSubjects();
        setSubjectData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // getAssignment
  const [assignmentdata, setAssignmnetdata] = useState([]);
  const getAssignment = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_TEST}assignments/`);
      const assignments = res.data.map((assignments, index) => ({
        ...assignments,
        id: assignments._id,
        sno: index + 1,
      }));
      if (res.status === 200) {
        setAssignmnetdata(assignments);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };
  useEffect(() => {
    getAssignment();
  }, []);

  // getEbooks
  const [ebookdata, setEbookdata] = useState([]);
  const getEbook = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_TEST}ebooks/`);
      const ebooks = res.data.map((ebooks, index) => ({
        ...ebooks,
        id: ebooks._id,
        sno: index + 1,
      }));
      if (res.status === 200) {
        setEbookdata(ebooks);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  useEffect(() => {
    getEbook();
  }, []);

  // getVideo
  // getEbooks
  const [videosdata, setVideosdata] = useState([]);
  const getVideos = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_TEST}videos/`);
      const videos = res.data.map((videos, index) => ({
        ...videos,
        id: videos._id,
        sno: index + 1,
      }));
      if (res.status === 200) {
        setVideosdata(videos);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);

  // DeleteAssignment
  const deleteassign = async (id) => {
    try {
      let res = await axios.delete(`${config.BASE_URL_TEST}assignments/${id}`);
      if (res.status === 200) {
        toast.success("Assignment Deleted Successfully!");
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id) => {
    deleteassign(id);
  };

  // DeleteEbook
  const deleteEbook = async (id) => {
    try {
      let res = await axios.delete(`${config.BASE_URL_TEST}ebooks/${id}`);
      if (res.status === 200) {
        toast.success("Ebook Deleted Successfully!");
        getEbook();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteEbook = (id) => {
    deleteEbook(id);
  };

  // DeleteVideo
  const deleteVideos = async (id) => {
    try {
      let res = await axios.delete(`${config.BASE_URL_TEST}videos/${id}`);
      if (res.status === 200) {
        toast.success("Video Deleted Successfully!");
        getVideos();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteVideo = (id) => {
    deleteVideos(id);
  };
  const [className, setClassName] = useState("");
  const [subjectname, setSubjectName] = useState(" ");
  const [marks, setMarks] = useState("");
  const [chapter, setchapter] = useState(" ");
  const [topic, settopic] = useState("");
  const [category, setcategory] = useState("");

  const handleSave = () => {
    if (activeTab === 0) {
      isEditMode ? handleUpdateAssignment() : handleAssignment();
    } else if (activeTab === 1) {
      isEditMode ? handleupdateEbooks() : handleEbooks();
    } else if (activeTab === 2) {
      isEditMode ? handleUpdateVideo() : handleVideos();
    }
  };

  const handleAssignment = async () => {
    const formData = new FormData();
    formData.append("className", className);
    formData.append("subjectName", subjectname);
    formData.append("chapter", chapter);
    formData.append("topic", topic);
    formData.append("marks", marks);
    formData.append("book_file_path", selectedImage);
    formData.append("category", category);

    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}assignments/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      handleCloseDrawer();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error saving assignment:", error);
      toast.error("Failed to save assignment.");
    }
  };

  const handleEbooks = async () => {
    const formData = new FormData();
    formData.append("className", className);
    formData.append("subjectName", subjectname);
    formData.append("chapter", chapter);
    formData.append("topic", topic);
    formData.append("book_file_path", selectedImage);
    formData.append("category", category);

    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}ebooks/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      handleCloseDrawer();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error saving ebook:", error);
      toast.error("Failed to save ebook.");
    }
  };

  const [videolink, setVideolink] = useState("");
  const handleVideos = async () => {
    const data = {
      className: className,
      subjectName: subjectname,
      chapter: chapter,
      topic: topic,
      video_link: videolink,
      category: category,
    };
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}videos/`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      handleCloseDrawer();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error saving ebook:", error);
      toast.error("Failed to save ebook.");
    }
  };
  // update assignment
  const handleUpdateAssignment = async () => {
    const formData = new FormData();
    formData.append("className", className);
    formData.append("subjectName", subjectname);
    formData.append("chapter", chapter);
    formData.append("topic", topic);
    formData.append("marks", marks);
    formData.append("book_file_path", selectedImage);
    formData.append("category", category);

    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}assignments/${selectedItemId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      handleCloseDraweredit();
      getAssignment();
    } catch (error) {
      console.error("Error saving assignment:", error);
      toast.error("Failed to save assignment.");
    }
  };

  // update Ebooks
  const handleupdateEbooks = async () => {
    const formData = new FormData();
    formData.append("className", className);
    formData.append("subjectName", subjectname);
    formData.append("chapter", chapter);
    formData.append("topic", topic);
    formData.append("category", category);
    formData.append("book_file_path", selectedImage);

    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}ebooks/${selectedItemId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      handleCloseDraweredit();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error saving ebook:", error);
      toast.error("Failed to save ebook.");
    }
  };
  // update videos
  const handleUpdateVideo = async () => {
    const data = {
      className: className,
      subjectName: subjectname,
      chapter: chapter,
      topic: topic,
      video_link: videolink,
    };

    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}videos/${selectedItemId}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Video updated successfully!");
      handleCloseDraweredit();
      getVideos();
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("Failed to update video.");
    }
  };

  const columns = [
    { field: "sno", headerName: "S.No", flex: 0.3 },
    {
      field: "className",
      headerName: "Class",
      flex: 1,
    },
    {
      field: "subjectName",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "category",
      headerName: "category",
      flex: 1,
    },
    { field: "chapter", headerName: "chapter", flex: 1 },
    { field: "topic", headerName: "topic", flex: 1 },
    { field: "marks", headerName: "Marks", flex: 0.5 },
    {
      field: "book_file_path",
      headerName: "File Path",
      flex: 1,
      renderCell: (params) =>
        params?.value ? (
          <a href={params?.value} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        ) : (
          "No File"
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* <IconButton color="primary">
            <EyeIcon style={{ width: 20, height: 20 }} />
          </IconButton> */}
          <IconButton
            color="secondary"
            onClick={() => handleOpenDraweredit(params?.row)}
          >
            <PencilSquareIcon style={{ width: 20, height: 20 }} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params?.row?._id)}
          >
            <TrashIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const columnsebook = [
    { field: "sno", headerName: "S.No", flex: 0.3 },
    {
      field: "className",
      headerName: "Class",
      flex: 1,
    },
    {
      field: "subjectName",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "category",
      headerName: "category",
      flex: 1,
    },
    { field: "chapter", headerName: "chapter", flex: 1 },
    { field: "topic", headerName: "topic", flex: 1 },
    {
      field: "book_file_path",
      headerName: "File Path",
      flex: 1,
      renderCell: (params) =>
        params?.value ? (
          <a href={params?.value} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        ) : (
          "No File"
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="secondary"
            onClick={() => handleOpenDraweredit(params?.row)}
          >
            <PencilSquareIcon style={{ width: 20, height: 20 }} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteEbook(params?.row?.id)}
          >
            <TrashIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const columnsvideo = [
    { field: "sno", headerName: "S.No", flex: 0.3 },
    {
      field: "className",
      headerName: "Class",
      flex: 1,
    },
    {
      field: "subjectName",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "category",
      headerName: "category",
      flex: 1,
    },
    { field: "chapter", headerName: "chapter", flex: 1 },
    { field: "topic", headerName: "topic", flex: 1 },
    {
      field: "video_link",
      headerName: "Video Link",
      flex: 1,
      renderCell: (params) =>
        params?.value ? (
          <a href={params?.value} target="_blank" rel="noopener noreferrer">
            View Video
          </a>
        ) : (
          "No File"
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="secondary"
            onClick={() => handleOpenDraweredit(params?.row)}
          >
            <PencilSquareIcon style={{ width: 20, height: 20 }} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteVideo(params?.row?._id)}
          >
            <TrashIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>
        Batch Content Management
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="content tabs"
      >
        {tabNames.map((name, index) => (
          <Tab key={index} label={name} />
        ))}
      </Tabs>

      <Box
        mt={3}
        mb={2}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <StyledButton onClick={handleOpenDrawer}>
          Create {tabNames[activeTab]}
        </StyledButton>
      </Box>

      {activeTab === 0 && (
        <DataGrid
          rows={assignmentdata}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          getRowId={(row) => row.id}
        />
      )}

      {activeTab === 1 && (
        <DataGrid
          rows={ebookdata}
          columns={columnsebook}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          getRowId={(row) => row.id}
        />
      )}
      {activeTab === 2 && (
        <DataGrid
          rows={videosdata}
          columns={columnsvideo}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          getRowId={(row) => row.id}
        />
      )}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 500, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Create {tabNames[activeTab]}
          </Typography>
          <TextField
            label="Class"
            size="small"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            fullWidth
            margin="normal"
            select
          >
            {selectclassName?.map((ele, index) => {
              return (
                <MenuItem value={ele?.className} key={ele?._index}>
                  {ele?.className}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            label="Subject"
            value={subjectname}
            onChange={(e) => setSubjectName(e.target.value)}
            fullWidth
            size="small"
            margin="normal"
            select
          >
            {subjectData?.map((subject) => {
              return (
                <MenuItem value={subject?.subjectName}>
                  {subject?.subjectName}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            label="Category"
            size="small"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            fullWidth
            margin="normal"
            select
          >
            {categories?.map((ele, index) => {
              return (
                <MenuItem value={ele?.categoryName} key={ele?._index}>
                  {ele?.categoryName}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Chapter"
            size="small"
            fullWidth
            margin="normal"
            placeholder="Enter chapter"
            value={chapter}
            onChange={(e) => setchapter(e.target.value)}
          />
          <TextField
            label="Topic"
            size="small"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => settopic(e.target.value)}
          />
          {activeTab === 0 && (
            <TextField
              label="Marks"
              type="number"
              size="small"
              fullWidth
              margin="normal"
              placeholder="Enter Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          )}
          {activeTab !== 2 && (
            <>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Upload Book/File
                </Typography>
                <Button variant="contained" component="label">
                  Choose File
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>
              {selectedImage && (
                <Box mt={2}>
                  <Typography variant="body2">
                    Selected File: {selectedImage.name}
                  </Typography>
                </Box>
              )}
            </>
          )}
          {activeTab === 2 && (
            <TextField
              label="Video Link"
              type="text"
              size="small"
              fullWidth
              margin="normal"
              value={videolink}
              onChange={(e) => setVideolink(e.target.value)}
            />
          )}
          <StyledButton fullWidth onClick={handleSave}>
            Save {tabNames[activeTab]}
          </StyledButton>
        </Box>
      </Drawer>

      {/* Update drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpenedit}
        onClose={handleCloseDraweredit}
      >
        <Box sx={{ width: 500, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Update {tabNames[activeTab]}
          </Typography>
          <TextField
            label="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            fullWidth
            margin="normal"
            select
          >
            {selectclassName?.map((ele, index) => {
              return (
                <MenuItem value={ele?.className} key={ele?._index}>
                  {ele?.className}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            label="Subject"
            value={subjectname}
            onChange={(e) => setSubjectName(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            select
          >
            {subjectData?.map((subject) => {
              return (
                <MenuItem value={subject?.subjectName}>
                  {subject?.subjectName}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Category"
            size="small"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            fullWidth
            margin="normal"
            select
          >
            {categories?.map((ele, index) => {
              return (
                <MenuItem value={ele?.categoryName} key={ele?._index}>
                  {ele?.categoryName}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="chapter"
            size="small"
            fullWidth
            margin="normal"
            placeholder="Enter chapter"
            value={chapter}
            onChange={(e) => setchapter(e.target.value)}
          />
          <TextField
            label="topic"
            size="small"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => settopic(e.target.value)}
          />
          {activeTab === 0 && (
            <TextField
              label="Marks"
              type="number"
              size="small"
              fullWidth
              margin="normal"
              placeholder="Enter Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          )}
          {activeTab !== 2 && (
            <>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Upload Book/File
                </Typography>
                <Button variant="contained" component="label">
                  Choose File
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>
              {selectedImage && (
                <Box mt={2}>
                  <Typography variant="body2">
                    Selected File: {selectedImage.name}
                  </Typography>
                </Box>
              )}
            </>
          )}
          {activeTab === 2 && (
            <TextField
              label="Video Link"
              type="text"
              size="small"
              fullWidth
              margin="normal"
              value={videolink}
              onChange={(e) => setVideolink(e.target.value)}
            />
          )}
          <StyledButton fullWidth onClick={handleSave}>
            Save {tabNames[activeTab]}
          </StyledButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Content;
