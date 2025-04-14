import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  InputAdornment,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  Select,
  Chip,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { EditNotifications } from "@mui/icons-material";
import axios from "axios";

import { toast } from "react-toastify";
import moment from "moment";
import { config } from "../../services/config";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const TseriesCreation = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      testname: "Math Test",
      image: "https://via.placeholder.com/100", // Placeholder image URL
      startdate: "2023-12-01",
      enddate: "2023-12-15",
      price: "Rs1500",
      language: "English",
      result: "2024-12-12",
      category: "NEET",
      status: "Offline",
    },
    {
      id: 2,
      testname: "Science Test",
      image: "https://via.placeholder.com/100", // Placeholder image URL
      startdate: "2023-12-10",
      enddate: "2023-12-20",
      price: "Rs1800",
      language: "English",
      result: "2024-12-12",
      category: "JEE Mains",
      status: "Online",
    },
  ]);
  const [rows1, setRows1] = useState([
    {
      id: 1,
      name: "Test 1",
      showCheckboxes: false,
      offline: false,
      online: false,
    },
    {
      id: 2,
      name: "Test 2",
      showCheckboxes: false,
      offline: false,
      online: false,
    },
  ]);

  // Handle the "Assign" button click
  const handleAssignClick = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, showCheckboxes: !row.showCheckboxes } : row
      )
    );
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredRows = rows.filter((row) =>
    row.templateName?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );
  const handleEditRow = (row) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedRow.id) {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === selectedRow.id ? selectedRow : row))
      );
    } else {
      const newId = rows.length + 1;
      setRows([
        ...rows,
        {
          ...selectedRow,
          id: newId,
        },
      ]);
    }
    setSelectedRow(null);
    setIsDrawerOpen(false);
  };

  const handleInputChange = (field, value) => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [field]: value,
    }));
  };

  const [testList, setTestList] = useState([]);
  console.log(testList, "testList");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL_TEST}test/test-section`
        );
        if (response.data && response.data.success) {
          setTestList(response.data.data); // Extract only the "data" array
        } else {
          console.error("Unexpected API response format:", response);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  const [testSeries, setTestSeries] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [testtype, setTesttype] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [bannerimage, setBannerimage] = useState(null);
  const testSeriesCreate = async () => {
    // Validate required fields

    // Prepare data for API
    const packageData = {
      packageName: testSeries,
      packageDescription: testDescription,
      startDate,
      endDate,
      price,
      discount,
      examType: testtype,
      tests: selectedTests, // Array of selected tests
    };

    try {
      const response = await axios.post(
        `${config.BASE_URL_TEST}testPackage`,
        packageData
      );

      toast.success("Test package created successfully!", response.data);

      // Reset form after success
      setTestSeries("");
      setTestDescription("");
      setStartDate("");
      setEndDate("");
      setPrice("");
      setDiscount("");
      setTesttype("");
      setSelectedTests([]);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error creating test package:", error);
      toast.error("Failed to create test package.");
    }
  };
  const [testseries, settestSeries] = useState([]);
  console.log(testseries, "testseries");
  useEffect(() => {
    getTestSeries();
  }, []);
  const getTestSeries = async () => {
    let res = await axios.get(`${config.BASE_URL_TEST}testPackage`);
    if (res.status === 200) {
      const formattedData = res.data.data.map((item, index) => ({
        ...item,
        id: item._id,
        sno: index + 1,
        createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
      }));
      settestSeries(formattedData);
    }
  };

  const handleTestAssignChange = (id, type, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              testAssign: { ...row.testAssign, [type]: value },
            }
          : row
      )
    );
  };
  const handleCheckboxChange = (id, field, checked) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: checked,
              assigned:
                field === "offline" || field === "online" ? true : row.assigned,
              showCheckboxes: !(field === "offline" || field === "online"), // Hide checkboxes after selecting
            }
          : row
      )
    );
  };

  const columns = [
    { field: "sno", headerName: "SL", flex: 0.3 },
    { field: "packageName", headerName: "Test Series Name", flex: 1 },
    // { field: "image", headerName: "Image", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "discount", headerName: "Discount", flex: 1 },
    // {
    //   field: "testAssign",
    //   headerName: "Test Assign",
    //   flex: 2,
    //   renderCell: (params) => {
    //     const { id, showCheckboxes, offline, online, assigned } = params.row;

    //     return (
    //       <Box>
    //         {assigned ? (
    //           // Show "Assigned" Text
    //           <Typography sx={{ fontWeight: "bold", color: "green" }}>
    //             Assigned
    //           </Typography>
    //         ) : !showCheckboxes ? (
    //           // Show Assign Button
    //           <Button
    //             variant="contained"
    //             size="small"
    //             onClick={() => handleAssignClick(id)}
    //           >
    //             Assign
    //           </Button>
    //         ) : (
    //           // Inline Checkboxes
    //           <Box sx={{ display: "flex", gap: 1 }}>
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   checked={offline}
    //                   onChange={(e) =>
    //                     handleCheckboxChange(id, "offline", e.target.checked)
    //                   }
    //                 />
    //               }
    //               label="Offline"
    //             />
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   checked={online}
    //                   onChange={(e) =>
    //                     handleCheckboxChange(id, "online", e.target.checked)
    //                   }
    //                 />
    //               }
    //               label="Online"
    //             />
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   checked={online}
    //                   onChange={(e) =>
    //                     handleCheckboxChange(id, "online", e.target.checked)
    //                   }
    //                 />
    //               }
    //               label="Both"
    //             />
    //           </Box>
    //         )}
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {/* Edit Icon */}
          <PencilSquareIcon
            onClick={() => handleEditRow(params.row)}
            style={{
              marginTop: "20px",
              width: "20px",
              height: "20px",
              color: "#10b981",
              cursor: "pointer",
            }}
            title="Edit"
          />

          {/* Delete Icon */}
          <TrashIcon
            onClick={() =>
              setRows((prevRows) =>
                prevRows.filter((row) => row.id !== params.row.id)
              )
            }
            style={{
              marginTop: "20px",
              width: "20px",
              height: "20px",
              color: "#ef4444",
              cursor: "pointer",
            }}
            title="Delete"
          />
        </Box>
      ),
      sortable: false,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Poppins",
        padding: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: { xs: "column", sm: "row" },
          gap: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#2b3674",
          }}
        >
          Test Series Creation
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 300,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#f5f5f5",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon
                    style={{ width: "20px", height: "20px", color: "#7366FF" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <StyledButton
            onClick={() => {
              setSelectedRow({
                templateName: "",
                testDuration: "",
                marks: "",
                description: "",
                sections: "",
                noOfQuestions: "",
              });
              setIsDrawerOpen(true);
            }}
          >
            Create Test Series
          </StyledButton>
        </Box>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={testseries}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row?._id}
        />
      </div>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div
          style={{
            width: 400,
            padding: "20px",
            fontFamily: "Poppins",
          }}
        >
          <h3>
            {selectedRow?.id ? "Edit Test Series" : "Add New Test Series"}
          </h3>

          {/* Test Name Field */}
          <TextField
            label="Test Series Name"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={testSeries}
            onChange={(e) => setTestSeries(e.target.value)}
          />

          {/* Image Field */}
          <TextField
            type="file"
            fullWidth
            margin="normal"
            onChange={(e) => setBannerimage(e.target.files[0])} // Store file object
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Start Date Field */}
          <TextField
            label="Start Date"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* End Date Field */}
          <TextField
            label="End Date"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Price Field */}
          <TextField
            label="Price"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="Discount"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <TextField
            label="Test Description"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={testDescription}
            onChange={(e) => setTestDescription(e.target.value)}
          />
          <Box mt={2}>
            <Typography variant="h6">Select Tests:</Typography>
            {testList.length > 0 ? (
              testList.map((test) => (
                <FormControlLabel
                  key={test._id}
                  control={
                    <Checkbox
                      checked={selectedTests.some(
                        (t) => t.testId === test.testId
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTests([...selectedTests, test]); // Add test
                        } else {
                          setSelectedTests(
                            selectedTests.filter(
                              (t) => t.testId !== test.testId
                            )
                          ); // Remove test
                        }
                      }}
                    />
                  }
                  label={test._id}
                />
              ))
            ) : (
              <Typography>No tests available.</Typography>
            )}
          </Box>

          {/* <TextField
  label="Test Type"
  variant="outlined"
  size="small"
  fullWidth
  margin="normal"
  select
  value={testtype}
  onChange={(e) => setTesttype(e.target.value)}
>
  {testList.length > 0 ? (
    testList.map((test) => (
      <MenuItem key={test._id} value={test.testName}>
        {test._id}
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled>No Test Types Available</MenuItem>
  )}
</TextField> */}
          {/* Category Select Field */}
          {/* <TextField
      label="Test Type"
      variant="outlined"
      size="small"
      fullWidth
      margin="normal"
      select
      value={selectedRow?.category || ""}
      onChange={(e) => handleInputChange("category", e.target.value)}
    >
      <MenuItem value="NEET">NEET</MenuItem>
      <MenuItem value="JEE Mains">JEE Mains</MenuItem>
    
    </TextField> */}

          {/* Test Assign Checkboxes */}
          {/* <Box sx={{ display: "flex", gap: 2, marginTop: "10px" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedRow?.testAssign?.offline || false}
            onChange={(e) =>
              handleTestAssignChange("offline", e.target.checked)
            }
          />
        }
        label="Offline"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedRow?.testAssign?.online || false}
            onChange={(e) =>
              handleTestAssignChange("online", e.target.checked)
            }
          />
        }
        label="Online"
      />
    </Box> */}
          {/* Save Button */}
          <StyledButton
            fullWidth
            onClick={testSeriesCreate}
            sx={{ marginTop: "20px" }}
          >
            Save
          </StyledButton>
        </div>
      </Drawer>
    </div>
  );
};

export default TseriesCreation;
