import React, { useState } from "react";

const BatchContent = () => {
  const [activeTab, setActiveTab] = useState("assignments"); // Default Tab
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample Chapters & Topics
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

  // Sample Data
  const data = {
    assignments: [
      {
        id: 1,
        title: "Assignment 1",
        chapter: "chapter1",
        topic: "topic1",
        type: "Assignment",
      },
      {
        id: 2,
        title: "Assignment 2",
        chapter: "chapter1",
        topic: "topic2",
        type: "Assignment",
      },
    ],
    ebooks: [
      {
        id: 3,
        title: "Ebook 1",
        chapter: "chapter2",
        topic: "topic3",
        type: "Ebook",
      },
      {
        id: 4,
        title: "Ebook 2",
        chapter: "chapter2",
        topic: "topic4",
        type: "Ebook",
      },
    ],
    videos: [
      {
        id: 5,
        title: "Video 1",
        chapter: "chapter1",
        topic: "topic1",
        type: "Video",
      },
      {
        id: 6,
        title: "Video 2",
        chapter: "chapter2",
        topic: "topic3",
        type: "Video",
      },
    ],
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((selectedId) => selectedId !== id)
          : [...prevSelected, id] // Add if not selected
    );
  };

  // Filtered Data Based on Chapter & Topic Selection
  const filteredData = data[activeTab]?.filter(
    (item) =>
      (!selectedChapter || item.chapter === selectedChapter) &&
      (!selectedTopic || item.topic === selectedTopic)
  );

  return (
    <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
      <h6 className="text-xl font-semibold mb-4">Content Manager</h6>

      {/* Tabs for Assignments, Videos, and Ebooks */}
      <div className="flex space-x-4 border-b pb-2">
        {Object.keys(data).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {/* Chapter Selection */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Chapter
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
          >
            <option value="">All Chapters</option>
            {chapters.map((chapter) => (
              <option key={chapter.value} value={chapter.value}>
                {chapter.label}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Selection */}
        {selectedChapter && (
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Topic
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">All Topics</option>
              {(topics[selectedChapter] || []).map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {/* Filtered Data Table with Checkboxes */}
      {filteredData.length > 0 ? (
        <div className="mt-4">
          <h6 className="text-lg font-semibold mb-2">Filtered Content</h6>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Select</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Chapter</th>
                <th className="border p-2">Topic</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="text-center border">
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">{item.type}</td>
                  <td className="border p-2">{item.chapter}</td>
                  <td className="border p-2">{item.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          No content available for the selected filters.
        </p>
      )}

      {/* Selected Items List */}
      {selectedItems.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm">
          <h6 className="text-lg font-semibold">Selected Items</h6>
          <ul className="mt-2 list-disc pl-6">
            {selectedItems.map((id) => {
              const selectedItem = Object.values(data)
                .flat()
                .find((item) => item.id === id);
              return (
                <li key={id} className="text-gray-700">
                  {selectedItem?.title} ({selectedItem?.type})
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BatchContent;
