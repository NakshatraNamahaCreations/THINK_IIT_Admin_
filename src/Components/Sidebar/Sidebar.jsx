import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  HomeIcon,
  UserCircleIcon,
  AcademicCapIcon,
  TicketIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  MegaphoneIcon,
  ClipboardDocumentListIcon,
  ClipboardIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CreditCardIcon,
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import {
  ChevronRight,
  ChevronLeft,
  Menu as MenuIcon,
} from "@mui/icons-material";

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeItem") || "/dashboard"
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const storedAdmin = localStorage.getItem("user");
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error("Error parsing Admin data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  // Save active item to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  const handleNavigation = (path) => {
    setActiveItem(path);
    navigate(path);
    if (isMobile) setIsDrawerOpen(false);
  };

  const menuItemStyle = {
    padding: "10px 12px",
    fontSize: "14px",
    color: "#1e293b",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const activeStyle = {
    color: "#7467FF",
    fontWeight: "500",
    borderRight: "4px solid #7467FF",
    background: "#f3f4ff",
    transition: "all 0.3s ease",
  };

  const role = admin?.rights || {};

  return (
    <Box>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{
            color: "#2563eb",
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1000,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      {/* Sidebar for Desktop */}
      {!isMobile && (
        <Sidebar
          collapsed={collapsed}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            {!collapsed && (
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#2563eb",
                }}
              >
                CT UNIVERSITY
              </Typography>
            )}
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              sx={{
                color: "#2563eb",
                "&:hover": { color: "#7467FF" },
              }}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>

          {/* Menu Items */}
          <Menu>
            <MenuItem
              icon={
                <HomeIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/dashboard" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/dashboard"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/dashboard")}
            >
              {!collapsed && "Dashboard"}
            </MenuItem>
            {role.admin && (
              <MenuItem
                icon={
                  <UserCircleIcon
                    style={{
                      width: "20px",
                      color: activeItem === "/admin" ? "#2563eb" : "grey",
                    }}
                  />
                }
                style={
                  activeItem === "/admin"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/admin")}
              >
                {!collapsed && "Admin"}
              </MenuItem>
            )}

            {role.teacher && (
              <MenuItem
                icon={
                  <AcademicCapIcon
                    style={{
                      width: "20px",
                      color: activeItem === "/teacher" ? "#2563eb" : "grey",
                    }}
                  />
                }
                style={
                  activeItem === "/teacher"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/teacher")}
              >
                {!collapsed && "Teachers"}
              </MenuItem>
            )}

            {role.student && (
              <MenuItem
                icon={
                  <UserGroupIcon
                    style={{
                      width: "20px",
                      color: activeItem === "/students" ? "#2563eb" : "grey",
                    }}
                  />
                }
                style={
                  activeItem === "/students"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/students")}
              >
                {!collapsed && "Students"}
              </MenuItem>
            )}
            <MenuItem
              icon={
                <QuestionAnswerOutlinedIcon
                  style={{
                    width: "20px",
                    color:
                      activeItem === "/question-managment" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/question-managment"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/question-managment")}
            >
              {!collapsed && "Question-managment"}
            </MenuItem>

            <SubMenu
              label="Batch Management"
              style={
                activeItem === "/testManagement"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              icon={
                <ClipboardDocumentListIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/dashboard" ? "#2563eb" : "grey",
                  }}
                />
              }
            >
              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/batches"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/batches")}
              >
                {!collapsed && "Batches"}
              </MenuItem>

              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/batches-content"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/batches-content")}
              >
                {!collapsed && "Contents"}
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={
                <QuestionMarkCircleIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/doubt" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/TCreation"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/TCreation")}
            >
              {!collapsed && "Test Creation"}
            </MenuItem>
            {/* <SubMenu
              label="Test Management"
              style={
                activeItem === "/testManagement"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              icon={
                <ClipboardIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/dashboard" ? "#2563eb" : "grey",
                  }}
                />
              }
            >
              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/template"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/template")}
              >
                {!collapsed && "Template"}
              </MenuItem>

              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/TCreationlist"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/TCreationlist")}
              >
                {!collapsed && "Test Creation"}
              </MenuItem>

              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/TSeries"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/TSeries")}
              >
                {!collapsed && "Test Series Creation"}
              </MenuItem>
            </SubMenu> */}

            <MenuItem
              icon={
                <QuestionMarkCircleIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/doubt" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/doubt"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/doubt")}
            >
              {!collapsed && "Doubt Management"}
            </MenuItem>

            <MenuItem
              icon={
                <MegaphoneIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/marketing" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/marketing"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/marketing")}
            >
              {!collapsed && "Marketing"}
            </MenuItem>

            <MenuItem
              icon={
                <TicketIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/coupons" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/coupons"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/coupons")}
            >
              {!collapsed && "Coupons"}
            </MenuItem>

            <MenuItem
              icon={
                <CreditCardIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/wallet" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/wallet"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/wallet")}
            >
              {!collapsed && "Wallet"}
            </MenuItem>

            <MenuItem
              icon={
                <TicketIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/tickets" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/tickets"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/tickets")}
            >
              {!collapsed && "Tickets"}
            </MenuItem>
            <MenuItem
              icon={<UploadIcon style={{ width: "20px", color: "grey" }} />}
              style={
                activeItem === "/upload-omr"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/upload-omr")}
            >
              {!collapsed && "OMR Upload"}
            </MenuItem>
            <MenuItem
              icon={
                <BellIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/Notifications" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/Notifications"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/Notifications")}
            >
              {!collapsed && "Notifications"}
            </MenuItem>

            <SubMenu
              label="App Settings"
              style={
                activeItem === "/appSettings"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              icon={
                <CogIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/dashboard" ? "#2563eb" : "grey",
                  }}
                />
              }
            >
              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/appProfile"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/appProfile")}
              >
                {!collapsed && "App Profile"}
              </MenuItem>

              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/termscondition"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/termscondition")}
              >
                {!collapsed && "Terms & Conditions"}
              </MenuItem>
              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/Policy"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/Policy")}
              >
                {!collapsed && "Policy"}
              </MenuItem>
              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/blogs&newsletter"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/blogs&newsletter")}
              >
                {!collapsed && "Blogs and newsletter"}
              </MenuItem>

              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/testimonials"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/testimonials")}
              >
                {!collapsed && "   Testimonials"}
              </MenuItem>
              <MenuItem
                icon={
                  <span
                    style={{ display: "inline-block", width: "20px" }}
                  ></span>
                }
                style={
                  activeItem === "/FAQ"
                    ? { ...menuItemStyle, ...activeStyle }
                    : menuItemStyle
                }
                onClick={() => handleNavigation("/FAQ")}
              >
                {!collapsed && "FAQ"}
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={
                <CurrencyDollarIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/payments" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/payments"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/payments")}
            >
              {!collapsed && "Payments"}
            </MenuItem>

            <MenuItem
              icon={
                <ChartBarIcon
                  style={{
                    width: "20px",
                    color: activeItem === "/analytics" ? "#2563eb" : "grey",
                  }}
                />
              }
              style={
                activeItem === "/analytics"
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
              onClick={() => handleNavigation("/analytics")}
            >
              {!collapsed && "Analytics"}
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </Box>
  );
};

export default SidebarMenu;
