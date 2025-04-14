import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import testServices from "../../../services/testService";
import jsPDF from "jspdf";
import { Badge } from "react-bootstrap";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { formatMathJaxContent } from "../../../utils/helper";


const ViewModal = ({ open, onClose, testId }) => {
  const [testDetails, setTestDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [questionsBySection, setQuestionsBySection] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [isOnline, setIsOnline] = useState(null);
  const [isButton, setIsButton] = useState(false);
  const [openDurationPopup, setOpenDurationPopup] = useState(false);
  const [testDuration, setTestDuration] = useState(0);

  useEffect(() => {
  
      fetchTestDetails(testId);
  
  }, [testId, open, ]);


  const handleModeToggle = async (mode) => {
    setIsOnline(mode);

    if (mode === "online") {
      setOpenDurationPopup(true);
      setIsButton(false);
    } else {
      setIsButton(true);
      await updateTestMode("offline", "");
    }
  };

  const handleDurationSubmit = async () => {
    if (testDuration <= 0) {
      alert("Please enter a valid test duration");
      return;
    }
    await updateTestMode("online", testDuration);
    setOpenDurationPopup(false);
  };

  const updateTestMode = async (mode, duration = 0) => {
    try {
      setLoading(true);
      const response = await testServices.updateTestMode(
        testId,
        mode,
        duration
      );

      if (response.success) {
        alert("Test mode updated successfully!");
      } else {
        alert("Failed to update test mode");
      }
    } catch (error) {
      console.error("Error updating test mode:", error);
      alert("Error updating test mode");
    } finally {
      setLoading(false);
    }
  };

  const fetchTestDetails = async (testId) => {
    setLoading(true);
    try {
      const response = await testServices.getTestById(testId);

      if (response.success && response.data) {
        setTestDetails(response.data);
        console.log("The check", response);

        setSections(response.data.sections);

        const questionsData = {};

        await Promise.all(
          response.data.sections.map(async (section) => {
            if (section.questionBankQuestionId.length > 0) {
              console.log("the section",section.questionBankQuestionId);
              
              const res = await testServices.GetQuestionByQid( {
                questionIds: section.questionBankQuestionId,
              });
              questionsData[section._id] = res.questions;
            } else {
              questionsData[section._id] = [];
            }
          })
        );

        setQuestionsBySection(questionsData);
        setSelectedSectionId(response.data.sections[0]?._id);
      }
    } catch (error) {
      console.error("Error fetching test details", error);
    }
    setLoading(false);
  };

  const handleTabChange = (event, newSectionId) => {
    setSelectedSectionId(newSectionId);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(testDetails?.testName || "Question Paper", pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 10;

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 20;

    sections.forEach((section) => {
      const sectionQuestions = questionsBySection[section._id];
      if (sectionQuestions.length > 0) {
        doc.setFontSize(14);
        doc.text(section.subject, 10, yPos);
        yPos += 10;

        sectionQuestions.forEach((q, idx) => {
          const questionText = doc.splitTextToSize(
            `${idx + 1}. ${q.English.replace(/\\/g, "")}`,
            pageWidth - 20
          );
          doc.setFontSize(12);
          doc.text(questionText, 10, yPos);
          yPos += questionText.length * 7;

          q.OptionsEnglish.split(/\\\\/)
            .filter((opt) => opt)
            .forEach((opt, i) => {
              const optionText = doc.splitTextToSize(
                `(${i + 1}) ${opt.replace(/[\(\)]/g, "").trim()}`,
                pageWidth - 30
              );
              doc.text(optionText, 15, yPos);
              yPos += optionText.length * 7;
            });

          yPos += 5;

          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        });

        yPos += 10;
      }
    });

    doc.save(`${testDetails?.testName || "Question_Paper"}.pdf`);
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    const centerText = (text, y) => {
      const textWidth = doc.getTextWidth(text);
      doc.text(text, (pageWidth - textWidth) / 2, y);
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    centerText(testDetails?.testName || "Question Paper", yPos);
    yPos += 10;

    doc.setFontSize(12);
    centerText(`Date: ${new Date().toLocaleDateString()}`, yPos);
    yPos += 20;

    sections.forEach((section) => {
      const sectionQuestions = questionsBySection[section._id];
      if (sectionQuestions.length > 0) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(section.subject, 10, yPos);
        yPos += 10;

        sectionQuestions.forEach((q, idx) => {
          const questionText = doc.splitTextToSize(
            `${idx + 1}. ${q.English.replace(/\\/g, "")}`,
            pageWidth - 20
          );
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          doc.text(questionText, 10, yPos);
          yPos += questionText.length * 7;

          q.OptionsEnglish.split(/\\\\/)
            .filter((opt) => opt)
            .forEach((opt, i) => {
              const optionText = doc.splitTextToSize(
                `(${i + 1}) ${opt.replace(/[\(\)]/g, "").trim()}`,
                pageWidth - 30
              );
              doc.text(optionText, 15, yPos);
              yPos += optionText.length * 7;
            });

          yPos += 5;

          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        });

        yPos += 10;
      }
    });

    doc.autoPrint();
    const pdfBlob = doc.output("bloburl");
    window.open(pdfBlob, "_blank");
  };

  
  const cleanLatexString = (latexString) => {
    return latexString
      .replace(/\\\\/g, " ")
      .replace(/\$([^$]+)\$/g, "\\($1\\)") 
      .replace(/\n/g, "\\\\")
  };
  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
    },
  };

  return (
    <MathJaxContext version={3} config={config}>
    <Box>
      <Modal open={open} onClose={onClose} aria-labelledby="view-modal-title">
        <Box
          sx={{
            width: 700,
            maxHeight: "90vh",
            overflowY: "auto",
            margin: "auto",
            padding: 3,
            bgcolor: "white",
            boxShadow: 24,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            id="view-modal-title"
            gutterBottom
          >
            Test Details
          </Typography>

          <Box style={{ display: "flex", gap: "1rem" }}>
            <Box style={{ display: "flex", gap: "1rem" }}>
              <Button
                variant="contained"
                onClick={() => handleModeToggle("online")}
                disabled={testDetails?.testMode === "offline"}
              >
                Online
              </Button>
              {/* Button to toggle to Offline mode */}
              <Button
                variant="contained"
                onClick={() => handleModeToggle("offline")}
                disabled={testDetails?.testMode === "online"}
              >
                Offline
              </Button>

              {/* Display Badge for Current Mode */}
              <Box style={{ marginLeft: "2rem" }}>
                {testDetails?.testMode === "online" && (
                  <Badge badgeContent="Online" color="primary">
                    <Typography>Current Mode: Online</Typography>
                  </Badge>
                )}

                {testDetails?.testMode === "offline" && (
                  <Badge badgeContent="Offline" color="secondary">
                    <Typography>Current Mode: Offline</Typography>
                  </Badge>
                )}
              </Box>
            </Box>
          </Box>
          {sections.length > 0 && (
            <Tabs
              value={selectedSectionId}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ marginBottom: 2 }}
            >
              {sections.map((section) => (
                <Tab
                  key={section._id}
                  label={section.subject}
                  value={section._id}
                />
              ))}
            </Tabs>
          )}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {(questionsBySection[selectedSectionId] || []).map((q, idx) => (
                <Box
                  key={q._id}
                  sx={{
                    mb: 3,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                  <MathJax
                        style={{ fontSize: "16px", marginBottom: "10px" }}
                      >
                       {`${formatMathJaxContent(q.English)}`}
                      </MathJax>
                  </Typography>
                  <ul className="mt-2 space-y-1">
                  {q.OptionsEnglish.split("\\\\")
                    .filter((option) => option.trim() !== "")
                    .map((option, index) => {
                      const correctAnswers =
                        q.Answer.split("&").map(Number);
                      const isCorrect = correctAnswers.includes(index + 1);

                      const cleanOption = formatMathJaxContent(option.trim());
                      

                      return (
                        <li
                          key={index}
                          className={`mt-1 text-sm flex items-center ${
                            isCorrect ? "text-green-600 font-bold" : ""
                          }`}
                        >
                          <MathJax inline>{`${cleanOption}`}</MathJax>
                        </li>
                      );
                    })}
                </ul>
                </Box>
              ))}
            </Box>
          )}

          {/* Download and Print buttons are disabled when Online */}
          {isButton && (
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={handleDownload}>
                Download
              </Button>
              <Button variant="outlined" onClick={handlePrint}>
                Print
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      <Modal
        open={openDurationPopup}
        onClose={() => setOpenDurationPopup(false)}
        aria-labelledby="test-duration-popup"
      >
        <Box
          sx={{
            width: 400,
            maxHeight: "80vh",
            overflowY: "auto",
            margin: "auto",
            padding: 3,
            bgcolor: "white",
            boxShadow: 24,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            id="test-duration-popup"
            gutterBottom
          >
            Enter Test Duration (in minutes)
          </Typography>
          <TextField
            label="Test Duration"
            variant="outlined"
            fullWidth
            type="number"
            value={testDuration}
            onChange={(e) => setTestDuration(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => setOpenDurationPopup(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDurationSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
    </MathJaxContext>
  );
};

export default ViewModal;
