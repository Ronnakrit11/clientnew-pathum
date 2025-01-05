"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="bg-white shadow-lg rounded-lg p-6 py-20 space-y-4 ">
          <h1 className="text-2xl font-bold text-center mb-10">
            โครงสร้างที่ปรึกษาสโมสรนักศึกษา
          </h1>
          <div className="container xl:w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-8">
              <div className="text-center space-y-4">
                <Image
                  src="/teacher/1.อ.อิทธิศักดิ์ ศรีดำ-ประธานกรรมการที่ปรึกษา.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                  className="object-cover"
                />
                <p className="font-semibold">อาจารย์อิทธิศกัดิ์ ศรีดำ</p>
                <p>ประธานกรรมการที่ปรึกษา</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/teacher/2.อ.พิชิตชัย เรือน้อย-กรรมการที่ปรึกษา.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">อาจารย์พิชิตชัย เรือน้อย</p>
                <p>กรรมการที่ปรึกษา</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/teacher/3.อ.เพชรประภา สังฆะราม-กรรมการที่ปรึกษา.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">อาจารย์เพชรประภา สังฆะราม</p>
                <p>กรรมการที่ปรึกษา</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
