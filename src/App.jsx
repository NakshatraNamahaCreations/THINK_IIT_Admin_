import React, { useState } from "react";
import { Box, useMediaQuery, IconButton, Drawer } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SidebarMenu from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import AdminDetails from "./pages/Admin/AdminDetails";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Tickets from "./pages/Ticket/Tickets";

import ResolvedTicket from "./pages/Ticket/ResolvedTicket";

import Payments from "./pages/Payments/Payments";
import Analytics from "./pages/Analytics/Analytics";

import Settings from "./pages/Setting/Settings";
import Marketing from "./pages/Marketing/Marketing";
import Coupons from "./pages/Coupons/Coupons";
import Notifications from "./pages/Notifications/Notifications";

import MenuIcon from "@mui/icons-material/Menu";
import Teacher from "./pages/Teacher/Teacher";
import Student from "./pages/Student/Student";
import Template from "./pages/TestManagement/Template";
import StudentDetails from "./pages/Student/StudentDetails";
// import TCreations from "./pages/TestManagement/TCreations";
import OnlineOffline from "./pages/TestManagement/OnlineOffline";
import TseriesCreation from "./pages/TestManagement/TseriesCreation";
import Wallet from "./pages/Wallet/Wallet";
import AppProfile from "./pages/AppSettings/AppProfile";
import TermsConditions from "./pages/AppSettings/TermsConditions";
import FAQ from "./pages/AppSettings/FAQ";
import PrivacyPolicy from "./pages/AppSettings/PrivacyPolicy";
import Testimonials from "./pages/AppSettings/Testimonials";
import CancellationPolicy from "./pages/AppSettings/CancellationPolicy";
import Newsletter from "./pages/AppSettings/Newsletter";
import TCreationlist from "./pages/TestManagement/TCreationlist";
import QuestionManagment from "./pages/QUestionManagement/QuestionManagment";
import QuestionCreat from "./pages/QUestionManagement/QuestionCreat";
import QuestionDetails from "./pages/QUestionManagement/QuestionDetails";
import Batches from "./pages/BatchCreation/Batches";
import BatchContent from "./pages/BatchCreation/BatchContent";
import CreateBatch from "./pages/BatchCreation/CreateBatch";
import BatchDetails from "./pages/BatchCreation/BatchDetails";
import Content from "./pages/BatchCreation/Content";
import ContentDetails from "./pages/BatchCreation/ContentDetails";
import DoubtManagement from "./pages/DoubtManagement";
import OMRUpload from "./pages/UploadOMR/OMRUpload";
import { ToastContainer } from "react-toastify";
import NewPassword from "./pages/Auth/NewPassword";
import { MathJaxContext } from "better-react-mathjax";
import TestSchedule from "./pages/BatchCreation/TestSchedule";
import BatchUpdate from "./pages/BatchCreation/BatchUpdate";
import QuestionUpdate from "./pages/QUestionManagement/QuestionUpdate";
import Results from "./pages/BatchCreation/Results";
// import TCreation from "./pages/Tests/TCreation";
import TCreation from "./pages/Test/TCreation";
import ReviewPage from "./pages/Tests/ReviewPage";
import DefineSyllabus from "./pages/Tests/DefineSyllabus";
import TestSelection from "./pages/Test/TestSelection";
import QuestionNumber from "./pages/Tests/QuestionNumber";
import QuestionForms from "./pages/Tests/QuestionForms";
import QuestionPages from "./pages/Tests/QuestionPages";
import TSummery from "./pages/Test/TSummery";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Custom Layout Component
  const MainLayout = ({ children }) => {
    const location = useLocation();
    // const testRoutes = [
    //   "/TCreation",
    //   "/questionForm",
    //   "/questionPage",
    //   "/questionReview",
    // ];
    const hideSidebarRoutes = ["/", "/signup", "/reset-password/:token"];
    const isSidebarVisible = !hideSidebarRoutes.includes(
      location.pathname.toLowerCase()
    );

    // const isTestInnerSidebar = testRoutes.includes(location.pathname);
    return (
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar for Desktop */}
        {!isMobile && isSidebarVisible && <SidebarMenu />}
        {/* Sidebar as Drawer for Mobile */}
        {isMobile && isSidebarVisible && (
          <Drawer
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "240px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              },
            }}
          >
            <SidebarMenu />
          </Drawer>
        )}
        {/* {isTestInnerSidebar && <TestSidebar />} */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          {isSidebarVisible && (
            <Header>
              {isMobile && (
                <IconButton
                  onClick={() => setIsDrawerOpen(true)}
                  sx={{ color: "#2563eb", position: "absolute", left: "16px" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Header>
          )}

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              padding: isMobile ? "8px" : "16px",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <MathJaxContext>
        <Router>
          <MainLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password/:token" element={<NewPassword />} />
              {/* Private Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminDetails/:id" element={<AdminDetails />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/resolvedTicket" element={<ResolvedTicket />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/students" element={<Student />} />
              <Route path="/studentDetails/:id" element={<StudentDetails />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/template" element={<Template />} />
              {/* <Route path="/TCreations" element={<TCreations />} />
              <Route path="/TCreationlist" element={<TCreationlist />} /> */}
              {/* SECTION TEST CREATION  */}
              <Route path="/TCreation" element={<TCreation />} />
              <Route path="/test-selection/:id" element={<TestSelection />} />
              {/* <Route path="/define-syllabus/:id" element={<DefineSyllabus />} /> */}
              {/* <Route path="/questionForm/:id" element={<QuestionForm />} /> */}
              {/* <Route path="/questionForm/:id" element={<QuestionForms />} /> */}
              {/* <Route path="/questionPage/:id" element={<QuestionsPage />} /> */}
              <Route path="/questionPage/:id" element={<QuestionPages />} />
              <Route path="/questionReview/:id" element={<ReviewPage />} />
              <Route path="/TSummery/:id" element={<TSummery />} />
              {/* <Route path="/questionForm" element={< />} /> */}
              {/* <Route
                path="/question-selection/:id"
                element={<QuestionNumber />}
              /> */}
              <Route path="/OnlineOffline" element={<OnlineOffline />} />
              <Route path="/TSeries" element={<TseriesCreation />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/AppProfile" element={<AppProfile />} />
              <Route path="/termscondition" element={<TermsConditions />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/Policy" element={<PrivacyPolicy />} />
              <Route
                path="/CancellationPolicy"
                element={<CancellationPolicy />}
              />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/blogs&newsletter" element={<Newsletter />} />
              blogs&newsletter
              <Route path="/settings" element={<Settings />} />
              <Route path="/Notifications" element={<Notifications />} />
              <Route
                path="/question-managment"
                element={<QuestionManagment />}
              />
              <Route path="/question-create" element={<QuestionCreat />} />
              <Route path="/question/:id" element={<QuestionDetails />} />
              <Route path="/question-update/:id" element={<QuestionUpdate />} />
              <Route path="/batches" element={<Batches />} />
              <Route path="/batches-content" element={<Content />} />
              <Route path="/batches-content/:id" element={<ContentDetails />} />
              <Route path="/batch-update/:id" element={<BatchUpdate />} />
              <Route
                path="/TestSchedule/:id/:selectedDate"
                element={<TestSchedule />}
              />
              <Route path="/create-batch" element={<CreateBatch />} />
              <Route path="/batch-details/:id" element={<BatchDetails />} />
              <Route path="/doubt" element={<DoubtManagement />} />
              <Route path="/upload-omr" element={<OMRUpload />} />
              <Route path="/Results" element={<Results />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </Router>
      </MathJaxContext>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
