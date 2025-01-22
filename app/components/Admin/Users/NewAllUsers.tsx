"use client";
import React, { useState } from "react";
import { Select, Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import ModalInfoUser from "./ModalInfoUser";
import ModalCreateUser from "./ModalCreateUser";
import { useSearchUserByNameQuery } from "@/redux/features/user/userApi";
import ModalDelete from "./ModalDelete";
import { Badge } from "flowbite-react";
import ModalEditUser from "./ModalEditUser";
import { Pagination } from "flowbite-react";
import DrawerFilter from "@/app/admin/en-it/DrawerFilter";
import { useListUserByMajorQuery } from "@/redux/features/user/userApi";

const NewAllUsers = () => {
  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
    name: "",
    major:
      "6750880ea21533239807c93b&major=67508a8bb6021ee6cee863e6&major=67508a92b6021ee6cee863ec&major=67508b21b6021ee6cee863fd",
    dateStart: new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).toISOString(),
    dateEnd: new Date().toISOString(),
    status: "",
    studentId: "i",
    createdAt: -1,
  });

  const { data, refetch } = useListUserByMajorQuery(payload, {
    refetchOnMountOrArgChange: true,
  });

  const onPageChange = (page: number) => setPayload({ ...payload, page: page });

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex gap-2 mb-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="ค้นหาชื่อนักศึกษา หรือรหัสนักศึกษา" />
          </div>
          <TextInput
            id="name"
            type="text"
            className="w-[400px]"
            placeholder="กรุณากรอกชื่อหรือรหัสนักศึกษาที่จะค้นหา"
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            required
          />
        </div>
        <div className="flex items-end">
          <DrawerFilter setPayload={setPayload} payload={payload} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-md">
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>รหัสนักศึกษา</Table.HeadCell>
            <Table.HeadCell>สาขาวิชา</Table.HeadCell>
            <Table.HeadCell>หลักสูตร</Table.HeadCell>
            <Table.HeadCell>สถานะ</Table.HeadCell>
            <Table.HeadCell className="flex justify-between items-center">
              ดำเนินการ{" "}
              <Select
                value={payload.limit}
                onChange={(e: any) =>
                  setPayload({ ...payload, limit: e.target.value })
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Select>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.data
              .filter((user) => user.role === "user")
              .map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.studentId}</Table.Cell>
                  <Table.Cell>{user.major.name}</Table.Cell>
                  <Table.Cell>{user.program.name}</Table.Cell>
                  <Table.Cell>{user.status}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <ModalInfoUser data={user} />
                    <ModalEditUser data={user} refetch={refetch} />
                    <ModalDelete data={user} refetch={refetch} />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto my-8 sm:justify-center">
          <Pagination
            currentPage={payload.page || 1}
            totalPages={100}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NewAllUsers;
