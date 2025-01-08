"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AllUsers from "@/app/components/Admin/Users/AllUsers";
// import NewAllUsers from "@/app/components/Admin/Users/NewAllUsers";
// import EnginnerAllUser from "@/app/components/Admin/Users/EnginnerAllUser";
import AllEstabishment from '../../en-it/establishments/AllEstabishment'
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            {/* <EnginnerAllUser /> */}
            <AllEstabishment major="สาขาวิชาสหวิทยาการ" />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
