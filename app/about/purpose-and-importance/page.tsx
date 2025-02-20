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
  console.log(heroData?.layout?.objective?.content);
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
          <p
            dangerouslySetInnerHTML={{
              __html: heroData?.layout?.objective?.content,
            }}
          ></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
