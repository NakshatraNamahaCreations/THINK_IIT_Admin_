import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Box } from "@mui/material";
import { Margin } from "@mui/icons-material";
const classes = ["10", "11", "12"];

const TopicSelection = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [activeTopic, setActiveTopic] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questionSelection, setQuestionSelection] = useState("Manual");
  const [showDropdown, setShowDropdown] = useState(false);
  const topics = ["Physics", "Maths", "Chemistry", "Botany", "Zooligy"];
  const [selectedCells, setSelectedCells] = useState(new Set());
  const navigate = useNavigate();
  const [showTopicSelection, setShowTopicSelection] = useState(false);

  const handleNextClick = () => {
    navigate("/questionSelection");
  };

  const handleCellClick = (index) => {
    setSelectedCells((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  const handleTopicSelect = (event) => {
    const value = event.target.value;
    if (value && !selectedTopics.includes(value)) {
      const newTopics = [...selectedTopics, value];
      setSelectedTopics(newTopics);
      setActiveTopic(value);
    }
    setSelectedTopic(""); 
    setShowDropdown(false); 
  };

  const removeTopic = (topic) => {
    const newTopics = selectedTopics.filter((t) => t !== topic);
    setSelectedTopics(newTopics);
    if (activeTopic === topic) {
      setActiveTopic(newTopics.length > 0 ? newTopics[0] : null);
    }
  };

  return (
    <div className="py-4">
      {/* First Row - Selected Topics as Section Tabs and Topic Dropdown */}
      <div className="flex flex-wrap items-center gap-4 border-b mb-4">
        {selectedTopics.map((topic) => (
          <div key={topic} className="relative flex items-center">
            <button
              onClick={() => setActiveTopic(topic)}
              className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-all flex items-center gap-2 ${
                activeTopic === topic
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {topic}
              <X
                onClick={(e) => {
                  e.stopPropagation();
                  removeTopic(topic);
                }}
                className="ml-1 w-4 h-4 text-white hover:text-gray-300 cursor-pointer"
              />
            </button>
          </div>
        ))}
        {showDropdown ? (
          <div className="relative border px-3 py-2 rounded-md w-48">
            <label className="absolute -top-3 left-2 bg-white px-1 text-sm text-gray-600">
              Subject
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                handleTopicSelect(e);
                setShowTopicSelection(false);
              }}
              className="w-full bg-transparent outline-none"
            >
              <option value="">Selelct One</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <button
            onClick={() => setShowDropdown(true)}
            className="px-4 py-2 text-sm font-semibold rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            +
          </button>
        )}
      </div>

      {/* Second Row - Class Dropdown, Search Box, Search Button */}
      <div className="mt-4 flex items-center gap-4 flex-wrap">
        <div className="relative border px-3 py-2 rounded-md w-48">
          <label className="absolute -top-3 left-2 bg-white px-1 text-sm text-gray-600">
            Select Class
          </label>
          <select
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-transparent outline-none"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-md w-48 bg-transparent outline-none"
        />
        <button
          onClick={() => setShowTopicSelection(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>

        <span className="text-m font-semibold">Question Selection:</span>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="questionSelection"
            value="Manual"
            checked={questionSelection === "Manual"}
            onChange={() => setQuestionSelection("Manual")}
            className="form-radio"
          />
          Manual
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="questionSelection"
            value="Auto"
            checked={questionSelection === "Auto"}
            onChange={() => setQuestionSelection("Auto")}
            className="form-radio"
          />
          Auto
        </label>
      </div>
      {showTopicSelection ? (
        <Box style={{ maxHeight: "70vh", overflowY: "auto" }} className="mt-4">
          <div className="mb-6 mt-4 mr-4 bg-blue-200 p-4 rounded-lg shadow-md max-w-full">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h6 className="text-lg font-semibold text-gray-800 mb-3">
                Thermodynamics
              </h6>
              <div className="max-h-96 overflow-y-auto border rounded-lg p-2">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {questionSelection === "Auto"
                        ? topics.reduce((rows, topic, index) => {
                            if (index % 2 === 0) {
                              rows.push(
                                <tr key={index} className="border-b">
                                  <td
                                    className={`px-4 py-2 font-semibold cursor-pointer ${
                                      selectedCells.has(index)
                                        ? "bg-green-200"
                                        : "bg-white"
                                    } text-gray-700`}
                                    onClick={() => handleCellClick(index)}
                                  >
                                    {topic}
                                  </td>
                                  <td className="px-4 py-2 bg-white">
                                    <input
                                      type="number"
                                      className="px-3 py-2 border rounded-md text-gray-700 w-20 bg-white"
                                      placeholder="0"
                                    />
                                  </td>
                                  {topics[index + 1] && (
                                    <>
                                      <td
                                        className={`px-4 py-2 font-semibold cursor-pointer ${
                                          selectedCells.has(index + 1)
                                            ? "bg-green-200"
                                            : "bg-white"
                                        } text-gray-700`}
                                        onClick={() =>
                                          handleCellClick(index + 1)
                                        }
                                      >
                                        {topics[index + 1]}
                                      </td>
                                      <td className="px-4 py-2 bg-white">
                                        <input
                                          type="number"
                                          className="px-3 py-2 border rounded-md text-gray-700 w-20 bg-white"
                                          placeholder="0"
                                        />
                                      </td>
                                    </>
                                  )}
                                </tr>
                              );
                            }
                            return rows;
                          }, [])
                        : topics.reduce((rows, topic, index) => {
                            if (index % 4 === 0) {
                              rows.push(
                                <tr key={index} className="border-b">
                                  {Array(4)
                                    .fill(null)
                                    .map((_, i) =>
                                      topics[index + i] ? (
                                        <td
                                          key={index + i}
                                          className={`px-4 py-2 font-semibold cursor-pointer ${
                                            selectedCells.has(index + i)
                                              ? "bg-green-200"
                                              : "bg-white"
                                          } text-gray-700`}
                                          onClick={() =>
                                            handleCellClick(index + i)
                                          }
                                        >
                                          {topics[index + i]}
                                        </td>
                                      ) : (
                                        <td
                                          key={index + i}
                                          className="px-4 py-2 bg-white"
                                        ></td>
                                      )
                                    )}
                                </tr>
                              );
                            }
                            return rows;
                          }, [])}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 mt-4 mr-4 bg-gray-200 p-4 rounded-lg shadow-md max-w-full">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h6 className="text-lg font-semibold text-gray-800 mb-3">
                Thermodynamics
              </h6>
              <div className="max-h-96 overflow-y-auto border rounded-lg p-2">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {questionSelection === "Auto"
                        ? topics.reduce((rows, topic, index) => {
                            if (index % 2 === 0) {
                              rows.push(
                                <tr key={index} className="border-b">
                                  <td
                                    className={`px-4 py-2 font-semibold cursor-pointer ${
                                      selectedCells.has(index)
                                        ? "bg-green-200"
                                        : "bg-white"
                                    } text-gray-700`}
                                    onClick={() => handleCellClick(index)}
                                  >
                                    {topic}
                                  </td>
                                  <td className="px-4 py-2 bg-white">
                                    <input
                                      type="number"
                                      className="px-3 py-2 border rounded-md text-gray-700 w-20 bg-white"
                                      placeholder="0"
                                    />
                                  </td>
                                  {topics[index + 1] && (
                                    <>
                                      <td
                                        className={`px-4 py-2 font-semibold cursor-pointer ${
                                          selectedCells.has(index + 1)
                                            ? "bg-green-200"
                                            : "bg-white"
                                        } text-gray-700`}
                                        onClick={() =>
                                          handleCellClick(index + 1)
                                        }
                                      >
                                        {topics[index + 1]}
                                      </td>
                                      <td className="px-4 py-2 bg-white">
                                        <input
                                          type="number"
                                          className="px-3 py-2 border rounded-md text-gray-700 w-20 bg-white"
                                          placeholder="0"
                                        />
                                      </td>
                                    </>
                                  )}
                                </tr>
                              );
                            }
                            return rows;
                          }, [])
                        : topics.reduce((rows, topic, index) => {
                            if (index % 4 === 0) {
                              rows.push(
                                <tr key={index} className="border-b">
                                  {Array(4)
                                    .fill(null)
                                    .map((_, i) =>
                                      topics[index + i] ? (
                                        <td
                                          key={index + i}
                                          className={`px-4 py-2 font-semibold cursor-pointer ${
                                            selectedCells.has(index + i)
                                              ? "bg-green-200"
                                              : "bg-white"
                                          } text-gray-700`}
                                          onClick={() =>
                                            handleCellClick(index + i)
                                          }
                                        >
                                          {topics[index + i]}
                                        </td>
                                      ) : (
                                        <td
                                          key={index + i}
                                          className="px-4 py-2 bg-white"
                                        ></td>
                                      )
                                    )}
                                </tr>
                              );
                            }
                            return rows;
                          }, [])}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 mt-4 mr-4 bg-gray-200 p-4 rounded-lg shadow-md max-w-full">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h6 className="text-lg font-semibold text-gray-800 mb-3">
                Thermodynamics
              </h6>
              <div className="max-h-96 overflow-y-auto border rounded-lg p-2">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {questionSelection === "Auto"
                        ? topics.reduce((rows, topic, index) => {
                            if (index % 2 === 0) {
                              rows.push(
                                <tr key={index} className="border-b">
                                  <td
                                    className={`px-4 py-2 font-semibold cursor-pointer ${
                                      selectedCells.has(index)
                                        ? "bg-green-200"
                                        : "bg-white"
                                    } text-gray-700`}
                                    onClick={() => handleCellClick(index)}
                                  >
                                    {topic}
                                  </td>
                                  <td className="px-4 py-2 bg-white">
                                    <input
                                      type="number"
                                      className="px-3 py-2 border rounded-md text-gray-700 w-20 bg-white"
                                      placeholder="0"
                                    />
                                  </td>
                                  {topics[index + 1] && (
                                    <>
                                      <td
                                        className={`px-4 py-2 font-semibold cursor-pointer ${
                                          selectedCells.has(index + 1)
                                            ? "bg-green-200"
                                            : "bg-white"
                                        } text-gray-700`}
                                        onClick={() =>
                                          handleCellClick(index + 1)
                                        }
                                      >
                                        {topics[index + 1]}
                                      </td>
                                      <td className="px-4 py-2 bg-white">
                                        <input
                                          type="number"
                                          className="px-3 py-2 border rounded-md text-gray-700 w-20 bg-white"
                                          placeholder="0"
                                        />
                                      </td>
                                    </>
                                  )}
                                </tr>
                              );
                            }
                            return rows;
                          }, [])
                        : topics.reduce((rows, topic, index) => {
                            if (index % 4 === 0) {
                              rows.push(
                                <tr key={index} className="border-b">
                                  {Array(4)
                                    .fill(null)
                                    .map((_, i) =>
                                      topics[index + i] ? (
                                        <td
                                          key={index + i}
                                          className={`px-4 py-2 font-semibold cursor-pointer ${
                                            selectedCells.has(index + i)
                                              ? "bg-green-200"
                                              : "bg-white"
                                          } text-gray-700`}
                                          onClick={() =>
                                            handleCellClick(index + i)
                                          }
                                        >
                                          {topics[index + i]}
                                        </td>
                                      ) : (
                                        <td
                                          key={index + i}
                                          className="px-4 py-2 bg-white"
                                        ></td>
                                      )
                                    )}
                                </tr>
                              );
                            }
                            return rows;
                          }, [])}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopicSelection;
