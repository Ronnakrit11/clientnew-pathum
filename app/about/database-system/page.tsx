"use client";
import React, { useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PDFViewer from "@/app/components/Ebook/PDFViewer";
import Login from "@/app/components/Auth/Login";
import CustomModal from "@/app/utils/CustomModal";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Button } from "flowbite-react";

const Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");

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
      <main className="flex-grow container mx-auto px-4 py-20 text-black">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-4">ระบบฐานข้อมูลนักศึกษา</h1>
          <div className="space-y-2">
            <h2 className="font-semibold text-xl">
              ความสำคัญของการมีระบบฐานข้อมูลนักศึกษา
            </h2>
            <p className="ml-4">
              ระบบฐานข้อมูลนักศึกษาเป็นสิ่งสำคัญในการบริหารจัดการข้อมูลเกี่ยวกับนักศึกษาของคณะวิทยาศาสตร์และเทคโนโลยี
              เพื่อให้สามารถติดตามข้อมูลที่จำเป็นได้อย่างมีประสิทธิภาพ
              ระบบฐานข้อมูลช่วยให้คณะสามารถจัดเก็บและจัดการข้อมูลได้อย่างเป็นระเบียบ
              ลดความซ้ำซ้อนและข้อผิดพลาดในการดำเนินงาน
              อีกทั้งยังช่วยติดตามความคืบหน้าของนักศึกษา เช่น
              ข้อมูลการสหกิจศึกษา ข้อมูลปริญญานิพนธ์ และเส้นทางอาชีพของศิษย์เก่า
              ระบบยังช่วยเสริมสร้างความสัมพันธ์ระหว่างนักศึกษาในรุ่นปัจจุบันและศิษย์เก่า
              รวมถึงการสร้างเครือข่ายกับองค์กรภายนอกเพื่อส่งเสริมการพัฒนานักศึกษาและคณะ.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold text-xl">
              วัตถุประสงค์ของการมีระบบฐานข้อมูลนักศึกษา
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                จัดการข้อมูลนักศึกษาอย่างมีประสิทธิภาพ:
                ระบบฐานข้อมูลช่วยจัดเก็บข้อมูลนักศึกษาทั้งในปัจจุบันและศิษย์เก่าอย่างเป็นระบบ
                ลดความซ้ำซ้อนและข้อผิดพลาดในการจัดการข้อมูล
              </li>
              <li>
                ติดตามการสหกิจศึกษา:
                ระบบช่วยบันทึกและแสดงข้อมูลสถานประกอบการที่นักศึกษาเข้าร่วมสหกิจศึกษา
                เพื่อใช้วางแผนและพัฒนาความร่วมมือกับสถานประกอบการที่เกี่ยวข้อง
              </li>
              <li>
                ติดตามเส้นทางอาชีพของศิษย์เก่า:
                ระบบช่วยตรวจสอบข้อมูลการทำงานของศิษย์เก่าหลังสำเร็จการศึกษา
                ซึ่งช่วยในการสร้างเครือข่ายและสนับสนุนรุ่นน้องในการวางแผนเส้นทางอาชีพ
              </li>
              <li>
                แสดงข้อมูลปริญญานิพนธ์:
                ระบบจัดเก็บข้อมูลปริญญานิพนธ์ของนักศึกษาที่สำเร็จการศึกษา
                เพื่อเป็นแหล่งข้อมูลอ้างอิงสำหรับการพัฒนาผลงานของนักศึกษารุ่นปัจจุบัน
              </li>
              <li>
                สร้างเครือข่ายระหว่างศิษย์เก่าและศิษย์ปัจจุบัน:
                ระบบฐานข้อมูลช่วยส่งเสริมความสัมพันธ์ระหว่างรุ่น
                และเป็นช่องทางในการติดต่อและสนับสนุนระหว่างศิษย์เก่าและศิษย์ปัจจุบัน
              </li>
              <li>
                สนับสนุนการพัฒนาคณะ:
                ฐานข้อมูลเป็นเครื่องมือสำคัญที่ช่วยให้คณะสามารถใช้ข้อมูลนักศึกษาและศิษย์เก่าในการพัฒนาหลักสูตร
                การจัดกิจกรรม และการสร้างความร่วมมือกับองค์กรภายนอก
              </li>
            </ul>
          </div>
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
