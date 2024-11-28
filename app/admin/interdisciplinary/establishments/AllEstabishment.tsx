"use client";
import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import ModalCreateEstablishment from "./ModalCreateEstablishment";
import { useGetAllEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";
import ModalInforEstablishment from "./ModalInfoEsblishment";
import ModalDeleteEsblishment from "./ModelDeleteEsblishment";
import ModalEditEstablishment from "./ModalEditEstablishment";

const AllEstabishment = () => {
  const [searchName, setSearchName] = useState("");
  const payloadSearch = {
    name: searchName,
    major: "สหวิทยาการ",
  };

  const { data: dataAllEstablishments, refetch: refetchAllEstablishments } =
    useGetAllEstablishmentsQuery(payloadSearch);

  return (
    <div className="container mx-auto mt-24">
      <div className="flex justify-between mb-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="ค้นหาชื่อสถานประกอบการณ์" />
          </div>
          <TextInput
            id="name"
            type="text"
            className="w-[400px]"
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
            <Table.HeadCell>ชื่อสถานประกอบการ</Table.HeadCell>
            <Table.HeadCell>ประเภทสถานประกอบการ</Table.HeadCell>
            <Table.HeadCell>ที่ตั้ง</Table.HeadCell>
            <Table.HeadCell>ติดต่อ</Table.HeadCell>
            <Table.HeadCell>ดำเนินการ</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataAllEstablishments?.establishments.map(
              (establishments) =>
                establishments?.role !== "admin" && (
                  <Table.Row key={establishments._id}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {establishments.name}
                    </Table.Cell>
                    <Table.Cell>{establishments.category}</Table.Cell>
                    <Table.Cell>{establishments.address}</Table.Cell>
                    <Table.Cell>
                      {establishments.name_of_establishment}
                    </Table.Cell>
                    <Table.Cell className="flex gap-2">
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
      </div>
    </div>
  );
};

export default AllEstabishment;
