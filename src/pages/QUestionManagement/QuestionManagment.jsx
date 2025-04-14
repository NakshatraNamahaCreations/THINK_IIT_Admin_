import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Box,
  useMediaQuery,
  Modal,
  Backdrop,
  Fade,
  Divider,
  MenuItem,
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
import { config } from "../../services/config";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import apiServices from "../../services/apiServices";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  fontWeight: "bold",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

// Function to clean and process LaTeX input
// const cleanLatex = (text) => {
//   if (!text) return "";
//   text = text.replace(/\\\\/g, "\\");
//   text = text.replace(/^\$\s*|\s*\$$/g, "");
//   return text;
// };

const cleanLatex = (text) => {
  if (!text) return "";
  return text
    .replace(/\\\\/g, "")
    .replace(/^\$\s*|\s*\$$/g, "")
    .trim();
};

const QuestionManagment = () => {
  const [filters, setFilters] = useState({
    section: "",
    classLevel: "",
    subject: "",
    chapter: "",
    subchapter: "",
    questiontype: "",
    difficultyLevel: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [getQuestion, setGetquestions] = useState([]);
  const [filter, setFiltered] = useState([]);

  const [showSolution, setShowSolution] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  // Fetch Questions
  const getQuestiondata = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_QUESTIONS}QB/questions/`);
      if (res.status === 200) {
        const formattedData = res.data.map((item, index) => ({
          id: item.QID || index + 1,
          sno: index + 1,
          questioncode: item.QID || `Q00${index + 1}`,
          class: item.Class,
          subject: item.Subject,
          chapter: item.Chapter,
          topic: item.Topic,
          difficultylevel: item.Difficulty,
          questiontype: item.Type,
          questiontitle: cleanLatex(item.English),
          options: item.OptionsEnglish
            ? item.OptionsEnglish.split("\n").map(cleanLatex)
            : [],
          answer: cleanLatex(item.Answer || ""),
          numericalanswer: cleanLatex(item.numericalanswer || ""),
          images: item.Images || null,
          solution: cleanLatex(item.SolutionSteps || ""),
        }));
        setGetquestions(formattedData);
        setFiltered(formattedData);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  useEffect(() => {
    getQuestiondata();
  }, []);

  // Delete Question
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `${config.BASE_URL_QUESTIONS}QB/questions/${id}`
      );
      if (res.status === 200) {
        toast.success("Question Deleted Successfully!");
        getQuestiondata();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSolution = (id) => {
    setShowSolution((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  // Open Modal for Viewing Details
  const handleOpenModal = (question) => {
    setSelectedQuestion(question);
    setOpenModal(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFiltered(getQuestion);
    } else {
      const filteredData = getQuestion.filter(
        (question) =>
          (question.questioncode &&
            question.questioncode.toLowerCase().includes(value)) ||
          (question.questiontitle &&
            question.questiontitle.toLowerCase().includes(value)) ||
          (question.subject &&
            question.subject.toLowerCase().includes(value)) ||
          (question.chapter && question.chapter.toLowerCase().includes(value))
      );
      setFiltered(filteredData);
    }
  };

  const [classData, setClassData] = useState([]);

  const getClass = async () => {
    try {
      let data = await apiServices.fetchClasses();

      setClassData(data);
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
  const getSubjects = async () => {
    try {
      let data = await apiServices.fetchSubjects();

      if (data) {
        setSubjectDataFrom(data);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  // Chapter
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

  // SuChapter
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

  // question-type

  // const [questionTypes, setQuestionTypes] = useState([]);
  // const getQuestionTypes = async () => {
  //   let res = await axios.get(`${config.BASE_URL_QUESTIONS}questionType/`);
  //   if (res.status === 200) {
  //     setQuestionTypes(res.data);
  //   }
  // };
  // useEffect(() => {
  //   getQuestionTypes();
  // }, []);

  return (
    <MathJaxContext>
      <div
        style={{ fontFamily: "Poppins", padding: isMobile ? "10px" : "20px" }}
      >
        {/* Header Section */}
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
            sx={{ fontWeight: "bold", color: "#2b3674" }}
          >
            Question Management
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <StyledButton onClick={() => navigate("/question-create")}>
              Create Question
            </StyledButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Question Code"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            // value={filters.uniqueCode}
            // onChange={(e) => setFilters({ ...filters, uniqueCode: e.target.value })}
          />

          <TextField
            label="Class"
            variant="outlined"
            size="small"
            select
            value={filters.classLevel}
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
            {classData?.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option?.className}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Subject"
            variant="outlined"
            size="small"
            select
            value={filters.subject}
            onChange={(e) => {
              const selectedOption = subjectDataFrom.find(
                (option) => option._id === e.target.value
              );

              if (selectedOption) {
                handleChange("subject", selectedOption._id);
                setSelectSubjectName(selectedOption.subjectName);
              }
            }}
          >
            {subjectDataFrom.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.subjectName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Chapter"
            variant="outlined"
            size="small"
            select
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
          >
            {chapterform.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option?.chapterName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Suchapter"
            variant="outlined"
            size="small"
            select
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
          >
            {subchapterData?.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.subchapterName}
              </MenuItem>
            ))}
          </TextField>

          {/* <TextField
    label="Difficulty Level"
    variant="outlined"
    size="small"
    select
    value={filters.difficulty}
    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
  >
    <MenuItem value="Easy">Easy</MenuItem>
    <MenuItem value="Medium">Medium</MenuItem>
    <MenuItem value="Hard">Hard</MenuItem>
  </TextField> */}

          <TextField
            label="Question Type"
            variant="outlined"
            size="small"
            select
            // value={questionType}
            // onChange={(e) => setQuestionType(e.target.value)}
          >
            {/* {questionTypes?.map((ele) => {
                   return <MenuItem value={ele?.title}>{ele?.title}</MenuItem>;
                 })} */}
          </TextField>

          <TextField
            label="Question Paper Language(s)"
            variant="outlined"
            size="small"
            select
            multiple
            // value={filters.languages}
            // onChange={(e) => setFilters({ ...filters, languages: e.target.value })}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
          </TextField>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              // onClick={fetchFilteredQuestions}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              // onClick={() => {
              //   setFilters({
              //     uniqueCode: "",
              //     class: "",
              //     subject: "",
              //     chapter: "",
              //     subChapter: "",
              //     difficulty: "",
              //     questionBank: "",
              //     questionType: "",
              //     languages: [],
              //     isChild: false,
              //   });
              //   fetchFilteredQuestions();
              // }}
            >
              Clear Search
            </Button>
          </Box>
        </Box>

        {/* Question List with Accordions */}
        <Box>
          {filter?.map((row) => (
            <Accordion
              key={row.id}
              sx={{
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "none",
                border: "1px solid #ddd",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${row.id}-content`}
                id={`panel${row.id}-header`}
              >
                {/* Edit & Delete Icons on Left */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "15px",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                    <span style={{ color: "#7366FF" }}>QID:</span>{" "}
                    {row.questioncode}
                  </Typography>

                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <EyeIcon
                      style={{
                        width: "22px",
                        height: "22px",
                        color: "#2563eb",
                        cursor: "pointer",
                      }}
                      title="View"
                      onClick={() => handleOpenModal(row)}
                    />
                    <Link to={`/question-update/${row.id}`}>
                      <PencilSquareIcon
                        style={{
                          width: "22px",
                          height: "22px",
                          color: "#10b981",
                          cursor: "pointer",
                        }}
                        title="Edit"
                      />
                    </Link>
                    <TrashIcon
                      style={{
                        width: "22px",
                        height: "22px",
                        color: "#ef4444",
                        cursor: "pointer",
                      }}
                      title="Delete"
                      onClick={() => handleDelete(row.id)}
                    />
                  </Box>
                </Box>
              </AccordionSummary>

              {/* Expanded Details */}

              <AccordionDetails
                sx={{
                  backgroundColor: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                  }}
                ></Box>
                <Typography>
                  <strong style={{ color: "#2b3674" }}>Question:</strong>
                </Typography>
                <MathJax>
                  <Typography variant="body1">
                    {cleanLatex(row.questiontitle)}
                  </Typography>
                </MathJax>

                {/* Question Image */}
                {row.images && Object.keys(row.images).length > 0 && (
                  <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                    <img
                      src={`data:image/png;base64,${
                        row.images[Object.keys(row.images)[0]]
                      }`}
                      alt="Question"
                      style={{ maxWidth: "50%", borderRadius: "10px" }}
                    />
                  </Box>
                )}
                {row?.options?.length > 0 && (
                  <Typography mt={2}>
                    <strong>Options:</strong>
                  </Typography>
                )}

                {row.options &&
                  row.options
                    .map((option) => cleanLatex(option))
                    .map((option) =>
                      option.replace(/\\item\[[A-D]\]/g, "").trim()
                    )
                    .map((option) =>
                      option.replace(/\\\(|\\\)/g, "").replace(/\\\\/g, "")
                    )
                    .filter(
                      (option) =>
                        option.trim() !== "" &&
                        !option.includes("Unknown environment")
                    )
                    .map((option, index) => (
                      <MathJax key={index}>
                        <Typography variant="body1" sx={{ color: "#555" }}>
                          {/* <strong style={{ color: "#1976D2" }}>
                        ({String.fromCharCode(65 + index)}) 
                        </strong>{" "} */}

                          {`\\(${option}\\)`}
                        </Typography>
                      </MathJax>
                    ))}
                {/* <Typography mt={2}>
                  <strong>Correct Answer:</strong>
                </Typography> */}
                {row?.answer ? (
                  <>
                    <MathJax>
                      <Typography
                        variant="body1"
                        style={{ paddingTop: "12px" }}
                      >
                        <strong>{`\\(${row.answer}\\)`}</strong>
                      </Typography>
                    </MathJax>
                  </>
                ) : (
                  <MathJax>
                    <Typography variant="body1">
                      <strong>{`\\(${row.numericalanswer}\\)`}</strong>
                    </Typography>
                  </MathJax>
                )}

                <Button
                  sx={{
                    marginTop: "10px",
                    color: "#2563eb",
                    fontWeight: "bold",
                  }}
                  onClick={() => toggleSolution(row._id)}
                >
                  {showSolution[row._id] ? "Hide Solution" : "Show Solution"}{" "}
                  {showSolution[row._id] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                {showSolution[row._id] &&
                  row.solution &&
                  row.solution.trim() !== "" && (
                    <MathJax>
                      <Typography
                        variant="body1"
                        sx={{ mt: 2, color: "#444", textAlign: "left" }}
                      >
                        {row.solution}
                      </Typography>
                    </MathJax>
                  )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: "12px",
                // width: isMobile ? "90%" : "600px"
              }}
            >
              {selectedQuestion && (
                <>
                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    Question Details
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  {/* Info Section */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    <Typography>
                      <strong style={{ color: "#7366FF" }}>QID:</strong>{" "}
                      {selectedQuestion.questioncode}
                    </Typography>
                    <Typography>
                      <strong style={{ color: "#10b981" }}>Class:</strong>{" "}
                      {selectedQuestion.class}
                    </Typography>
                    <Typography>
                      <strong style={{ color: "#ef4444" }}>Subject:</strong>{" "}
                      {selectedQuestion.subject}
                    </Typography>
                    <Typography>
                      <strong style={{ color: "#FF9800" }}>Chapter:</strong>{" "}
                      {selectedQuestion.chapter}
                    </Typography>
                    <Typography>
                      <strong style={{ color: "#4CAF50" }}>Sub Chapter:</strong>{" "}
                      {selectedQuestion.topic}
                    </Typography>
                    <Typography>
                      <strong style={{ color: "#9C27B0" }}>Difficulty:</strong>{" "}
                      {selectedQuestion.difficultylevel}
                    </Typography>
                    <Typography>
                      <strong style={{ color: "#607D8B" }}>Type:</strong>{" "}
                      {selectedQuestion.questiontype}
                    </Typography>
                  </Box>

                  {/* Question */}
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
                    >
                      Question:
                    </Typography>
                    <MathJax>
                      <Typography variant="body1" sx={{ color: "#555" }}>
                        {cleanLatex(selectedQuestion.questiontitle)}
                      </Typography>
                    </MathJax>
                  </Box>

                  {/* Options */}
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
                    >
                      Options:
                    </Typography>
                    {selectedQuestion.options
                      .map((option) => cleanLatex(option))
                      .map((option) =>
                        option.replace(/\\item\[[A-D]\]/g, "").trim()
                      )
                      .map((option) =>
                        option.replace(/\\\(|\\\)/g, "").replace(/\\\\/g, "")
                      )
                      .filter(
                        (option) =>
                          option.trim() !== "" &&
                          !option.includes("Unknown environment")
                      )
                      .map((option, index) => (
                        <MathJax key={index}>
                          <Typography variant="body1" sx={{ color: "#555" }}>
                            ({String.fromCharCode(65 + index)})
                            {/* <strong style={{ color: "#1976D2" }}>({index + 1})</strong>{" "} */}
                            {`\\(${option}\\)`}
                          </Typography>
                        </MathJax>
                      ))}
                  </Box>

                  {/* Correct Answer */}
                  <Box sx={{ mt: 3 }}>
                    {/* <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#D32F2F" }}
                    >
                      Correct Answer:
                    </Typography> */}
                    {selectedQuestion?.answer ? (
                      <MathJax>
                        <Typography
                          style={{
                            paddingTop: "12px",
                            fontWeight: "bold",
                            fontSize: "17px",
                          }}
                          variant="body1"
                          sx={{ color: "#555" }}
                        >
                          <strong>{`\\(${selectedQuestion.answer}\\)`}</strong>
                        </Typography>
                      </MathJax>
                    ) : (
                      <Typography
                        variant="body1"
                        style={{ paddingTop: "12px", fontWeight: "bold" }}
                      >
                        <strong>
                          {" "}
                          {cleanLatex(selectedQuestion.numericalanswer)}
                        </strong>
                      </Typography>
                    )}
                  </Box>

                  {/* Image (if exists) */}
                  {/* {selectedQuestion.images && (
                    <Box sx={{ textAlign: "center", mt: 3 }}>
                      <img
                        src={`data:image/png;base64,${
                          selectedQuestion.images[
                            Object.keys(selectedQuestion.images)[0]
                          ]
                        }`}
                        alt="Question"
                        style={{
                          maxWidth: "100%",
                          borderRadius: "10px",
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        }}
                      />
                    </Box>
                  )} */}

                  {/* Close Button */}
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <Button
                      onClick={() => setOpenModal(false)}
                      sx={{
                        backgroundColor: "#D32F2F",
                        color: "white",
                        "&:hover": { backgroundColor: "#B71C1C" },
                      }}
                    >
                      Close
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </MathJaxContext>
  );
};

export default QuestionManagment;
