"use client";
import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {
  useAllUserEngineerAndITQuery,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";

import { useSearchUserByNameQuery } from "@/redux/features/user/userApi";
import ModalCreateUser from "@/app/components/Admin/Users/ModalCreateUser";
import ModalInfoUser from "@/app/components/Admin/Users/ModalInfoUser";
import ModalDelete from "@/app/components/Admin/Users/ModalDelete";
import ModalEditUser from "@/app/components/Admin/Users/ModalEditUser";
import UploadThesis from "./UploadThesis";

const Thesis = () => {

  const {
    data: dataAllUserEngineerAndIT,
    refetch: refetchAllUserEngineerAndIT,
  } = useAllUserEngineerAndITQuery({}, { refetchOnMountOrArgChange: true });


  console.log(dataAllUserEngineerAndIT?.users);

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
            // onChange={(e) => setSearchName(e.target.value)}
            required
          />
        </div>
        <div>
          <ModalCreateUser refetch={refetchAllUserEngineerAndIT} />
        </div>
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
            {dataAllUserEngineerAndIT?.users.map(
              (user) =>
                user?.role !== "admin" && (
                  <Table.Row key={user._id}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </Table.Cell>
                    <Table.Cell>{user.studentId}</Table.Cell>
                    <Table.Cell>{user.major}</Table.Cell>
                    <Table.Cell>{user.program}</Table.Cell>
                    <Table.Cell>{user?.thesis ? user.thesis : "ยังไม่มีเอกสาร"}</Table.Cell>
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
