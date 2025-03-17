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
import { IoReaderOutline } from "react-icons/io5";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { GiTeacher } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";
import { PiFlagBanner } from "react-icons/pi";
import { FaBuilding, FaUser, FaUsers, FaUsersGear, FaUsersLine, FaUserTie } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa6";
import { MdEvent, MdEventAvailable, MdOutlineDataObject } from "react-icons/md";
import { RiUser2Fill } from "react-icons/ri";
import { CiBoxList } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";

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
        icon={<FaUsersLine size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการแอดมิน"
        to="/admin/manage-admin"
        icon={<FaUserTie />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการแขนง"
        to="/admin/sect"
        icon={<FaUser size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการสาขาวิชา"
        to="/admin/major"
        icon={<FaUserFriends size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการหลักสูตร"
        to="/admin/program"
        icon={<FaUsers size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการความร่วมมือหน่วยงาน"
        to="/admin/company-cooperation"
        icon={<FaBuilding size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Logs"
        to="/admin/logs"
        icon={<CiBoxList size={20} />}
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
        icon={<IoNewspaperOutline size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อข่าวประชาสัมพันธ์"
        to="/admin/blogs"
        icon={<IoNewspaperOutline size={20} />}
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
        icon={<MdEventAvailable size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อภาพกิจกรรม"
        to="/admin/event"
        icon={<MdEvent size={20} />}
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
        icon={<PiFlagBanner size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="วัตถุประสงค์"
        to="/admin/objective"
        icon={<MdOutlineDataObject size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="คณะกรรมการ"
        to="/admin/structure-smo"
        icon={<FaUsersGear />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="จัดการที่ปรึกษาสโมสร"
        to="/admin/structure-consult-smo"
        icon={<RiUser2Fill size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="ระบบฐานข้อมูล"
        to="/admin/database-system"
        icon={<FaDatabase />}
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
            icon={<HiBuildingOffice2 size={20} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={`ผลงานปริญญานิพนธ์`}
            to={`/admin/major/thesis/${item._id}`}
            icon={<HiAcademicCap size={20} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="ปริญญานิพนธ์ทั้งหมด"
            to={`/admin/major/list-thesis/${item?._id}`}
            icon={<TbBooks size={20} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={`รายชื่ออาจารย์`}
            to={`/admin/major/teacher/${item._id}`}
            icon={<GiTeacher size={20} />}
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
