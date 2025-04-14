import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { config } from "../../services/config";
import authService from "../../services/authServices";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Admin = () => {
  const [data, setData] = useState([]);
  const instituteId = JSON.parse(localStorage.getItem("instituteId"));
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedAdmins, setSelectedAdmins] = useState([]); // To store selected admin IDs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    try {
      const response = await authService.fetchAllAdmin(instituteId);
      const admins = response?.data?.map((admin, index) => ({
        ...admin,
        id: admin._id,
        sno: index + 1,
        createdAt: moment(admin.createdAt).format("DD/MM/YYYY"),
      }));
      setData(admins);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditMode) {
        await authService.updateAdmin(selectedAdmin.id, adminData);
        toast.success("Admin Updated Successfully!");
      } else {
        await authService.adminRegister({ ...adminData, instituteId });
        toast.success("Admin Created Successfully!");
      }
      getAdmin();
      setAdminData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
      });
      setIsDrawerOpen(false);
      setIsEditMode(false);
    } catch (error) {
      toast.error("Operation failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      for (let id of selectedAdmins) {
        await axios.delete(`${config.INSTITUTE_BASE_URL}admin/${id}`);
      }
      toast.success("Selected Admins Deleted Successfully!");
      getAdmin();
      setSelectedAdmins([]); // Reset selected admins
    } catch (error) {
      toast.error("Failed to delete admins. Try again.");
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setAdminData(admin);
    setIsDrawerOpen(true);
    setIsEditMode(true);
  };

  const handleView = (admin) => {
    setSelectedAdmin(admin);
    setIsDialogOpen(true);
  };

  const handleCheckboxChange = (id) => {
    setSelectedAdmins((prev) =>
      prev.includes(id)
        ? prev.filter((adminId) => adminId !== id)
        : [...prev, id]
    );
  };

  const filteredRows = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "select",
      headerName: "",
      flex: 0.2,
      renderCell: (params) => (
        <Checkbox
          checked={selectedAdmins.includes(params.row.id)}
          onChange={() => handleCheckboxChange(params.row.id)}
        />
      ),
    },
    { field: "sno", headerName: "SL", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Number", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <EyeIcon
            style={{ width: "20px", color: "#2563eb", cursor: "pointer" }}
            title="View"
            onClick={() => handleView(params.row)}
          />
          <PencilSquareIcon
            style={{ width: "20px", color: "#FFA500", cursor: "pointer" }}
            title="Edit"
            onClick={() => handleEdit(params.row)}
          />
        </Box>
      ),
      sortable: false,
    },
  ];

  return (
    <div style={{ fontFamily: "Poppins", padding: "15px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2b3674" }}>
          Admin
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          {selectedAdmins.length > 0 && (
            <StyledButton
              onClick={handleDelete}
              style={{ backgroundColor: "#FF4D4F" }}
            >
              Delete Selected
            </StyledButton>
          )}
          <StyledButton onClick={() => setIsDrawerOpen(true)}>
            Create Admin
          </StyledButton>
        </Box>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      {/* Drawer for Add/Edit Admin */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div style={{ width: 400, padding: "20px", fontFamily: "Poppins" }}>
          <h3>{isEditMode ? "Edit Admin" : "Add New Admin"}</h3>
          <TextField
            label="Name"
            value={adminData.name}
            fullWidth
            required
            size="small"
            margin="normal"
            onChange={(e) =>
              setAdminData({ ...adminData, name: e.target.value })
            }
          />
          <TextField
            label="Number"
            value={adminData.phoneNumber}
            fullWidth
            required
            size="small"
            type="number"
            margin="normal"
            onChange={(e) =>
              setAdminData({ ...adminData, phoneNumber: e.target.value })
            }
          />
          <TextField
            label="Email"
            value={adminData.email}
            fullWidth
            required
            size="small"
            type="email"
            margin="normal"
            onChange={(e) =>
              setAdminData({ ...adminData, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            value={adminData.password}
            fullWidth
            required
            size="small"
            margin="normal"
            onChange={(e) =>
              setAdminData({ ...adminData, password: e.target.value })
            }
          />
          <TextField
            label="Role"
            value={adminData.role}
            fullWidth
            required
            size="small"
            margin="normal"
            onChange={(e) =>
              setAdminData({ ...adminData, role: e.target.value })
            }
          />
          <StyledButton
            fullWidth
            onClick={handleCreateOrUpdate}
            sx={{ marginTop: "20px" }}
          >
            Save Changes
          </StyledButton>
        </div>
      </Drawer>

      {/* Dialog for Viewing Admin Details */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Admin Details</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Name:</strong> {selectedAdmin?.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {selectedAdmin?.email}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {selectedAdmin?.phoneNumber}
          </Typography>
          <Typography>
            <strong>Role:</strong> {selectedAdmin?.role}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Admin;
