"use client";

import { Box, Typography } from "@mui/material";
import { FC } from "react";
import Link from "next/link";
import { MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { ExitToAppIcon, GroupsIcon, HomeOutlinedIcon } from "./Icon";
import { HiMiniUsers } from "react-icons/hi2";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoList } from "react-icons/io5";
import { IoReaderOutline } from "react-icons/io5";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

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

const AdminSidebarItem = ({
  selected,
  setSelected,
  isCollapsed,
  logoutHandler,
}: {
  selected: string;
  setSelected: any;
  isCollapsed: boolean;
  logoutHandler: () => void;
}) => {
  const { data: dataMajor } = useGetAllMajorQuery(undefined, {});

  return (
    <Box>
      <Item
        title="แดชบอร์ด"
        to="/admin"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />

      <Typography
        variant="h5"
        sx={{ m: "15px 0 5px 25px" }}
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
      >
        {!isCollapsed && "ทั่วไป"}
      </Typography>
      <Item
        title="รายชื่อนักศึกษาทั้งหมด"
        to="/admin/users"
        icon={<GroupsIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการแอดมิน"
        to="/admin/manage-admin"
        icon={<GroupsIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการสาขาวิชา"
        to="/admin/major"
        icon={<GroupsIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการหลักสูตร"
        to="/admin/program"
        icon={<GroupsIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Logs"
        to="/admin/logs"
        icon={<IoNewspaperOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h5"
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
        sx={{ m: "15px 0 5px 20px" }}
      >
        {!isCollapsed && "จัดการบทความ"}
      </Typography>
      <Item
        title="สร้างข่าวประชาสัมพันธ์"
        to="/admin/create-news"
        icon={<IoNewspaperOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อข่าวประชาสัมพันธ์"
        to="/admin/blogs"
        icon={<IoNewspaperOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h5"
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
        sx={{ m: "15px 0 5px 20px" }}
      >
        {!isCollapsed && "จัดการภาพกิจกรรม"}
      </Typography>
      <Item
        title="สร้างภาพกิจกรรม"
        to="/admin/create-event"
        icon={<IoNewspaperOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อภาพกิจกรรม"
        to="/admin/event"
        icon={<IoNewspaperOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h5"
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
        sx={{ m: "15px 0 5px 20px" }}
      >
        {!isCollapsed && "จัดการหน้าเว็บไซต์"}
      </Typography>
      <Item
        title="จัดการ Banner"
        to="/admin/hero"
        icon={<IoReaderOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="วัตถุประสงค์"
        to="/admin/objective"
        icon={<IoReaderOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="วัตถุประสงค์คณะกรรมการ"
        to="/admin/structure-smo"
        icon={<IoReaderOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการที่ปรึกษาสโมสร"
        to="/admin/structure-consult-smo"
        icon={<IoReaderOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="ระบบฐานข้อมูล"
        to="/admin/database-system"
        icon={<IoReaderOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      {dataMajor?.data?.map((item: any, index: number) => (
        <div key={index}>
          <Typography
            variant="h5"
            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            sx={{ m: "15px 0 5px 20px" }}
          >
            {!isCollapsed && `${item.name}`}
          </Typography>
          <Item
            title={`รายชื่อ${item.name}`}
            to={`/admin/major/${item._id}`}
            icon={<HiMiniUsers size={20} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={`รายชื่อสถานประกอบการ`}
            to={`/admin/major/establishments/${item._id}`}
            icon={<HiMiniUsers size={20} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={`ผลงานปริญญานิพนธ์`}
            to={`/admin/major/thesis/${item._id}`}
            icon={<HiMiniUsers size={20} />}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      ))}
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
    </Box>
  );
};

export default AdminSidebarItem;
