import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../services/config";
import apiServices from "../../services/apiServices";
import batchServices from "../../services/batchService";
import teacherService from "../../services/teacherService";
import Select from "react-select";
import BatchContent from "./BatchContent";

const CreateBatch = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [batchname, setBatchname] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [targetYear, setTargetYear] = useState("");
  const [batchfee, setBatchfee] = useState("");
  const [batchcategory, setBatchcategory] = useState("");
  const [batchdescription, setDescription] = useState("");
  const [batchimagefile, setBatchimagefile] = useState(null);
  const [batchclass, setBatchclass] = useState("");
  const [contentSelection, setContentSelection] = useState({
    assignment: false,
    ebooks: false,
    videos: false,
    tests: false,
  });
  const fileInputRef = useRef(null);
  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBatchimagefile(file);
    }
  };
  const [BatchID, setBatchID] = useState("");

  const createBatch = async () => {
    if (
      !batchname ||
      !startDate ||
      !endDate ||
      !batchfee ||
      !batchclass ||
      !batchcategory ||
      !batchdescription
    ) {
      toast.error("All fields are required!");
      return;
    }

    let formData = new FormData();
    formData.append("batch_name", batchname);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("batch_year", targetYear);
    formData.append("price", batchfee);
    formData.append("class", batchclass);
    formData.append("category", batchcategory);
    formData.append("description", batchdescription);
    formData.append("banner_img_path", batchimagefile);
    formData.append("content_selection", JSON.stringify(contentSelection));
    formData.append("content_selection", JSON.stringify(contentSelection));

    try {
      const res = await batchServices.createBatch(formData);
      console.log("res", res.batch);
      setBatchID(res.batch._id);
      toast.success("Batch created successfully!");
      setActiveTab("teachers");
      // setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error creating batch", error);
    }
  };

  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedTeachers, setSelectedTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchClass = await apiServices.fetchClasses();
        setClasses(fetchClass);

        const fetchCategories = await apiServices.fetchCategories();
        setCategories(fetchCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const [Teachers, setTeachers] = useState([]);
  const fetchTeachers = async () => {
    try {
      const data = await teacherService.getTeachers();
      setTeachers(data);
    } catch (error) {
      toast.error("Failed to fetch teachers.");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  // getAssignment
  const [assignmentdata, setAssignmnetdata] = useState([]);
  const [ebookdata, setEbookdata] = useState([]);
  const [videosdata, setVideosdata] = useState([]);
  const getAssignment = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_TEST}assignments/`);
      const assignments = res.data;
      if (res.status === 200) {
        setAssignmnetdata(assignments);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };
  useEffect(() => {
    getAssignment();
  }, []);

  // getEbooks

  const getEbook = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_TEST}ebooks/`);
      const ebooks = res.data;
      if (res.status === 200) {
        setEbookdata(ebooks);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  useEffect(() => {
    getEbook();
  }, []);

  const getVideos = async () => {
    try {
      let res = await axios.get(`${config.BASE_URL_TEST}videos/`);
      const videos = res.data;

      if (res.status === 200) {
        setVideosdata(videos);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);

  // Handle Teacher Selection
  const handleTeacherCheckboxChange = (teacherId, teacherName) => {
    setSelectedTeachers((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (t) => t.teacher_id === teacherId
      );

      if (isAlreadySelected) {
        // Remove teacher and all their subjects
        return prevSelected.filter((t) => t.teacher_id !== teacherId);
      } else {
        // Add teacher without any subjects initially
        return [
          ...prevSelected,
          { teacher_id: teacherId, name: teacherName, subjects: [] },
        ];
      }
    });
  };

  // Handle Subject Selection
  const handleSubjectCheckboxChange = (
    teacherId,
    teacherName,
    subjectId,
    subjectName
  ) => {
    setSelectedTeachers((prevSelected) => {
      return prevSelected.map((teacher) => {
        if (teacher.teacher_id === teacherId) {
          const isSubjectSelected = teacher.subjects.some(
            (s) => s.id === subjectId
          );

          return {
            ...teacher,
            subjects: isSubjectSelected
              ? teacher.subjects.filter((s) => s.id !== subjectId) // Remove if already selected
              : [...teacher.subjects, { id: subjectId, name: subjectName }], // Add if not selected
          };
        }
        return teacher;
      });
    });
  };

  const [selectedContent, setSelectedContent] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Sample Data
  const contentOptions = [
    { value: "assignment", label: "Assignments" },
    { value: "ebooks", label: "Ebooks" },
    { value: "videos", label: "Videos" },
  ];

  const chapters = [
    { value: "chapter1", label: "Chapter 1" },
    { value: "chapter2", label: "Chapter 2" },
  ];

  const topics = {
    chapter1: [
      { value: "topic1", label: "Topic 1" },
      { value: "topic2", label: "Topic 2" },
    ],
    chapter2: [
      { value: "topic3", label: "Topic 3" },
      { value: "topic4", label: "Topic 4" },
    ],
  };

  const data = {
    assignment: [
      {
        title: "Assignment 1",
        chapter: "chapter1",
        topic: "topic1",
        type: "Assignment",
      },
      {
        title: "Assignment 2",
        chapter: "chapter1",
        topic: "topic2",
        type: "Assignment",
      },
    ],
    ebooks: [
      { title: "Ebook 1", chapter: "chapter2", topic: "topic3", type: "Ebook" },
      { title: "Ebook 2", chapter: "chapter2", topic: "topic4", type: "Ebook" },
    ],
    videos: [
      { title: "Video 1", chapter: "chapter1", topic: "topic1", type: "Video" },
      { title: "Video 2", chapter: "chapter2", topic: "topic3", type: "Video" },
    ],
  };

  // Filtered Data Based on Selection
  const filteredData = Object.keys(data)
    .filter((key) => selectedContent.some((content) => content.value === key))
    .flatMap((key) =>
      data[key].filter(
        (item) =>
          (!selectedChapter || item.chapter === selectedChapter) &&
          (!selectedTopic || item.topic === selectedTopic)
      )
    );

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h4 className="font-bold mb-4 text-xl">Create New Batch</h4>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {[
          { id: "details", label: "Batch Details" },
          { id: "teachers", label: "Teachers" },
          { id: "contents", label: "Contents" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray font-regular">
                Batch Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-2 py-1 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                value={batchname}
                onChange={(e) => setBatchname(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray text-sm font-regular">
                  Start Date <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  className="w-full border px-2 py-1 rounded-md"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray text-sm  font-regular">
                  End Date <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  className="w-full border px-2 py-1 rounded-md"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray text-sm  font-regular mt-4">
                  Category<span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  className="w-full border px-2 py-1 rounded-md"
                  value={batchcategory}
                  onChange={(e) => setBatchcategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((item) => (
                    <option value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray  text-sm  font-regular mt-4">
                  Class<span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  className="w-full border px-2 py-1 rounded-md"
                  value={batchclass}
                  onChange={(e) => setBatchclass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classes.map((item) => (
                    <option value={item.className}>{item.className}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray text-sm  font-regular">
                  Batch Fee<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border px-2 py-1 rounded-md"
                  value={batchfee}
                  onChange={(e) => setBatchfee(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray text-sm  font-regular mt-4">
                Batch Description
              </label>
              <textarea
                className="w-full border px-2 py-1 rounded-md"
                rows="3"
                value={batchdescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end items-end w-full p-4  ">
            <div className="relative w-full md:w-1/2 flex flex-col items-center p-4 border rounded-lg shadow-md bg-gray-100 ml-auto">
              <label className="text-gray-700 font-medium">
                Upload Batch Banner<span className="text-red-500 ml-1">*</span>
              </label>
              <label className="text-gray-500 font-small ts-2">
                w-330px h-180px
              </label>
              {/* Upload Container */}
              <div
                className="w-full h-48 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-white mt-2"
                onClick={handleFileClick}
              >
                {batchimagefile ? (
                  <img
                    src={URL.createObjectURL(batchimagefile)}
                    alt="Batch Banner"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm5 7a1 1 0 002 0V7a1 1 0 10-2 0v5zm-3 0a1 1 0 002 0V9a1 1 0 10-2 0v3zm9-3a1 1 0 10-2 0v3a1 1 0 002 0V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-gray-500 mt-2">Click to Upload</p>
                  </>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Batch Details */}
              <div className="w-full mt-3 p-1 bg-white rounded-md shadow-sm text-center">
                <h6 className="text-lg font-semibold text-gray-800">
                  {batchname || "Batch Name"}
                </h6>

                <div className="text-gray-600 text-sm mt-1 grid grid-cols-2 ">
                  <p>
                    <span className="font-semibold">Start on:</span>{" "}
                    {startDate || "Not Set"}
                  </p>
                  <p>
                    <span className="font-semibold"></span>{" "}
                    {endDate || "Not Set"}
                  </p>
                </div>
                <p>
                  <span className="font-bold text-black-800 text-start"></span>{" "}
                  Rs. {batchfee || "0"}
                </p>
                <p className=" truncate w-full overflow-hidden whitespace-nowrap">
                  {batchdescription || "No Description"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "teachers" && (
        <div className="mt-4 p-3 bg-white rounded-lg shadow-md">
          <h6 className="text-xl font-semibold mb-4">Assign Teachers</h6>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search teachers..."
            className="w-60 p-1 border border-gray-300 rounded-md mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Display Teachers with Subjects */}
          {Teachers.filter((teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((teacher) => {
            const isTeacherSelected = selectedTeachers.some(
              (t) => t.teacher_id === teacher._id
            );

            return (
              <div
                key={teacher._id}
                className="border px-3 p-2 rounded-md mb-4 shadow-sm"
              >
                {/* Teacher Selection */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">{teacher.name}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isTeacherSelected}
                    onChange={() =>
                      handleTeacherCheckboxChange(teacher._id, teacher.name)
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>

                {/* Subject Selection */}
                {/* Subject Selection */}
                {isTeacherSelected && (
                  <div className=" flex flex-wrap gap-2">
                    {teacher.subjects.map((subject) => {
                      const isSubjectSelected = selectedTeachers
                        .find((t) => t.teacher_id === teacher._id)
                        ?.subjects.some((s) => s.id === subject.id);

                      return (
                        <label
                          key={subject.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={isSubjectSelected}
                            onChange={() =>
                              handleSubjectCheckboxChange(
                                teacher._id,
                                teacher.name,
                                subject.id,
                                subject.name
                              )
                            }
                            className="w-3 h-3 text-blue-600 border-gray-300 rounded mx-2"
                          />
                          <span className="text-xs	 text-gray-700">
                            {subject.name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Selected Teachers Output */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm">
            <p className="text-xs font-semibold">
              Selected Teachers & Subjects
            </p>
            {selectedTeachers.length > 0 ? (
              <ul className="mt-2 list-disc pl-6">
                {selectedTeachers.map((teacher) => (
                  <li key={teacher.teacher_id} className="text-gray-700">
                    <strong className=" text-xs">{teacher.name}</strong>
                    {teacher.subjects.length > 0 && (
                      <ul className="ml-4 list-disc">
                        {teacher.subjects.map((subject) => (
                          <li
                            key={subject.id}
                            className=" text-xs text-gray-600"
                          >
                            {subject.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className=" text-xs text-gray-500">No teachers assigned.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "contents" && <BatchContent />}

      <div className="flex justify-end mt-6">
        <button
          className="w-60 bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700"
          onClick={createBatch}
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default CreateBatch;
