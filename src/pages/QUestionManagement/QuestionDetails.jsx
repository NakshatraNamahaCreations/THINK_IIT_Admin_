import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

import { MathJax, MathJaxContext } from "better-react-mathjax";
import { config } from "../../services/config";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(3),
  fontFamily: "'Poppins', sans-serif",
  overflow: "hidden", // Ensure content does not overflow
}));

const QuestionDetails = () => {
  const { id } = useParams();
  const [questiondata, setQuestiondata] = useState({});

  const cleanLatex = (text) => {
    if (!text) return "";
    text = text.replace(/\\\\/g, "\\");
    text = text.replace(/^\$\s*|\s*\$$/g, "");
    return text;
  };

  const containsLatex = (text) => {
    if (!text) return "";
    text = text.replace(/\\\\/g, "\\");
    text = text.replace(/^\$\s*|\s*\$$/g, "");
    text = text.replace(/([a-zA-Z])([0-9])/g, "$1 $2");
    text = text.replace(/([0-9])([a-zA-Z])/g, "$1 $2");
    text = text.replace(/([a-z])([A-Z])/g, "$1 $2");
    return text;
  };

  const getQuestionbyId = async () => {
    try {
      let res = await axios.get(
        `${config.BASE_URL_QUESTIONS}QB/questions/${id}`
      );
      if (res.status === 200) {
        let data = res.data;
        data.English = cleanLatex(data.English);
        data.OptionsEnglish = cleanLatex(data.OptionsEnglish);
        data.Answer = cleanLatex(data.Answer);
        setQuestiondata(data);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  useEffect(() => {
    getQuestionbyId();
  }, []);

  return (
    <MathJaxContext>
      <Box sx={{ padding: 4, fontFamily: "'Poppins', sans-serif" }}>
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
          Back to Question List
        </Button>

        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 3 }}>
          Question Details
        </Typography>

        <StyledPaper>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography mt={2}>
                <strong>Question Code:</strong> {questiondata?.QID}
              </Typography>
              <Typography mt={2}>
                <strong>Class:</strong> {questiondata?.Class}
              </Typography>
              <Typography mt={2}>
                <strong>Subject:</strong> {questiondata?.Subject}
              </Typography>
              <Typography mt={2}>
                <strong>Chapter:</strong> {questiondata?.Chapter}
              </Typography>
              <Typography mt={2}>
                <strong>SubChapter:</strong> {questiondata?.Topic}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography mt={2}>
                <strong>Difficulty Level:</strong> {questiondata?.Difficulty}
              </Typography>
              <Typography mt={2}>
                <strong>Question Type:</strong> {questiondata?.Type}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography mt={2}>
              <strong>Question:</strong>
            </Typography>
            {questiondata.English && containsLatex(questiondata.English) ? (
              <Box>
                <MathJax>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "16px",
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                    }}
                  >
                    {`\\(${questiondata.English}\\)`}
                  </Typography>
                </MathJax>
              </Box>
            ) : (
              <Typography
                variant="body1"
                style={{
                  fontSize: "16px",
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                }}
              >
                {questiondata.English}
              </Typography>
            )}

            {questiondata.Images &&
              Object.keys(questiondata.Images).length > 0 && (
                <Grid item xs={12} textAlign="center">
                  <img
                    src={`data:image/png;base64,${
                      questiondata.Images[Object.keys(questiondata.Images)[0]]
                    }`}
                    alt="Question Diagram"
                    style={{ maxWidth: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              )}
          </Grid>

          <Grid item xs={12}>
            <Typography mt={2}>
              <strong>Options:</strong>
            </Typography>
            {questiondata.OptionsEnglish &&
              questiondata.OptionsEnglish.split("\n").map((option, index) =>
                containsLatex(option) ? (
                  <MathJax key={index}>
                    <Typography
                      variant="body1"
                      style={{
                        fontSize: "16px",
                        whiteSpace: "pre-line",
                        wordWrap: "break-word",
                      }}
                    >
                      {`\\(${option}\\)`}
                    </Typography>
                  </MathJax>
                ) : (
                  <Typography
                    key={index}
                    variant="body1"
                    style={{
                      fontSize: "16px",
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                    }}
                  >
                    {option}
                  </Typography>
                )
              )}
            {/* {questiondata.OptionsEnglish &&
    questiondata.OptionsEnglish.split("\n").map((option, index) => (
      <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {String.fromCharCode(65 + index) + ") "}
        </Typography>
        <MathJax>
          <Typography
            variant="body1"
            style={{ fontSize: "18px", whiteSpace: "pre-line", wordWrap: "break-word" }}
          >
            {`\\[${option.replace(/\\/g, '')}\\]`} 
          </Typography>
        </MathJax>
      </Box>
    ))} */}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography mt={2}>
              <strong>Correct Answer:</strong>
            </Typography>
            {questiondata.Answer && containsLatex(questiondata.Answer) ? (
              <MathJax>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "16px",
                    whiteSpace: "pre-line",
                    wordWrap: "break-word",
                  }}
                >
                  {`\\(${questiondata.Answer}\\)`}
                </Typography>
              </MathJax>
            ) : (
              <Typography
                variant="body1"
                style={{
                  fontSize: "16px",
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                }}
              >
                {questiondata.Answer}
              </Typography>
            )}
          </Grid>
        </StyledPaper>
      </Box>
    </MathJaxContext>
  );
};

export default QuestionDetails;
