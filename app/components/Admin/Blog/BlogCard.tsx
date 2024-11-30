import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";

type Props = {
  item: any;
  isProfile?: boolean;
};

const BlogCard: FC<Props> = ({ item, isProfile }) => {
  const router = useRouter();
  const linkUrl = `/blog/${item.slug}`;

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(linkUrl);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full bg-white cursor-pointer dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] shadow-md dark:shadow-inner"
    >
      <div className="w-full  dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] shadow-sm dark:shadow-inner">
        {!!item.thumbnail.url && (
          <Image
            src={item.thumbnail.url}
            width={2000}
            height={1000}
            objectFit="contain"
            className=" h-[300px] w-full object-cover"
            // className="w-full h-full object-cover"
            alt=""
          />
        )}
      </div>
      <div className="p-4 space-y-4">
        <h1 className=" cursor-pointer font-Poppins font-[400] text-[16px] md:text-[16px] text-black dark:text-[#fff]">
          {item.title}
        </h1>
        <h2 className=" font-Poppins text-[12px] md:text-[14px] text-[#777]">
          {add3Dots(item.description, 100)}
        </h2>
      </div>
      <div className="flex justify-between p-4 border-t">
        <p>อ่านต่อ</p>
        <div>
          <IoArrowForward />
        </div>
      </div>
    </div>
  );
};

function add3Dots(string: string, limit: number) {
  let dots = "...";
  if (string.length > limit) {
    string = string.substring(0, limit) + dots;
  }

  return string;
}

export default BlogCard;
