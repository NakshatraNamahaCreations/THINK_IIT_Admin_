import "../App.css";
import Main from "../Components/Main";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopHeader from "../Components/TopHeader";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import AdminCategory from "../pages/AdminCategory";
import ClassType from "../pages/ClassType";
import MasterSubject from "../pages/MasterSubject";
import ChapterList from "../pages/ChapterList";
import SubChapter from "../pages/SubChapter";
import TextLanguages from "../pages/TextLanguages";
import ExamTypeList from "../pages/ExamTypeList";
import Teacher from "../pages/Teacher";
import SingalTeacher from "../pages/SingalTeacher";
import Student from "../pages/Student";
import SingalStudent from "../pages/SingalStudent";
import SingalStudentStatus from "../pages/SingalStudentStatus";
import QuestionManagments from "../pages/QuestionManagments";
import QuestionAdd from "../pages/QuestionAdd";
import InputQuestion from "../pages/InputQuestion";
import BatchesCreations from "../pages/BatchesCreations";
import InputBatchesCreations from "../pages/InputBatchesCreations";
import PreviewBatch from "../pages/PreviewBatch";
import ProductServices from "../pages/ProductServices";
import AddTestSeries from "../pages/AddTestSeries";
import TestCreation from "../pages/TestCreation";
import TestTemplateCreation from "../pages/TestTemplateCreation";
import AddQuestionsDetails from "../pages/AddQuestionDetails";
import QuestionDeatialsID from "../pages/QuestionDeatialsID";
import Login from "../pages/Login";
import UploadOMR from "../pages/UploadOMR";
import Marketing from "../pages/Marketing";
import AddBanner from "../pages/AddBanner";
import PaymentandSub from "../pages/PaymentandSub";
import StudentPaymentWithId from "../pages/StudentPaymentWithId";
import Wallet from "../pages/Wallet";
import WalletDetailsId from "../pages/WalletDetailsId";
import Ticket from "../pages/Ticket";
import ReslovedTickets from "../pages/ResolvedTickets";
import Testimonials from "../pages/Testimonials";
import Notificationss from "../pages/Notificationss";
import ReportsAndAnalytics from "../pages/ReportsAndAnalytics";
import TermsConditions from "../pages/TermsConditions";
import AppLogo from "../pages/AppLogo";
import PaymentReportss from "../pages/PaymentReportss";
import PaymentReportId from "../pages/PaymentReportId";
import ForgotPassword from "../pages/ForgotPassword";
import NewPassword from "../pages/NewPassword";
import TestTemplate from "../pages/TestTemplate";
import TestCrationN from "../pages/TestCrationN";
import OnlineOffline from "../pages/OnlineOffline";
import CouponManagement from "../pages/CouponManagement";
import Faq from "../pages/Faq";
import Cancellation from "../pages/Cancellation";
import SelectTestCreation from "../pages/SelectTestCreation";
import NewTestCreation from "../pages/NewTestCreations";
import QuizManagement from "../pages/QuizManagement";
import DoubtManagmentID from "../pages/DoubtManagmentID";
import DoubtManagement from "../pages/DoubtManagment";
import AssignmentManagment from "../pages/AssignmentManagment";
import AssignmentManagmentId from "../pages/AssignmentManagmentId";
import BlogsNewsletter from "../pages/BlogsNewsletter";

