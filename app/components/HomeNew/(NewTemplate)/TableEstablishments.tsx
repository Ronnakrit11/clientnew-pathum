import React, { useState } from "react";
import { Button, Table } from "flowbite-react";
import ModalDetails from "../../../about/cooperation-agencies/components/ModalDetails";
import Link from "next/link";
import { useListCoworkQuery } from "@/redux/features/cowork/coworkApi";

const TableEstablishments = () => {
  // const { data, isLoading } = useGetAllUserEstablishmentsQuery(
  //   {},
  //   { refetchOnMountOrArgChange: true }
  // );
  const { data, isLoading } = useListCoworkQuery(undefined, {});
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
              <Table.HeadCell>ชื่อหน่วยงาน</Table.HeadCell>
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
                data?.cowork?.slice(0, 10).map((item, index) => (
                  <Table.Row
                    key={item.id || index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.country}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </section>
      <div className="flex justify-center items-center my-10">
        <Link href="/about/cooperation-agencies">
          {/* <Button className="bg-primary hover:bg-red-800">ดูเพิ่มเติม</Button> */}
          <button className="bg-primary py-2 px-4 text-white rounded-md hover:shadow-lg">
            ดูเพิ่มเติม
          </button>
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
