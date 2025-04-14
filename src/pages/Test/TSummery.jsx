import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Paper, TextField } from "@mui/material";
import patternData from "./PreSection/Pattern.json";
import testServices from "../../services/testService";
import { useNavigate, useParams } from "react-router-dom";

const summaryData = {
  patternData: [
    {
      section: "Section A",
      queueType: "SCQ",
      subjects: ["Physics", "Chemistry"],
      CM: 4,
      NM: -1,
      maxQuestions: 5,
      minQuestions: 8,
      marks: 32,
      time: 60,
    },
    {
      section: "Section B",
      queueType: "MCQ",
      subjects: ["Physics", "Chemistry"],
      CM: 4,
      NM: -1,
      maxQuestions: 10,
      minQuestions: 8,
      marks: 32,
      time: 60,
    },
    {
      section: "Section C",
      queueType: "CMP",
      subjects: ["Physics", "Chemistry"],
      CM: 4,
      NM: -1,
      maxQuestions: 10,
      minQuestions: 8,
      marks: 32,
      time: 60,
    },
  ],
  userSelection: [
    {
      section: "Section A",
      selectedMax: 5,
      minAnswerable: 5,
      marks: 16,
      time: 32,
    },
    {
      section: "Section B",
      selectedMax: 5,
      minAnswerable: 5,
      marks: 10,
      time: 32,
    },
    {
      section: "Section C",
      selectedMax: 5,
      minAnswerable: 5,
      marks: 5,
      time: 10,
    },
  ],
};

