import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { containerClasses, styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import apiServices from "../../services/apiServices";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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

function QuestionUpdate() {
  const [filters, setFilters] = useState({
    section: "",
    classLevel: "",
    subject: "",
    chapter: "",
    subchapter: "",
    questiontype: "",
    difficultyLevel: "",
  });

  const { id } = useParams();
  console.log(id, "id");
  const navigate = useNavigate();
  const [questiondata, setQuestiondata] = useState({});
  const getQuestionbyId = async () => {
    try {
      let res = await axios.get(
        `${config.BASE_URL_QUESTIONS}QB/questions/${id}`
      );
      if (res.status === 200) {
        let data = res.data;
        setQuestiondata(data);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  useEffect(() => {
    getQuestionbyId();
  }, []);

  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [questionType, setQuestionType] = useState();
  const [optionTextStartsWith, setOptionTextStartsWith] = useState("");
  const [optionTexts, setOptionTexts] = useState(["", "", "", ""]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState("");
  const [selectclassName, setSelectclassName] = useState("");
  const [selectSubjectName, setSelectSubjectName] = useState("");
  // console.log(selectSubjectName,"selectSubjectName")
  const [selectChapter, setSelectChapter] = useState("");
  const [selectSubChapter, setSelectSubChapter] = useState("");
  const [questionText, setQuestionText] = useState(" ");
  const [hindiQuestionText, setHindiQuestionText] = useState("");
  const [answertText, setAnswertext] = useState(" ");
  const [hindiAnswerText, setHindiAnswerText] = useState("");
  const [image, setImage] = useState(null);
  const generateOptionTexts = () => {
    let options = [];
    const start = optionTextStartsWith;

    if (!isNaN(start)) {
      const startNumber = parseInt(start, 10);
      options = Array.from({ length: numberOfOptions }, (_, i) =>
        (startNumber + i).toString()
      );
    } else if (/^[A-Za-z]$/.test(start)) {
      const startCode = start.toUpperCase().charCodeAt(0);
      options = Array.from({ length: numberOfOptions }, (_, i) =>
        String.fromCharCode(startCode + i)
      );
    }

    setOptionTexts(options);
  };

  const options = Array.from({ length: numberOfOptions }, (_, i) =>
    (i + 1).toString()
  );
  useEffect(() => {
    generateOptionTexts();
  }, [numberOfOptions, optionTextStartsWith]);

  const [classData, setClassData] = useState([]);
  const getClass = async () => {
    try {
      let data = await apiServices.fetchClasses();
      setClassData(data.classes);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  useEffect(() => {
    getClass();
  }, []);
  const handleChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value ?? "",
    }));
  };

  // Subject
  const [subjectDataFrom, setSubjectDataFrom] = useState([]);
  const getSubjectByClassId = async () => {
    try {
      let res = await axios.get(
        `${config.BASE_URL_QUESTIONS}subject/class/${filters?.classLevel}`
      );
      if (res.status === 200) {
        console.log("getSubjectByClassId", res);
        setSubjectDataFrom(res.data || []);
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

  // Chapter
  const [chapterform, setChapterform] = useState([]);
  const getChapterById = async () => {
    try {
      let res = await axios.get(
        `${config.BASE_URL_QUESTIONS}chapter/subject/${filters?.subject}`
      );
      if (res.status === 200) {
        setChapterform(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };
  useEffect(() => {
    getChapterById();
  }, [filters.subject]);

  // SuChapter
  const [subchapterData, setSubchapterData] = useState([]);

  const getsubChapterByChapterId = async () => {
    let res = await axios.get(
      `${config.BASE_URL_QUESTIONS}subchapter/chapter/${filters?.chapter}`
    );
    if (res.status === 200) {
      setSubchapterData(res.data || []);
    }
  };
  useEffect(() => {
    getsubChapterByChapterId();
  }, [filters.chapter]);

  // question-type

  const [questionTypes, setQuestionTypes] = useState([]);
  const getQuestionTypes = async () => {
    let res = await axios.get(`${config.BASE_URL_QUESTIONS}questionType/`);
    if (res.status === 200) {
      setQuestionTypes(res.data || []);
    }
  };
  useEffect(() => {
    getQuestionTypes();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectclassName) formData.append("Class", selectclassName);
    if (selectSubjectName) formData.append("Subject", selectSubjectName);
    if (questionType) formData.append("Type", questionType);
    if (selectChapter) formData.append("Chapter", selectChapter);
    if (selectSubChapter) formData.append("Topic", selectSubChapter);
    if (difficultyLevel) formData.append("Difficulty", difficultyLevel);
    if (questionText) formData.append("English", questionText);
    if (hindiQuestionText) formData.append("Hindi", hindiQuestionText);
    if (answertText) formData.append("OptionsEnglish", answertText);
    if (hindiAnswerText) formData.append("OptionsHindi", hindiAnswerText);
    if (numberOfOptions) formData.append("NoOfOptions", numberOfOptions);
    if (optionTextStartsWith)
      formData.append("optionTextStartsWith", optionTextStartsWith);
    if (options.length > 0) formData.append("Options", options);
    if (selectedOptions.length > 0) formData.append("Answer", selectedOptions);
    if (image) formData.append("Images", image);

    try {
      const response = await axios.put(
        `${config.BASE_URL_QUESTIONS}QB/questions/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Question Updated successfully!");
        navigate("/question-management");
      } else {
        toast.error("Failed to update question.");
      }
    } catch (error) {
      console.error("Error posting question:", error);
      toast.error("Error posting question. Please try again.");
    }
  };

  return (
    <Box p={2}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{
          marginBottom: 3,
          textTransform: "none",
          fontWeight: "bold",
          color: "#2563eb",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Back to Question List
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box display="flex" flexDirection="column" gap={5}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel size="small">Class</InputLabel>
              <Select
                size="small"
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
            <FormControl fullWidth>
              <InputLabel size="small">Subject</InputLabel>
              <Select
                size="small"
                label="Subject"
                value={filters.subject || questiondata.Subject}
                onChange={(e) => {
                  const selectedOption = subjectDataFrom.find(
                    (option) => option._id === e.target.value
                  );

                  if (selectedOption) {
                    handleChange("subject", selectedOption._id);
                    setSelectSubjectName(selectedOption.subjectName);
                  }
                }}
                // onChange={(e) => handleChange("subject", e.target.value)}
              >
                {subjectDataFrom.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.subjectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel size="small">Chapter</InputLabel>
              <Select
                size="small"
                label="Chapter"
                value={filters.chapter}
                onChange={(e) => {
                  const selectedOption = chapterform.find(
                    (option) => option._id === e.target.value
                  );

                  if (selectedOption) {
                    handleChange("chapter", selectedOption._id);
                    setSelectChapter(selectedOption.chapterName);
                  }
                }}
                // onChange={(e) => handleChange("chapter", e.target.value)}
              >
                {chapterform.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option?.chapterName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel size="small">SubChapter</InputLabel>
              <Select
                size="small"
                label="SubChapter"
                value={filters.subchapter}
                onChange={(e) => {
                  const selectedOption = subchapterData.find(
                    (option) => option._id === e.target.value
                  );

                  if (selectedOption) {
                    handleChange("subchapter", selectedOption._id);
                    setSelectSubChapter(selectedOption.subchapterName);
                  }
                }}
                // onChange={(e) => handleChange("subchapter", e.target.value)}
              >
                {subchapterData?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.subchapterName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              select
              label="Difficulty Level"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Select the level</MenuItem>
              <MenuItem value="Level-1">Level-1</MenuItem>
              <MenuItem value="Level-2">Level-2</MenuItem>
              <MenuItem value="Level-3">Level-3</MenuItem>
              <MenuItem value="Level-4">Level-4</MenuItem>
            </TextField>

            <TextField
              size="small"
              select
              label="Question Type"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              fullWidth
            >
              {questionTypes?.map((ele) => {
                return <MenuItem value={ele?.title}>{ele?.title}</MenuItem>;
              })}
            </TextField>
            <TextField
              size="small"
              select
              label="Language"
              // value={language}
              // onChange={(e) => setLanguage(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Select Language</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
              <MenuItem value="Gujarati">Gujarati</MenuItem>
            </TextField>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography variant="h6">{questionType}</Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Question Section
            </AccordionSummary>

            <AccordionDetails>
              <TextField
                multiline
                minRows={5}
                variant="outlined"
                fullWidth
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Answer Section
            </AccordionSummary>

            <AccordionDetails>
              <TextField
                multiline
                minRows={5}
                variant="outlined"
                fullWidth
                value={answertText}
                onChange={(e) => setAnswertext(e.target.value)}
                placeholder="Enter your question here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </AccordionDetails>
          </Accordion>
          {questionType === "Numerical" && (
            <TextField
              size="small"
              style={{ marginBottom: "10px", marginTop: "10px" }}
              label="Enter Answer..."
              variant="outlined"
              fullWidth
              // value={answertText}
              // onChange={(e) => setAnswertext(e.target.value)}
            />
          )}

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Solution Section
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                size="small"
                multiline
                minRows={5}
                variant="outlined"
                fullWidth
                // value={solution}
                // onChange={(e) => setSolution(e.target.value)}
                // placeholder="Enter your question here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </AccordionDetails>
          </Accordion>

          {(questionType === "Single Choice" ||
            questionType === "Multiple Choice") && (
            <>
              <FormControl fullWidth className="mt-3">
                <InputLabel>Number of Options</InputLabel>
                <Select
                  value={numberOfOptions}
                  label="Number of Options"
                  onChange={(e) => setNumberOfOptions(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Option Text Starts With"
                className="mt-3"
                variant="outlined"
                fullWidth
                placeholder="A or 1"
                value={optionTextStartsWith}
                onChange={(e) => setOptionTextStartsWith(e.target.value)}
              />
              <TextField
                select
                label="Option Text"
                className="mt-3"
                variant="outlined"
                fullWidth
                placeholder="Select Option"
              >
                {optionTexts.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <Autocomplete
                // multiple
                options={optionTexts}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                value={selectedOptions}
                onChange={(event, newValue) => setSelectedOptions(newValue)}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox checked={selected} sx={{ marginRight: 1 }} />
                    {option}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Answer Options"
                    placeholder="Search"
                    fullWidth
                    variant="outlined"
                    className="mt-3"
                  />
                )}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </>
          )}
          <StyledButton sx={{ marginTop: "20px" }} onClick={handleSubmit}>
            Save Question
          </StyledButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default QuestionUpdate;
