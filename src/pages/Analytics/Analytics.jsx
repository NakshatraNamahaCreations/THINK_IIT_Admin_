import React from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"];

const barData = [
  { year: "2017", revenue: 200 },
  { year: "2018", revenue: 389 },
  { year: "2019", revenue: 200 },
  { year: "2020", revenue: 389 },
  { year: "2021", revenue: 200 },
  { year: "2022", revenue: 389 },
  { year: "2023", revenue: 100 },
  { year: "2024", revenue: 500 },
];

const pieData = [
  { name: "Question Banks", value: 33 },
  { name: "Online Test Infra", value: 15 },
  { name: "Offline Test Generator", value: 32 },
  { name: "Course/Video Infra", value: 28 },
  { name: "OMR", value: 24 },
];

const institutesPayment = [
  {
    id: 1,
    name: "KK Menon Institute",
    date: "29/05/2024",
    amount: "Rs. 10,50,000",
    plan: "Basic",
  },
  {
    id: 2,
    name: "Sri Laxmi Institute",
    date: "29/05/2024",
    amount: "Rs. 10,50,000",
    plan: "Question Bank",
  },
  {
    id: 3,
    name: "Excellence Institute",
    date: "29/05/2024",
    amount: "Rs. 10,50,000",
    plan: "Question Bank",
  },
  {
    id: 4,
    name: "Sri Krishna Institute",
    date: "29/05/2024",
    amount: "Rs. 10,50,000",
    plan: "Question Bank",
  },
];

const Dashboard = () => {
  const handleDownload = (reportType) => {
    alert(`Downloading ${reportType} report...`);
    // Add logic for downloading specific reports.
  };

  return (
    <Box sx={{ padding: "20px", fontFamily: "Poppins" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#2b3674",
          marginBottom: "20px",
        }}
      >
        Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Sales Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: "20px",
              borderRadius: "12px",
              position: "relative",
              height: "350px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography fontWeight="bold">Sales</Typography>
              <Select
                defaultValue="Yearly"
                size="small"
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#F1F3F6",
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
            </Box>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4A90E2" />
              </BarChart>
            </ResponsiveContainer>
            <Button
              variant="contained"
              size="small"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#7366FF",
                textTransform: "none",
              }}
              onClick={() => handleDownload("Sales")}
            >
              Download
            </Button>
          </Card>
        </Grid>

        {/* Products Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: "20px",
              borderRadius: "12px",
              position: "relative",
              height: "350px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography fontWeight="bold">Products</Typography>
              <Select
                defaultValue="Monthly"
                size="small"
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#F1F3F6",
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
            </Box>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Button
              variant="contained"
              size="small"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#7366FF",
                textTransform: "none",
              }}
              onClick={() => handleDownload("Products")}
            >
              Download
            </Button>
          </Card>
        </Grid>

        {/* Institutes Payment Reports */}
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: "20px", borderRadius: "12px", height: "300px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography fontWeight="bold">
                Institutes Payment Reports
              </Typography>
              <Select
                defaultValue="Monthly"
                size="small"
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#F1F3F6",
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Plan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {institutesPayment.map((institute, index) => (
                  <TableRow key={index}>
                    <TableCell>{institute.id}</TableCell>

                    <TableCell>{institute.name}</TableCell>
                    <TableCell>{institute.date}</TableCell>
                    <TableCell>{institute.amount}</TableCell>
                    <TableCell>{institute.plan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
