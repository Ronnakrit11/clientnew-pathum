"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const { data: heroData } = useGetHeroDataQuery("StructureSmo");
  console.log(heroData?.layout?.structureSmo?.smo);
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
          <h1 className="text-2xl font-bold my-10 text-center">
            โครงสร้างคณะกรรมการสโมสรนักศึกษา
          </h1>
          <div className="container xl:w-[1000px] mx-auto pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3  gap-8">
              {heroData?.layout?.structureSmo?.smo?.map((item, index) => (
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
