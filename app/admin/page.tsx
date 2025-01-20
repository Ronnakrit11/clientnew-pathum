"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";
import Image from "next/image";
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
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] flex h-screen justify-center items-center flex-row">
            {/* <DashboardHero isDashboard={true} /> */}
            <Image
              src="/logo.png"
              alt="Dashboard"
              width={1000}
              height={1000}
              className="w-[150px]"
            />
            <div>
              <p className="text-3xl">Welcome to Database Management System</p>
              <p className="text-xl">
                Faculty of Scient and Techology - Pathumwan Institute of
                Technology (PIT)
              </p>
            </div>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
