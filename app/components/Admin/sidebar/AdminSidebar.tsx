// @ts-nocheck
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
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { ExitToAppIcon, GroupsIcon, HomeOutlinedIcon } from "./Icon";
import { HiMiniUsers } from "react-icons/hi2";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import { useGetMajorByIdQuery } from "@/redux/features/major/majorApi";

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
  const { data: dataMajor } = useGetAllMajorQuery({});

  //  console.log(dataMajor)
  const roleId =
    typeof user?.role === "string" && user?.role.includes("-")
      ? user?.role.split("-")[1]
      : null;
  const { data: dataMajorById } = useGetMajorByIdQuery({ id: roleId });
  console.log(dataMajorById?.data);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setlogout(true);
  };

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
          zIndex: 9,
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
              >
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
            <Box
              mb="25px"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
              bgcolor={"#F7F5F5"}
              paddingY={4}
            >
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
                  className="!text-[14px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  ชื่อ : {user?.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[14px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  ตำแหน่ง :{" "}
                  {dataMajorById?.data?.name === undefined
                    ? "แอดมิน"
                    : `แอดมิน${dataMajorById?.data?.name}`}
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
          {user.role !== "admin" && (
            <>
              <Typography
                variant="h5"
                className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                sx={{ m: "15px 0 5px 20px" }}
              >
                {!isCollapsed && `${dataMajorById?.data?.name}`}
              </Typography>
              <Item
                title="รายชื่อนักศึกษา"
                to={`/admin/major/${dataMajorById?.data?._id}`}
                icon={<HiMiniUsers size={20} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="รายชื่อสถานประกอบการ"
                to={`/admin/major/establishments/${dataMajorById?.data?._id}`}
                icon={<HiBuildingOffice2 size={20} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="ผลงานปริญญานิพนธ์"
                to={`/admin/major/thesis/${dataMajorById?.data?._id}`}
                icon={<HiAcademicCap size={20} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="ปริญญานิพนธ์ทั้งหมด"
                to={`/admin/major/list-thesis/${dataMajorById?.data?._id}`}
                icon={<HiAcademicCap size={20} />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
              />
              <Item
                title="รายชื่ออาจารย์"
                to={`/admin/major/teacher/${dataMajorById?.data?._id}`}
                icon={<HiAcademicCap size={20} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                sx={{ m: "15px 0 5px 20px" }}
              >
                {!isCollapsed && "แอ็คชั่น"}
              </Typography>
              <div onClick={logoutHandler}>
                <Item
                  title="ออกจากระบบ"
                  to="/"
                  icon={<ExitToAppIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

export default Sidebar;
