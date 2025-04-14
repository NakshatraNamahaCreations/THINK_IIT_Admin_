import axios from "axios";
import api from "./api";
import { config } from "./config";

const authService = {
  // Login User
  adminLogin: async (credentials) => {
    try {
      const { data } = await axios.post(
        `${config.INSTITUTE_BASE_URL}${config.ADMIN_LOGIN}`,
        credentials
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem(
        "instituteId",
        JSON.stringify(data.user.instituteId)
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  adminRegister: async (payload) => {
    try {
      const { data } = await axios.post(
        `${config.INSTITUTE_BASE_URL}${config.REGISTER}`,
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateAdmin: async (id, payload) => {
    try {
      const { data } = await axios.post(
        `${config.INSTITUTE_BASE_URL}${config.REGISTER}/admin/${id}`,
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  //  Fetch all aadmin
  fetchAllAdmin: async (instituteId) => {
    try {
      const { data } = await axios.get(
        `${config.INSTITUTE_BASE_URL}${config.REGISTER}/admins/${instituteId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout User
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};

export default authService;
