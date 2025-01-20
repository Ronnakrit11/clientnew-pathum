"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const { data: heroData } = useGetHeroDataQuery("ConsultSmo");
  console.log(heroData?.layout?.consultSmo?.importance);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Heading
        title="โครงสร้างที่ปรึกษาสโมสรนักศึกษา"
        description="สร้างคณะวิทยาศาสตร์และเทคโนโลยี สถาบันเทคโนโลยีปทุมวัน"
        keywords="สร้างคณะวิทยาศาสตร์และเทคโนโลยี สถาบันเทคโนโลยีปทุมวัน"
      />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 ">
          <h1 className="text-2xl font-bold">
            โครงสร้างที่ปรึกษาสโมสรนักศึกษา
          </h1>
          <div className="space-y-2 mb-8">
            <h2 className="font-semibold text-xl">
              ความสำคัญของการมีอาจารย์ที่ปรึกษาสโมสรนักศึกษา
            </h2>
            <ul className="space-y-2 ml-4">
              {heroData?.layout?.consultSmo?.importance?.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 mb-8">
            <h2 className="font-semibold text-xl">
              วัตถุประสงค์ของการมีอาจารย์ที่ปรึกษาสโมสรนักศึกษา
            </h2>
            <ul className="space-y-2 ml-4">
              {heroData?.layout?.consultSmo?.objective?.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="w-[1000px] xl:w-[800px] mx-auto py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3  gap-8">
              {heroData?.layout?.consultSmo?.consult?.map((item, index) => (
                <div key={index} className="text-center space-y-4">
                  <Image
                    src={item.url}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="text-sm">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
