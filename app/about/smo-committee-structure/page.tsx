"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PDFViewer from "@/app/components/Ebook/PDFViewer";
import Image from "next/image";
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
        title="โครงสร้างคณะกรรมการสโมสรนักศึกษา"
        description="สร้างคณะวิทยาศาสตร์และเทคโนโลยี สถาบันเทคโนโลยีปทุมวัน"
        keywords="สร้างคณะวิทยาศาสตร์และเทคโนโลยี สถาบันเทคโนโลยีปทุมวัน"
      />
      <main className="flex-grow container mx-auto px-4 py-8 text-black">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-10 text-center">
            โครงสร้างคณะกรรมการสโมสรนักศึกษา
          </h1>

          {/* <PDFViewer link="/about/smo-committee-structure.pdf" /> */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/about/smo-committee-structure/Page1.png"}
              alt="กรรมการสโมสรนักศึกษา"
              width={500}
              height={500}
              className="object-cover"
            />
            <Image
              src={"/about/smo-committee-structure/Page2.png"}
              alt="กรรมการสโมสรนักศึกษา"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
          {/* <div className="mt-4">
            <a
              href="/about/smo-committee-structure.pdf"
              download="smo-committee-structure.pdf"
              className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:text-primary transition justify-end"
            >
              ดาวน์โหลดไฟล์ PDF
            </a>
          </div> */}
          <div className="container xl:w-[1000px] mx-auto py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-8">
              <div className="text-center space-y-4">
                <Image
                  src="/smo/ก2.1-นายกสโมสรนักศึกษา.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                  className="object-cover"
                />
                <p className="font-semibold">ก21</p>
                <p>นายกสโมสรนักศึกษา</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/smo/ภ2.2-อุปนายกสโมสรนักศึกษา.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">ภ22</p>
                <p>อุปนายกสโมสรนักศึกษา</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/smo/ณ2.3-ตัวแทนนักศึกษา.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">ณ23</p>
                <p>ตัวแทนนักศึกษา</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/smo/ส2.4-ตัวแทนนักศึกษา.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">ส24</p>
                <p>ตัวแทนนักศึกษา</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/smo/จ2.5-เหรัญญิก.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">จ25</p>
                <p>เหรัญญิก</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/smo/อ2.6-ประชาสัมพันธ์.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">อ26</p>
                <p>ประชาสัมพันธ์</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/smo/ว2.7-เลขานุการ.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">ว27</p>
                <p>เลขานุการ</p>
              </div>
              <div className="text-center space-y-4">
                <Image
                  src="/smo/พ2.8-ผู้ช่วยเลขานุการ.png"
                  alt="อาจารย์อิทธิศกัดิ์ ศรีดำ"
                  width={500}
                  height={500}
                />
                <p className="font-semibold">พ28</p>
                <p>ผู้ช่วยเลขานุการ</p>
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
