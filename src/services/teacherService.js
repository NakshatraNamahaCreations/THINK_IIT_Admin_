import axios from "axios";
import { config } from "./config"; // Ensure correct path

const teacherService = {
  // ✅ Fetch all teachers
  getTeachers: async () => {
    try {
      const response = await axios.get(`${config.INSTITUTE_BASE_URL}teacher/`);
      return response.data.data; // Return only the data
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  },

  // ✅ Create a new teacher
  createTeacher: async (teacherData) => {
    try {
      const response = await axios.post(
        `${config.INSTITUTE_BASE_URL}teacher`,
        teacherData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw error;
    }
  },

  // ✅ Update a teacher
  updateTeacher: async (id, teacherData) => {
    try {
      const response = await axios.put(
        `${config.INSTITUTE_BASE_URL}teacher/${id}`,
        teacherData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating teacher:", error);
      throw error;
    }
  },

  // ✅ Delete a teacher
  deleteTeacher: async (id) => {
    try {
      const response = await axios.delete(
        `${config.INSTITUTE_BASE_URL}teacher/delete/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting teacher:", error);
      throw error;
    }
  },

  // ✅ Fetch subjects
  getSubjects: async () => {
    try {
      const response = await axios.get(`${config.INSTITUTE_BASE_URL}subjects/`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },
};

export default teacherService;
