import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Paper, Button } from "@mui/material";

const AutoQuestionUI = ({ chapters, sectionData, activeSectionId }) => {
  console.log("the check 1", chapters);
  console.log("the chech 2", sectionData);
  console.log("the check 3", activeSectionId);

  const [questions, setQuestions] = useState(
    chapters?.reduce((acc, chapter) => {
      acc[chapter.chapterName] = chapter.topics?.reduce((topicAcc, topic) => {
        topicAcc[topic.topicName] = 0;
        return topicAcc;
      }, {});
      return acc;
    }, {})
  );

  useEffect(() => {
    const initial = chapters.reduce((acc, chapter) => {
      acc[chapter.chapterName] = chapter.topics?.reduce((topicAcc, topic) => {
        const savedTopic = sectionData[activeSectionId]?.topic?.find(
          (t) => t.topicName === topic.topicName
        );
        topicAcc[topic.topicName] = savedTopic?.numberOfQuestions || 0;
        return topicAcc;
      }, {});
      return acc;
    }, {});
    setQuestions(initial);
  }, [chapters, sectionData, activeSectionId]);

  const handleQuestionChange = (chapterName, rawTopic, value) => {
    const topicName =
      typeof rawTopic === "object" ? rawTopic.topicName : rawTopic;
    const numberOfQuestions = parseInt(value, 10) || 0;

    // Step 1: Update local UI state
    setQuestions((prev) => ({
      ...prev,
      [chapterName]: {
        ...(prev[chapterName] || {}),
        [topicName]: numberOfQuestions,
      },
    }));

    // Step 2: Update sectionData structure
    const updatedSection = { ...sectionData[activeSectionId] };
    const updatedSubjects = [...(updatedSection.subjectSelections || [])];

    updatedSubjects.forEach((subject) => {
      subject.chapter = (subject.chapter || [])?.map((chapter) => {
        if (chapter.chapterName !== chapterName) return chapter;

        const updatedTopics = (chapter.topic || [])?.map((topic) => {
          if (topic.topicName === topicName) {
            return { ...topic, numberOfQuestions };
          }
          return topic;
        });

        // If topic wasn't there, add it
        if (!updatedTopics.find((t) => t.topicName === topicName)) {
          updatedTopics.push({ topicName, numberOfQuestions });
        }

        return { ...chapter, topic: updatedTopics };
      });

      // If chapter wasn't there, add it
      if (!subject.chapter.find((c) => c.chapterName === chapterName)) {
        subject.chapter.push({
          chapterName,
          topic: [{ topicName, numberOfQuestions }],
        });
      }
    });

    const updatedData = {
      ...sectionData,
      [activeSectionId]: {
        ...updatedSection,
        subjectSelections: updatedSubjects,
      },
    };

    sessionStorage.setItem("sectionMarkingData", JSON.stringify(updatedData));
  };

  const isValid = Object.values(questions).every((chapterTopics) =>
    Object.values(chapterTopics).every((value) => value > 0)
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fb",
        padding: 2,
        borderRadius: 2,
        marginTop: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "#1a202c" }}
        >
          How many questions for each topic?
        </Typography>
        <Typography sx={{ mb: 3, fontSize: "14px", color: "#4a5568" }}>
          Assign exactly the required number of questions per section.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {chapters?.map((chapter) => (
            <Box
              key={chapter.chapterName}
              sx={{
                backgroundColor: "#fefefe",
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                px: 2,
                py: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "#2d3748",
                }}
              >
                {chapter.chapterName}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {chapter.topics?.map((topic) => (
                  <Box
                    key={topic.topicName}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#f7fafc",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "#2d3748" }}>
                      {topic.topicName}
                    </Typography>
                    <TextField
                      size="small"
                      type="number"
                      value={
                        questions[chapter.chapterName]?.[
                          typeof topic.topicName === "object"
                            ? topic.topicName.topicName
                            : topic.topicName
                        ] || ""
                      }
                      onChange={(e) =>
                        handleQuestionChange(
                          chapter.chapterName,
                          typeof topic.topicName === "object"
                            ? topic.topicName.topicName
                            : topic.topicName,
                          e.target.value
                        )
                      }
                      sx={{
                        width: "70px",
                        backgroundColor: "#fff",
                      }}
                      inputProps={{ min: 0 }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default AutoQuestionUI;
