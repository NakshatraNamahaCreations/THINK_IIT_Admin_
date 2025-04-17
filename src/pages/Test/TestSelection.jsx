import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  IconButton,
} from "@mui/material";
import TestHeader from "./components/TestHeader";
import ChapterAndTopic from "./components/ChapterAndTopic";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoQuestionUI from "./components/AutoQuestionUI";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import testServices from "../../services/testService";
import apiServices from "../../services/apiServices";
import testPatterns from "./PreSection/Pattern.json";

const TestSelection = () => {
  const [questionType, setQuestionType] = useState("SCQ");
  const [positiveMarking, setPositiveMarking] = useState("");
  const [negativeMarking, setNegativeMarking] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectionType, setSelectionType] = useState("Manual");
  const [addNew, setAddNew] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [allSections, setAllSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [testDetails, setTestDetails] = useState(null);
  const [preSelected, setPreselected] = useState([]);
  // const [activeSections, setActiveSections] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState({});

  const syncToSessionStorage = (data) => {
    sessionStorage.setItem("sectionMarkingData", JSON.stringify(data));
  };

  const updateSectionField = (fieldName, value) => {
    setSectionData((prev) => {
      const updated = {
        ...prev,
        [activeSectionId]: {
          ...prev[activeSectionId],
          [fieldName]: value,
        },
      };

      sessionStorage.setItem("sectionMarkingData", JSON.stringify(updated));
      return updated;
    });
  };

  // useEffect(() => {
  //   const fromSession = JSON.parse(
  //     sessionStorage.getItem("sectionMarkingData") || "{}"
  //   );

  //   if (
  //     activeSectionId &&
  //     !sectionData[activeSectionId] &&
  //     !fromSession[activeSectionId]
  //   ) {
  //     setSectionData((prev) => ({
  //       ...prev,
  //       [activeSectionId]: {
  //         subjectSelections: [],
  //         classSelections: [""],
  //         questionType: "SCQ",
  //         positiveMarking: "",
  //         negativeMarking: "",
  //         searchText: "",
  //         selectionType: selectionType,
  //       },
  //     }));
  //   }
  // }, [activeSectionId]);

  // useEffect(() => {
  //   const saved = sessionStorage.getItem("sectionMarkingData");
  //   if (saved) {
  //     const parsed = JSON.parse(saved);
  //     setSectionData(parsed);

  //     const firstKey = Object.keys(parsed)[0];
  //     if (firstKey) setActiveSectionId(firstKey);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!activeSectionId || !sectionData[activeSectionId]) return;

  //   const subjectList = sectionData[activeSectionId].subjectSelections;
  //   console.log("the subjectList", subjectList);

  //   if (subjectList?.length > 0) {
  //     const firstSub =
  //       typeof subjectList[0] === "string"
  //         ? subjectList[0]
  //         : subjectList[0].subjectName;

  //     setSelectedSubject(firstSub);
  //   }
  // }, []);

  useEffect(() => {
    if (!activeSectionId || !sectionData[activeSectionId]) return;

    const subjectList = sectionData[activeSectionId]?.subjectSelections || [];

    if (subjectList.length > 0) {
      const subject = subjectList[0];
      const subjectName =
        typeof subject === "string" ? subject : subject.subjectName;
      setSelectedSubject(subjectName);

      // ✅ Restore chapters properly
      const chapterData =
        typeof subject === "object" ? subject.chapter || [] : [];

      // Only set chapters if not already present
      setChapters((prev) => {
        const alreadyHasChapters =
          !!prev[`${activeSectionId}-${subjectName}`]?.length;

        if (alreadyHasChapters) return prev;
        return {
          ...prev,
          [`${activeSectionId}-${subjectName}`]: chapterData,
        };
      });
    }
  }, [activeSectionId]);


  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await apiServices.fetchSubjects();
        setSubjects(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubject();
  }, [id]);


  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await testServices.getTestById(id);
        let testData = response.data;
      setPreselected(testData.sections);

      
        if (!testData || !testData.sections || testData.sections.length === 0) {
          testData = testPatterns;
        }

        setTestDetails(testData);

        const sectionMarkingData = {};
        const structuredSections = [];
        const updatedChapters = {};
        let defaultSelectedSubject = null;
        let defaultActiveSectionId = null;

        for (const section of testData.sections) {
          const sectionId = section._id;
          structuredSections.push({
            id: sectionId,
            sectionName: section.sectionName,
          });

          let subjectSelections = [];

          if (
            section.questionBankQuestionId &&
            section.questionBankQuestionId.length > 0
          ) {
            if (section.subjects && section.subjects.length > 0) {
              const subject = section.subjects[0];

              const chaptersForSubject = subject.chapter.map((chap) => ({
                ...chap,
                topics: chap.topic,
              }));
              updatedChapters[subject.subjectName] = chaptersForSubject;

              subjectSelections.push({
                subjectName: subject.subjectName,
                subjectId: subject.subjectId || "",
                chapter: chaptersForSubject,
              });

              updatedChapters[subject.subjectName] = chaptersForSubject;

              if (!defaultSelectedSubject) {
                defaultSelectedSubject = subject.subjectName;
              }
            }
          }

          sectionMarkingData[sectionId] = {
            subjectSelections,
            classSelections: [localStorage.getItem("selectedClass") || ""],
            questionType: section.questionType || "SCQ",
            positiveMarking: section.marksPerQuestion,
            negativeMarking: section.negativeMarksPerWrongAnswer,
            selectionType: section.questionSelection || "Manual",
            sectionName: section.sectionName,
          };

          if (!defaultActiveSectionId) {
            defaultActiveSectionId = sectionId;
          }
        }

        setAllSections(structuredSections);
        setSectionData(sectionMarkingData);
        setChapters(updatedChapters);
        setSelectedSubject(defaultSelectedSubject);
        setActiveSectionId(defaultActiveSectionId);

        sessionStorage.setItem(
          "sectionMarkingData",
          JSON.stringify(sectionMarkingData)
        );
      } catch (error) {
        console.error("Failed to fetch test details", error);

        const fallbackData = testPatterns;
        setTestDetails(fallbackData);

        console.error("Error fetching from DB, using fallback data from JSON");
      }
    };

    fetchTestDetails();
  }, [id]);

  useEffect(() => {
    if (selectedSubject && chapters[selectedSubject]) {
      console.log(
        "ChapterAndTopic will now render:",
        chapters[selectedSubject]
      );
    }
  }, [selectedSubject, chapters]);

  useEffect(() => {
    const raw = localStorage.getItem(`test-${id}-sections`);
    const selectedClass = localStorage.getItem("selectedClass");
    if (!raw) return;

    const parsed = JSON.parse(raw);
    const structuredSections = Object.entries(parsed).map(([key, section]) => ({
      id: key,
      sectionName: section?.sectionName || key,
    }));

    const sectionMarkingData = {};
    for (const [sectionId, sectionDetails] of Object.entries(parsed)) {
      sectionMarkingData[sectionId] = {
        subjectSelections: sectionDetails.subjects || [],
        classSelections: [selectedClass || ""],
        questionType: sectionDetails.questionType || "SCQ",
        positiveMarking: sectionDetails.marksPerQuestion || "",
        negativeMarking: sectionDetails.negativeMarksPerWrongAnswer || "",
        selectionType: sectionDetails.questionSelection || "Manual",
        sectionName: sectionDetails.sectionName || sectionId,
      };
    }

    setAllSections(structuredSections);
    setSectionData(sectionMarkingData);
    sessionStorage.setItem(
      "sectionMarkingData",
      JSON.stringify(sectionMarkingData)
    );
    setSelectedClass(selectedClass);

    if (structuredSections.length > 0) {
      setActiveSectionId(structuredSections[0].id);

      const firstSection = sectionMarkingData[structuredSections[0].id];
      if (firstSection?.subjectSelections?.length) {
        setSelectedSubject(firstSection.subjectSelections[0].subjectName);
      }
    }
  }, [id]);

  useEffect(() => {
    const storedSubjects = localStorage.getItem(`test-${id}-subjects`);
    if (storedSubjects) {
      setSubjects(JSON.parse(storedSubjects));
    }
  }, [id]);

  // const handleTopicsSelected = (chapterNames, topicNames) => {
  //   const updatedSection = {
  //     ...sectionData[activeSectionId],
  //     chapter: chapterNames,
  //     topic: topicNames,
  //   };

  //   const updatedData = {
  //     ...sectionData,
  //     [activeSectionId]: updatedSection,
  //   };

  //   console.log("Saving to sessionStorage:", updatedData);
  //   sessionStorage.setItem("sectionMarkingData", JSON.stringify(updatedData));
  // };
  const handleTopicsSelected = (
    subjectName,
    chapterList = [],
    topicList = []
  ) => {
    const updatedSection = { ...sectionData[activeSectionId] };
    const updatedSubjects = [...(updatedSection.subjectSelections || [])];

    const subjectIndex = updatedSubjects.findIndex(
      (s) => s.subjectName === subjectName
    );

    if (subjectIndex !== -1) {
      const chapterWithTopics = chapterList.map((chapter) => {
        const topicsForChapter = topicList.filter(
          (t) => t.chapterName === chapter.chapterName
        );

        return {
          chapterName: chapter.chapterName,
          topic: topicsForChapter.map((t) => ({
            topicName: t.topicName,
            numberOfQuestions: +t.numberOfQuestions || 0,
          })),
        };
      });

      updatedSubjects[subjectIndex] = {
        ...updatedSubjects[subjectIndex],
        chapter: chapterWithTopics,
      };

      const updatedData = {
        ...sectionData,
        [activeSectionId]: {
          ...updatedSection,
          subjectSelections: updatedSubjects,
        },
      };

      sessionStorage.setItem("sectionMarkingData", JSON.stringify(updatedData));
      setSectionData(updatedData);
    }
  };
  // const handleClassChange = (index, value) => {
  const handleClassChange = (value) => {
    // const updated = [...currentSection.classSelections];
    // updated[index] = value;
    setSelectedClass(value);
    sessionStorage.setItem("selectedClass", value);
    // setSectionData((prev) => ({
    //   ...prev,
    //   [activeSectionId]: {
    //     ...prev[activeSectionId],
    //     classSelections: updated,
    //   },
    // }));
  };

  useEffect(() => {
    const savedClass = sessionStorage.getItem("selectedClass");
    const validClasses = ["Class 10", "Class 11", "Class 12"];

    if (validClasses.includes(savedClass)) {
      setSelectedClass(savedClass);
    } else {
      setSelectedClass("");
    }
  }, []);

  const handleSubjectChange = (index, value) => {
    const updated = [...currentSection.subjectSelections];
    updated[index] = value;

    setSectionData((prev) => ({
      ...prev,
      [activeSectionId]: {
        ...prev[activeSectionId],
        subjectSelections: updated,
      },
    }));
  };

  const handleAddSubject = (value) => {
    // Find the subject object from the fetched subjects list
    const selectedSubjectObj = subjects.find(
      (sub) => sub.subjectName === value
    );
    if (!selectedSubjectObj) return;

    const updated = { ...sectionData };

    // Check if the subject is already in the selections
    if (
      !updated[activeSectionId].subjectSelections.some(
        (s) => s.subjectName === value
      )
    ) {
      // Add the selected subject to the subjectSelections array
      updated[activeSectionId].subjectSelections.push(selectedSubjectObj);
      setSectionData(updated);
      sessionStorage.setItem("sectionMarkingData", JSON.stringify(updated));
    }


    // Update the selectedSubject to the chosen value (this ensures it's Math or the correct subject)
    setSelectedSubject(value);

    setAddNew(false); // Close the "add new subject" input
  };

  const selectedChapters = chapters[selectedSubject] || [];

  useEffect(() => {
    const saved = sessionStorage.getItem("sectionMarkingData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSectionData(parsed);

      const firstKey = Object.keys(parsed)[0];
      if (firstKey) {
        setActiveSectionId(firstKey);

        const firstSection = parsed[firstKey];
        if (firstSection.subjectSelections?.length && !selectedSubject) {
          setSelectedSubject(firstSection.subjectSelections[0]);
        }
      }
    }
  }, []);

  const handleRemoveSubject = (index) => {
    const updated = { ...sectionData };
    updated[activeSectionId].subjectSelections.splice(index, 1);
    setSectionData(updated);
    sessionStorage.setItem("sectionMarkingData", JSON.stringify(updated));
  };

  // const handleClassChange = (index, value) => {
  //   const updated = { ...sectionData };
  //   updated[activeSectionId].classSelections[index] = value;
  //   setSectionData(updated);
  // };

  const currentSection = sectionData[activeSectionId] || {
    subjectSelections: [],
    classSelections: [""],
    questionType: "SCQ",
    positiveMarking: "",
    negativeMarking: "",
    searchText: "",
    selectionType: selectionType,
  };
  const handleSelectionTypeChange = (event) => {
    const newSelectionType = event.target.value;
    setSelectionType(newSelectionType);

    const updatedSectionData = { ...sectionData };
    updatedSectionData[activeSectionId].selectionType = newSelectionType;
    setSectionData(updatedSectionData);
    syncToSessionStorage(updatedSectionData);
  };

  const handleNextClick = async () => {
    try {
      const sectionData = JSON.parse(
        sessionStorage.getItem("sectionMarkingData") || "{}"
      );
      const selectedClass = sessionStorage.getItem("selectedClass");

      // if (!activeSections.includes(activeSectionId)) {
      //   alert("This section is inactive and won't be saved.");
      //   return;
      // }

      const currentSection = sectionData[activeSectionId];
      const sectionName = currentSection?.sectionName || "New Section";

      const selectedSubObj = currentSection.subjectSelections.find(
        (subject) =>
          subject.subjectName === selectedSubject ||
          subject.subjectName === selectedSubject?.subjectName
      );

      if (!selectedSubObj) {
        alert("Please select a subject before proceeding.");
        return;
      }

      const requestData = {
        sectionName,
        class: selectedClass,
        questionType: currentSection.questionType || "SCQ",
        marksPerQuestion: currentSection.positiveMarking,
        negativeMarksPerWrongAnswer: currentSection.negativeMarking,
        questionSelection: currentSection.selectionType || "Manual",
        subjects: [
          {
            subjectName: selectedSubObj.subjectName,
            subjectId: selectedSubObj._id || selectedSubObj.subjectId || "",
            chapter: (selectedSubObj.chapter || []).map((chapter) => ({
              chapterName: chapter.chapterName,
              topic: (chapter.topic || []).map((topic) => ({
                topicName: topic.topicName,
                numberOfQuestions: topic.numberOfQuestions || 0,
              })),
            })),
          },
        ],
      };

      const response = await testServices.AddSectionDetails(id, requestData);
      const updatedSections = response;
      // Only update localStorage if this section is active
      // if (activeSections.includes(activeSectionId)) {
      //   const updatedSections = response;
      //   const realSection = updatedSections.sections.find(
      //     (s) =>
      //       s.sectionName?.trim()?.toLowerCase() ===
      //       sectionName.trim().toLowerCase()
      //   );
      // const realSectionId = realSection?._id;

      //   // Save to localStorage

      const realSection = updatedSections.sections.find(
        (s) =>
          s.sectionName?.trim()?.toLowerCase() ===
          sectionName.trim().toLowerCase()
      );
      const realSectionId = realSection?._id;

      if (selectionType === "Auto") {
        const topics = currentSection.subjectSelections.flatMap((subject) =>
          (subject.chapter || []).flatMap((chapter) =>
            (chapter.topic || []).map((topic) => ({
              topicName: topic.topicName,
              numberOfQuestions: topic.numberOfQuestions || 0,
              chapterName: chapter.chapterName,
            }))
          )
        );
        const localSectionData = JSON.parse(
          localStorage.getItem(`test-${id}-sections`) || "{}"
        );
        localSectionData[realSectionId] = {
          sectionName,
          questionType: currentSection.questionType || "SCQ",
          marksPerQuestion: currentSection.positiveMarking,
          negativeMarksPerWrongAnswer: currentSection.negativeMarking,
          questionSelection: currentSection.selectionType || "Manual",
          subjects: requestData.subjects,
        };
        localStorage.setItem(
          `test-${id}-sections`,
          JSON.stringify(localSectionData)
        );
        const autoPickResponse = await testServices.AutoPickQuestions(id, {
          sectionId: realSectionId,
          topics,
          totalQuestions: topics.reduce(
            (sum, t) => sum + (t.numberOfQuestions || 0),
            0
          ),
        });

        if (!autoPickResponse?.success) {
          alert("Auto pick failed.");
          return;
        }

        const autoPicked = autoPickResponse.data;


        const existing = JSON.parse(
          sessionStorage.getItem("AutoPickedQuestions") || "{}"
        );
        const updated = { ...existing };

        if (!updated[realSectionId]) updated[realSectionId] = {};

        Object.entries(autoPicked).forEach(([topicName, questionMap]) => {
          updated[realSectionId][topicName] = {
            ...(updated[realSectionId][topicName] || {}),
            ...questionMap,
          };
        });

        sessionStorage.setItem("AutoPickedQuestions", JSON.stringify(updated));
      }

      alert("Section details saved successfully!");
      // Update localStorage with the new data
      // const localSectionData = JSON.parse(
      //   localStorage.getItem(`test-${id}-sections`) || "{}"
      // );

      // localSectionData[realSectionId] = {
      //   sectionName,
      //   questionType: currentSection.questionType || "SCQ",
      //   marksPerQuestion: currentSection.positiveMarking,
      //   negativeMarksPerWrongAnswer: currentSection.negativeMarking,
      //   questionSelection: currentSection.selectionType || "Manual",
      //   subjects: requestData.subjects, // with chapters + topics
      // };

      // localStorage.setItem(
      //   `test-${id}-sections`,
      //   JSON.stringify(localSectionData)
      // );
      // localStorage.setItem("selectedClass", selectedClass); // persist class

      navigate(`/questionPage/${id}`);
    } catch (error) {
      console.error("Error in handleNextClick:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <TestHeader
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
        sectionData={sectionData}
        setSectionData={setSectionData}
        allSections={allSections}
        setAllSections={setAllSections}
      />

      {/* QUESTION TYPE, MARKING FIELDS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 2,
          flexWrap: "wrap",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <TextField
            select
            label="Question Type"
            value={currentSection.questionType}
            onChange={(e) => updateSectionField("questionType", e.target.value)}
            size="small"
          >
            <MenuItem value="SCQ">SCQ</MenuItem>
            <MenuItem value="MCQ">MCQ</MenuItem>
            <MenuItem value="NTQ">NTQ</MenuItem>
            <MenuItem value="CMP">CMP</MenuItem>
          </TextField>

          <TextField
            label="Positive Marking"
            type="number"
            value={currentSection.positiveMarking}
            onChange={(e) =>
              updateSectionField("positiveMarking", e.target.value)
            }
            size="small"
          />

          <TextField
            label="Negative Marking"
            type="number"
            value={currentSection.negativeMarking}
            onChange={(e) =>
              updateSectionField("negativeMarking", e.target.value)
            }
            size="small"
          />
        </Box>
        <Button variant="contained" onClick={handleNextClick}>
          Next
        </Button>
      </Box>

      {/* Subject SELECTION SECTION */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 3,
          px: 2,
          flexWrap: "wrap",
          borderBottom: "1px solid #ccc",
          pb: 2,
        }}
      >
        {currentSection?.subjectSelections?.map((subject, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              backgroundColor:
                subject.subjectName === selectedSubject ? "#1976d2" : "white",
              border:
                subject.subjectName === selectedSubject
                  ? ""
                  : "1px solid black",
              fontWeight: "bold",
              color:
                subject.subjectName === selectedSubject ? "white" : "black",
            }}
            onClick={async () => {
              setSelectedSubject(subject.subjectName);

                // const subjectObj = subjects.find((sub) => sub.subjectName === value);
                // if (subjectObj) {
                //   apiServices.fetchChapter(subjectObj._id).then((res) => {
                //     setChapters((prev) => ({
                //       ...prev,
                //       [value]: res,
                //     }));
                //   });
                // }
            }}
            endIcon={
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSubject(index);
                }}
                sx={{ color: "white", padding: 0 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
          >
            {subject.subjectName}
          </Button>
        ))}

        {currentSection?.subjectSelections?.length === 0 || addNew ? (
          <TextField
            select
            label="Add Subject"
            onChange={(e) => handleAddSubject(e.target.value)}
            size="small"
            sx={{ minWidth: 160 }}
          >
            {subjects?.map((sub) => (
              <MenuItem key={sub._id} value={sub.subjectName}>
                {sub.subjectName}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <IconButton
            onClick={() => setAddNew(true)}
            sx={{
              border: "1px solid #ccc",
              ml: 1,
              height: "36px",
              width: "36px",
              borderRadius: "4px",
              alignSelf: "center",
              backgroundColor: "green",
              mt: "2px",
              "&:hover": {
                backgroundColor: "green",
                color: "white",
              },
            }}
          >
            <AddIcon fontSize="small" style={{ color: "white" }} />
          </IconButton>
        )}
      </Box>

      {/* SEARCH and SELECTION TYPE SECTION */}
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginTop: "1rem",
          px: 2,
        }}
      >
        {currentSection?.classSelections?.map((classSelected, index) => (
          <TextField
            select
            label="Select Class"
            value={selectedClass || ""}
            onChange={(e) => handleClassChange(e.target.value)}
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">Select Class</MenuItem>
            <MenuItem value="Class 10">Class 10</MenuItem>
            <MenuItem value="Class 11">Class 11</MenuItem>
            <MenuItem value="Class 12">Class 12</MenuItem>
          </TextField>
        ))}

        <TextField
          placeholder="Search..."
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976d2" }}
          onClick={async () => {
            try {
              if (!selectedSubject || !searchText.trim() || !selectedClass) {
                alert("Missing selected subject or search text or Class");
                return;
              }

              const subjectObj = subjects.find(
                (s) => s.subjectName === selectedSubject
              );
              

              if (subjectObj) {
                const chapterData = await apiServices.fetchChapter(
                  subjectObj._id
                );
                setChapters((prev) => ({
                  ...prev,
                  [subjectObj.subjectName]: chapterData,
                }));

              }


              if (!subjectObj) {
                console.warn("Subject not found in subject list");
                return;
              }

              const chapterResponse = await apiServices.fetchChapter(
                subjectObj._id
              );

              
              const chapterWithTopics = await Promise.all(
                chapterResponse.map(async (chapter) => {
                  try {
                    const topics = await apiServices.fetchTopic(chapter._id);

                    return {
                      ...chapter,
                      topics,
                    };
                  } catch (error) {
                    console.error(
                      `Failed to fetch topics for ${chapter.chapterName}`,
                      error.message
                    );
                    return {
                      ...chapter,
                      topics: [],
                    };
                  }
                })
              );

              const filteredChapters = chapterWithTopics.filter((chapter) => {
                // Match by chapter name
                const matchChapter = chapter.chapterName
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase());

                // Match any topic inside this chapter
                // const filteredTopics = chapter.topics?.filter((topic) =>
                //   topic.topicName?.toLowerCase().includes(searchText.toLowerCase())
                // );
                const filteredTopics = chapter.topics.filter((topic) => {
                  return topic.topicName
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                });
                // Attach only matching topics (optional: helpful for rendering)
                if (filteredTopics?.length > 0) {
                  chapter.topics = filteredTopics;
                }

                return (
                  matchChapter || (filteredTopics && filteredTopics.length > 0)
                );
              });

              setChapters((prev) => ({
                ...prev,
                [selectedSubject]: filteredChapters,
              }));
            } catch (error) {
              console.error("Search error:", error);
            }
          }}
        >
          Search
        </Button>

        <Typography sx={{ fontWeight: 500 }}>Question Selection:</Typography>

        <RadioGroup
          row
          value={selectionType}
          onChange={handleSelectionTypeChange}
        >
          <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
          <FormControlLabel value="Auto" control={<Radio />} label="Auto" />
        </RadioGroup>
      </Box>

      {selectionType === "Manual" && (
        <ChapterAndTopic
          subjectName={selectedSubject}
          chapters={chapters[`${selectedSubject}`] || []}
          onTopicsSelected={handleTopicsSelected}
          preSelected={testDetails?.sections?.find(sec => sec._id === activeSectionId)}
        />
      )}

      {selectionType === "Auto" && (
        <AutoQuestionUI
          chapters={chapters[selectedSubject] || []}
          sectionData={sectionData}
          activeSectionId={activeSectionId}
        />
      )}
    </>
  );
};

export default TestSelection;
