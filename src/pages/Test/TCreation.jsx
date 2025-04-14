import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewAssignmentModal from "./components/FormModal";
import testServices from "../../services/testService";
import { MdDelete } from "react-icons/md";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Switch, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
// import ViewModal from "./components/ViewModal";
import { formatDate } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TCreation = () => {
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestView, setSelectedTestView] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (testId) => {
    setSelectedTest(testId);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTest(null);
    setOpen(false);
  };

  const handleOpenView = (testId) => {
    setSelectedTestView(testId);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setSelectedTestView(null);
    setOpenView(false);
  };

  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await testServices.GETALLTheTESTS();
      console.log("res", response)
      setAssignments(response.data);
    } catch (error) {
      toast.error("Failed to fetch test details.");
    }
  };

  const handleDeleteTest = async (id) => {
    const payload = {
      testId: id,
    };

    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      // const response = await testServices.deleteTestById(id);
      // if (response.success) {
      toast.success("Test deleted successfully!");
      let deleteItem = [...assignments];
      setAssignments(deleteItem.filter((item) => item._id !== id));
      const res = await testServices.deleteTest(payload);
      // fetchTests();
      // } else {
      //   toast.error(response.message || "Failed to delete test.");
      // }
    } catch (error) {
      toast.error("Error deleting test.");
      console.error("Delete error:", error);
    }
  };

  const filteredAssignments = assignments?.filter((assignment) =>
    assignment?.testName?.toLowerCase().includes(search.toLowerCase())
  );

  const [testStatus, setTestStatus] = useState(
    filteredAssignments?.reduce((acc, assignment) => {
      acc[assignment._id] = false; // Default to 'Offline'
      return acc;
    }, {})
  );


  // Handle checkbox status change
  const handleStatusToggle = (testId) => {
    setTestStatus((prevStatus) => ({
      ...prevStatus,
      [testId]: !prevStatus[testId],
    }));
    setSelectedTest(testId);
    setOpen(true); // Open modal for both status change
  };

  const updateTestMode = async (testId, testMode) => {
    try {
      const response = await axios.put(
        `http://localhost:8005/api/newTest/${testId}/updateTestMode`,
        { testMode: testMode }
      );
      if (response.data.success) {
        toast.success("Test mode updated successfully!");
      } else {
        toast.error("Failed to update test mode.");
      }
    } catch (error) {
      console.error("Error updating test mode:", error);
      toast.error("Error updating test mode.");
    }
  };

  return (
    <div className="mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">All Tests</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700 transition"
        >
          New Test
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tests by name..."
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Test Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">SL No</th>
              <th className="px-4 py-3 text-left">Test Name</th>
              <th className="px-4 py-3 text-left">Created Date </th>
              <th className="px-4 py-3 text-left">Assigned Batch</th>
              <th className="px-4 py-3 text-left">Test Duration</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments?.length > 0 ? (
              filteredAssignments?.map((assignment, index) => (
                <tr
                  key={assignment._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {assignment.testName || "Untitled"}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {formatDate(assignment.createdAt) || "Untitled"}
                  </td>
                  {/* <td className="px-4 py-3 text-gray-600">
                    {assignment.class || "-"}
                  </td> */}
                  {/* <td className="px-4 py-3 text-gray-600">
                    {assignment.noOfSections ||
                      assignment.sections?.length ||
                      0}
                  </td> */}
                  <td className="px-4 py-3 text-gray-600"></td>
                  <td className="px-4 py-3 text-gray-600">
                    {assignment.testDuration}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-4 text-indigo-600 font-medium">
                    <button
                      className="hover:underline"
                      onClick={() => handleOpenView(assignment._id)}
                    >
                      View
                    </button>
                    <button
                      className="hover:underline"
                      onClick={() =>
                        navigate(`/test-selection/${assignment._id}`)
                      }
                    >
                      Edit
                    </button>

                    {/* Replace the Switch with Checkbox */}
                    {/* <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={testStatus[assignment._id] === "online"} // If status is "online"
                            onChange={() =>
                              handleStatusToggle(assignment._id, "online")
                            }
                            name="statusOnline"
                            color="primary"
                          />
                        }
                        label="Online"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={testStatus[assignment._id] === "offline"} // If status is "offline"
                            onChange={() =>
                              handleStatusToggle(assignment._id, "offline")
                            }
                            name="statusOffline"
                            color="primary"
                          />
                        }
                        label="Offline"
                      />
                    </FormGroup> */}

                    <button
                      onClick={() => handleDeleteTest(assignment._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                  No tests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <ViewModal open={openView} onClose={handleCloseView} testId={selectedTestView} /> */}
      {/* Modal */}

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {testStatus[selectedTest] ? "Test Duration" : "Offline Options"}
          </Typography>

   
          {testStatus[selectedTest] ? (

            <>
              <TextField
                label="Duration"
                type="text"
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Save
              </Button>
            </>
          ) : (
     
            <>
              <Button
                onClick={() => {
     
                }}
                variant="outlined"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
              >
                Download
              </Button>
              <Button
                onClick={() => {
              
                }}
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
              >
                Print
              </Button>
            </>
          )}
        </Box>  
      </Modal> */}

      <NewAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TCreation;
