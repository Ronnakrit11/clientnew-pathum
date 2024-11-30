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
        title="จัดการผู้ใช้ทั้งหมด"
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
        title="Hero"
        to="/admin/hero"
        icon={<IoReaderOutline />}
        selected={selected}
        setSelected={setSelected}
      />
      {/* <Item
        title="FAQ"
        to="/admin/faq"
        icon={<IoList />}
        selected={selected}
        setSelected={setSelected}
      /> */}
      <Typography
        variant="h5"
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
        sx={{ m: "15px 0 5px 20px" }}
      >
        {!isCollapsed && "วิศวกรรมซอฟต์แวร์และระบบสารสนเทศ"}
      </Typography>
      <Item
        title="รายชื่อนักศึกษา"
        to="/admin/en-it"
        icon={<HiMiniUsers size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อสถานประกอบการ"
        to="/admin/en-it/establishments"
        icon={<HiBuildingOffice2 size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="ผลงานปริญญานิพนธ์"
        to="/admin/en-it/thesis"
        icon={<HiAcademicCap size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h5"
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
        sx={{ m: "15px 0 5px 20px" }}
      >
        {!isCollapsed && "เทคโนโลยีสิ่งแวดล้อมการเกษตร"}
      </Typography>
      <Item
        title="รายชื่อนักศึกษา"
        to="/admin/tech-env"
        icon={<HiMiniUsers size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อสถานประกอบการ"
        to="/admin/tech-env/establishments"
        icon={<HiBuildingOffice2 size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="ผลงานปริญญานิพนธ์"
        to="/admin/tech-env/thesis"
        icon={<HiAcademicCap size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h5"
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
        sx={{ m: "15px 0 5px 20px" }}
      >
        {!isCollapsed && "เทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม"}
      </Typography>
      <Item
        title="รายชื่อนักศึกษา"
        to="/admin/tect-ids-manage"
        icon={<HiMiniUsers size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อสถานประกอบการ"
        to="/admin/tect-ids-manage/establishments"
        icon={<HiBuildingOffice2 size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="ผลงานปริญญานิพนธ์"
        to="/admin/tect-ids-manage/thesis"
        icon={<HiAcademicCap size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h5"
        className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
        sx={{ m: "15px 0 5px 20px" }}
      >
        {!isCollapsed && "สหวิทยาการ"}
      </Typography>
      <Item
        title="รายชื่อนักศึกษา"
        to="/admin/interdisciplinary"
        icon={<HiMiniUsers size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="รายชื่อสถานประกอบการ"
        to="/admin/interdisciplinary/establishments"
        icon={<HiBuildingOffice2 size={20} />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="ผลงานปริญญานิพนธ์"
        to="/admin/interdisciplinary/thesis"
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
    </Box>
  );
};

export default AdminSidebarItem;
