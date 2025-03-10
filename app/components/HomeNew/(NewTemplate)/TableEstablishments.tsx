import React, { useState } from "react";
import { Button, Table, TextInput } from "flowbite-react";
import ModalDetails from "../../../about/cooperation-agencies/components/ModalDetails";
import Link from "next/link";
import { useListCoworkQuery } from "@/redux/features/cowork/coworkApi";

const TableEstablishments = () => {
  const { data, isLoading } = useListCoworkQuery(undefined, {});
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const filteredData = data?.cowork?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <section className="flex-grow container mx-auto px-4 py-8 text-black">
        <div className="flex justify-between gap-4 items-center mb-2">
          <h1 className="text-2xl font-bold mb-4">
            รายชื่อหน่วยงานความร่วมมือ
          </h1>
          <TextInput
            placeholder="ค้นหาหน่วยงานด้วยชื่อหรือจังหวัด"
            className="w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
              ) : filteredData?.length > 0 ? (
                filteredData.map((item, index) => (
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
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={3} className="text-center text-gray-500">
                    ไม่พบข้อมูล
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </section>
      <div className="flex justify-center items-center my-10">
        <Link href="/about/cooperation-agencies">
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
