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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            โครงสร้างคณะกรรมการสโมสรนักศึกษา
          </h1>
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
