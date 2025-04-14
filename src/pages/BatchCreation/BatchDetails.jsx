import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { config } from "../../services/config";
import { EyeIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";

const BatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [batchdata, setBatchData] = useState({});
  const [testDates, setTestDates] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);
  const [loading, setLoading] = useState(false);
  const [newTest, setNewTest] = useState({
    testName: "",
    test_id: "1",
    startDate: "",
    startTime: "",
    enddate: "",
    endTime: "",
    resultDate: "",
    resultTime: "",
    isLifetime: false,
  });

  useEffect(() => {
    getBatchById();
  }, []);

  const getBatchById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL_TEST}batches/${id}`);
      setBatchData(response.data);
      const formattedDates = response.data.tests.map((test) =>
        new Date(test.startDate).toLocaleDateString()
      );
      setTestDates(formattedDates);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
  };

  const isTestDate = (date) => testDates.includes(date.toLocaleDateString());

  // const handleDateClick = (date) => {
  //   const selectedDate = date.toLocaleDateString("en-CA");
  //   navigate(`/TestSchedule/${id}/${selectedDate}`);
  // };

  const handleCreateTest = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${config.BASE_URL_TEST}batches/${id}/schedule-test`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTest),
        }
      );

      const data = await response.json();
      if (response.ok) {
        handleCloseModal();
        getBatchById();
        toast.success("Test scheduled successfully!");
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.error("Failed to schedule test. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 font-poppins text-sm">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 font-semibold mb-4"
      >
        &larr; Back to Batch List
      </button>

      <h6 className="text-xs font-bold mb-4">Batch Details</h6>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Banner + Batch Details */}
        <div>
          {/* Banner Image */}
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-col items-center relative">
            {batchdata.banner_img_path ? (
              <>
                <img
                  src={batchdata.banner_img_path}
                  alt="Batch Banner"
                  className="w-full h-[200px] rounded object-cover"
                />

                {/* Display Banner Name */}
                <p className="mt-2 text-sm font-semibold text-gray-700">
                  {batchdata.banner_img_name || "Banner Image"}
                </p>
              </>
            ) : (
              <div className="border-dashed border-2 border-gray-300 p-4 w-[300px] h-[200px] flex flex-col items-center justify-center relative">
                {/* Status Badge */}
                {batchdata.status === "active" && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                    Active
                  </span>
                )}

                <span className="text-gray-500 text-xs">No Image Uploaded</span>
                <p className="mt-2 text-sm font-semibold text-gray-700">
                  Banner Image
                </p>
                <span className="text-xs text-red-500">Not Uploaded</span>
              </div>
            )}
          </div>

          {/* Batch Information */}
          <div className="relative bg-white p-4 rounded-lg shadow">
            {batchdata.status && (
              <span
                className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-md shadow
        ${
          batchdata.status === "active"
            ? "bg-green-500"
            : batchdata.status === "pending"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
              >
                {batchdata.status}
              </span>
            )}

            {/* Basic Information */}
            <h6 className="font-semibold mb-3 text-sm">Basic Information</h6>
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <p>
                <strong>Batch Name:</strong> {batchdata.batch_name || "N/A"}
              </p>
              <p>
                <strong>Class:</strong> {batchdata.class || "N/A"}
              </p>
              <p>
                <strong>Category:</strong> {batchdata.category || "N/A"}
              </p>
              <p>
                <strong>Start Date:</strong> {batchdata.startDate || "N/A"}
              </p>
              <p>
                <strong>End Date:</strong> {batchdata.endDate || "N/A"}
              </p>
              <p>
                <strong>Price:</strong> ₹
                {batchdata.price ? batchdata.price.toLocaleString() : "N/A"}
              </p>
            </div>

            {/* Teacher and Subjects Information */}
            <div className="mt-4">
              <h6 className="font-semibold text-sm">Teacher & Subjects</h6>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <p>
                  <strong>Teacher Name:</strong>{" "}
                  {batchdata.teacher_name || "N/A"}
                </p>
                <p>
                  <strong>Subjects:</strong>{" "}
                  {batchdata.subjects && batchdata.subjects.length > 0
                    ? batchdata.subjects.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="mb-4  text-sm ">
            <h6 className="font-semibold text-sm mb-3">📅 Test Calendar</h6>
            <div className="font-semibold text-sm text-center">
              <Calendar
                onChange={setCalendarDate}
                value={calendarDate}
                // onClickDay={handleDateClick}
                tileClassName={({ date }) =>
                  isTestDate(date)
                    ? "bg-blue-500 text-red font-bold rounded-lg p-1"
                    : ""
                }
                tileContent={({ date }) =>
                  isTestDate(date) ? (
                    <div className="bg-red-500 w-3 h-3 rounded-full mx-auto mt-1"></div>
                  ) : null
                }
                className="border border-gray-200 rounded-lg shadow-md w-full"
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-3">
              <h6 className="font-semibold text-xs">Tests</h6>
              <button
                onClick={handleOpenModal}
                className="bg-blue-600 text-white px-3 py-1 text-xs rounded"
              >
                + Test schedule
              </button>
            </div>
            {batchdata.tests && batchdata.tests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border text-xs">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2 border">Test Name</th>
                      <th className="p-2 border">Start Date & Time</th>
                      <th className="p-2 border">End Date & Time</th>
                      <th className="p-2 border">Result Date & Time</th>
                      <th className="p-2 border">islife time</th>
                      <th className="p-2 border">Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchdata.tests.map((test, index) => {
                      console.log(
                        `Test ${index} - isLifetime:`,
                        test.isLifetime
                      ); // Debugging log

                      return (
                        <tr key={index} className="border">
                          <td className="p-2 border">
                            {test.testName || "N/A"}
                          </td>
                          <td className="p-2 border">
                            {test.startDate || "N/A"} {test.startTime}
                          </td>
                          <td className="p-2 border">
                            {test.enddate || "N/A"} {test.endTime}
                          </td>
                          <td className="p-2 border">
                            {test.resultDate || "N/A"} {test.resultTime}
                          </td>
                          <td className="p-2 border">
                            {test.isLifetime === true
                              ? "Lifetime"
                              : test.isLifetime === false
                              ? "No"
                              : "N/A"}
                          </td>
                          <td className="p-2 border">
                            <EyeIcon
                              className="w-5 h-5 text-blue-600 cursor-pointer"
                              onClick={() => navigate(`/results`)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs">No tests scheduled.</p>
            )}
          </div>
        </div>
        <button className="bg-purple-600 text-white px-3 py-2 text-xs rounded">
          + Assign to student
        </button>
      </div>
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <Box className="bg-white p-6 rounded-lg shadow-lg w-1/3 mx-auto mt-20">
          <Typography variant="h6" className="mb-4 font-semibold text-gray-700">
            Schedule a New Test
          </Typography>

          {/* Test Name */}
          <TextField
            label="Test Name"
            fullWidth
            margin="normal"
            size="small"
            className="mb-4"
            onChange={(e) =>
              setNewTest({ ...newTest, testName: e.target.value })
            }
          />

          {/* Lifetime Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={newTest.isLifetime}
                onChange={(e) =>
                  setNewTest({ ...newTest, isLifetime: e.target.checked })
                }
                color="primary"
              />
            }
            label="Is Lifetime?"
            className="mb-4"
          />

          {/* Conditional Fields */}
          {!newTest.isLifetime && (
            <>
              <Box className="flex gap-4">
                <TextField
                  type="date"
                  label="Start Date"
                  fullWidth
                  size="small"
                  margin="normal"
                  slotProps={{ inputLabel: { shrink: true } }}
                  className="mb-4"
                  onChange={(e) =>
                    setNewTest({ ...newTest, startDate: e.target.value })
                  }
                />

                <TextField
                  type="time"
                  label="Start Time"
                  fullWidth
                  margin="normal"
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                  className="mb-4"
                  onChange={(e) =>
                    setNewTest({ ...newTest, startTime: e.target.value })
                  }
                />
              </Box>
              <Box className="flex gap-4">
                <TextField
                  type="date"
                  label="End Date"
                  fullWidth
                  size="small"
                  margin="normal"
                  slotProps={{ inputLabel: { shrink: true } }}
                  className="mb-4"
                  onChange={(e) =>
                    setNewTest({ ...newTest, enddate: e.target.value })
                  }
                />

                <TextField
                  type="time"
                  label="End Time"
                  fullWidth
                  size="small"
                  margin="normal"
                  className="mb-4"
                  slotProps={{ inputLabel: { shrink: true } }}
                  onChange={(e) =>
                    setNewTest({ ...newTest, endTime: e.target.value })
                  }
                />
              </Box>
              <Box className="flex gap-4">
                <TextField
                  type="date"
                  label="Result Date"
                  fullWidth
                  size="small"
                  margin="normal"
                  slotProps={{ inputLabel: { shrink: true } }}
                  className="mb-4"
                  onChange={(e) =>
                    setNewTest({ ...newTest, resultDate: e.target.value })
                  }
                />
                <TextField
                  type="time"
                  label="Result Time"
                  fullWidth
                  size="small"
                  margin="normal"
                  slotProps={{ inputLabel: { shrink: true } }}
                  className="mb-4"
                  onChange={(e) =>
                    setNewTest({ ...newTest, resultTime: e.target.value })
                  }
                />{" "}
              </Box>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTest}
            >
              {loading ? "Scheduling..." : "Schedule Test"}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BatchDetails;
