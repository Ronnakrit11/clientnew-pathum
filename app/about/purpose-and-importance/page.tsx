"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const { data: heroData } = useGetHeroDataQuery("Objective");

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
            <p className="ml-4">{heroData?.layout.objective.importance}</p>
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold text-xl">
              วัตถุประสงค์ของการมีสโมสรนักศึกษา
            </h2>
            <ul className="space-y-2 ml-4">
              {heroData?.layout.objective.objective.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
