import React, { useState, useRef, useEffect } from "react";
import { Box, Tabs, Tab, IconButton, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import testServices from "../../../services/testService";

const TestHeader = ({
  activeSectionId,
  setActiveSectionId,
  sectionData,
  setSectionData,
  allSections,
  setAllSections,
}) => {
  // const [allSections, setAllSections] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addingNew, setAddingNew] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const containerRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  // const fetchTestDataById = async (id) => {
  //   try {

  //     const response = await testServices.getTestById(id);
  //     const test = response?.data;

  //     if (!test) {
  //       console.warn("No test data found in response");
  //       return;
  //     }
  //     if (!Array.isArray(test.sections)) {
  //       console.warn("Sections is not an array:", test.sections);
  //       return;
  //     }

  //     if (test.sections.length === 0) {
  //       console.warn("No sections found for this test.");
  //       return;
  //     }

  //     const fetchedSections = test.sections.map((section, idx) => ({
  //       id: section._id,
  //       sectionName: `Section ${String.fromCharCode(65 + idx)}`,
  //     }));
  // console.log("the fetched", fetchedSections);

  //     setAllSections(fetchedSections);
  //     setActiveSections(fetchedSections.map((s) => s.id));
  //     setActiveIndex(0);
  //     setActiveSectionId(fetchedSections[0].id);

  //     const initialSectionData = {};
  //     test.sections.forEach((section) => {
  //       initialSectionData[section._id] = {
  //         subjectSelections: [],
  //         classSelections: [""],
  //         questionType: section.questionType || "SCQ",
  //         positiveMarking: section.correctAnswerMarks || "",
  //         negativeMarking: section.negativeMarks || "",
  //         searchText: "",
  //         selectionType: "Manual",
  //         questionBankQuestionId: section.questionBankQuestionId || [],
  //         chapter: section.chapter || [],
  //         topic: section.topic || [],
  //       };
  //     });

  //     setSectionData(initialSectionData);
  //   } catch (error) {
  //     console.error("Error fetching test by ID:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTestDataById(id);
  // }, [id]);
  useEffect(() => {
    console.log("All Sections:", allSections);
    console.log("Active Sections:", activeSections);
  }, [allSections, activeSections]);

  const handleTabChange = (event, newIndex) => {
    setActiveIndex(newIndex);
    setActiveSectionId(activeSections[newIndex]);
  };
  const confirmAddSection = async () => {
    const name = newSectionName.trim();
    if (!name) return;

    try {
      const payload = { sectionName: newSectionName };
      const response = await testServices.createSections(id, payload);

      const updatedTest = response?.data;
      const createdSection =
        updatedTest.sections[updatedTest.sections.length - 1];

      const newId = createdSection._id;
      const sectionName = createdSection.sectionName;

      const newSection = { id: newId, sectionName: name };

      // Update allSections first
      const updatedSections = [...allSections, newSection];
      setAllSections(updatedSections);

      // After allSections is updated, now update active and index
      setTimeout(() => {
        setActiveSections((prev) => {
          const newActive = [...prev, newId];
          setActiveIndex(newActive.length - 1);
          setActiveSectionId(newId);
          return newActive;
        });

        // Scroll into view after DOM updates
        setTimeout(() => {
          containerRef.current?.scrollTo({
            left: containerRef.current.scrollWidth,
            behavior: "smooth",
          });
        }, 100);
      }, 0);

      // Add initial sectionData
      setSectionData((prev) => ({
        ...prev,
        [newId]: {
          subjectSelections: [],
          classSelections: [""],
          questionType: "SCQ",
          positiveMarking: "",
          negativeMarking: "",
          searchText: "",
          selectionType: "Manual",
        },
      }));

      setNewSectionName("");
      setAddingNew(false);
    } catch (err) {
      console.error("Failed to add section:", err);
    }
  };

  const handleToggleSection = (id) => {
    let updated;

    if (activeSections.includes(id)) {
      updated = activeSections.filter((sectionId) => sectionId !== id);
      setActiveSections(updated);
      if (activeIndex >= updated.length) {
        setActiveIndex(updated.length - 1);
      }
    } else {
      updated = [...activeSections, id];
      const sorted = updated.sort((a, b) => {
        const indexA = allSections.findIndex((s) => s.id === a);
        const indexB = allSections.findIndex((s) => s.id === b);
        return indexA - indexB;
      });
      setActiveSections(sorted);
      setActiveIndex(sorted.indexOf(id));
    }

    setTimeout(() => {
      containerRef.current?.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }, 100);
  };
  // useEffect(() => {
  //   if (allSections.length > 0) {
  //     const ids = allSections.map((s) => s.id);
  //     setActiveSections(ids);
  //     setActiveSectionId(ids[0]);
  //     setActiveIndex(0);
  //   }
  // }, [allSections]);
  useEffect(() => {
    const fetchTestSections = async () => {
      try {
        const response = await testServices.getTestById(id);
        const test = response?.data;
        const dbSections = test?.sections || [];

        if (dbSections.length > 0) {
          const sectionsFromDB = dbSections.map((section, idx) => ({
            id: section._id,
            sectionName:
              section.sectionName || `Section ${String.fromCharCode(65 + idx)}`,
          }));

          setAllSections(sectionsFromDB);
          setActiveSections(sectionsFromDB.map((s) => s.id));
          setActiveSectionId(sectionsFromDB[0]?.id);
          setActiveIndex(0);
        } else {
          // fallback to localStorage
          const stored = localStorage.getItem(`test-${id}-sections`);
          if (!stored) return;

          const parsed = JSON.parse(stored);
          const sectionsFromStorage = Object.entries(parsed).map(
            ([key, section]) => ({
              id: key,
              sectionName: section?.sectionName || `Section ${key}`,
            })
          );

          setAllSections(sectionsFromStorage);
          setActiveSections(sectionsFromStorage.map((s) => s.id));
          setActiveSectionId(sectionsFromStorage[0]?.id);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Failed to fetch test sections:", error);
      }
    };

    fetchTestSections();
  }, [id]);

  const handleSaveDraft = () => {
    const activeData = allSections.filter((sec) =>
      activeSections.includes(sec.id)
    );
    console.log("Saving Draft with sections:", activeData);
  };

  const handleSummary = () => {
    navigate(`/TSummery/${id}`);
  };

  const activeSectionsData = allSections.filter((s) =>
    activeSections.includes(s.id)
  );
  const inactiveSectionsData = allSections.filter(
    (s) => !activeSections.includes(s.id)
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        px: 2,
        py: 1,
        borderBottom: "1px solid black",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        gap: 2,
      }}
    >
      {/* LEFT SIDE: Tabs + Inactive */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: 1,
          flex: 1,
        }}
      >
        {/* Active Tabs */}
        <Box sx={{ display: "flex", alignItems: "center" }} ref={containerRef}>
          <Tabs
            value={activeIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              justifyContent: "center",
            }}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            {activeSectionsData.map((section) => {
              const tabIndex = activeSections.indexOf(section.id);
              const isActive = activeIndex === tabIndex;

              return (
                <Tab
                  key={section.id}
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      {section.sectionName}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSection(section.id);
                        }}
                        sx={{ ml: 1, color: "red" }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                  value={tabIndex}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "4px",
                    mx: 0.5,
                    minHeight: "32px",
                    height: "36px",
                    zIndex: 11111,
                    backgroundColor: isActive ? "#1976d2" : "#e3e7eb",
                    color: `${isActive ? "#fff" : "#333"} !important`,
                    "&:hover": {
                      backgroundColor: isActive ? "#1565c0" : "#f5f5f5",
                    },
                  }}
                />
              );
            })}
          </Tabs>

          {addingNew ? (
            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              <TextField
                size="small"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="Section Name"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmAddSection();
                }}
              />
              <IconButton onClick={confirmAddSection} sx={{ ml: 1 }}>
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setAddingNew(false);
                  setNewSectionName("");
                }}
                sx={{ ml: 1, color: "red" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton
              onClick={() => setAddingNew(true)}
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

        {/* Inactive Sections */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {inactiveSectionsData.map((section) => (
            <Box
              key={section.id}
              sx={{
                border: "1px dashed #aaa",
                borderRadius: "4px",
                px: 1.5,
                py: 0.5,
                display: "flex",
                alignItems: "center",
                color: "#888",
              }}
            >
              {section.sectionName}
              <IconButton
                size="small"
                onClick={() => handleToggleSection(section.id)}
                sx={{ ml: 1, color: "green" }}
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* RIGHT SIDE: Buttons */}
      <Box sx={{ display: "flex", gap: 1, whiteSpace: "nowrap" }}>
        <Button variant="contained" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FFA500" }}
          onClick={handleSummary}
        >
          Summary
        </Button>
        {/* <Button variant="contained" color="warning" onClick={handlePreview}>
          Preview
        </Button> */}
      </Box>
    </Box>
  );
};

export default TestHeader;
