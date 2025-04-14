import axios from "axios";
import { config } from "./config";

const batchServices = {
  //creat
  createBatch: async (payload) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}batches`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },
};

export default batchServices;
