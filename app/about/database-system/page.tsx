"use client";
import React, { useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Login from "@/app/components/Auth/Login";
import CustomModal from "@/app/utils/CustomModal";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

import { Button } from "flowbite-react";

const Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const { data: heroData } = useGetHeroDataQuery("DatabaseSystem");

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      {/* Heading */}
      <Heading
        title="ระบบฐานข้อมูลนักศึกษา"
        description="ระบบฐานข้อมูลนักศึกษา"
        keywords="ระบบฐานข้อมูลนักศึกษา"
      />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <p
            dangerouslySetInnerHTML={{
              __html: heroData?.layout?.databaseSystem?.content,
            }}
          ></p>
          <div className="flex justify-center py-10 ">
            <Button onClick={() => setOpenLogin(true)} color="success">
              เข้าสู่ระบบฐานข้อมูลนักศึกษา
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      {openLogin && route === "Login" && (
        <CustomModal
          open={openLogin}
          setOpen={setOpenLogin}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Page;
