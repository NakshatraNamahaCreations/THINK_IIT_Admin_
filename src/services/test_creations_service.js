import axios from "axios";

import { config } from "./config";
import { toast } from "react-toastify";
import moment from "moment";

const BASE_URL = `${config.BASE_URL_TEST}${config.TEST_SECTION}`;
export const createTest = async (sections) => {
  console.log("sections", sections);
  try {
    let res = await axios.post(BASE_URL, sections);
    if (res.status === 201) {
      toast.success("Section Created Successfully!");
      return res.data;
    }
  } catch (error) {
    console.error("Error Creating Section:", error);
    toast.error("Failed to create Section. Please try again.");
    return null;
  }
};

export const createNewSection = async (id, sections) => {
  console.log("sections", sections, id);
  try {
    let res = await axios.post(`${BASE_URL}/${id}/sections`, sections);
    if (res.status === 200) {
      toast.success("Section Created Successfully!");
      return res.data;
    }
  } catch (error) {
    console.error("Error Creating Section:", error);
    toast.error("Failed to create Section. Please try again.");
    return null;
  }
};

// updated question using serctionid

//updated question based on sections

export const updatetheQuestiona = async (testId, sectionId, questions) => {
  console.log("questions", questions);
  try {
    // ✅ Remove null values before sending request
    const filteredQuestionIds = questions.filter((id) => id !== null);
    let res = await axios.put(`${BASE_URL}/${testId}/question/${sectionId}`, {
      questionBankQuestionId: filteredQuestionIds,
    });
    if (res.status === 200) {
      toast.success("Section Created Successfully!");
      return res.data;
    }
  } catch (error) {
    console.error("Error Creating Section:", error);
    toast.error("Failed to create Section. Please try again.");
    return null;
  }
};

// Fetch all test
export const getTest = async () => {
  try {
    let res = await axios.get(BASE_URL);
    if (res.status === 200) {
      return res.data.data.map((item, index) => ({
        ...item,
        id: item._id,
        sno: index + 1,
        createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
      }));
    }
  } catch (error) {
    console.error("Error fetching test:", error);
    toast.error("Failed to fetch test.");
    return [];
  }
};

// Delete a test
export const deleteTest = async (id) => {
  try {
    let res = await axios.delete(`${BASE_URL}/${id}`);
    if (res.status === 200) {
      toast.success("Test Deleted Successfully!");
      return res.data;
    }
  } catch (error) {
    console.error("Error Deleting Test:", error);
    toast.error("Failed to delete Test. Please try again.");
    return false;
  }
};

//delete sections

export const deleteSection = async (testId, sectionId) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/${testId}/sections/${sectionId}`
    );
    if (res.status === 200) {
      toast.success("section Deleted Successfully!");
      return res.data;
    }
  } catch (error) {
    toast.error("Failed to delete section.");
  }
};
