import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetAllBlogQuery } from "@/redux/features/blog/blogsApi";
import BlogCard from "../Admin/Blog/BlogCard";
import Link from "next/link";
import dayjs from "dayjs";
import { Badge } from "flowbite-react";
import { FaArrowRight, FaArrowRightArrowLeft } from "react-icons/fa6";
type Props = {};

const Blogs = (props: Props) => {
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllBlogQuery(
    { limit: limit, page: page, type: "news" },
    {}
  );
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState(data?.result || []);

  useEffect(() => {
    setBlogs(data?.result || []);
  }, [data]);

  console.log("blogs", blogs);

  return (
    <div className="bg-white w-full  pb-20 font-Poppins ">
      <div className={`w-[90%] 800px:w-[80%] m-auto pt-10`}>
        <h1
          data-aos="fade-down"
          className=" text-primary font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px]  font-[700] tracking-tight"
        >
          ข่าวสารและความเคลื่อนไหว
          <br />
        </h1>
        <div
          data-aos="fade-right"
          className="flex flex-col gap-[20px] justify-center md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-4 border-0"
        >
          {blogs ? (
            <>
              <div className="bg-gray-100 p-4 rounded-sm space-y-4">
                {blogs.map((item: any, index: number) => (
                  <>
                    {item?.type === "news" && (
                      <Link
                        href={`/blog/${item.slug}`}
                        key={`blog-${index}`}
                        className="flex justify-between text-primary hover:text-red-500 items-center border-b-2 pb-1 border-gray-200 dark:border-gray-700"
                      >
                        <p>{item.title}</p>
                        <p>{dayjs(item.createdAt).format("DD/MM/YYYY")}</p>
                      </Link>
                    )}
                  </>
                ))}
                <Link
                  href={"/blog"}
                  className="flex justify-end hover:text-primary"
                >
                  <p className="text-end flex items-center gap-2">
                    อ่านข่าวเพิ่มเติม <FaArrowRight />
                  </p>
                </Link>
              </div>
            </>
          ) : (
            <>ไม่มีข่าวสารที่อยู่ในขณะนี้</>
          )}
        </div>
        {/* <div className="flex justify-center ">
          <Link href={"/blog"}>
            <button className="bg-primary py-2 px-4 text-white rounded-md hover:shadow-lg">
              ดูเพิ่มเติม
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Blogs;
