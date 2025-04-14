import axios from "axios";

import { config } from "./config";
const testServices = {
  createAssignment: async (formData) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}newTest/create`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating assignment:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },
  deleteTest: async (payload) => {
    try {
      const response = await axios.delete(
        `${config.BASE_URL_TEST}newTest/delete`,
        { data: payload }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting test:", error);
      return { success: false, message: "Failed to delete test" };
    }
  },

  addSectionDetail: async (id, formData) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}newTest/${id}/section`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  // Edit the section detail
  editSection: async (id, sectionId, formData) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}newTest/${id}/section/${sectionId}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  deleteSection: async (id, sectionId, formData) => {
    try {
      const response = await axios.delete(
        `${config.BASE_URL_TEST}newTest/${id}/section/${sectionId}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  getTestById: async (id) => {
    try {
      const response = await axios.get(`${config.BASE_URL_TEST}newTest/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching test by ID:", error);
      return { success: false, message: "Failed to fetch test details" };
    }
  },
  addManualQuestionIds: async (testId, payload) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}newTest/${testId}/add-question-ids`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching test by ID:", error);
      return { success: false, message: "Failed to fetch test details" };
    }
  },

  // addQuestionsToSection: async (testId, questionData) => {
  //   try {
  //     const response = await axios.post(
  //       `${config.BASE_URL_TEST}newTest/${testId}/add-sectionsdata`,
  //       questionData
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error adding questions:", error);
  //     return { success: false, message: "Failed to add questions" };
  //   }
  // },
  addQuestionsToSection: async (testId, sectionId, questionBankId) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}newTest/${testId}/section/${sectionId}/questions`,
        questionBankId
      );
      return response.data;
    } catch (error) {
      console.error("Error adding questions:", error);
      return { success: false, message: "Failed to add questions" };
    }
  },

  GetAllQuestions: async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_QUESTIONS}QB/questions`
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "Failed to get questions" };
    }
  },
  filterQuestions: async (payload) => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_QUESTIONS}QB/getfilteredquestions?${payload}`
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "Failed to get questions" };
    }
  },
  submitSelectedQuestions: async (submissionData) => {
    console.log("submissionData", submissionData);
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}newTest/submitQuestions`,
        submissionData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting selected questions:", error);
      return { success: false, message: "Failed to submit questions" };
    }
  },

  // Submit of the define of the syllabus
  defineChapterAndTopics: async (id, sectionId, formData) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}newTest/${id}/section/${sectionId}/details`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  // GetQuestion
  GetFilteredQuestions: async (payload) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_QUESTIONS}QB/getfilteredquestionswithtopic`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "Failed to get questions" };
    }
  },

  addQuestionToSection: async (id, sectionId, formData) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}newTest/${id}/section/${sectionId}/questions`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  // get All the tests
  GETALLTheTESTS: async () => {
    try {
      const response = await axios.get(`${config.BASE_URL_TEST}newTest`);
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  // Auto Pick Questions
  // Auto Pick Questions
  AutoPickQuestions: async (testId, payload) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_QUESTIONS}QB/question/auto-pick`,
        {
          testId,
          ...payload,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error auto picking questions:", error);
      return { success: false, message: "Failed to auto pick questions" };
    }
  },

  // Get Auto Picked Questions by Test ID
  // GetAutoPickedQuestions: async (testId) => {
  //   try {
  //     const response = await axios.get(
  //       `${config.BASE_URL_TEST}question/auto-picked/${testId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching auto-picked questions:", error);
  //     return {
  //       success: false,
  //       message: "Failed to fetch auto picked questions",
  //     };
  //   }
  // },

  // update the test mode
  updateTestMode: async (id, mode) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}newTest/${id}/updateTestMode`,
        mode
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  // Get Question By Q Id

  GetQuestionsByTestId: async (testId, sectionId) => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_TEST}newTest/getQuestions/${testId}/${sectionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  getSelectedTopics: async (testId, payload) => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_TEST}newTest/${testId}/get-topics`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error saving selected topics:", error);
      return { success: false, message: "Failed to save topics" };
    }
  },

  removeTopic: async (testId, sectionId, topicData) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL_TEST}newTest/${testId}/sections/${sectionId}/remove-topic`,
        topicData
      );
      return response.data;
    } catch (error) {
      console.error("Error removing topic:", error);
      return { success: false, message: "Failed to remove topic" };
    }
  },

  GetQuestionByQid: async (mode) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_QUESTIONS}QB/getByIds`,
        mode
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  getPickedQuestionByTestId: async (testId) => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_TEST}newTest/getPickedQuestions/${testId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sections:", error);
      return { success: false, message: "Failed to create assignment" };
    }
  },

  updateTestMode: async (testId, testMode, testDuration) => {
    try {
      const payload = {
        testMode,
        testDuration,
      };

      const response = await axios.put(
        `${config.BASE_URL_TEST}newTest/${testId}/updateTestMode`,
        payload
      );

      return response.data;
    } catch (error) {
      console.error("Error updating test mode:", error);
      return { success: false, message: "Failed to update test mode" };
    }
  },

  uploadExcelFile: async (testId, formData) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}newTest/upload-question-excel/${testId}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error uploading file", error);
      return { success: false, message: "Error uploading file" };
    }
  },
  createSections: async (testId, data) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}newTest/create-section/${testId}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error uploading file", error);
      return { success: false, message: "Error uploading file" };
    }
  },

  AddSectionDetails: async (testId, data) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}newTest/add-details/${testId}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error uploading file", error);
      return { success: false, message: "Error uploading file" };
    }
  },

  updateSectionMeta: async (testId, sectionId, payload) => {
    return axios.put(
      `${config.BASE_URL_TEST}newTest/update-section-meta/${testId}/${sectionId}`,
      payload
    );
  },

  // updateSectionDetails: (sectionId, data) => {
  //   return axios.put(`/api/section/${sectionId}`, data);
  // },
};

export default testServices;
