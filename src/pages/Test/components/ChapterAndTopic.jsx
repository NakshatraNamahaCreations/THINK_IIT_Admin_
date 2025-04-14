import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import apiServices from "../../../services/apiServices";

const ChapterAndTopic = ({ chapters, subjectName, onTopicsSelected, preSelected }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topicsByChapter, setTopicsByChapter] = useState({});

  console.log("preSelected", preSelected);
  
  // Load from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("selectedChapterTopics");
    if (saved) {
      setSelectedTopics(JSON.parse(saved));
    }
  }, []);

  // Save changes
  useEffect(() => {
    sessionStorage.setItem(
      "selectedChapterTopics",
      JSON.stringify(selectedTopics)
    );
  }, [selectedTopics]);

  // Fetch topics for all chapters
  useEffect(() => {
    const fetchAllTopics = async () => {
      const topicData = {};

      for (let chapter of chapters) {
     
        if (chapter.topic && chapter.topic.length > 0) {
          topicData[chapter._id] = chapter.topic;
        } else if (chapter.topics && chapter.topics.length > 0) {
          topicData[chapter._id] = chapter.topics;
        } else {
          try {
            const topics = await apiServices.fetchTopic(chapter._id);
            topicData[chapter._id] = topics;
          } catch (err) {
            console.error(
              "Error fetching topics for",
              chapter.chapterName,
              err
            );
          }
        }
      }

      setTopicsByChapter(topicData);
    };

    if (chapters.length) fetchAllTopics();
  }, [chapters]);

  const handleTopicClick = (chapterId, topicId) => {
    const uniqueId = `${chapterId}-${topicId}`;
    setSelectedTopics((prev) =>
      prev.includes(uniqueId)
        ? prev.filter((id) => id !== uniqueId)
        : [...prev, uniqueId]
    );
  };

  // Callback on topic select
  useEffect(() => {
    const selectedChapterList = [
      ...new Set(
        selectedTopics
          .map((id) => chapters.find((c) => c._id === id.split("-")[0]))
          .filter(Boolean)
      ),
    ];

    const selectedTopicList = selectedTopics
      .map((id) => {
        const [chapterId, topicId] = id.split("-");
        const chapter = chapters.find((c) => c._id === chapterId);
        const topic = topicsByChapter[chapterId]?.find(
          (t) => t._id === topicId
        );
        return topic ? { ...topic, chapterName: chapter?.chapterName } : null;
      })
      .filter(Boolean);

    onTopicsSelected?.(subjectName, selectedChapterList, selectedTopicList);
  }, [selectedTopics, topicsByChapter]);
  useEffect(() => {
    if (!preSelected || !preSelected.subjects) return;
  
    const autoSelected = [];
  
    preSelected.subjects.forEach((subject) => {
      subject.chapter.forEach((chapter) => {
        const chapterId = chapter._id;
        chapter.topic.forEach((topic) => {
          const topicId = topic._id;
          autoSelected.push(`${chapterId}-${topicId}`);
        });
      });
    });
  
    setSelectedTopics(autoSelected);
  }, [topicsByChapter, preSelected]);
  
  const isSelected = (chapterId, topicId) =>
    selectedTopics.includes(`${chapterId}-${topicId}`);

  return (
    <Box sx={{ padding: 3 }}>
      {chapters.map((chapter, index) => (
        <div
          key={chapter._id}
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {chapter.chapterName}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {(topicsByChapter[chapter._id] || []).map((topic) => (
              <div
                key={topic._id}
                onClick={() => handleTopicClick(chapter._id, topic._id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  backgroundColor: isSelected(chapter._id, topic._id)
                    ? "#1976d2" 
                    : "#f3f4f6",
                  color: isSelected(chapter._id, topic._id) ? "white" : "#333",
                  border: "1px solid #ccc",
                }}
              >
                {topic.topicName}
              </div>
            ))}
          </Box>
        </div>
      ))}
    </Box>
  );
};

export default ChapterAndTopic;
