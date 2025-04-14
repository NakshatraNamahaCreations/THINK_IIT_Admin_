import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import testServices from "../../../services/testService";

const QuestionDistributionSidebar = ({
  selectedSection,
  onSelectTopic,
  pickedQuestions,
  handleSubmit,
}) => {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await testServices.getTestById(id);
        const testSections = response?.data?.sections || [];

        const currentSection = testSections.find(
          (sec) => sec._id === selectedSection?._id
        );

        if (currentSection) {
          setSection(currentSection);
          if (currentSection.subjects?.length > 0) {
            setSelectedSubject(currentSection.subjects[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching section details:", err);
      }
    };

    if (selectedSection?._id) {
      fetchTestData();
    }
  }, [selectedSection]);

  if (!section || !selectedSubject) return null;

  const sectionId = section._id;

  return (
    <div className="w-1/4 h-screen bg-white p-4 rounded-lg shadow-md flex flex-col">
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="mb-4">
          {section.subjects?.map((subject, subjectIndex) => (
            <div key={`subject-${subjectIndex}`} className="mb-4">
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-gray-600">
                  {subject.subjectName}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  {subject.chapter?.reduce((acc, chapter) => {
                    return (
                      acc +
                      chapter.topic?.reduce((tAcc, topic) => {
                        const topicName = topic.topicName?.trim();
                        const matchedTopic = Object.keys(
                          pickedQuestions?.[sectionId] || {}
                        ).find(
                          (key) =>
                            key.trim().toLowerCase() ===
                            topicName?.toLowerCase()
                        );

                        return (
                          tAcc +
                          (matchedTopic
                            ? Object.keys(
                                pickedQuestions[sectionId][matchedTopic]
                              ).length
                            : 0)
                        );
                      }, 0)
                    );
                  }, 0) || 0}
                </p>
              </div>

              {subject.chapter?.map((chapter, chapterIndex) => (
                <div key={`chapter-${chapterIndex}`} className="ml-2 mt-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {chapter.chapterName}
                    </p>
                    <p className="text-sm font-semibold text-gray-600">
                      {chapter.topic?.reduce((count, topic) => {
                        const topicName = topic.topicName?.trim();
                        const topicData =
                          pickedQuestions?.[sectionId]?.[topicName] || {};
                        return count + Object.keys(topicData).length;
                      }, 0)}
                    </p>
                  </div>

                  {chapter.topic?.map((topic, topicIndex) => {
                    const topicName = topic.topicName?.trim();
                    const topicData =
                      pickedQuestions?.[sectionId]?.[topicName] || {};
                    const pickedCount = Object.keys(topicData).length;

                    return (
                      <div
                        key={`topic-${chapter.chapterName}-${topicName}`}
                        className={`ml-4 flex justify-between text-sm border-l pl-3 cursor-pointer ${
                          pickedCount > 0
                            ? "text-green-600 font-semibold"
                            : "text-gray-500 hover:text-indigo-600"
                        }`}
                        onClick={() => onSelectTopic(section, topic)}
                      >
                        <span style={{ fontSize: "1rem" }}>
                          {topicName?.slice(0, 15) || "Unnamed Topic"}
                        </span>
                        <span>{pickedCount}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* <div className="mb-4">
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-gray-600">
              {selectedSubject.subjectName}
            </p>
            <p className="text-sm font-semibold text-gray-600">
              {selectedSubject?.chapter?.reduce((acc, chapter) => {
                return (
                  acc +
                  chapter.topic?.reduce((tAcc, topic) => {
                    const topicName = topic.topicName?.trim();
                    const matchedTopic = Object.keys(
                      pickedQuestions?.[sectionId] || {}
                    ).find(
                      (key) =>
                        key.trim().toLowerCase() === topicName?.toLowerCase()
                    );

                    return (
                      tAcc +
                      (matchedTopic
                        ? Object.keys(pickedQuestions[sectionId][matchedTopic])
                            .length
                        : 0)
                    );
                  }, 0)
                );
              }, 0) || 0}
            </p>
          </div>

          {selectedSubject.chapter?.map((chapter, chapterIndex) => {
            return (
              <div key={`chapter-${chapterIndex}`} className="ml-2 mt-2">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    {chapter.chapterName}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    {chapter.topic?.reduce((count, topic) => {
                      const topicName = topic.topicName?.trim();
                      const topicData =
                        pickedQuestions?.[sectionId]?.[topicName] || {};
                      return count + Object.keys(topicData).length;
                    }, 0)}
                  </p>
                </div>

                {chapter.topic?.map((topic, topicIndex) => {
                  const topicName = topic.topicName?.trim();
                  const topicData =
                    pickedQuestions?.[sectionId]?.[topicName] || {};
                  const pickedCount = Object.keys(topicData).length;

                  return (
                    <div
                      key={`topic-${chapter.chapterName}-${topicName}`}
                      className={`ml-4 flex justify-between text-sm border-l pl-3 cursor-pointer ${
                        pickedCount > 0
                          ? "text-green-600 font-semibold"
                          : "text-gray-500 hover:text-indigo-600"
                      }`}
                      onClick={() => onSelectTopic(section, topic)}
                    >
                      <span style={{ fontSize: "1rem" }}>
                        {topicName?.slice(0, 15) || "Unnamed Topic"}
                      </span>
                      <span>{pickedCount}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div> */}
      </div>

      <div className="mt-4 sticky bottom-0 bg-white">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default QuestionDistributionSidebar;
