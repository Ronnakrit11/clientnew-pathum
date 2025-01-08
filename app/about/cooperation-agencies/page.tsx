"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useGetAllUserEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";
import { Table } from "flowbite-react";
import ModalDetails from "./components/ModalDetails";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const { data, isLoading } = useGetAllUserEstablishmentsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [openModal, setOpenModal] = useState(false);

  console.log(data);
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
        title="รายชื่อหน่วยงานความร่วมมือ"
        description="รายชื่อหน่วยงานความร่วมมือ"
        keywords="รายชื่อหน่วยงานความร่วมมือ"
      />
      <main className="flex-grow container mx-auto px-4 py-8 text-black">
        <h1 className="text-2xl font-bold mb-4">รายชื่อหน่วยงานความร่วมมือ</h1>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>ลำดับ</Table.HeadCell>
              <Table.HeadCell>ชื่อสถานประกอบการ</Table.HeadCell>
              <Table.HeadCell>จังหวัด</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.establishments?.map((item, index) => (
                <>
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => setOpenModal(true)}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                  </Table.Row>
                  <ModalDetails
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    item={item}
                  />
                </>
              ))}
            </Table.Body>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
