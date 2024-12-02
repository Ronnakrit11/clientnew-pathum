"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { ArrowForwardIosIcon, ArrowBackIosIcon } from "./Icon";
import avatarDefault from "../../../../public/assests/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}
import AdminSidebarItem from "./AdminSidebarItem";
import AdminEnItSidebarItem from "./AdminEnITSidebarItem";
import AdminTechEnvSidebarItem from "./AdminTechEnvSidebar";
import AdminTechIdsManageSidebarItem from "./AdminTechIdsManageSidebarItem";
import AdminInterdisciplinarySidebarItem from "./AdminInterdisciplinarySidebarItem";

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setlogout(true);
  };

  console.log(user);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#ad232c !important",
        },
        "& .pro-menu-item.active": {
          color: "#ad232c !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43] z-99"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99999999999999,
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // ml="15px"
              >
                {/* <Link href="/admin" className="block">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    ELearning
                  </h3>
                </Link> */}
                <Image src={"/logo.png"} alt="logo" width={50} height={50} />
                <div className="hover:text-primary">
                  <p className="text-[12px]">คณะวิทยาศาสตร์และเทคโนโลยี</p>
                  <p>สถาบันเทคโนโลยีปทุมวัน</p>
                </div>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} bgcolor={"#F7F5F5"} paddingY={4}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={70}
                  height={70}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #ad232c",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[16px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  ชื่อ : {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  ตำแหน่ง : {user?.role}
                </Typography>
              </Box>
            </Box>
          )}
          {user.role === "admin" && (
            <AdminSidebarItem
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              logoutHandler={logoutHandler}
            />
          )}
          {user.role === "admin-engineer-it" && (
            <AdminEnItSidebarItem
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              logoutHandler={logoutHandler}
            />
          )}
          {user.role === "admin-tect-env" && (
            <AdminTechEnvSidebarItem
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              logoutHandler={logoutHandler}
            />
          )}
          {user.role === "admin-interdisciplinary" && (
            <AdminInterdisciplinarySidebarItem
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              logoutHandler={logoutHandler}
            />
          )}
          {user.role === "admin-tech-indrustry" && (
            <AdminTechIdsManageSidebarItem
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              logoutHandler={logoutHandler}
            />
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
