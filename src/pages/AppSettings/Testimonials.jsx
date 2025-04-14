import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Drawer,
  Card,
  CardContent,
  CardMedia,
  Grid,
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

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      feedback: "Great service! Highly recommend.",
      image:
        "https://img.freepik.com/free-photo/young-girl-showing-thumb-up-stretching-hand-light-gray-t-shirt-dark-grey-zip-front-hoodie-looking-cute_176474-18795.jpg?ga=GA1.1.1095117200.1717658458&semt=ais_hybrid",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Excellent support and quality work.",
      image:
        "https://img.freepik.com/free-photo/young-girl-showing-thumb-up-stretching-hand-light-gray-t-shirt-dark-grey-zip-front-hoodie-looking-cute_176474-18795.jpg?ga=GA1.1.1095117200.1717658458&semt=ais_hybrid",
    },
    {
      id: 3,
      name: "Jane Smith",
      feedback: "Excellent support and quality work.",
      image:
        "https://img.freepik.com/free-photo/young-girl-showing-thumb-up-stretching-hand-light-gray-t-shirt-dark-grey-zip-front-hoodie-looking-cute_176474-18795.jpg?ga=GA1.1.1095117200.1717658458&semt=ais_hybrid",
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    image: "",
  });

  const handleOpenDrawer = () => {
    setFormData({ name: "", feedback: "", image: "" });
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (formData.id) {
      setTestimonials((prev) =>
        prev.map((testimonial) =>
          testimonial.id === formData.id ? { ...formData } : testimonial
        )
      );
    } else {
      setTestimonials((prev) => [...prev, { id: Math.random(), ...formData }]);
    }
    setIsDrawerOpen(false);
  };

  const handleEdit = (testimonial) => {
    setFormData(testimonial);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id) => {
    setTestimonials((prev) =>
      prev.filter((testimonial) => testimonial.id !== id)
    );
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Box
      sx={{
        fontFamily: "Poppins",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
          color: "#333",
        }}
      >
        Testimonials
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <StyledButton onClick={handleOpenDrawer}>Add Testimonial</StyledButton>
      </Box>

      <Grid container spacing={3}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} sm={6} md={3} key={testimonial.id}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={testimonial.image}
                alt={testimonial.name}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#2563eb",
                    marginBottom: "10px",
                  }}
                >
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: "Poppins", color: "#555" }}
                >
                  {testimonial.feedback}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    variant="text"
                    style={{ color: "#2563eb", fontWeight: "bold" }}
                    onClick={() => handleEdit(testimonial)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    style={{ color: "#FF4D4F", fontWeight: "bold" }}
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 400, padding: "20px", fontFamily: "Poppins" }}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            {formData.id ? "Edit Testimonial" : "Add Testimonial"}
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextField
            label="Feedback"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.feedback}
            onChange={(e) => handleInputChange("feedback", e.target.value)}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
          />
          <StyledButton
            fullWidth
            onClick={handleSave}
            sx={{ marginTop: "20px" }}
          >
            Save
          </StyledButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Testimonials;
