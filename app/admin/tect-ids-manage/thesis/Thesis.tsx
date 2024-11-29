"use client";
import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

import UploadThesis from "./UploadThesis";
import { useGetAllUserSuccessQuery } from "@/redux/features/user/userApi";

const Thesis = () => {
  // const {
  //   data: dataAllUserEngineerAndIT,
  //   refetch: refetchAllUserEngineerAndIT,
  // } = useAllUserEngineerAndITQuery({}, { refetchOnMountOrArgChange: true });
  const [name, setName] = useState("");

  const { data: dataAllUserSuccess, refetch: refetchAllUserSuccess } =
    useGetAllUserSuccessQuery({
      major: "เทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม",
      name: name,
    });

  console.log(dataAllUserSuccess);

  return (
    <div className="container mx-auto mt-24">
      <div className="flex justify-between mb-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="ค้นหาชื่อนักศึกษา" />
          </div>
          <TextInput
            id="name"
            type="text"
            className="w-[400px]"
            placeholder="กรุณากรอกชื่อที่จะค้นหา"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <ModalCreateUser refetch={refetchAllUserSuccess} />
        </div> */}
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>รหัสนักศึกษา</Table.HeadCell>
            <Table.HeadCell>สาขาวิชา</Table.HeadCell>
            <Table.HeadCell>หลักสูตร</Table.HeadCell>
            <Table.HeadCell>เอกสารปริญญาตรี</Table.HeadCell>
            <Table.HeadCell>ดำเนินการ</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataAllUserSuccess?.users.map(
              (user) =>
                user?.role !== "admin" && (
                  <Table.Row key={user._id}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </Table.Cell>
                    <Table.Cell>{user.studentId}</Table.Cell>
                    <Table.Cell>{user.major}</Table.Cell>
                    <Table.Cell>{user.program}</Table.Cell>
                    <Table.Cell>
                      {user?.thesis ? user.thesis : "ยังไม่มีเอกสาร"}
                    </Table.Cell>
                    <Table.Cell className="flex gap-2">
                      {/* <ModalInfoUser data={user} />
                      <ModalEditUser data={user} refetch={refetchAllUserEngineerAndIT} />
                      <ModalDelete data={user} refetch={refetchAllUserEngineerAndIT} /> */}
                      <UploadThesis id={user._id} />
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

export default Thesis;
