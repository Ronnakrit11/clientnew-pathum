"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PDFViewer from "@/app/components/Ebook/PDFViewer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 ">
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Heading
        title="ระบบฐานข้อมูลนักศึกษา"
        description="ระบบฐานข้อมูลนักศึกษา"
        keywords="ระบบฐานข้อมูลนักศึกษา"
      />
      <main className="flex-grow container mx-auto px-4 py-20 text-black">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">ระบบฐานข้อมูลนักศึกษา</h1>
          <div className="space-y-2 mb-8">
            <p className="ml-4">
              ความสำคัญของการมีระบบฐานข้อมูลนักศึกษา
              ระบบฐานข้อมูลนักศึกษาเป็นสิ่งสำคัญในการบริหารจัดการข้อมูลเกี่ยวกับนักศึกษาของคณะวิทยาศาสตร์และเทคโนโลยี
              เพื่อให้สามารถติดตามข้อมูลที่จำเป็นได้อย่างมีประสิทธิภาพ
              ระบบฐานข้อมูลช่วยให้คณะสามารถจัดเก็บและจัดการข้อมูลได้อย่างเป็นระเบียบ
              ลดความซ้ำซ้อนและข้อผิดพลาดในการดำเนินงาน
              อีกทั้งยังช่วยติดตามความคืบหน้าของนักศึกษา เช่น
              ข้อมูลการสหกิจศึกษา ข้อมูลปริญญานิพนธ์ และเส้นทางอาชีพของศิษย์เก่า
              ระบบยังช่วยเสริมสร้างความสัมพันธ์ระหว่างนักศึกษาในรุ่นปัจจุบันและศิษย์เก่า
              รวมถึงการสร้างเครือข่ายกับองค์กรภายนอกเพื่อส่งเสริมการพัฒนานักศึกษาและคณะ.
              วัตถุประสงค์ของการมีระบบฐานข้อมูลนักศึกษา * •
              จัดการข้อมูลนักศึกษาอย่างมีประสิทธิภาพ: ระบบฐาน
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
