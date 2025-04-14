import axios from "axios";
import { config } from "./config";

const apiServices = {
  // create the subject 
  createSubject: async () => {
    try {
      const response = await axios.post(`${config.BASE_URL_QUESTIONS}subject`);
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

  // Fetch all classes
  fetchClasses: async () => {
    try {
      const response = await axios.get(`${config.BASE_URL_QUESTIONS}class`);
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

  // Fetch all subjects
  fetchSubjects: async () => {
    try {
      const response = await axios.get(`${config.BASE_URL_QUESTIONS}subject`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },
  // Fetch all chapter
  fetchChapter: async (subID) => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_QUESTIONS}chapter/subject/${subID}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching chapter:", error);
      throw error;
    }
  },

  // Fetch all subchapter
  fetchTopic: async (chapterId) => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_QUESTIONS}topic/chapter/${chapterId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching subchapter:", error);
      throw error;
    }
  },

  // Fetch all questionType
  fetchQuestionType: async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL_QUESTIONS}questionType`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching questionType:", error);
      throw error;
    }
  },

  // Fetch all categories
  fetchCategories: async () => {
    try {
      const response = await axios.get(`${config.INSTITUTE_BASE_URL}category`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Fetch all language
  fetchLanguage: async () => {
    try {
      const response = await axios.get(`${config.INSTITUTE_BASE_URL}language`);
      return response.data;
    } catch (error) {
      console.error("Error fetching language:", error);
      throw error;
    }
  },
};

export default apiServices;
