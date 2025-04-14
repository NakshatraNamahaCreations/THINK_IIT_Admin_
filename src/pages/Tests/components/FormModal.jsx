import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiServices from "../../../services/apiServices";
import { toast } from "react-toastify";
import testServices from "../../../services/testService";



const FormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    testName: "",
    className: "",
    // section: "",
  });

  const [ClasData, setClasData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClass();
  }, []);

  const fetchClass = async () => {
    try {
      const data = await apiServices.fetchClasses();
      setClasData(data);
    } catch (error) {
      toast.error("Failed to fetch classes.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async () => {
  //   // const sectionCount = parseInt(formData.section, 10);

  //   // if (!formData.testName || !formData.className || sectionCount < 1) {
  //   //   toast.error("Please fill all fields correctly.");
  //   //   return;
  //   // }

  //   try {
  //     const response = await testServices.createAssignment({
  //       testName: formData.testName,
  //       className: formData.className,
  //     });

  //     localStorage.setItem("sectionCount", 2);
  //     navigate(`/questionForm/${response.data._id}`);
  //   } catch (error) {
  //     toast.error("An error occurred while submitting the assignment.");
  //   }

  //   onClose();
  // };
  const handleSubmit = async () => {
    try {
      // Get the pattern based on selected testPattern
      const matchedPattern = patternJSON.find(
        (p) =>
          p.exam.trim().toLowerCase() === formData.testPattern.trim().toLowerCase()
      );
      console.log("the checkffdfdsfsdf");
  
      if (!matchedPattern) {
        toast.error("Pattern not found for selected test!");
        return;
      }

      // Transform the sections to match schema
      const transformedSections = matchedPattern.sections.map((section) => ({
        sectionName: section.sectionName,
        subject: section.subjects.map((s) => ({ subjectName: s })),
        questionType: section.questionType,
        numberOfQuestions: section.questions,
        marksPerQuestion: section.correctAnswerMarks,
        negativeMarksPerWrongAnswer: section.negativeMarks,
        sectionStatus: "incomplete",
        chapter: [],
        topic: [],
        questionBankQuestionId: [],
      }));
  
      const payload = {
        testName: formData.testName,
        class: formData.className,
        testPattern: formData.testPattern,
        selectionType: "SELECTION",
        sections: transformedSections,
      };
  
      const response = await testServices.createAssignment(payload);
  
      localStorage.setItem("sectionCount", transformedSections.length);
      navigate(`/questionForm/${response.data._id}`);
    } catch (error) {
      toast.error("An error occurred while submitting the assignment.");
    }
  
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">New Test</h2>

        {/* Test Name Input */}
        <input
          type="text"
          name="testName"
          value={formData.testName}
          onChange={handleChange}
          placeholder="Test Name"
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3"
        />

        {/* Class Dropdown */}
        <select
          name="className"
          value={formData.className}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3"
        >
          <option value="">Select Class</option>
          {ClasData.map((item) => (
            <option key={item.className} value={item.className}>
              {item.className}
            </option>
          ))}
        </select>

        {/* Section Input
        <input
          type="number"
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Enter Number of Sections"
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3"
          min="1"
        /> */}

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
