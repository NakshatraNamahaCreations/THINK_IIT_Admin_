import axios from "axios";
import { config } from "./config";
import { toast } from "react-toastify";
import moment from "moment";

const BASE_URL = `${config.BASE_URL_TEST}${config.TEST_TEMPLATE}`;

// Fetch all test templates names
export const getTestTemplatesNames = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/onlyNames`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching templates:", error);
    toast.error("Failed to fetch templates.");
    return [];
  }
};

// Fetch all test templates with pagination
export const getTestTemplates = async (page = 1, limit = 5) => {
  try {
    const res = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    console.log("res---", res.data.data);
    if (res.status === 200) {
      return {
        templates: res.data.data.data.map((item, index) => ({
          ...item,
          id: item._id,
          sno: (page - 1) * limit + index + 1,
          createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
        })),
        totalPages: res.data.data.totalPages,
      };
    }
  } catch (error) {
    console.error("Error fetching templates:", error);
    toast.error("Failed to fetch templates.");
    return { templates: [], totalPages: 1 };
  }
};

// Create a new test template
export const createTestTemplate = async (newTemplate) => {
  try {
    let res = await axios.post(BASE_URL, newTemplate);
    if (res.status === 201) {
      toast.success("Template Created Successfully!");
      return res.data;
    }
  } catch (error) {
    console.error("Error Creating Template:", error);
    toast.error("Failed to create Template. Please try again.");
    return null;
  }
};

// Update a test template
export const updateTestTemplate = async (id, updatedTemplate) => {
  try {
    let res = await axios.put(`${BASE_URL}/${id}`, updatedTemplate);
    if (res.status === 200) {
      toast.success("Template Updated Successfully!");
      return res.data;
    }
  } catch (error) {
    console.error("Error Updating Template:", error);
    toast.error("Failed to update Template. Please try again.");
    return null;
  }
};

// Delete a test template
export const deleteTestTemplate = async (id) => {
  try {
    let res = await axios.delete(`${BASE_URL}/${id}`);
    if (res.status === 200) {
      toast.success("Template Deleted Successfully!");
      return true;
    }
  } catch (error) {
    console.error("Error Deleting Template:", error);
    toast.error("Failed to delete Template. Please try again.");
    return false;
  }
};

///
