import React from "react";
import Slider from "react-slick";
import { Card, Box, Typography } from "@mui/material";

const PromotionBanners = ({ topBanners }) => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Card
      sx={{
        padding: 3,
        borderRadius: 2,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Promotion Banners
        </Typography>
      </Box>

      {/* Carousel Slider */}
      <Slider {...settings}>
        {topBanners.map((banner, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
            }}
          >
            <img
              src={banner.img}
              alt={banner.name || "Banner"}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: 300,
                borderRadius: 4,
              }}
            />
            <Typography
              sx={{
                marginTop: 1,
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                color: "#4b5563",
              }}
            >
              {banner.name}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Card>
  );
};

export default PromotionBanners;
