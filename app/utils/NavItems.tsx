import Link from "next/link";
import React from "react";
import { Dropdown } from "flowbite-react";

export const navItemsData = [
  {
    name: "หน้าเเรก",
    url: "/",
  },
  {
    name: "เกี่ยวกับเรา",
    url: "/about",
    subMenu:[
      {
        name:"วัตถุประสงค์ของสโมสรนักศึกษา"
      },
      {
        name:"โครงสร้างที่ปรึกษาสโมสรนักศึกษา"
      },
      {
        name:"โครงสร้างคณะกรรมการสโมสรนักศึกษา"
      }
    ]
  },
  {
    name: "ข่าวประชาสัมพันธ์",
    url: "/blog",
  },
  {
    name: "ภาพกิจกรรม",
    url: "/event-image",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "text-primary font-semibold"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400] hover:bg-[#FDFD95] py-2 rounded-md`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                ELearning
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={`${i.url}`} passHref key={index}>
                <span
                  className={`${
                    activeItem === index
                      ? "text-[#008AFC] font-bold"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
