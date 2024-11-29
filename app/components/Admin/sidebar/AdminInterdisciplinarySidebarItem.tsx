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

const AdminInterdisciplinarySidebarItem = ({
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

export default AdminInterdisciplinarySidebarItem;
