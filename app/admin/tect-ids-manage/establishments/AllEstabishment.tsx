"use client";
import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import ModalCreateEstablishment from "./ModalCreateEstablishment";
import { useGetAllEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";
import ModalInforEstablishment from "./ModalInfoEsblishment";
import ModalDeleteEsblishment from "./ModelDeleteEsblishment";
import ModalEditEstablishment from "./ModalEditEstablishment";
import { Pagination, Select } from "flowbite-react";
const AllEstabishment = () => {
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const payloadSearch = {
    name: searchName,
    major: "สาขาวิชาเทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม",
    page: currentPage,
    limit: limit,
  };

  const { data: dataAllEstablishments, refetch: refetchAllEstablishments } =
    useGetAllEstablishmentsQuery(payloadSearch);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="container mx-auto mt-24">
    <div className="flex flex-col-reverse gap-2 md:flex-row justify-between mb-4 ">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="ค้นหาชื่อสถานประกอบการณ์" />
        </div>
        <TextInput
          id="name"
          type="text"
          className="w-full md:w-[400px]"
          placeholder="กรุณากรอกชื่อที่จะค้นหา"
          onChange={(e) => setSearchName(e.target.value)}
          required
        />
      </div>
      <div>
        <ModalCreateEstablishment refetch={refetchAllEstablishments} />
      </div>
    </div>
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ลำดับ</Table.HeadCell>
          <Table.HeadCell>ชื่อสถานประกอบการ</Table.HeadCell>
          <Table.HeadCell>จังหวัด</Table.HeadCell>
          <Table.HeadCell>
            <div className="flex justify-between items-center gap-2">
              ดำเนินการ
              <Select
                aria-label="เลือกรายการต่อหน้า"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Select>
            </div>
          </Table.HeadCell>{" "}
        </Table.Head>
        <Table.Body className="divide-y">
          {dataAllEstablishments?.establishments.map(
            (establishments, index) =>
              establishments?.role !== "admin" && (
                <Table.Row key={establishments._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>{establishments.name}</Table.Cell>
                  <Table.Cell>{establishments.address}</Table.Cell>
                  {/* <Table.Cell>
                    {establishments.name_of_establishment}
                  </Table.Cell> */}
                  <Table.Cell className="flex gap-1">
                    <ModalInforEstablishment data={establishments} />
                    <ModalEditEstablishment
                      data={establishments}
                      refetch={refetchAllEstablishments}
                    />
                    <ModalDeleteEsblishment
                      data={establishments}
                      refetch={refetchAllEstablishments}
                    />
                  </Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  </div>
  );
};

export default AllEstabishment;
