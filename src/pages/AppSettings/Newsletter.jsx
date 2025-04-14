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
import { Tabs, Tab } from "@mui/material";
const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const BlogsAndNewsletters = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    image: "",
  });
  const [blogsData, setBlogsData] = useState([
    {
      id: 1,
      title: "The Future of Technology",
      description:
        "Explore the advancements in technology and how they are shaping our world.",
      image:
        "https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1733996272~exp=1733999872~hmac=35af5f755b310f18b6e7681909b6dd2f5b096db13520a7f36a26616e741f309d&w=1380",
    },
    {
      id: 2,
      title: "Healthy Living Tips",
      description: "Discover tips and tricks to maintain a healthy lifestyle.",
      image:
        "https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1733996272~exp=1733999872~hmac=35af5f755b310f18b6e7681909b6dd2f5b096db13520a7f36a26616e741f309d&w=1380",
    },
    {
      id: 3,
      title: "Travel Guide for 2024",
      description:
        "Your ultimate guide to the best travel destinations in 2024.",
      image:
        "https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1733996272~exp=1733999872~hmac=35af5f755b310f18b6e7681909b6dd2f5b096db13520a7f36a26616e741f309d&w=1380",
    },
    {
      id: 4,
      title: "Travel Guide for 2024",
      description:
        "Your ultimate guide to the best travel destinations in 2024.",
      image:
        "https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1733996272~exp=1733999872~hmac=35af5f755b310f18b6e7681909b6dd2f5b096db13520a7f36a26616e741f309d&w=1380",
    },
  ]);
  const [newslettersData, setNewslettersData] = useState([
    {
      id: 1,
      title: "Weekly Tech Updates",
      description:
        "Stay updated with the latest news in technology every week.",
      image:
        "https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1733996272~exp=1733999872~hmac=35af5f755b310f18b6e7681909b6dd2f5b096db13520a7f36a26616e741f309d&w=1380",
    },
    {
      id: 2,
      title: "Health & Wellness Newsletter",
      description: "Tips and insights for maintaining a healthy lifestyle.",
      image:
        "https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1733996272~exp=1733999872~hmac=35af5f755b310f18b6e7681909b6dd2f5b096db13520a7f36a26616e741f309d&w=1380",
    },
    {
      id: 3,
      title: "Travel Deals & Guides",
      description:
        "Get the best travel deals and guides directly to your inbox.",
      image:
        "https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1733996272~exp=1733999872~hmac=35af5f755b310f18b6e7681909b6dd2f5b096db13520a7f36a26616e741f309d&w=1380",
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDrawer = (
    item = { id: null, title: "", description: "", image: "" }
  ) => {
    setFormData(item);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: formData.id || Math.random() };

    if (activeTab === 0) {
      setBlogsData((prevData) =>
        formData.id
          ? prevData.map((item) => (item.id === formData.id ? newItem : item))
          : [...prevData, newItem]
      );
    } else {
      setNewslettersData((prevData) =>
        formData.id
          ? prevData.map((item) => (item.id === formData.id ? newItem : item))
          : [...prevData, newItem]
      );
    }
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    if (activeTab === 0) {
      setBlogsData((prevData) => prevData.filter((item) => item.id !== id));
    } else {
      setNewslettersData((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderContent = () => {
    const data = activeTab === 0 ? blogsData : newslettersData;
    return (
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
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
                image={item.image}
                alt={item.title}
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
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: "Poppins", color: "#555" }}
                >
                  {item.description}
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
                    onClick={() => handleOpenDrawer(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    style={{ color: "#FF4D4F", fontWeight: "bold" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
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
        Blogs and Newsletters
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ marginBottom: "20px" }}
      >
        <Tab label="Blogs" sx={{ fontFamily: "Poppins", fontWeight: "bold" }} />
        <Tab
          label="Newsletters"
          sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
        />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <StyledButton onClick={() => handleOpenDrawer()}>
          Create New
        </StyledButton>
      </Box>
      {renderContent()}

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 400, padding: "20px", fontFamily: "Poppins" }}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            {formData.id
              ? activeTab === 0
                ? "Edit Blog"
                : "Edit Newsletter"
              : activeTab === 0
              ? "Add Blog"
              : "Add Newsletter"}
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
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

export default BlogsAndNewsletters;
