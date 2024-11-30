import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetAllBlogQuery } from "@/redux/features/blog/blogsApi";
import BlogCard from "../Admin/Blog/BlogCard";
import Link from "next/link";

type Props = {};

const Blogs = (props: Props) => {
  const [limit, setLimit] = useState(4);
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

  return (
    <div className="bg-white w-full  pb-20 font-Poppins">
      <div className={`w-[90%] 800px:w-[80%] m-auto pt-10`}>
        <h1
          data-aos="fade-down"
          className=" text-primary font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px]  font-[700] tracking-tight"
        >
          ข่าวสารและความเคลื่อนไหว
          <br />
        </h1>
        <br />
        <br />
        <div
          data-aos="fade-right"
          className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0"
        >
          {blogs &&
            blogs.map((item: any, index: number) => (
              <BlogCard item={item} key={`blog-${index}`} />
            ))}
        </div>
        <div className="flex justify-center mt-10 ">
          <Link href={"/blog"}>
            <button className="bg-primary py-2 px-4 text-white rounded-md hover:shadow-lg">
              ดูเพิ่มเติม
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
