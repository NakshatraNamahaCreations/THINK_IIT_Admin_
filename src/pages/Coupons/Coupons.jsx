import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      name:"NEW Years",
      couponscode: "WELCOME10",
      description: "10% off on first purchase",
      validfrom: "2023-12-25",
      validTill: "2023-12-31",
      usageCount: 5,
      institute: "XYZ Institute",
    },
    {
      id: 2,
      name:"NEW Years",
      couponscode: "SUMMER20",
      description: "20% off on summer courses",
      validfrom: "2023-12-25",
      validTill: "2024-06-30",
      usageCount: 10,
      institute: "ABC Academy",
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Handle Drawer Open for Add/Edit
  const handleOpenDrawer = (coupon = null) => {
    setSelectedCoupon(
      coupon || {
        id: null,
        name: "",
        couponscode: "",
        description: "",
        validTill: "",
        validfrom: "",
        usageCount: 0,
        institute: "",
      }
    );
    setIsDrawerOpen(true);
  };

  // Handle Save Changes
  const handleSaveChanges = () => {
    if (selectedCoupon.id) {
      setCoupons((prevCoupons) =>
        prevCoupons.map((c) =>
          c.id === selectedCoupon.id ? selectedCoupon : c
        )
      );
    } else {
      const newId = coupons.length + 1;
      setCoupons([...coupons, { ...selectedCoupon, id: newId }]);
    }
    setIsDrawerOpen(false);
  };

  return (
    <Box
      sx={{
        fontFamily: "Poppins",
        padding: isMobile ? "10px" : "15px",
      }}
    >
      {/* Header Section */}
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
            fontFamily: "Poppins",
          }}
        >
          Coupon Management
        </Typography>
        <StyledButton
          onClick={() => handleOpenDrawer()}
          sx={{ width: isMobile ? "100%" : "auto" }}
        >
          Add Coupon
        </StyledButton>
      </Box>

      {/* Coupons Table */}
      <TableContainer component={Paper}>
        <Table sx={{ fontFamily: "Poppins" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Sl.No</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Coupon Name</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Coupon Code</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Description</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Valid From</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Valid Till</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Usage Count</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Institute</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontFamily: "Poppins" }}>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.id}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.name}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.couponscode}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.description}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.validfrom}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.validTill}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.usageCount}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {coupon.institute}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      marginRight: "10px",
                      fontFamily: "Poppins",
                      textTransform: "none",
                    }}
                    onClick={() => handleOpenDrawer(coupon)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ fontFamily: "Poppins", textTransform: "none" }}
                    onClick={() =>
                      setCoupons((prevCoupons) =>
                        prevCoupons.filter((c) => c.id !== coupon.id)
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Drawer for Add/Edit Coupon */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: isMobile ? "100vw" : 400,
            padding: "20px",
            fontFamily: "Poppins",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              fontFamily: "Poppins",
            }}
          >
            {selectedCoupon?.id ? "Edit Coupon" : "Add Coupon"}
          </Typography>
          <TextField
            label="Coupon Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCoupon?.name || ""}
            onChange={(e) =>
              setSelectedCoupon((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            InputProps={{ style: { fontFamily: "Poppins" } }}
          />
          <TextField
            label="Coupon Code  "
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCoupon?.couponscode || ""}
            onChange={(e) =>
              setSelectedCoupon((prev) => ({
                ...prev,
                couponscode: e.target.value,
              }))
            }
            InputProps={{ style: { fontFamily: "Poppins" } }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCoupon?.description || ""}
            onChange={(e) =>
              setSelectedCoupon((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            InputProps={{ style: { fontFamily: "Poppins" } }}
          />
             <TextField
            label="Valid From"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={selectedCoupon?.validfrom || ""}
            onChange={(e) =>
              setSelectedCoupon((prev) => ({
                ...prev,
                validfrom: e.target.value,
              }))
            }
            InputProps={{ style: { fontFamily: "Poppins" } }}
          />
          <TextField
            label="Valid Till"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={selectedCoupon?.validTill || ""}
            onChange={(e) =>
              setSelectedCoupon((prev) => ({
                ...prev,
                validTill: e.target.value,
              }))
            }
            InputProps={{ style: { fontFamily: "Poppins" } }}
          />
          <TextField
            label="Usage Count"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={selectedCoupon?.usageCount || ""}
            onChange={(e) =>
              setSelectedCoupon((prev) => ({
                ...prev,
                usageCount: e.target.value,
              }))
            }
            InputProps={{ style: { fontFamily: "Poppins" } }}
          />
          <TextField
            label="Institute Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCoupon?.institute || ""}
            onChange={(e) =>
              setSelectedCoupon((prev) => ({
                ...prev,
                institute: e.target.value,
              }))
            }
            InputProps={{ style: { fontFamily: "Poppins" } }}
          />
          <StyledButton
            fullWidth
            onClick={handleSaveChanges}
            sx={{ marginTop: "20px" }}
          >
            Save Changes
          </StyledButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Coupons;
