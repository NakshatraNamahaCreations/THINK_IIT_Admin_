import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { styled } from "@mui/system";

import course from "../../assets/image/icons8-course-64.png";
import income from "../../assets/image/icons8-income-48.png";
import institute from "../../assets/image/icons8-school-96.png";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

ChartJS.register(
  BarElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip
);

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState("Weekly");
  const navigate = useNavigate();

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const dataCards = [
    {
      title: "Total Profit",
      value: "3,292.21",
      change: "+5.1%",
      changeType: "positive",
      icon: income,
      chartData: [
        240000, 220000, 300000, 270000, 350000, 400000, 400000, 240000, 220000,
        300000, 270000, 350000, 400000,
      ],
    },
    {
      title: "Total Students",
      value: "28,349",
      change: "+2.4%",
      changeType: "positive",
      icon: institute,
      chartData: [
        12000, 15000, 18000, 20000, 22000, 25000, 28000, 12000, 15000, 18000,
        20000, 22000, 25000, 28000,
      ],
    },
    {
      title: "Products",
      value: "12.9M",
      change: "+6.3%",
      changeType: "positive",
      icon: course,
      chartData: [
        1000000, 1500000, 2000000, 3000000, 4000000, 5000000, 6000000, 1000000,
        1500000, 2000000, 3000000, 4000000, 5000000, 6000000,
      ],
    },
  ];

  const topBanners = [
    {
      img: "https://img.freepik.com/free-vector/raksha-bandhan-sale-banner-with-golden-rakhi_1017-32977.jpg?ga=GA1.1.1787462518.1728970517&semt=ais_hybrid",
      Status: "Active",
      PromotionName: "Summer offers",
    },
    {
      img: "https://img.freepik.com/free-vector/modern-super-sale-promotion-bright-banner_1055-6985.jpg?ga=GA1.1.1787462518.1728970517&semt=ais_hybrid",
      Status: "Active",
      PromotionName: "Season discount",
    },
    {
      img: "https://img.freepik.com/free-vector/happy-diwali-festival-offer-decorative-orange-banner_1017-21235.jpg?ga=GA1.1.1787462518.1728970517&semt=ais_hybrid",
      Status: "Active",
      PromotionName: "Season discount",
    },
  ];
  const KalpakoshaBanners = [
    {
      img: "https://img.freepik.com/free-vector/modern-super-sale-promotion-bright-banner_1055-6985.jpg?ga=GA1.1.1787462518.1728970517&semt=ais_hybrid",
      Status: "Active",
      PromotionName: "Season discount",
    },
    {
      img: "https://img.freepik.com/free-vector/happy-diwali-festival-offer-decorative-orange-banner_1017-21235.jpg?ga=GA1.1.1787462518.1728970517&semt=ais_hybrid",
      Status: "Active",
      PromotionName: "Season discount",
    },
    {
      img: "https://img.freepik.com/free-vector/raksha-bandhan-sale-banner-with-golden-rakhi_1017-32977.jpg?ga=GA1.1.1787462518.1728970517&semt=ais_hybrid",
      Status: "Active",
      PromotionName: "Summer offers",
    },
  ];
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: dataCards[activeIndex].title,
        data: dataCards[activeIndex].chartData,
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#757575",
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          color: "#757575",
        },
      },
    },
  };

  const StatusChip = styled(Chip)(({ status }) => ({
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    color: "white",
    backgroundColor: status === "Active" ? "#4CAF50" : "#F44336",
    padding: "0 8px",
    fontSize: "12px",
    height: "24px",
    borderRadius: "12px",
  }));

  const paymentRows = [
    {
      id: 1,
      name: "John Doe",
      instituteName: "Greenfield High",
      email: "john.doe@example.com",
      paymentDate: "2024-12-01",
      plan: "Premium",
      amount: 2999,
      status: "Success",
    },
    {
      id: 2,
      name: "Jane Smith",
      instituteName: "Harmony Academy",
      email: "jane.smith@example.com",
      paymentDate: "2024-12-02",
      plan: "Basic",
      amount: 1499,
      status: "Failed",
    },
    {
      id: 3,
      name: "Alice Johnson",
      instituteName: "Bright Future Institute",
      email: "alice.j@example.com",
      paymentDate: "2024-12-03",
      plan: "Standard",
      amount: 1999,
      status: "Success",
    },
  ];

  const StatusChip1 = styled(Box)(({ status }) => ({
    display: "inline-block",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    color: "white",
    backgroundColor: status === "Success" ? "#4CAF50" : "#F44336",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "12px",
    textAlign: "center",
  }));

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Box
      sx={{
        padding: 3,
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        {/* Dashboard (70%) */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              padding: 3,
            }}
          >
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
                  fontWeight: "600",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Overview
              </Typography>
              <Select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                }}
              >
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Annually">Annually</MenuItem>
              </Select>
            </Box>

            {/* Cards Section */}
            <Grid
              container
              // spacing={3}
              sx={{
                marginBottom: 3,
                backgroundColor: "#F5F5F5",
                padding: 2,
                marginTop: 2,
                borderRadius: 5,
              }}
            >
              {dataCards.map((card, index) => (
                <Grid item xs={12} md={4} key={index} sx={{}}>
                  <Card
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      // padding: 1,
                      borderRadius: 2,
                      backgroundColor:
                        activeIndex === index ? "#E3F2FD" : "#fff", // Highlight active card
                      boxShadow:
                        activeIndex === index
                          ? "0px 4px 10px rgba(33, 150, 243, 0.2)"
                          : "",
                      cursor: "pointer",
                      border:
                        activeIndex === index ? "2px solid #2196F3" : "none",
                      marginRight: 2,
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 2,
                        gap: 2,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "13px",
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            color: "#212121",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {card.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              card.changeType === "positive" ? "green" : "red",
                            fontWeight: "500",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {card.change} from last month
                        </Typography>
                      </Box>
                      <img
                        src={card.icon}
                        style={{
                          backgroundColor: "#fff",
                          height: 36,
                          width: 36,
                          padding: 10,
                          borderRadius: 20,
                        }}
                      />
                      {/* <Avatar
                        sx={{
                          backgroundColor: "#F3F4F6",
                          height: 36,
                          width: 36,
                        }}
                      >
                        {card.icon}
                      </Avatar> */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Chart Section */}
            <Box sx={{ height: "400px" }}>
              <Bar data={chartData} options={chartOptions} />
            </Box>
          </Box>
        </Grid>

        {/* Sidebar (30%) */}
        <Grid item xs={12} md={4}>
          {/* Recently added banner */}

          <Card
            sx={{
              padding: 3,
              borderRadius: 2,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                marginBottom: 3,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Kalpakosha Banners
            </Typography>

            <Box>
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000 }}
                loop
                style={{ paddingBottom: "20px" }}
              >
                {KalpakoshaBanners.map((banner, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 150,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={banner.img}
                        alt={banner.name || "Banner"}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Card>
          <Card
            sx={{
              padding: 3,
              marginBottom: 3,
              borderRadius: 2,
              fontFamily: "'Poppins', sans-serif",
              marginTop: 2,
            }}
          >
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
                sx={{ fontWeight: "600", fontFamily: "'Poppins', sans-serif" }}
              >
                Product Sales
              </Typography>
              <Select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                }}
              >
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Annually">Annually</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CircularProgress
                variant="determinate"
                value={75}
                size={60}
                thickness={5}
                sx={{ color: "#4CAF50" }}
              />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  1.3K / 1.8K Units
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Made this month
                </Typography>
              </Box>
            </Box>
          </Card>

          {/* Top promotion banner */}
          <Card
            sx={{
              padding: 3,
              borderRadius: 2,
              fontFamily: "'Poppins', sans-serif",
              marginTop: "10px",
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
                App banners
              </Typography>
              <Button
                variant="text"
                size="small"
                sx={{
                  color: "#2196F3",
                  textTransform: "none",
                  fontSize: "14px",
                  fontFamily: "'Poppins', sans-serif",
                }}
                onClick={() => navigate("/marketing")}
              >
                View All
              </Button>
            </Box>

            {/* List of Recent Payments */}
            {topBanners.map((banner, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={banner.img}
                    alt={banner.name || "Banner"}
                    style={{ width: 150, height: 50 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        fontSize: "14px",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {banner.PromotionName || "Unknown"}
                    </Typography>
                    <StatusChip
                      label={banner.Status || "Inactive"}
                      status={banner.Status}
                    />
                  </Box>
                </Box>

                {/* Delete Button */}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  onClick={() => banner.onDelete && banner.onDelete(index)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          padding: 3,
          marginBottom: 3,
          borderRadius: 2,
          fontFamily: "'Poppins', sans-serif",
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            padding: 2,
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "white",
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
              Recent Payments
            </Typography>
            <Button
              variant="text"
              size="small"
              sx={{
                color: "#2196F3",
                textTransform: "none",
                fontSize: "14px",
                fontFamily: "'Poppins', sans-serif",
              }}
              onClick={() => navigate("/payments")}
            >
              View All
            </Button>
          </Box>

          {/* Table Header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "15% 20% 20% 15% 10% 10% 10%",
              backgroundColor: "#f1f5f9",
              padding: "8px 12px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "12px",
              color: "#2b3674",
            }}
          >
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
            >
              Name
            </Typography>
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
            >
              Institute
            </Typography>
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
            >
              Email
            </Typography>
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
            >
              Payment Date
            </Typography>
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
            >
              Plan
            </Typography>
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
            >
              Amount (₹)
            </Typography>
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
            >
              Status
            </Typography>
          </Box>

          {/* Table Body */}
          <Box
            sx={{
              marginTop: 2,
              borderRadius: "8px",
            }}
          >
            {paymentRows.map((row) => (
              <Box
                key={row.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "15% 20% 20% 15% 10% 10% 10%",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderBottom: "1px solid #f1f5f9",
                  "&:last-child": { borderBottom: "none" },
                  fontSize: "12px",
                  color: "#2b3674",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                  }}
                >
                  {row.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                  }}
                >
                  {row.instituteName}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                  }}
                >
                  {row.email}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textAlign: "start",
                    fontSize: "12px",
                  }}
                >
                  {row.paymentDate}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textAlign: "start",
                    fontSize: "12px",
                  }}
                >
                  {row.plan}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textAlign: "start",
                    fontSize: "12px",
                  }}
                >
                  ₹{row.amount.toLocaleString()}
                </Typography>
                <Box sx={{ textAlign: "start" }}>
                  <StatusChip1 status={row.status}>{row.status}</StatusChip1>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;