const SummaryPage = () => {
  const [userSelectionData, setUserSelectionData] = useState(
    summaryData.userSelection
  );
  const [summaryData1, setSummaryData1] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [totalTime, setTotalTime] = useState(180);

  const { id } = useParams();
  const navigate = useNavigate();
  const fetchTestDataById = async () => {
    try {
      const response = await testServices.getTestById(id);
      const test = response?.data;
      const testName = test?.testPattern;
      const realSections = test?.sections || [];

      const matchedPattern = patternData.find((p) => p.exam === testName);
      if (!matchedPattern) return;

      const enrichedSections = matchedPattern.sections.map(
        (patternSection, index) => {
          const dbSection =
            realSections.find(
              (sec) =>
                sec.sectionName?.trim()?.toLowerCase() ===
                patternSection.section?.trim()?.toLowerCase()
            ) || {};
          return {
            ...patternSection,
            sectionId: dbSection._id || null,
            questionType: dbSection.questionType || patternSection.questionType,
            correctAnswerMarks: dbSection.marksPerQuestion || patternSection.CM,
            negativeMarks:
              dbSection.negativeMarksPerWrongAnswer || patternSection.NM,
            maxQuestion:
              dbSection.numberOfQuestions || patternSection.maxQuestions,
            minQuestion:
              dbSection.minQuestionsAnswerable || patternSection.minQuestions,
            marks: dbSection.marks || patternSection.marks,
            time: dbSection.testDuration || patternSection.time,
            subjects:
              dbSection.subjects?.map((s) => s.subjectName) ||
              patternSection.subjects,
          };
        }
      );

      const userSelectionFormatted = realSections.map((section) => ({
        section: section.sectionName,
        selectedMax: section.numberOfQuestions || "",
        minAnswerable: section.minQuestionsAnswerable || "",
        marks: section.marks || "",
        time: section.testDuration || "",
        CM: section.marksPerQuestion || "",
        NM: section.negativeMarksPerWrongAnswer || "",
        subjects: section.subjects.map((s) => s.subjectName).join(", "),
        questionType: section.questionType || "",
      }));

      setSelectedExam({
        ...matchedPattern,
        sections: enrichedSections,
      });

      setUserSelectionData(userSelectionFormatted);
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  useEffect(() => {
    setSummaryData1(patternData);
    fetchTestDataById();
  }, []);

  const handleChange = (e, field, index) => {
    const updatedData = [...userSelectionData];
    updatedData[index][field] = e.target.value;
    setUserSelectionData(updatedData);
  };

  const handleReviewAndGenerate = async () => {
    try {
      if (!selectedExam?.sections?.length) return;

      for (let i = 0; i < selectedExam.sections.length; i++) {
        const section = selectedExam.sections[i];
        const sectionId = section.sectionId;

        const updatePayload = {
          marksPerQuestion: userSelectionData[i]?.CM || 0,
          negativeMarksPerWrongAnswer: userSelectionData[i]?.NM || 0,
          minQuestionsAnswerable: userSelectionData[i]?.minAnswerable || 0,
          numberOfQuestions: userSelectionData[i]?.selectedMax || 0,
          testDuration: totalTime,
        };

        await testServices.updateSectionMeta(id, sectionId, updatePayload);
      }

      alert("Test metadata saved successfully!");
      navigate(`/questionReview/${id}`);
    } catch (error) {
      console.error("Review/Generate Error:", error);
      alert("Failed to save data");
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f7f8fc" }}>
      <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: "#ffffff" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Test Summary
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          From Pattern
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: "8px 12px",
              }}
            >
              <Grid item xs={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Section
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Q Type
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Subjects
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  CM
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  NM
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Max Q
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Min Q
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Marks
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Time
                </Typography>
              </Grid>
            </Grid>
            {selectedExam?.sections?.map((section, sectionIndex) => (
              <Grid
                container
                spacing={1}
                key={sectionIndex}
                sx={{ backgroundColor: "#f4f6f8", padding: "8px 12px" }}
              >
                <Grid item xs={2}>
                  <Typography variant="body2">{section.sectionName}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">
                    {section.questionType}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">
                    {section.subjects.join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">
                    {section.correctAnswerMarks}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">
                    {section.negativeMarks}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">{section.maxQuestion}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">{section.minQuestion}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">{section.marks}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">{section.questions}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* "As per User Selection" Table */}
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          As per User Selection
        </Typography>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: "8px 12px",
              }}
            >
              <Grid item xs={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Section
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Q Type
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Subjects
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  CM
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  NM
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Selected Max
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Min Answerable
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Marks
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Time
                </Typography>
              </Grid>
            </Grid>
            {userSelectionData.map((section, sectionIndex) => (
              <Grid
                container
                spacing={1}
                key={sectionIndex}
                sx={{ backgroundColor: "#f4f6f8", padding: "8px 12px" }}
              >
                <Grid item xs={2}>
                  <Typography variant="body2">{section.sectionName}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">
                    {section.questionType}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">
                    {(section.subjects || "").toString()}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    fullWidth
                    value={userSelectionData[sectionIndex]?.CM || "4"}
                    onChange={(e) => handleChange(e, "CM", sectionIndex)}
                    variant="outlined"
                    size="small"
                    sx={{ backgroundColor: "#dcedc8" }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    fullWidth
                    value={userSelectionData[sectionIndex]?.NM || "-1"}
                    onChange={(e) => handleChange(e, "NM", sectionIndex)}
                    variant="outlined"
                    size="small"
                    sx={{ backgroundColor: "#dcedc8" }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    fullWidth
                    value={userSelectionData[sectionIndex]?.selectedMax || ""}
                    onChange={(e) =>
                      handleChange(e, "selectedMax", sectionIndex)
                    }
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    fullWidth
                    value={userSelectionData[sectionIndex]?.minAnswerable || ""}
                    onChange={(e) =>
                      handleChange(e, "minAnswerable", sectionIndex)
                    }
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={1}>
                  {console.log(userSelectionData)}
                  <Typography variant="body2">
                    {userSelectionData[sectionIndex]?.marks || "—"}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">
                    {userSelectionData[sectionIndex]?.time || "—"}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Total Time Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
            marginTop: 3,
            marginBottom: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Total Test Time (minutes):
          </Typography>
          <TextField
            type="number"
            size="small"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            variant="outlined"
            sx={{ width: 120 }}
          />
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <Button variant="outlined" sx={{ fontWeight: "bold" }}>
            Back
          </Button>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontWeight: "bold" }}
              onClick={handleReviewAndGenerate}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontWeight: "bold" }}
              onClick={handleReviewAndGenerate}
            >
              Generate Test
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SummaryPage;
