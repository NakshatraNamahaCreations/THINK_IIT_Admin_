import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiServices from "../../services/apiServices";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { useNavigate, useParams } from "react-router-dom";
import testServices from "../../services/testService";
import { Button } from "react-bootstrap";
import { Modal } from "@mui/material";

const QuestionForms = () => {
  const [questionTypes, setQuestionTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    sectionName: "",
    subject: "",
    subjectId: "",
    questionType: "",
    minQuestionsAnswerable: "",
    marksPerQuestion: "",
    negativeMarksPerWrongAnswer: "",
    numberOfQuestions: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [savedSections, setSavedSections] = useState(() => {
    const storedSections = sessionStorage.getItem("savedSections");
    return storedSections ? JSON.parse(storedSections) : [];
  });
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchTestDataById(id);
  }, [id]);

  const fetchTestDataById = async (id) => {
    try {
      const data = await testServices.getTestById(id);

      if (data) {
        setSavedSections(data.data.sections);

        sessionStorage.setItem(
          "savedSections",
          JSON.stringify(data.data.sections)
        );
      } else {
        setSavedSections([]);
      }
    } catch (error) {
      toast.error("Failed to fetch test details.");
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchQuestionType();

    const storedSections = sessionStorage.getItem("savedSections");
    if (storedSections) {
      setSavedSections(JSON.parse(storedSections));
    }
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await apiServices.fetchSubjects();
      setSubjects(data);
    } catch (error) {
      toast.error("Failed to fetch subjects.");
    }
  };

  const fetchQuestionType = async () => {
    try {
      const data = await apiServices.fetchQuestionType();
      setQuestionTypes(data);
    } catch (error) {
      toast.error("Failed to fetch question types.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "subject") {
      console.log(subjects);

      const selectedSubject = subjects.find(
        (item) => item.subjectName === value
      );

      setFormData((prev) => ({
        ...prev,
        subject: value,
        subjectId: selectedSubject ? selectedSubject._id : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!savedSections || savedSections.length === 0) {
      toast.error("Please create at least one section before proceeding.");
      return;
    }
  
    try {
      const response = await testServices.getSelectedTopics(id);
      if (response.success && response.sections.length > 0) {
        const allSectionsHaveTopics = response.sections.every(section => 
          section.topic && section.topic.length > 0 && 
          section.chapter && section.chapter.length > 0
        );
  
        if (allSectionsHaveTopics) {
          navigate(`/questionPage/${id}`);
        } else {
          navigate(`/define-syllabus/${id}`);
        }
      } else {
        navigate(`/define-syllabus/${id}`);
      }
    } catch (error) {
      console.error("Error checking selected topics:", error);
      toast.error("Something went wrong while checking topics.");
    }
  };
  

  const handleSaveSection = async () => {
    if (
      !formData.marksPerQuestion ||
      !formData.numberOfQuestions ||
      !formData.subject ||
      !formData.negativeMarksPerWrongAnswer
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const negativeMarking = parseFloat(formData.negativeMarksPerWrongAnswer);
    const marks = parseInt(formData.marksPerQuestion, 10);

    if (negativeMarking > 0) {
      setErrorMessage("Negative marking cannot be a positive number.");
      setErrorModalOpen(true);
      return;
    }
    if (formData.minQuestionsAnswerable > formData.numberOfQuestions) {
      setErrorMessage(
        "Minimum number of question cannot be more than the number of questions"
      );
      setErrorModalOpen(true);
      return;
    }
    console.log("The mini", formData.minQuestionsAnswerable);

    if (negativeMarking < 0 && Math.abs(negativeMarking) > marks) {
      toast.error(
        "Negative marking cannot be greater than the marks per question."
      );
      return;
    }

    const payload = {
      subject: formData.subject,
      subjectId: formData.subjectId,
      questionType: formData.questionType,
      numberOfQuestions: parseInt(formData.numberOfQuestions, 10),
      marksPerQuestion: marks,
      minQuestionsAnswerable: parseInt(formData.minQuestionsAnswerable, 10),
      negativeMarksPerWrongAnswer: negativeMarking,
    };

    let updatedSections = Array.isArray(savedSections)
      ? [...savedSections]
      : [];

    try {
      if (editIndex !== null) {
        const sectionId = savedSections[editIndex]._id;
        await testServices.editSection(id, sectionId, payload);

        updatedSections[editIndex] = { ...formData, _id: sectionId };
        setSavedSections(updatedSections);
        setEditIndex(null);
        toast.success("Section updated successfully!");
      } else {
        const newSection = await testServices.addSectionDetail(id, payload);
        updatedSections.push({ ...formData, _id: newSection._id });
        toast.success("Section saved successfully!");
      }

      setSavedSections(updatedSections);
      sessionStorage.setItem("savedSections", JSON.stringify(updatedSections));

      setFormData({
        sectionName: "",
        subject: "",
        questionType: "",
        marksPerQuestion: "",
        negativeMarksPerWrongAnswer: "",
        minQuestionsAnswerable: "",
        numberOfQuestions: "",
      });
    } catch (error) {
      toast.error("Error saving section.");
      console.error("Save Error:", error);
    }
  };

  const handleModalClose = () => {
    setErrorModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      sectionName: "",
      subject: "",
      questionType: "",
      marksPerQuestion: "",
      negativeMarksPerWrongAnswer: "",
      minQuestionsAnswerable: "",
      numberOfQuestions: "",
    });
  };

  const handleEditSection = (index) => {
    const selectedSection = savedSections[index];

    if (!selectedSection) {
      console.error("Section not found at index:", index);
      return;
    }
    console.log(selectedSection);

    setFormData({
      sectionName: selectedSection?.sectionName || "",
      subject: selectedSection?.subject || "",
      questionType: selectedSection?.questionType || "MCQ",
      numberOfQuestions: selectedSection?.numberOfQuestions,
      marksPerQuestion: selectedSection?.marksPerQuestion,

      negativeMarksPerWrongAnswer: selectedSection?.negativeMarksPerWrongAnswer,
      minQuestionsAnswerable: selectedSection?.minQuestionsAnswerable,
      selectionType: "Auto",
      subjectId: selectedSection?.subjectId,
    });

    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const sectionId = savedSections[index]._id;

    await testServices.deleteSection(id, sectionId);
    const newItem = savedSections.filter((_, i) => i !== index);
    setSavedSections(newItem);
  };
  return (
    <div className=" mx-auto p-8 bg-gray-100 min-h-screen flex flex-col md:flex-row gap-6">
      {/* Left Section - Single Form */}
      <div className="w-full md:w-2/3">
        <div className="mb-6 bg-white shadow-lg p-6 rounded-lg">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Enter Section Details
          </h4>

          <div className="grid grid-cols-2 gap-4">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Subject</option>
                {subjects.map((item) => (
                  <option key={item._id} value={item.subjectName}>
                    {item.subjectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-sm font-medium">Question Type</label>
              <select
                name="questionType"
                value={formData.questionType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select type</option>
                {questionTypes.map((item) => (
                  <option key={item.id} value={item.questionType}>
                    {item.questionType}
                  </option>
                ))}
              </select>
            </div>

            {/* Marks */}
            <div>
              <label className="block text-sm font-medium">
                Marks Per Question
              </label>
              <input
                type="number"
                name="marksPerQuestion"
                value={formData.marksPerQuestion}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {/* Minimum answarable */}

            {/* Negative Marking */}
            <div>
              <label className="block text-sm font-medium">
                Negative Marking
              </label>
              <input
                type="number"
                name="negativeMarksPerWrongAnswer"
                value={formData.negativeMarksPerWrongAnswer}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-medium">
                Number of Questions
              </label>
              <input
                type="number"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Minimum AnswearableQuestions
              </label>
              <input
                type="number"
                name="minQuestionsAnswerable"
                value={formData.minQuestionsAnswerable}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveSection}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Section
            </button>
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Saved Sections */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Saved Sections
        </h4>

        {savedSections?.length > 0 ? (
          savedSections?.map((section, index) => (
            <div
              key={index}
              className="p-4 bg-gray-200 rounded-lg mb-4 relative"
            >
              <div className="absolute top-2 right-2 flex space-x-2">
                <FaEdit
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handleEditSection(index)}
                />
                <FaTrash
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
              <p className="text-sm">Section Name: {section.subject}</p>
              {/* <p>Subject: {section.subject}</p> */}
              <p className="text-sm">Question Type: {section.questionType}</p>
              {/* <p>Marks: {section.marks}</p> */}
              {/* <p>Negative Marking: {section.negativeMarking}</p> */}
              <p className="text-sm">
                Number of Questions: {section.numberOfQuestions}
              </p>
              {/* <p>Selection Type: {section.selectionType}</p> */}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No sections saved yet.</p>
        )}
      </div>
      <Modal
        open={errorModalOpen}
        onClose={handleModalClose}
        aria-labelledby="error-modal"
        aria-describedby="error-modal-description"
      >
        <div
          style={{
            width: "50%",
            maxWidth: "500px",
            margin: "10rem auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-red-600 text-3xl font-bold">!</span>
          </div>
          <h2
            id="error-modal"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#f44336", // Red color for the title
            }}
          >
            Error
          </h2>
          <p
            id="error-modal-description"
            style={{
              fontSize: "1rem",
              marginBottom: "20px",
            }}
          >
            {errorMessage}
          </p>
          <Button
            onClick={handleModalClose}
            style={{
              backgroundColor: "#f44336", // Red color for the button
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionForms;
