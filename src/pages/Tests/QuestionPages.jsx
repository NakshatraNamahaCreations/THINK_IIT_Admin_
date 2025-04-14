import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import testServices from "../../services/testService";
import { Button, Typography } from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import QuestionDistributionSidebar from "./components/QuestionDistributionSidebar";
import axios from "axios";
import "./styles/QuestionPages.css";
import { formatMathJaxContent } from "../../utils/helper";
import TestHeader from "../Test/components/TestHeader";

const FilterDropdown = ({ name, label, value, onChange, options }) => {
  return (
    <div className="min-w-[20px]">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 bg-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      >
        <option value="">All {label}</option>
        {options &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
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

const QuestionPages = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [pickedQuestions, setPickedQuestions] = useState({});
  const [testDetails, setTestDetails] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showSolution, setShowSolution] = useState({});
  const [topicName, setTopicName] = useState("");
  const [filters, setFilters] = useState({
    Class: "",
    Subject: "",
    Chapter: "",
    Topic: "",
    Difficulty: "",
  });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sectionWiseQuestions, setSectionWiseQuestions] = useState({});
  const navigate = useNavigate();
  const sectionMarkingData = JSON.parse(
    sessionStorage.getItem("sectionMarkingData") || "{}"
  );
  const [sectionData, setSectionData] = useState({});
  const [allSections, setAllSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(null);

  // const fetchTestDataById = async (id) => {
  //   try {
  //     const data = await testServices.getTestById(id);
  //     if (data?.data) {
  //       // setSavedSections(data.data);
  //       // setActiveSection(data.data.sections[0]?._id || "");
  //     } else {
  //       // setSavedSections([]);
  //       // toast.error("No sections found.");
  //     }
  //   } catch (error) {
  //     //   toast.error("Failed to fetch test details.");
  //   }
  // };

  // useEffect(() => {
  //   fetchTestDataById(id);
  // }, [id]);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       if (!selectedSection) return;

  //       const sectionId = selectedSection._id;
  //       const manualPick = sessionStorage.getItem("ManualPick");
  //       const parsedManual = manualPick ? JSON.parse(manualPick) : null;
  //       if (parsedManual && parsedManual[sectionId]) {
  //       const payload = {
  //         Subject: selectedSection.subject?.trim(),

  //         questionType: selectedSection.questionType?.trim(),
  //       };

  //       const response = await testServices.GetFilteredQuestions(payload);

  //       setFilteredQuestions(response);
  //       setAllQuestions(response);
  //       setSectionWiseQuestions((prev) => ({
  //         ...prev,
  //         [selectedSection._id]: response,
  //       }))

  //       } else {
  //         const payload = {
  //           Subject: selectedSection.subject?.trim(),
  //           chapter:
  //             selectedSection.chapter?.map((chap) => chap.chapterName.trim()) ||
  //             [],
  //           topic:
  //             selectedSection.topic?.map((topic) => topic.topicName.trim()) ||
  //             [],
  //           questionType: selectedSection.questionType?.trim(),
  //         };

  //         const response = await testServices.GetFilteredQuestions(payload);

  //         setFilteredQuestions(response);
  //         setAllQuestions(response);
  //         setSectionWiseQuestions((prev) => ({
  //           ...prev,
  //           [selectedSection._id]: response,
  //         }));

  //         const difficultyOptions = [
  //           ...new Set(response.map((q) => q.Difficulty)),
  //         ];
  //         setFilters((prevFilters) => ({
  //           ...prevFilters,
  //           Difficulty: difficultyOptions.length ? difficultyOptions : [],
  //         }));
  //       }
  //     }
  //      catch (err) {
  //       console.error("Fetch Error:", err.message);
  //     }
  //   };

  //   fetchQuestions();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!selectedSection) return;

        const subjectData = selectedSection.subjects?.[0];

        if (!subjectData) return;

        const payload = {
          Subject: subjectData.subjectName?.trim() || "",
          chapter:
            subjectData.chapter?.map((c) =>
              typeof c === "string" ? c.trim() : c.chapterName?.trim()
            ) || [],
          topic:
            subjectData.chapter
              ?.flatMap((c) => c.topic || [])
              ?.map((t) =>
                typeof t === "string" ? t.trim() : t.topicName?.trim()
              ) || [],
          questionType: selectedSection.questionType?.trim() || "SCQ",
        };

        const response = await testServices.GetFilteredQuestions(payload);

        if (Array.isArray(response)) {
          setFilteredQuestions(response);
          setAllQuestions(response);
          setSectionWiseQuestions((prev) => ({
            ...prev,
            [selectedSection._id]: response,
          }));
        }
      } catch (err) {
        console.error("Fetch Error:", err.message);
      }
    };

    fetchQuestions();
  }, [selectedSection]);

  useEffect(() => {
    const parsedManual = JSON.parse(
      sessionStorage.getItem("ManualPick") || "{}"
    );

    const parsedAuto = JSON.parse(
      sessionStorage.getItem("AutoPickedQuestions") || "{}"
    );

    const fetchTestDetails = async () => {
      try {
        const response = await testServices.getTestById(id);
        if (!response.success || !response.data) return;

        const testData = response.data;
        console.log("thes testData", testData);

        setTestDetails(testData);

        // Fetch all questions for each section
        const allQuestions = await Promise.all(
          testData.sections.map(async (section) => {
            const sectionId = section._id;
            const sessionSection = sectionMarkingData[sectionId] || {};
            // const subjectData = sessionSection.subjectSelections?.[0];
            const subjectData = section.subjects?.[0];

            console.log("the subjectData", subjectData);

            const payload = {
              Subject: subjectData?.subjectName || "",
              questionType: section?.questionType || "SCQ",
              chapter:
                subjectData?.chapter?.map((c) =>
                  typeof c === "string" ? c.trim() : c.chapterName?.trim()
                ) || [],
              topic:
                subjectData?.chapter
                  ?.flatMap((c) => c.topic || [])
                  ?.map((t) =>
                    typeof t === "string" ? t.trim() : t.topicName?.trim()
                  ) || [],
            };

            console.log("the test payload", payload);

            const result = await testServices.GetFilteredQuestions(payload);
            console.log("all", result);
            return { sectionId: section._id, questions: result };
          })
        );

        const sectionWise = {};

        allQuestions.forEach(({ sectionId, questions }) => {
          sectionWise[sectionId] = questions;
        });

        setSectionWiseQuestions(sectionWise);
        console.log("sectiomwisee", sectionWise);

        setFilteredQuestions(sectionWise[testData.sections[0]._id]);
        setSelectedSection(testData.sections[0]);

        // Merge picked questions from all sources
        const mergedPickedMap = {};

        // Merge manual
        for (const sectionId in parsedManual) {
          if (!mergedPickedMap[sectionId]) mergedPickedMap[sectionId] = {};
          for (const topic in parsedManual[sectionId]) {
            mergedPickedMap[sectionId][topic] = {
              ...mergedPickedMap[sectionId][topic],
              ...parsedManual[sectionId][topic],
            };
          }
        }

        // Merge auto
        for (const sectionId in parsedAuto) {
          if (!mergedPickedMap[sectionId]) mergedPickedMap[sectionId] = {};
          for (const topic in parsedAuto[sectionId]) {
            mergedPickedMap[sectionId][topic] = {
              ...mergedPickedMap[sectionId][topic],
              ...parsedAuto[sectionId][topic],
            };
          }
        }

        // Merge picked questions from API
        const hasPicked = testData.sections.some(
          (s) => s.questionBankQuestionId?.length > 0
        );

        if (hasPicked) {
          const pickedResponse = await testServices.getPickedQuestionByTestId(
            id
          );
          const pickedSections = pickedResponse?.allSectionQuestions || [];

          pickedSections.forEach((section) => {
            const sectionId = section.sectionId;
            section.questionList.forEach((q) => {
              const topic = q.Topic?.trim() || "General";

              if (!mergedPickedMap[sectionId]) mergedPickedMap[sectionId] = {};
              if (!mergedPickedMap[sectionId][topic])
                mergedPickedMap[sectionId][topic] = {};

              mergedPickedMap[sectionId][topic][q._id] = true;
            });
          });
        }

        setPickedQuestions(mergedPickedMap);
        sessionStorage.setItem(
          "pickedQuestions",
          JSON.stringify(mergedPickedMap)
        );
      } catch (error) {
        console.error("Error fetching test details", error);
      }
    };

    fetchTestDetails();
  }, [id]);
  useEffect(() => {
    const sectionMarkingData = JSON.parse(
      sessionStorage.getItem("sectionMarkingData") || "{}"
    );

    if (testDetails?.sections?.length > 0) {
      const sections = testDetails.sections.map((section, idx) => ({
        id: section._id,
        sectionName: section.sectionName || `Section ${idx + 1}`,
      }));

      setAllSections(sections);
      setSectionData(sectionMarkingData);

      // Automatically select the first section
      setActiveSectionId(testDetails.sections[0]._id);
      setSelectedSection(testDetails.sections[0]);
    }
  }, [testDetails]);

  // const handleCheck = (e) => {
  //   const {name, value} = e.target.value;
  //   setFilters(() => {
  // const newFilter = {
  //   ...prevFilter,
  //   [name]: value,

  // }
  //   })
  // }
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [name]: value,
      };

      let updatedQuestions = allQuestions;

      if (newFilters.Difficulty) {
        updatedQuestions = updatedQuestions.filter(
          (question) => question.Difficulty === newFilters.Difficulty.trim()
        );
      }

      setFilteredQuestions(updatedQuestions);
      return newFilters;
    });
  };

  const togglePickQuestion = (questionId, topicName) => {
    if (!selectedSection || !topicName) {
      console.warn("Missing sectionId or topicName");
      return;
    }

    const sectionId = selectedSection._id;
    const trimmedTopicName = topicName.trim();
    const sectionMaxQuestions = selectedSection.numberOfQuestions;

    setPickedQuestions((prev) => {
      const prevSection = prev[sectionId] || {};
      const prevTopic = prevSection[trimmedTopicName] || {};
      const isAlreadyPicked = !!prevTopic[questionId];

      // Create updated topic map
      const updatedTopic = { ...prevTopic };
      if (isAlreadyPicked) {
        delete updatedTopic[questionId];
      } else {
        updatedTopic[questionId] = true;
      }

      const updatedSection = {
        ...prevSection,
        [trimmedTopicName]: updatedTopic,
      };

      // Calculate total picked count for this section
      const totalPickedCount = Object.values(updatedSection).reduce(
        (acc, topicMap) => acc + Object.keys(topicMap).length,
        0
      );

      if (!isAlreadyPicked && totalPickedCount > sectionMaxQuestions) {
        alert(
          `You cannot select more than ${sectionMaxQuestions} questions for this section.`
        );
        return prev;
      }

      const updated = {
        ...prev,
        [sectionId]: updatedSection,
      };
      sessionStorage.removeItem("pickedQuestions");
      sessionStorage.setItem("pickedQuestions", JSON.stringify(updated));

      return updated;
    });
  };

  const toggleSolution = (questionId) => {
    setShowSolution((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  useEffect(() => {
    const fetchAutoPickedQuestions = async () => {
      const manual = sessionStorage.getItem("ManualPick");
      const auto = sessionStorage.getItem("AutoPickedQuestions");

      let saved = manual || auto;

      if (saved && testDetails?.sections?.length > 0) {
        try {
          const autoPicked = JSON.parse(saved);
          const merged = { ...pickedQuestions };

          // Merge auto-picked questions for each section
          testDetails.sections.forEach((section) => {
            const sectionId = section._id;
            if (autoPicked[sectionId]) {
              merged[sectionId] = {
                ...(merged[sectionId] || {}),
                ...autoPicked[sectionId],
              };
            }
          });

          setPickedQuestions(merged); // Update state with auto-picked questions

          sessionStorage.setItem("pickedQuestions", JSON.stringify(merged));

          // Fetch full question details by IDs
          const questionIds = [];
          Object.values(autoPicked).forEach((sectionData) => {
            Object.values(sectionData).forEach((topicData) => {
              Object.keys(topicData).forEach((qId) => questionIds.push(qId));
            });
          });

          const fullQuestions = await GetQuestionByQid(id, questionIds);

          if (fullQuestions.success) {
            const questionList = fullQuestions.data;

            questionList.forEach((q) => {
              const sectionEntry = Object.entries(autoPicked).find(
                ([_, topicMap]) =>
                  Object.values(topicMap).some((topicQids) => topicQids[q._id])
              );

              if (sectionEntry) {
                const [sectionId, topics] = sectionEntry;
                const topicName = q.Topic?.trim() || "General";

                if (!merged[sectionId]) merged[sectionId] = {};
                if (!merged[sectionId][topicName])
                  merged[sectionId][topicName] = {};

                merged[sectionId][topicName][q._id] = true;
              }
            });

            setPickedQuestions(merged); // Update the picked questions after fetch
            sessionStorage.setItem("pickedQuestions", JSON.stringify(merged));
          }
        } catch (error) {
          console.error("Error parsing AutoPickedQuestions:", error);
        }
      }
    };

    fetchAutoPickedQuestions();
  }, [testDetails]);

  const handleSubmit = () => {
    try {
      const formattedTestId = id?.testId || id;
      const selectedDetails = {};

      Object.keys(pickedQuestions).forEach((sectionId) => {
        const topicMap = pickedQuestions[sectionId];
        const section = testDetails.sections.find(
          (sec) => sec._id === sectionId
        );
        if (!section) return;

        const sectionIndex = testDetails.sections.findIndex(
          (s) => s._id === sectionId
        );
        if (sectionIndex !== -1) {
          const selectedQuestionIds = [];
          Object.values(topicMap).forEach((questionsMap) => {
            selectedQuestionIds.push(...Object.keys(questionsMap));
          });
          testDetails.sections[sectionIndex].questionBankQuestionId =
            selectedQuestionIds;
        }

        selectedDetails[sectionId] = {
          sectionDetails: {
            subject: section.subject,
            chapter: section.chapter,
            topic: section.topic,
            questionType: section.questionType,
            numberOfQuestions: section.numberOfQuestions,
          },
          pickedTopics: {},
        };

        Object.keys(topicMap).forEach((topicName) => {
          const questionIdsMap = topicMap[topicName];
          const questionIds = Object.keys(questionIdsMap);

          const fullQuestions = (sectionWiseQuestions[sectionId] || [])
            ?.filter((q) => questionIds.includes(q._id))
            .map((q) => ({
              _id: q._id,
              English: q.English,
              OptionsEnglish: q.OptionsEnglish,
              Answer: q.Answer,
              Topic: q.Topic,
              Chapter: q.Chapter,
              Difficulty: q.Difficulty,
              Images: q.Images || null,
              SolutionSteps: q.SolutionSteps || null,
            }));

          selectedDetails[sectionId].pickedTopics[topicName] = fullQuestions;
        });
      });

      const prevDetails = JSON.parse(
        sessionStorage.getItem("questionDetails") || "{}"
      );
      const updatedDetails = { ...prevDetails, ...selectedDetails };

      sessionStorage.setItem("questionDetails", JSON.stringify(updatedDetails));
      navigate(`/questionReview/${formattedTestId}`);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const handleTopicSelect = (section, topic) => {
    setSelectedSection(section);
    setSelectedTopic(topic);
  };
  const saved = localStorage.getItem("pickedQuestions");

  // useEffect(() => {
  //   // Fetch auto-picked questions from sessionStorage when the section changes
  //   const saved = sessionStorage.getItem("AutoPickedQuestions");

  //   if (saved && selectedSection) {
  //     try {
  //       const autoPicked = JSON.parse(saved);
  //       const sectionId = selectedSection._id;

  //       // Retrieve the selected questions for the section
  //       const newSectionData = autoPicked[sectionId]
  //         ? { [sectionId]: autoPicked[sectionId] }
  //         : {};

  //       // Update pickedQuestions with auto-picked data from sessionStorage
  //       setPickedQuestions((prev) => {
  //         const merged = { ...prev, ...newSectionData };

  //         sessionStorage.setItem("pickedQuestions", JSON.stringify(merged));
  //         localStorage.setItem("pickedQuestions", JSON.stringify(merged));

  //         return merged;
  //       });
  //     } catch (error) {
  //       console.error("Error parsing AutoPickedQuestions:", error);
  //     }
  //   }
  // }, [selectedSection]);

  useEffect(() => {
    const saved = sessionStorage.getItem("AutoPickedQuestions");
    if (saved && testDetails?.sections?.length > 0) {
      try {
        const autoPicked = JSON.parse(saved);
        const merged = { ...pickedQuestions };

        testDetails.sections.forEach((section) => {
          const sectionId = section._id;
          if (autoPicked[sectionId]) {
            merged[sectionId] = {
              ...(merged[sectionId] || {}),
              ...autoPicked[sectionId],
            };
          }
        });

        setPickedQuestions(merged);

        sessionStorage.setItem("pickedQuestions", JSON.stringify(merged));
        // localStorage.setItem("pickedQuestions", JSON.stringify(merged));
      } catch (error) {
        console.error("Error parsing AutoPickedQuestions:", error);
      }
    }
  }, [testDetails]);
  const GetQuestionByQid = async (id, mode) => {
    try {
      const response = await testServices.GetQuestionByQid(id, mode);

      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return { success: false, message: "Failed to fetch questions" };
    }
  };
  // useEffect(() => {
  //   localStorage.setItem("pickedQuestions", JSON.stringify(pickedQuestions));
  // }, [pickedQuestions]);

  useEffect(() => {
    // Trigger MathJax typesetting after content updates
    setTimeout(() => {
      window.MathJax?.typeset();
    }, 0);
  }, [filteredQuestions, pickedQuestions]);

  const cleanLatexString = (latexString) => {
    return latexString
      .replace(/\\\\/g, " ")
      .replace(/\$([^$]+)\$/g, "\\($1\\)")
      .replace(/\n/g, "\\\\");
  };

  // const sortQuestions = [...filteredQuestions]?.sort((a, b) => {
  //   const sectionId = selectedSection?._id;
  //   const topicA = a.Topic?.trim();
  //   const topicB = b.Topic?.trim();

  //   const isPickedA = pickedQuestions[sectionId]?.[topicA]?.[a._id] ?? false;
  //   const isPickedB = pickedQuestions[sectionId]?.[topicB]?.[b._id] ?? false;

  //   return isPickedB - isPickedA;
  // });

  useEffect(() => {
    const sectionMarkingData = JSON.parse(
      sessionStorage.getItem("sectionMarkingData") || "{}"
    );

    if (testDetails?.sections?.length > 0) {
      const sections = testDetails.sections.map((section, idx) => ({
        id: section._id,
        sectionName: section.sectionName || `Section ${idx + 1}`,
      }));

      setAllSections(sections);
      setSectionData(sectionMarkingData);
      setActiveSectionId(testDetails.sections[0]._id);
    }
  }, [testDetails]);

  return (
    <MathJaxContext version={3} config={config}>
      <TestHeader
        activeSectionId={activeSectionId}
        setActiveSectionId={(id) => {
          setActiveSectionId(id);
          const selected = testDetails?.sections?.find((s) => s._id === id);
          setSelectedSection(selected); // Update the selected section
        }}
        sectionData={sectionData}
        setSectionData={setSectionData}
        allSections={allSections}
        setAllSections={setAllSections}
      />
      <div className="flex gap-6 bg-gray-100 min-h-screen">
        <QuestionDistributionSidebar
          selectedSection={selectedSection} // Pass selected section to the sidebar
          onSelectTopic={handleTopicSelect}
          pickedQuestions={pickedQuestions}
          handleSubmit={handleSubmit}
          sectionData={sectionData}
        />
        {/* <div className="flex space-x-3 bg-white p-3 rounded-lg shadow-md">
            {testDetails?.sections?.length > 0 && (
              <div className="flex space-x-3 bg-white p-3 rounded-lg shadow-md">
                {testDetails.sections.map((section, index) => (
                  <button
                    key={section._id}
                    className={`px-5 py-2 text-lg font-semibold rounded-md transition-all ${
                      selectedSection?._id === section._id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedSection(section);
                      setSelectedTopic(null);
                    }}
                  >
                    Section {index + 1} ({section.numberOfQuestions} Qs)
                  </button>
                ))}
              </div>
            )}
          </div> */}
        <div className="w-3/4 bg-white rounded-lg shadow-md">
          <div className="flex align-center justify-between">
            <div className="bg-white p-1 rounded-lg">
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                Filtered Questions
              </p>
              <div className="flex flex-row">
                <FilterDropdown
                  name="Difficulty"
                  label="Difficulty"
                  value={filters.Difficulty}
                  onChange={handleFilterChange}
                  options={["Low", "Medium", "High"]}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button
                variant="contained"
                className="h-10"
                style={{ marginRight: "1rem" }}
                onClick={() => navigate(-1)}
              >
                Previous
              </Button>
            </div>
          </div>
          <div>
            {filteredQuestions?.length > 0 ? (
              filteredQuestions.map((question) => {
                const imageMatch = question.English?.match(
                  /\\includegraphics\[.*?\]{(.*?)}/
                );
                {
                  console.log("the quersiotnss", question);
                }
                const imageId = imageMatch ? imageMatch[1] : null;

                const cleanQuestion = question.English?.replace(
                  /\\\\/g,
                  " \\[ \n \\] "
                )
                  .replace(/\\includegraphics\[.*?\]{.*?}/g, "")
                  .trim();

                const sectionId = selectedSection?._id;
                const topicKey = (question.Topic || "General").trim();

                const isPicked =
                  pickedQuestions?.[sectionId]?.[topicKey]?.[question._id] ??
                  false;

                // const topicKey = (question.Topic || "General").trim().toLowerCase();

                // const isPicked =
                //   Object.keys(pickedQuestions[selectedSection?._id] || {}).some((storedTopicKey) => {
                //     return storedTopicKey.trim().toLowerCase() === topicKey &&
                //       pickedQuestions[selectedSection._id][storedTopicKey][question._id];
                //   });

                // const isPicked =
                //   pickedQuestions[selectedSection?._id]?.[question.Topic]?.[
                //     question._id
                //   ];

                return (
                  <div
                    key={question._id}
                    className={`mt-3 m-3 p-3 border rounded-md shadow-sm transition-all relative cursor-pointer ${
                      isPicked ? "bg-green-100 border-green-400" : "bg-white"
                    }`}
                    onClick={() =>
                      togglePickQuestion(question._id, question.Topic)
                    }
                  >
                    <div className="flex justify-between mb-3">
                      <div className="flex align-center ">
                        {
                          <div className=" top-3 right-30 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            Difficulty: {question.Difficulty}
                          </div>
                        }
                      </div>
                      <div className="flex align-center ">
                        {
                          <div className=" top-3 right-30 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            QID: {question.QID}
                          </div>
                        }
                      </div>
                      <div className="flex align-center ">
                        {question.AppearedIn !== "" && (
                          <div className=" top-3 right-30 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            {question.AppearedIn}
                          </div>
                        )}

                        {/* <button
                    className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-md transition ${
                      isPicked
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
              
                  >
                    {isPicked ? "Remove" : "Pick"}
                  </button> */}
                      </div>
                    </div>
                    {/* Question Text + Image */}
                    <div className="flex justify-between items-start">
                      <div className="w-[80%]">
                        <div className="question-text">
                          <MathJax
                            inline
                            style={{ fontSize: "16px", marginBottom: "10px" }}
                          >
                            {`${formatMathJaxContent(question.English)}`}
                          </MathJax>
                        </div>
                      </div>
                      {imageId &&
                      question.Images &&
                      question.Images[imageId] ? (
                        <img
                          src={
                            imageId ? `/uploads/questions/${imageId}.png` : ""
                          }
                          alt="Question Visual"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-image.png";
                          }}
                        />
                      ) : (
                        console.warn(`Missing image for ID: ${imageId}`)
                      )}
                    </div>
                    {/* Options Section */}
                    <ul className="mt-2 space-y-1">
                      {question.OptionsEnglish.split("\\\\")
                        .filter((option) => option.trim() !== "")
                        .map((option, index) => {
                          const correctAnswers =
                            question.Answer.split("&").map(Number);
                          const isCorrect = correctAnswers.includes(index + 1);

                          const cleanOption = formatMathJaxContent(
                            option.trim()
                          );

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

                    {/* Show Solution Button */}
                    <button
                      className="mt-2 text-xs text-blue-600 font-semibold rounded-md hover:bg-blue-100 px-2 py-1 transition"
                      onClick={() => toggleSolution(question._id)}
                      style={{ fontSize: "12px" }}
                    >
                      {showSolution[question._id]
                        ? "Hide Solution"
                        : "Show Solution"}
                    </button>

                    {showSolution[question._id] && question.SolutionSteps && (
                      <div className="mt-1 p-2 bg-gray-100 border rounded-md text-xs">
                        <MathJax>{question.SolutionSteps}</MathJax>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 mt-3">No questions found.</p>
            )}
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default QuestionPages;
