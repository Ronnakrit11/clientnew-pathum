"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-4">
            วัตถุประสงค์และความสำคัญของสโมสรนักศึกษาและระบบฐานข้อมูลนักศึกษา
          </h1>
          <div className="space-y-2">
            <h2 className="font-semibold text-xl">
              ความสำคัญของการมีสโมสรนักศึกษา
            </h2>
            <p className="ml-4">
              สโมสรนักศึกษามีบทบาทสำคัญในการเสริมสร้างการเรียนรู้และการพัฒนาทักษะของนักศึกษาในหลากหลายด้าน
              ทั้งด้านวิชาการ สังคม และการทำงานร่วมกัน
              โดยสโมสรทำหน้าที่เป็นพื้นที่ที่นักศึกษาได้แสดงออกถึงความสามารถ
              สร้างความสัมพันธ์ที่ดีระหว่างนักศึกษาในรุ่นเดียวกันและระหว่างรุ่น
              รวมถึงเป็นตัวกลางที่สะท้อนความคิดเห็น ความต้องการ
              และปัญหาของนักศึกษาไปยังคณะ นอกจากนี้
              สโมสรนักศึกษายังช่วยสร้างความร่วมมือกับองค์กรภายนอก
              ซึ่งมีส่วนช่วยให้นักศึกษาได้เรียนรู้การจัดการกิจกรรมและสร้างเครือข่ายที่เป็นประโยชน์ต่อการศึกษาและอาชีพในอนาคต.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold text-xl">
              วัตถุประสงค์ของการมีสโมสรนักศึกษา
            </h2>
            <ul className="space-y-2 ml-4">
              <li>
                • ส่งเสริมการพัฒนาศักยภาพนักศึกษา:
                สนับสนุนและจัดกิจกรรมที่ช่วยพัฒนาความรู้ ทักษะ และคุณสมบัติต่างๆ
                ของนักศึกษา ทั้งในด้านวิชาการ สังคม และวัฒนธรรม
                เพื่อเตรียมความพร้อมสำหรับการเข้าสู่ตลาดแรงงานและการดำเนินชีวิตในสังคม
              </li>
              <li>
                • เป็นศูนย์กลางการสื่อสารระหว่างนักศึกษาและคณะ:
                สโมสรนักศึกษาเป็นตัวกลางในการสะท้อนความคิดเห็น ความต้องการ
                และปัญหาของนักศึกษาไปยังคณะ
                พร้อมทั้งช่วยสื่อสารข้อมูลและนโยบายจากคณะไปยังนักศึกษา
              </li>
              <li>
                • ส่งเสริมความสัมพันธ์ระหว่างนักศึกษา:
                สโมสรช่วยสร้างความสัมพันธ์ที่ดีระหว่างนักศึกษาในคณะ
                ทั้งในรุ่นเดียวกันและระหว่างรุ่น
                เพื่อสร้างความเป็นน้ำหนึ่งใจเดียวกันและความร่วมมือในกิจกรรมต่างๆ
              </li>
              <li>
                • สนับสนุนการจัดกิจกรรมวิชาการและสังคม:
                สโมสรมีบทบาทในการจัดกิจกรรมที่ช่วยเสริมสร้างความรู้
                การแลกเปลี่ยนประสบการณ์ และการพัฒนาทักษะชีวิต
                รวมถึงกิจกรรมที่ช่วยให้นักศึกษาได้แสดงความสามารถและส่งเสริมความสามัคคี
              </li>
              <li>
                • สร้างเครือข่ายกับองค์กรภายนอก:
                สโมสรนักศึกษาสามารถเป็นช่องทางในการสร้างความสัมพันธ์และความร่วมมือกับองค์กรภายนอก
                เช่น สถานประกอบการหรือหน่วยงานต่างๆ เพื่อประโยชน์ในด้านการฝึกงาน
                การหางาน หรือการจัดกิจกรรมร่วมกัน
              </li>
            </ul>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
