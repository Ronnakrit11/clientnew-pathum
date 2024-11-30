"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import BlogCard from "../components/Admin/Blog/BlogCard";
import { useGetAllBlogQuery } from "@/redux/features/blog/blogsApi";
import { Pagination } from "flowbite-react";

type Props = {};

const Page = (props: Props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetAllBlogQuery(
    { limit: limit, page: currentPage, type: "news" },
    {}
  );
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setcourses] = useState(data?.result || []);

  useEffect(() => {
    setcourses(data?.result || []);
  }, [data]);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="w-full bg-[#EEE]">
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={2}
      />
      <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
        <Heading
          title={"All courses - Elearning"}
          description={"Elearning is a programming community."}
          keywords={
            "programming community, coding skills, expert insights, collaboration, growth"
          }
        />
        <br />
        <p className="text-[36px] text-primary font-[600]">
          ข่าวสารและความเคลื่อนไหว
        </p>
        {courses && courses.length === 0 && (
          <p
            className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
          >
            No Blog found!
          </p>
        )}
        {/* <br /> */}
        {/* <br /> */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-5 1500px:gap-[35px] pb-12 border-0 py-10">
          {courses &&
            courses.map((item: any, index: number) => (
              <BlogCard item={item} key={index} />
            ))}
        </div>
        <div className="flex overflow-x-auto sm:justify-center mb-10">
          <Pagination
            currentPage={currentPage}
            totalPages={100}
            color="failure"
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
