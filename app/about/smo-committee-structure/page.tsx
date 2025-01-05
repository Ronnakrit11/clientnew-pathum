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
      <main className="flex-grow container mx-auto px-4 py-8 text-black">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            โครงสร้างคณะกรรมการสโมสรนักศึกษา
          </h1>
          {/* <h1 className="text-xl font-bold mb-4">
            ความสำคัญและวัตถุประสงค์ของการมีอาจารย์ที่ปรึกษาสโมสรนักศึกษา
          </h1> */}

          <div className="space-y-2 mb-8">
            <h2 className="font-semibold text-xl">
              ความสำคัญของการมีอาจารย์ที่ปรึกษาสโมสรนักศึกษา
            </h2>
            <ul className="space-y-2 ml-4">
              <li>
                • การสนับสนุนด้านการบริหารจัดการ:
                อาจารย์ที่ปรึกษามีบทบาทในการให้คำแนะนำและสนับสนุนการบริหารจัดการของสโมสรนักศึกษา
                เพื่อให้นักศึกษาสามารถดำเนินงานตามวัตถุประสงค์ของสโมสรได้อย่างมีประสิทธิภาพ
              </li>
              <li>
                • การพัฒนาศักยภาพของนักศึกษา:
                อาจารย์ที่ปรึกษาช่วยส่งเสริมการพัฒนาศักยภาพของนักศึกษาในด้านการทำงานเป็นทีม
                การเป็นผู้นำ การแก้ไขปัญหา และการจัดการเวลา
                ซึ่งเป็นทักษะที่จำเป็นสำหรับการดำเนินชีวิตและการทำงานในอนาคต
              </li>
              <li>
                • การควบคุมและสนับสนุนการจัดกิจกรรม:
                อาจารย์ที่ปรึกษามีบทบาทในการให้คำปรึกษาเกี่ยวกับการวางแผนและจัดกิจกรรมของสโมสร
                รวมถึงการตรวจสอบความเหมาะสมของกิจกรรมให้สอดคล้องกับนโยบายของคณะและสถาบัน
              </li>
              <li>
                • การสร้างความสัมพันธ์ระหว่างนักศึกษาและคณะ:
                อาจารย์ที่ปรึกษาเป็นตัวกลางที่ช่วยเชื่อมโยงความสัมพันธ์ระหว่างนักศึกษาและคณะ
                โดยช่วยสื่อสารปัญหาและความต้องการของนักศึกษาไปยังฝ่ายบริหารของคณะ
              </li>
              <li>
                • การเสริมสร้างความมั่นใจให้นักศึกษา:
                การมีอาจารย์ที่ปรึกษาช่วยให้นักศึกษามั่นใจในความสำเร็จของกิจกรรม
                เนื่องจากได้รับคำแนะนำจากผู้มีประสบการณ์
              </li>
            </ul>
          </div>
          <div className="space-y-2 mb-8">
            <h2 className="font-semibold text-xl">
              วัตถุประสงค์ของการมีอาจารย์ที่ปรึกษาสโมสรนักศึกษา
            </h2>
            <ul className="space-y-2 ml-4">
              <li>
                • ให้คำแนะนำด้านการดำเนินงานของสโมสรนักศึกษา:
                เพื่อให้นักศึกษาสามารถดำเนินกิจกรรมต่างๆ
                ได้อย่างเหมาะสมและมีประสิทธิภาพ
                สอดคล้องกับเป้าหมายของสโมสรและนโยบายของคณะ
              </li>
              <li>
                • สนับสนุนการพัฒนาทักษะและศักยภาพของนักศึกษา:
                เพื่อส่งเสริมให้นักศึกษาได้เรียนรู้และพัฒนาทักษะที่สำคัญ เช่น
                ความเป็นผู้นำ การวางแผน การแก้ไขปัญหา และการสื่อสาร
              </li>
              <li>
                • ส่งเสริมการมีส่วนร่วมในกิจกรรมของนักศึกษา:
                เพื่อให้นักศึกษาเกิดความกระตือรือร้นในการเข้าร่วมกิจกรรม
                และได้รับประโยชน์สูงสุดจากการมีส่วนร่วมในสโมสรนักศึกษา
              </li>
              <li>
                • ช่วยควบคุมและประเมินผลการดำเนินงานของสโมสร:
                เพื่อให้แน่ใจว่ากิจกรรมของสโมสรดำเนินไปในทิศทางที่ถูกต้องและมีผลลัพธ์ที่ตรงตามเป้าหมาย
              </li>
              <li>
                • สร้างความสัมพันธ์อันดีระหว่างนักศึกษา คณะ และสถาบัน:
                เพื่อเสริมสร้างความสัมพันธ์อันดีและความเข้าใจที่ตรงกันระหว่างนักศึกษา
                คณาจารย์ และผู้บริหารของคณะ
              </li>
            </ul>
          </div>
          <PDFViewer link="/about/smo-committee-structure.pdf" />
          <div className="mt-4">
            <a
              href="/about/smo-committee-structure.pdf"
              download="smo-committee-structure.pdf"
              className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:text-primary transition justify-end"
            >
              ดาวน์โหลดไฟล์ PDF
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
