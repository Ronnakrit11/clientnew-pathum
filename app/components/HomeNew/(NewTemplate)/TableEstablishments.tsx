import React, { useState } from "react";
import { useGetAllUserEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";
import { Button, Table } from "flowbite-react";
import ModalDetails from "../../../about/cooperation-agencies/components/ModalDetails";
import { BiArrowToLeft } from "react-icons/bi";
import Link from "next/link";

const TableEstablishments = () => {
  const { data, isLoading } = useGetAllUserEstablishmentsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  return (
    <div>
      <section className="flex-grow container mx-auto px-4 py-8 text-black">
        <h1 className="text-2xl font-bold mb-4">รายชื่อหน่วยงานความร่วมมือ</h1>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>ลำดับ</Table.HeadCell>
              <Table.HeadCell>ชื่อสถานประกอบการ</Table.HeadCell>
              <Table.HeadCell>จังหวัด</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {isLoading ? (
                <Table.Row>
                  <Table.Cell className="text-center col-span-3">
                    กำลังโหลดข้อมูล...
                  </Table.Cell>
                </Table.Row>
              ) : (
                data?.establishments?.slice(0, 10).map((item, index) => (
                  <Table.Row
                    key={item.id || index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </section>
      <div className="flex justify-center items-center my-10">
        <Link href="/about/cooperation-agencies">
          <Button>
            ดูเพิ่มเติม
          </Button>
        </Link>
      </div>

      {/* Modal */}
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

export default TableEstablishments;
