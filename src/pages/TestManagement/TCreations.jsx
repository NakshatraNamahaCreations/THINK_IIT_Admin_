import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Paper,
  IconButton,
  Tabs,
  Tab,
  FormControlLabel,
  Radio,
  RadioGroup,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemIcon,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardHeader,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { styled } from "@mui/system";

import {
  createNewSection,
  createTest,
  deleteSection,
  updatetheQuestiona,
} from "../../services/test_creations_service";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getTestTemplates,
  getTestTemplatesNames,
} from "../../services/testTemplateService";
import { config } from "../../services/config";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
const SectionCard = styled(Card)({
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  marginBottom: "20px",
});

const InfoBox = ({ title, value }) => (
  <Box
    sx={{
      p: 2,
      borderRadius: 1,
      backgroundColor: "#F5F5F5",
      boxShadow: "inset 0px 1px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{ fontWeight: "600", color: "#283563" }}
    >
      {title}
    </Typography>
    <Typography variant="body1" sx={{ color: "#555" }}>
      {value || "N/A"}
    </Typography>
  </Box>
);

const TestCreationN = () => {
  const [filters, setFilters] = useState({
    section: "",
    classLevel: "",
    subject: "",
    chapter: "",
    subchapter: "",
    questiontype: "",

    difficultyLevel: "",
  });

  const [step, setStep] = useState(1);

  const [test, setTest] = useState([]);
  const [subjectDataFrom, setSubjectDataFrom] = useState([]);
  const [classData, setClassData] = useState([]);

  const [selectclassName, setSelectclassName] = useState("");

  const [questionBank, setQuestionBank] = useState([]);

  const filteredQuestions = questionBank;

  const [questionTypeData, setQuestionTypeData] = useState([]);
  const [questionType, setQuestionType] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState("");
  const [marksPerCorrectPart, setMarksPerCorrectPart] = useState("");
  const [marksPerSection, setMarksPerSection] = useState("");
  const [minQuestionsAnswerable, setMinQuestionsAnswerable] = useState("");
  const [negativeMarksPerWrongAnswer, setNegativeMarksPerWrongAnswer] =
    useState("");
  const [questionSelection, setQuestionSelection] = useState("");
  const [templatename, setTemplatename] = useState("");
  const [ResponseData, setResponseData] = useState([]);

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedSection1, setSelectedSection1] = useState(null);

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(questionId)
        ? prevSelected.filter((id) => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const [testData, setTestData] = useState({
    templateId: templatename,
    sections: [],
  });

  const [editIndex, setEditIndex] = useState(null); // Track index for editing

  // Function to reset form fields
  const resetForm = () => {
    setQuestionType("");
    setSectionName("");
    setNumberOfQuestions("");
    setMarksPerQuestion("");
    setMarksPerCorrectPart("");
    setMarksPerSection("");
    setMinQuestionsAnswerable("");
    setNegativeMarksPerWrongAnswer("");
    setQuestionSelection("");
    setEditIndex(null);
  };

  // Function to validate required fields
  const validateFields = () => {
    if (
      !sectionName ||
      !questionType ||
      !numberOfQuestions ||
      !marksPerQuestion
    ) {
      toast.error("Please fill in all required fields!");
      return false;
    }
    return true;
  };

  // Update testData.templateId whenever templatename changes
  useEffect(() => {
    setTestData((prev) => ({
      ...prev,
      templateId: templatename,
    }));
  }, [templatename]);
  // Function to save section
  const handleSaveSection = () => {
    if (!validateFields()) return;

    const newSection = {
      sectionName,
      questionType,
      numberOfQuestions: Number(numberOfQuestions),
      marksPerQuestion: Number(marksPerQuestion),
      marksPerCorrectPart: Number(marksPerCorrectPart) || 0,
      marksPerSection: Number(numberOfQuestions) * Number(marksPerQuestion),
      minQuestionsAnswerable: Number(minQuestionsAnswerable) || 0,
      negativeMarksPerWrongAnswer: Number(negativeMarksPerWrongAnswer) || 0,
      questionSelection,
      section_status: "incomplete",
    };

    setTestData((prev) => ({
      ...prev,
      templateId: templatename,
      sections:
        editIndex !== null
          ? prev.sections.map((s, i) => (i === editIndex ? newSection : s))
          : [...prev.sections, newSection],
    }));

    toast.success(
      editIndex !== null
        ? "Section updated successfully!"
        : "Section added successfully!"
    );
    resetForm();
  };

  // Function to edit section
  const handleEditSection = (index) => {
    const section = testData.sections[index];
    setSectionName(section.sectionName);
    setQuestionType(section.questionType);
    setNumberOfQuestions(section.numberOfQuestions);
    setMarksPerQuestion(section.marksPerQuestion);
    setMarksPerCorrectPart(section.marksPerCorrectPart);
    setMarksPerSection(section.marksPerSection);
    setMinQuestionsAnswerable(section.minQuestionsAnswerable);
    setNegativeMarksPerWrongAnswer(section.negativeMarksPerWrongAnswer);
    setQuestionSelection(section.questionSelection);
    setEditIndex(index);
  };

  // Function to create test
  const handleTestCreate = async () => {
    if (!templatename) {
      toast.error("Please select a template!");
      return;
    }

    const payload = {
      templateId: templatename,
      sections: [
        {
          sectionName,
          questionType,
          numberOfQuestions,
          marksPerQuestion,
          marksPerCorrectPart,
          marksPerSection: numberOfQuestions * marksPerQuestion,
          minQuestionsAnswerable,
          negativeMarksPerWrongAnswer,
          questionSelection,
        },
      ],
    };

    try {
      const res =
        !ResponseData ||
        !ResponseData.sections ||
        ResponseData.sections.length === 0
          ? await createTest(payload) // If no test exists, create a new one
          : await createNewSection(ResponseData._id, payload); // Otherwise, add a section

      setResponseData(res.data);

      setQuestionType("");
      setSectionName("");
      setNumberOfQuestions("");
      setMarksPerQuestion("");
      setMarksPerCorrectPart("");
      setMarksPerSection("");
      setMinQuestionsAnswerable("");
      setNegativeMarksPerWrongAnswer("");
      setQuestionSelection("");
      setEditIndex(null);
      // setStep((prevStep) => prevStep + 1);
      toast.success("Test created successfully!");
    } catch (error) {
      console.error("Test creation failed", error);
      toast.error("Failed to create test. Please try again.");
    }
  };

  console.log("ResponseData", selectedSection, ResponseData);
  // Function to uodated the questions using sectionid
  const handleUodateQuestions = async () => {
    if (!ResponseData?._id) {
      toast.error("test not selected error!");
      return;
    }

    try {
      const res = await updatetheQuestiona(
        ResponseData?._id,
        selectedSection._id,
        selectedQuestions
      ); // Otherwise, add a section

      setResponseData(res.data);

      setStep((prevStep) => prevStep + 1);
      toast.success("Test created successfully!");
    } catch (error) {
      console.error("Test creation failed", error);
      toast.error("Failed to create test. Please try again.");
    }
  };
  const handleSectionDelete = async (testId, sectionId) => {
    if (!testId || !sectionId) {
      toast.error("Please select a testId!");
      return;
    }

    try {
      const res = await deleteSection(testId, sectionId);
      setResponseData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClass();

    getQuestiontype();
  }, []);

  // Function to update filters state
  const handleChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value ?? "", // Ensures it never sets undefined
    }));
  };

  console.log("test updated", test);
  useEffect(() => {
    const getTest = async () => {
      try {
        const formattedData = await getTestTemplatesNames();
        setTest(formattedData);
      } catch (error) {
        console.error("Failed to fetch test templates:", error);
      }
    };

    getTest();
  }, []);

  const getClass = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_QUESTIONS}class/`);
      if (res.status === 200) {
        setClassData(res.data);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const getSubjectByClassId = async () => {
    try {
      let res = await axios.get(
        `${config.BASE_URL_QUESTIONS}subject/class/${filters?.classLevel}`
      );
      if (res.status === 200) {
        console.log("getSubjectByClassId", res);
        setSubjectDataFrom(res.data);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  useEffect(() => {
    if (filters.classLevel) {
      getSubjectByClassId();
    }
  }, [filters.classLevel]);

  ///based on subject get the chapter

  const [chapterform, setChapterform] = useState([]);

  const getChapterById = async () => {
    try {
      let res = await axios.get(
        `${config.BASE_URL_QUESTIONS}chapter/subject/${filters?.subject}`
      );
      if (res.status === 200) {
        setChapterform(res.data);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };
  useEffect(() => {
    getChapterById();
  }, [filters.subject]);

  const [subchapterData, setSubchapterData] = useState([]);

  const getsubChapterByChapterId = async () => {
    let res = await axios.get(
      `${config.BASE_URL_QUESTIONS}subchapter/chapter/${filters?.chapter}`
    );
    if (res.status === 200) {
      setSubchapterData(res.data);
    }
  };
  useEffect(() => {
    getsubChapterByChapterId();
  }, [filters.chapter]);

  const getQuestiontype = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_QUESTIONS}questiontype/`);
      if (res.status === 200) {
        setQuestionTypeData(res.data);
      }
    } catch (error) {
      console.error("Error fetching question types:", error);
    }
  };

  const getQuestion = async () => {
    try {
      let res = await axios.get(
        `${config.BASE_URL_QUESTIONS}QB/question/filter?Class=${selectclassName}&Type=${selectedSection?.questionType}`
      );
      if (res.status === 200) {
        setQuestionBank(res.data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Function to save and move to next step
  const handleSaveSectionAndNext = () => {
    handleSaveSection();
    if (testData.sections.length > 0) {
      setStep(step + 1);
      return;
    }
  };

  const tabs = [
    { id: 1, label: "Create Sections" },
    { id: 2, label: "Add Questions" },
    { id: 3, label: "Section Details" },
    { id: 4, label: "Preview" },
  ];

  const [testTemplates, setTestTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const templates = await getTestTemplates();
    setTestTemplates(templates);
  };

  const [scheduleDates, setScheduleDates] = useState({});
  const [resultDates, setResultDates] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const handleScheduleDateChange = (id, value) => {
    setScheduleDates((prev) => ({ ...prev, [id]: value }));
  };

  const handleResultDateChange = (id, value) => {
    setResultDates((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };
  const [batches, setBatches] = React.useState([]);
  console.log(batches, "batches");
  const getBatches = async () => {
    let res = await axios.get(`${config.BASE_URL_TEST}batches/`);
    const batches = res.data.map((batches, index) => ({
      ...batches,
      id: batches._id,
      sno: index + 1,
      createdAt: moment(batches.createdAt).format("DD/MM/YYYY"),
    }));
    setBatches(res.data);
  };
  useEffect(() => {
    getBatches();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, backgroundColor: "white", minHeight: "100vh" }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={step === tab.id ? "contained" : "outlined"}
              onClick={() => setStep(tab.id)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        {step === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Sections Overview
              </Typography>

              {ResponseData?.sections?.map((ele, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 2,
                    marginBottom: 2,
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Section {index + 1}: {ele.sectionName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Question Type: <strong>{ele?.questionType}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      No. of Questions: <strong>{ele.numberOfQuestions}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Marks per Question:{" "}
                      <strong>{ele.marksPerQuestion}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Marks per Section: <strong>{ele.marksPerSection}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Min. Questions Answerable:{" "}
                      <strong>{ele.minQuestionsAnswerable}</strong>
                    </Typography>
                  </CardContent>

                  {/* Buttons for Edit and Delete */}
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 16px 12px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditSection(index)}
                    >
                      Edit
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleSectionDelete(ResponseData?._id, ele._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  padding: 3,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Configure Test Sections
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Template</InputLabel>
                      <Select
                        value={templatename}
                        label="Select Template"
                        onChange={(e) => setTemplatename(e.target.value)}
                      >
                        {test.map((template, index) => (
                          <MenuItem key={index} value={template._id}>
                            {template.templatename}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Section Name"
                      variant="outlined"
                      size="small"
                      type="text"
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Question Type</InputLabel>
                      <Select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        label="Question Type"
                      >
                        {questionTypeData.map((item) => (
                          <MenuItem value={item.questionType}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Number of Questions(across all subjects)"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={numberOfQuestions}
                      onChange={(e) => setNumberOfQuestions(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Marks per Question"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={marksPerQuestion}
                      onChange={(e) => setMarksPerQuestion(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Marks per Correct Part (Optional)"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={marksPerCorrectPart}
                      onChange={(e) => setMarksPerCorrectPart(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Marks per Section"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={numberOfQuestions * marksPerQuestion}
                      onChange={(e) => setMarksPerSection(e.target.value)}
                      sx={{ background: "lightgoldenrodyellow" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Negative Marks"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={negativeMarksPerWrongAnswer}
                      onChange={(e) =>
                        setNegativeMarksPerWrongAnswer(e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Min. Questions to be Answered"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={minQuestionsAnswerable}
                      onChange={(e) =>
                        setMinQuestionsAnswerable(e.target.value)
                      }
                    />
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <FormControl component="fieldset">
                        <Typography variant="body1">
                          Question Selection
                        </Typography>
                        <RadioGroup
                          row
                          value={questionSelection}
                          onChange={(e) => setQuestionSelection(e.target.value)}
                        >
                          <FormControlLabel
                            value="auto"
                            control={<Radio />}
                            label="Auto"
                          />
                          <FormControlLabel
                            value="manual"
                            control={<Radio />}
                            label="Manual"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 3,
                  }}
                >
                  <Button variant="contained" color="grey" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTestCreate}
                  >
                    {editIndex !== null ? "Update Section" : "Save Section"}
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {step === 2 && (
          <>
            {selectedSection ? (
              <Box sx={{ width: "20%" }}>
                <Card sx={{ width: "50%", mb: 2, p: 2 }}>
                  <Typography variant="h6">
                    {selectedSection.sectionTitle}
                  </Typography>
                  <Typography variant="body1">
                    Questions: {selectedSection.numberOfQuestions}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {selectedSection.sectionStatus}
                  </Typography>
                </Card>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary"></Typography>
            )}

            <Box
              p={3}
              // component={Paper}
              elevation={3}
              sx={{ display: "flex", gap: 2, padding: 0 }}
            >
              {/* Left Section - Filters */}
              <Box
                style={{
                  width: "385px",
                  padding: 10,
                  background: "#d3d3d326",
                  height: "100vh",
                }}
                // component={Paper}
              >
                <Typography variant="h6" gutterBottom>
                  Curriculum Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Section</InputLabel>
                      <Select
                        label="Section"
                        value={filters.section}
                        onChange={(e) => {
                          const selectedSection = ResponseData?.sections?.find(
                            (item) => item.sectionTitle === e.target.value
                          );

                          if (selectedSection) {
                            handleChange(
                              "section",
                              selectedSection.sectionTitle
                            );
                            setSelectedSection(selectedSection); // ✅ Store selected section data
                          }
                        }}
                      >
                        {ResponseData?.sections?.map((item, index) => (
                          <MenuItem key={index} value={item.sectionTitle}>
                            {item.sectionTitle}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Class</InputLabel>
                      <Select
                        value={filters.classLevel}
                        label="Class"
                        onChange={(e) => {
                          const selectedOption = classData.find(
                            (option) => option._id === e.target.value
                          );

                          if (selectedOption) {
                            handleChange("classLevel", selectedOption._id); // Setting _id

                            setSelectclassName(selectedOption.className);
                          }
                        }}
                      >
                        {classData.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.className}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Difficulty Level</InputLabel>
                      <Select
                        label="difficultyLevel"
                        value={filters.difficultyLevel}
                        onChange={(e) =>
                          handleChange("difficultyLevel", e.target.value)
                        }
                      >
                        <MenuItem value="">Select the level</MenuItem>
                        <MenuItem value="Level-1">Level-1</MenuItem>
                        <MenuItem value="Level-2">Level-2</MenuItem>
                        <MenuItem value="Level-3">Level-3</MenuItem>
                        <MenuItem value="Level-4">Level-4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Subject</InputLabel>
                      <Select
                        label="Subject"
                        value={filters.subject}
                        onChange={(e) =>
                          handleChange("subject", e.target.value)
                        }
                      >
                        {subjectDataFrom.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.subjectName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Chapter</InputLabel>
                      <Select
                        label="Chapter"
                        value={filters.chapter}
                        onChange={(e) =>
                          handleChange("chapter", e.target.value)
                        }
                      >
                        {chapterform.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option?.chapterName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>SubChapter</InputLabel>
                      <Select
                        label="SubChapter"
                        value={filters.subchapter}
                        onChange={(e) =>
                          handleChange("subchapter", e.target.value)
                        }
                      >
                        {subchapterData?.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.subchapterName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="Question Type"
                        value={selectedSection?.questionType || ""}
                        fullWidth
                        variant="outlined"
                        size="small"
                        disabled
                      />
                    </FormControl>
                    <Box sx={{ mt: 3, mb: 2 }}>
                      <Button
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick={getQuestion}
                      >
                        Get Questions
                      </Button>
                      {/* <Button variant="outlined">Upload From File</Button> */}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Right Section - Question List */}

              <Box sx={{ flex: 8, p: 2 }}>
                <List
                  sx={{
                    maxHeight: 300,
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  |{" "}
                  <div variant="body2" sx={{ mt: 2, height: "100px" }}>
                    Questions.
                  </div>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                      <ListItem
                        key={q.id}
                        button
                        onClick={() => toggleQuestionSelection(q._id)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={selectedQuestions.includes(q._id)}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "inline-block",
                                minWidth: "80%",
                                overflowWrap: "break-word",
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                {q.QID}
                              </Typography>
                              {/* <Typography
                                variant="body1"
                                sx={{ fontSize: "16px" }}
                              >
                                <MathJax>{"\\(" + q.English + "\\)"}</MathJax>
                              </Typography> */}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <div variant="body2" sx={{ mt: 2, height: "100px" }}>
                      No questions found.
                    </div>
                  )}
                </List>

                <Box
                  style={{
                    padding: "10px",
                    display: "flex",
                    gap: "20px",
                    position: "absolute",
                    bottom: 10,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveSectionAndNext}
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "6px 16px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUodateQuestions}
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "6px 16px",
                    }}
                  >
                    Save Section & Next
                  </Button>
                  {/* <Button
                    variant="contained"
                    color="success"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "6px 16px",
                    }}
                    onClick={handleUodateQuestions}
                  >
                    Submit
                  </Button> */}
                </Box>
              </Box>
            </Box>
          </>
        )}

        {step === 3 && (
          <Box>
            <div className="row">
              <div>
                {/* Section Tabs */}
                <div
                  className="fuiw mb-3"
                  style={{ display: "flex", gap: "20px" }}
                >
                  {ResponseData?.sections.map((item, index) => (
                    <div
                      key={item._id}
                      className="fhd"
                      onClick={() => setSelectedSection1(item)} // ✅ Update selected section
                      style={{
                        width: "fit-content",
                        cursor: "pointer",
                        padding: "10px",
                        border:
                          selectedSection1?._id === item._id
                            ? "2px solid blue"
                            : "1px solid gray", // ✅ Highlight selected
                        backgroundColor:
                          selectedSection1?._id === item._id
                            ? "#e0f7fa"
                            : "white",
                        borderRadius: "5px",
                      }}
                    >
                      <div>{item.sectionTitle}</div>
                      <div>Total Questions: {item.numberOfQuestions}</div>
                      <div>
                        Status:{" "}
                        <span style={{ color: "green" }}>
                          {item.sectionStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Questions Section */}
                <div className="col-md-offset-3">
                  <div className="tab" role="tabpanel">
                    <div className="row">
                      <div className="col-md-8">
                        {selectedSection1?.questionBankQuestionId?.length >
                        0 ? (
                          selectedSection1.questionBankQuestionId.map(
                            (qId, index) => (
                              <Accordion key={index} defaultExpanded>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls={`panel-${index}-content`}
                                  id={`panel-${index}-header`}
                                >
                                  <Typography>
                                    Question {index + 1}: {qId}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    {/* Fetch and show question details from the backend if needed */}
                                    Question ID: {qId}
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )
                          )
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No questions found for this section.
                          </Typography>
                        )}
                      </div>

                      {/* Buttons for Navigation */}
                      <div className="col-md-3 mt-3">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setStep(2)}
                          sx={{ marginRight: 2 }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setStep(4)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        )}

        {step === 4 && (
          <Box>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: "600", color: "#283563" }}
            >
              Test Details
            </Typography>

            <SectionCard>
              <CardHeader
                title="Test Information"
                sx={{
                  backgroundColor: "#283563",
                  color: "#fff",
                  py: 1.5,
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <InfoBox
                      title="Title"
                      value={testTemplates[1]?.tempName || "maths test"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InfoBox
                      title="Duration"
                      value={testTemplates[0]?.duration || "N/A"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InfoBox
                      title="Total Marks"
                      value={testTemplates[0]?.totalMarks || "N/A"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InfoBox
                      title="Class"
                      value={testTemplates[0]?.tempName || "N/A"}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </SectionCard>

            <SectionCard>
              <CardHeader
                title="Section Details"
                sx={{
                  backgroundColor: "#283563",
                  color: "#fff",
                  py: 1.5,
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  {ResponseData?.sections?.map((item, index) => (
                    <Grid item xs={12} sm={6} key={item._id}>
                      <InfoBox
                        title={`Section: ${item.sectionTitle}`}
                        value={`Questions: ${item.numberOfQuestions}, Marks per Question: ${item.marksPerQuestion}`}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={6}>
                    <InfoBox
                      title="Total Sections"
                      value={ResponseData?.sections?.length || "0"}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </SectionCard>

            <Typography
              variant="h5"
              sx={{ mt: 4, mb: 3, fontWeight: "600", color: "#283563" }}
            >
              Batch Details
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
              <Tabs
                variant="fullWidth"
                sx={{
                  backgroundColor: "#283563",
                  color: "#fff",
                  borderRadius: 1,
                  marginBottom: 2,
                }}
              >
                <Tab label="Batch ID" style={{ color: "white" }} />
                <Tab label="Batch Name" style={{ color: "white" }} />
                <Tab label="Class" style={{ color: "white" }} />
                <Tab label="Year" style={{ color: "white" }} />
                <Tab label="Schedule Date" style={{ color: "white" }} />
                <Tab label="Result Date" style={{ color: "white" }} />
                <Tab label="Select" style={{ color: "white" }} />
              </Tabs>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Batch ID</TableCell>
                      <TableCell>Batch Name</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Batch Year</TableCell>
                      <TableCell>Schedule Date</TableCell>
                      <TableCell>Result Date</TableCell>
                      <TableCell>Select</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {batches.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item._id}</TableCell>
                        <TableCell>{item.batch_name}</TableCell>
                        <TableCell>{item.class}</TableCell>
                        <TableCell>{item.batch_year}</TableCell>

                        {/* Editable Schedule Date */}
                        <TableCell>
                          <TextField
                            type="date"
                            size="small"
                            value={scheduleDates[item._id] || ""}
                            onChange={(e) =>
                              handleScheduleDateChange(item._id, e.target.value)
                            }
                            fullWidth
                          />
                        </TableCell>

                        {/* Editable Result Date */}
                        <TableCell>
                          <TextField
                            type="date"
                            size="small"
                            value={resultDates[item._id] || ""}
                            onChange={(e) =>
                              handleResultDateChange(item._id, e.target.value)
                            }
                            fullWidth
                          />
                        </TableCell>

                        {/* Checkbox for Selection */}
                        <TableCell>
                          <Checkbox
                            checked={checkedItems[item._id] || false}
                            onChange={(e) =>
                              handleCheckboxChange(item._id, e.target.checked)
                            }
                            color="primary"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Navigation Buttons */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#283563",
                  color: "#fff",
                  textTransform: "none",
                }}
                onClick={() => console.log("Back")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#283563",
                  color: "#fff",
                  textTransform: "none",
                }}
                // onClick={handleNextStep}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default TestCreationN;
