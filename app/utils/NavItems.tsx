import Link from "next/link";
import React, { useState } from "react";
import { ListGroup } from "flowbite-react";
import { GoChevronDown } from "react-icons/go";
import { useRouter, usePathname } from "next/navigation";
export const navItemsData = [
  {
    name: "หน้าเเรก",
    url: "/",
  },
  {
    name: "เกี่ยวกับเรา",
    url: "/about",
    subMenu: [
      {
        name: "วัตถุประสงค์ของสโมสรนักศึกษา",
        url: "/about/purpose-and-importance",
      },
      {
        name: "โครงสร้างคณะกรรมการสโมสรนักศึกษา",
        url: "/about/smo-committee-structure",
      },
      {
        name: "ความสำคัญและวัตถุประสงค์ของการมีอาจารย์ที่ปรึกษาสโมสรนักศึกษา",
        url: "/about/importance-and-objective",
      }
    ],
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
const hightlightMenu = "สมัครเรียนออนไลน์";

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [active, setActive] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  // console.log("🚀 ~ pathname:", pathname);

  const resetActive = () => {
    setActive("");
  };

  return (
    <>
      <div className="hidden 1200px:flex items-center">
        {navItemsData &&
          navItemsData.map((item, index) => {
            if (item.subMenu?.length) {
              return (
                <div
                  className="relative hover:bg-[#FDFD95] rounded-md py-2"
                  key={index}
                >
                  <span
                    className={`${
                      pathname === item.url
                        ? "text-primary font-[600]"
                        : "dark:text-white text-black"
                    } text-[16px] px-6 font-Poppins font-[400] cursor-pointer flex items-center justify-center gap-1 `}
                    onMouseOver={() => setActive(item.name)}
                  >
                    <div>{item.name}</div>
                    <GoChevronDown />
                  </span>
                  <div
                    onMouseLeave={resetActive}
                    className={`flex justify-center absolute z-10 top-[28px] min-w-[143px] transition  ease-out ${
                      active === item.name ? "visible" : "hidden"
                    }`}
                  >
                    <ListGroup className="w-48">
                      {item.subMenu.map((subItem, subIndex) => {
                        return (
                          <ListGroup.Item
                            onClick={() => router.push(subItem.url)}
                            key={`sub-${subIndex}`}
                            style={{ color: "#ad232c" }}
                          >
                            {subItem.name}
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </div>
                </div>
              );
            }

            return (
              <Link href={`${item.url}`} key={index} passHref>
                <span
                  onMouseOver={resetActive}
                  className={`${
                    pathname === item.url
                      ? "text-primary font-bold"
                      : "dark:text-white text-black"
                  } text-[16px] px-6 font-Poppins font-[400] hover:bg-[#FDFD95] rounded-md py-2 ${
                    item.name === hightlightMenu
                      ? "border-solid border-2 border-red-300 py-1 rounded-md"
                      : null
                  } `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
      </div>
      {isMobile && (
        <div className="1200px:hidden mt-5 pb-3">
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
            navItemsData.map((item, index) => {
              if (item.subMenu?.length) {
                return (
                  <div className="relative" key={index}>
                    <span
                      className={`${
                        pathname === item.url
                          ? "text-[#5352db] font-bold"
                          : "dark:text-white text-black"
                      } text-[18px] px-6 font-Poppins font-[400] cursor-pointer flex items-center justify-left gap-1 py-5 w-[95%]`}
                      onMouseOver={() => setActive(item.name)}
                    >
                      <div>{item.name}</div>
                      <GoChevronDown />
                    </span>
                    <div
                      onMouseLeave={resetActive}
                      className={`flex justify-left px-8 py-2 z-10 top-[28px] min-w-[143px] transition  ease-out ${
                        active === item.name ? "visible" : "hidden"
                      }`}
                    >
                      <ul className="text-black">
                        {item.subMenu.map((subItem, subIndex) => {
                          return (
                            <li
                              onClick={() => router.push(subItem.url)}
                              key={`sub-${subIndex}`}
                              className="py-2 flex items-center"
                            >
                              <span className="text-[8px] pr-2">⚪ </span>{" "}
                              {subItem.name}
                              <hr />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  onMouseOver={resetActive}
                  href={`${item.url}`}
                  passHref
                  key={index}
                >
                  <span
                    className={`${
                      pathname === item.url
                        ? "text-[#534ede] font-bold"
                        : "dark:text-white text-black"
                    } block py-5 text-[18px] px-6 font-Poppins font-[400] ${
                      item.name === hightlightMenu
                        ? "border-solid border-2 border-red-300 py-1 rounded-md"
                        : null
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
};

export default NavItems;
