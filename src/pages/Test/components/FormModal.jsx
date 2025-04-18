import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiServices from "../../../services/apiServices";
import { toast } from "react-toastify";
import testServices from "../../../services/testService";
import testPatterns from "../PreSection/Pattern.json";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const FormModal = ({ isOpen, onClose }) => {
  const [selectionType, setselectionType] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [testId, setTestId] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    testName: "",
    testPattern: "",
    sections: "",
    selectionType: selectionType,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "testPattern") {
      const selectedPattern = testPatterns.find((p) => p.exam === value);

      setFormData((prev) => ({
        ...prev,
        testPattern: value,
        sections: selectedPattern ? selectedPattern.sections : [],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDownloadSample = () => {
    const sampleData = [
      { section1: "q1", section2: "q2", section3: "q32" },
      { section1: "q3", section2: "q43", section3: "q43" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample");

    XLSX.writeFile(workbook, "sample-format.xlsx");
  };

  const handleSubmit = async () => {
    try {
      const matchedPattern = testPatterns.find(
        (p) =>
          p.exam.trim().toLowerCase() ===
          formData.testPattern.trim().toLowerCase()
      );

      if (!matchedPattern) {
        toast.error("Pattern not found for selected test!");
        return;
      }

      const transformedSections = matchedPattern.sections.map((section) => ({
        sectionName: section.sectionName,
        subjects: section.subjects.map((subjectName) => ({
          subjectName: subjectName,
          subjectId: "",
          chapter: [],
        })),
        questionType: section.questionType || "SCQ",
        numberOfQuestions: section.questions || 0,
        marksPerQuestion: section.correctAnswerMarks || 0,
        negativeMarksPerWrongAnswer: section.negativeMarks || 0,
        questionSelection: section.selectionType || "Manual",
        sectionStatus: "incomplete",
        questionBankQuestionId: [],
      }));

  
      const payload = {
        testName: formData.testName,
        class: formData.className,
        testPattern: formData.testPattern,
        selectionType: "SELECTION",  // This can be dynamically set to "QID" or "SELECTION"
      };
  
      console.log("Payload:", payload);
  
      const response = await testServices.createAssignment(payload);
      console.log("API response:", response);
      const testId = response.data._id;
      if (!response || !response.data) {
        throw new Error('Failed to create assignment, response data is missing.');
      }
  
      const createdTestId = response.data._id;
      console.log("createdTestId:", createdTestId);  // Log the createdTestId
  
      setTestId(createdTestId);
  
      console.log(response);
      console.log(transformedSections);
    

      // Check if the selectionType is "SELECTION", if so, skip the QID handling
      if (selectionType === "QID") {
        const sectionQIDsMap = JSON.parse(localStorage.getItem("extractedQIDs"));
        console.log("sectionQIDsMap:", sectionQIDsMap);
  
        if (sectionQIDsMap && Object.keys(sectionQIDsMap).length > 0) {
          const sectionsToSubmit = Object.entries(sectionQIDsMap).map(([sectionName, qidsArray]) => ({
            sectionName: sectionName,
            questionBankQuestionId: qidsArray.map((qidObj) => qidObj.qid),
          }));
  
          console.log("Sections with QIDs to be submitted:", sectionsToSubmit);
  
          const res = await testServices.AddSectionDetails(createdTestId, sectionsToSubmit);
          console.log("AddSectionDetails Response:", res);
  
          if (!res || !res.sections) {
            console.error("Invalid response structure:", res);
            return;
          }
  
          console.log("Sections added successfully:", res.sections);
  
     
          sessionStorage.setItem("Type", true);
          
        navigate(`/questionPage/${testId}`);
        }
      } else {
        // Handle "Selection" case, where QIDs are not required
        console.log("Proceeding with Selection-type logic");
        const sectionMap = {};
        transformedSections.forEach((section, index) => {
          const sectionKey = `section-${index}`;
          sectionMap[sectionKey] = { ...section, sectionKey };
        });
  
        localStorage.setItem(
          `test-${testId}-sections`,
          JSON.stringify(sectionMap)
        );
        localStorage.setItem("sectionCount", Object.keys(sectionMap).length);
  
        navigate(`/test-selection/${testId}`);
        sessionStorage.setItem("Type", false);
      }
  
    } catch (error) {
      toast.error("An error occurred while submitting the assignment.");
      console.error("Error:", error);
    }
  
    onClose();
  };
  
  

  const handleUploadExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploadedFileName(file.name);
  
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  
      console.log("Excel Data:", jsonData);
  
      const sectionQIDsMap = {};
  
      jsonData.forEach((row) => {
        Object.entries(row).forEach(([sectionKey, qid]) => {
          if (!qid) return;
  
          // Associate the subject with the QID (if you have a predefined subject, like "Physics")
          const subject = "Physics"; // Add your logic here if subject mapping is dynamic
  
          if (!sectionQIDsMap[sectionKey]) {
            sectionQIDsMap[sectionKey] = [];
          }
  
          sectionQIDsMap[sectionKey].push({ qid, subject });
        });
      });
  
      console.log("Parsed QIDs by section with subjects:", sectionQIDsMap);
  
      // Store the extracted QIDs and subjects in localStorage
      localStorage.setItem("extractedQIDs", JSON.stringify(sectionQIDsMap));
      toast.success("QIDs extracted section-wise!");
    };
  
    reader.readAsArrayBuffer(file);
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
          name="testPattern"
          value={formData.testPattern}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3"
        >
          <option value="">Select Test Pattern</option>

          {testPatterns.map((item, index) => (
            <option key={index} value={item.exam}>
              {item.exam}
            </option>
          ))}
        </select>

        {/* Radio Buttons */}
        <div className="flex space-x-4 mb-3">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="selectionType"
              value="QID"
              checked={selectionType === "QID"}
              onChange={() => {
                setselectionType("QID");
                setFormData((prev) => ({ ...prev, selectionType: "QID" }));
              }}
            />

            <span className="ml-2">QID</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="selectionType"
              value="SELECTION"
              checked={selectionType === "SELECTION"}
              onChange={() => {
                setselectionType("SELECTION");
                setFormData((prev) => ({
                  ...prev,
                  selectionType: "SELECTION",
                }));
              }}
            />

            <span className="ml-2">Selection</span>
          </label>
        </div>

        {selectionType === "QID" && (
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex gap-3">
              <button
                className="px-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleDownloadSample}
              >
                Download Sample
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                onClick={() => document.getElementById("excelUpload").click()}
              >
                Upload Excel
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleUploadExcel}
                  id="excelUpload"
                  className="hidden"
                />
              </button>
            </div>

            {/* Uploaded file status */}
            {uploadedFileName && (
              <p className="text-sm text-green-700">
                Uploaded: {uploadedFileName}
              </p>
            )}
          </div>
        )}

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