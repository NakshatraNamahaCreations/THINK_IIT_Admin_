import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

const blogsData = [
  {
    id: 1,
    title: "The Future of Technology",
    description:
      "Explore the advancements in technology and how they are shaping our world.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Healthy Living Tips",
    description: "Discover tips and tricks to maintain a healthy lifestyle.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Travel Guide for 2024",
    description: "Your ultimate guide to the best travel destinations in 2024.",
    image: "https://via.placeholder.com/150",
  },
];

const Blogs = () => {
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
        Our Blogs
      </Typography>

      <Grid container spacing={3}>
        {blogsData.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
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
                image={blog.image}
                alt={blog.title}
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
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: "Poppins", color: "#555" }}
                >
                  {blog.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
