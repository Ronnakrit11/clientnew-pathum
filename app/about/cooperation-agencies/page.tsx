"use client";
import React, { useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useGetAllUserEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";
import { useListCoworkQuery } from "@/redux/features/cowork/coworkApi";
import { Table } from "flowbite-react";
import ModalDetails from "./components/ModalDetails";

type Establishment = {
  id: number;
  name: string;
  address: string;
};

const Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Establishment | null>(null);

  // const { data, isLoading } = useGetAllUserEstablishmentsQuery(
  //   {},
  //   { refetchOnMountOrArgChange: true }
  // );

  const { data, isLoading } = useListCoworkQuery(undefined, {});

  const handleRowClick = (item: Establishment) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
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
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.cowork?.length ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>ลำดับ</Table.HeadCell>
                <Table.HeadCell>ชื่อหน่วยงาน</Table.HeadCell>
                <Table.HeadCell>จังหวัด</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data?.cowork.map((item: Establishment, index: number) => (
                  <Table.Row
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <p>No establishments found.</p>
        )}
      </main>
      <Footer />
      {selectedItem && (
        <ModalDetails
          openModal={openModal}
          setOpenModal={setOpenModal}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default Page;