function AppNavigation() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <>
                <ForgotPassword />
              </>
            }
          />
          <Route
            path="/new-password"
            element={
              <>
                <NewPassword />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Dashboard" />
                      <Dashboard />
                    </>
                  }
                />
              </>
            }
          />

          <Route
            path="/admin"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Admin" />
                      <Admin />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/admin/category"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Admin" />
                      <AdminCategory />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/class"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Master" />
                      <ClassType />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/subject"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Master" />
                      <MasterSubject />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/chapter"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Master" />
                      <ChapterList />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/sub-chapter"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Master" />
                      <SubChapter />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/language"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Master" />
                      <TextLanguages />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/examtype"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Master" />
                      <ExamTypeList />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/teacher"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Teacher" />
                      <Teacher />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/teacher/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Teacher" />
                      <SingalTeacher />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/students"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Students" />
                      <Student />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/students/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Students" />
                      <SingalStudent />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/students/status/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Students" />
                      <SingalStudentStatus />
                    </>
                  }
                />
              </>
            }
          />

          {/*Test creation wfw */}
          <Route
            path="/testtemplatecreation"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Test Template Creation" />
                      <TestTemplate />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/testcreation-n"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Test Creation" />
                      <TestCrationN />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/off-online-creation"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Offline / Online Test Creation" />
                      <OnlineOffline />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/questionmanagments"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Question Managements" />
                      <QuestionManagments />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/addquestion"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Add Question" />
                      <QuestionAdd />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/new-test-creation"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Test Series Creation" />
                      <NewTestCreation />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/inputquestions"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Add Question" />
                      <InputQuestion />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/testtemplate-createions"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader />
                      <SelectTestCreation />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/batchescreations"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Batches Creation" />
                      <BatchesCreations />
                    </>
                  }
                />
              </>
            }
          />

          <Route
            path="/inputbatchcrations"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Batches Creation" />
                      <InputBatchesCreations />
                    </>
                  }
                />
              </>
            }
          />

          <Route
            path="/batchcreations"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Batches Creation" />
                      <PreviewBatch />
                    </>
                  }
                />
              </>
            }
          />

          <Route
            path="/product-services"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Product & Services" />
                      <ProductServices />
                    </>
                  }
                />
              </>
            }
          />

          <Route
            path="/product-services-test"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Product & Services" />
                      <AddTestSeries />
                    </>
                  }
                />
              </>
            }
          />

          {/* Coupon management */}

          <Route
            path="/cupon-management"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Coupon Management" />
                      <CouponManagement />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/faq"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="FAQ Management" />
                      <Faq />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/cancellation-policy"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Cancellation Policies" />
                      <Cancellation />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/uploadimage"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Upload OMR" />
                      <UploadOMR />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/test/series-details"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Product & Services" />
                      <ProductServices />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/test-creations"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Test Creation" />
                      <TestCreation />
                    </>
                  }
                />
              </>
            }
          />

          <Route
            path="/testtemplatecreations"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Test Creation" />
                      <TestTemplateCreation />
                    </>
                  }
                />
              </>
            }
          />

          <Route
            path="/addquestiondetails"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Test Creation" />
                      <AddQuestionsDetails />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/addquestiondetails/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Test Creation" />
                      <QuestionDeatialsID />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/marketing"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Marketing" />
                      <Marketing />
                    </>
                  }
                />
              </>
            }
          />
          {/* Add Banner */}
          <Route
            path="/add-banner"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Marketing" />
                      <AddBanner />
                    </>
                  }
                />
              </>
            }
          />
          {/* /addddd*/}
          <Route
            path="/payment-subscriptions"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Payment And Subscriptions" />
                      <PaymentandSub />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/payment-subscriptions/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Payment And Subscriptions" />
                      <StudentPaymentWithId />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/Wallets"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Wallets" />
                      <Wallet />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/walletdetail/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Wallets" />
                      <WalletDetailsId />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/ticket"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Ticket" />
                      <Ticket />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/resloved-ticket"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Ticket" />
                      <ReslovedTickets />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/terms-conditions"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="App-Settings" />
                      <TermsConditions />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/app-logo"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="App-Settings" />
                      <AppLogo />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/testimonials"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Testimonial" />
                      <Testimonials />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/notifications"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Notifications" />
                      <Notificationss />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/reportandanalytics"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Report and Analytics" />
                      <ReportsAndAnalytics />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/paymentreports"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Report and Analytics" />
                      <PaymentReportss />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/payment-reports/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Report and Analytics" />
                      <PaymentReportId />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/payment-reports/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Report and Analytics" />
                      <PaymentReportId />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/quiz-managment"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Report and Analytics" />
                      <QuizManagement />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/doubt-management"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Doubt Management" />
                      <DoubtManagement />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/doubt-management/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Doubt Management" />
                      <DoubtManagmentID />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/assignment-managment"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Assignment Managment" />
                      <AssignmentManagment />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/assignment-managment/:id"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Assignment Managment" />
                      <AssignmentManagmentId />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/blogs-newsletters"
            element={
              <>
                <Main
                  children={
                    <>
                      <TopHeader title="Blogs Newsletter" />
                      <BlogsNewsletter />
                    </>
                  }
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppNavigation;
